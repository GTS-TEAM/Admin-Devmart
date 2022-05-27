import { Button, message, TreeSelect } from 'antd';
import { fetcher } from 'apis';
import { Card, InputDropdown, InputTag, ModalWrap } from 'components';
import { InputCustom } from 'custom';
import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IMetadata, ITagInput, IVariantInput } from 'shared/types';
import useSWR from 'swr';
import { v4 } from 'uuid';

interface Props {
   onVariantsChange?: (variants: IVariantInput[]) => any;
}

const VariantInputs = ({ onVariantsChange }: Props) => {
   const { data: metadata } = useSWR('/metadata', fetcher.getAllMetadata);
   const [variants, setVariants] = useState<IVariantInput[]>([]);
   const [tagsOwnVariant, setTagsOwnVariant] = useState<ITagInput[]>([]);
   const [keyOwnVariant, setKeyOwnVariant] = useState<string>('');
   const [showAddOwnVariant, setShowAddOwnVariant] = useState<boolean>(false);

   const handleAddVariant = useCallback(() => {
      const newVariant: IVariantInput = {
         id: v4(),
         key: '',
         values: [],
      };

      setVariants([...variants, newVariant]);
   }, [variants]);

   const handelOk = useCallback(() => {
      if (keyOwnVariant.trim().length === 0 || tagsOwnVariant.length === 0) {
         message.error('Field variant and tags must enter');
         return;
      }
      const newVariant: IVariantInput = {
         id: v4(),
         key: keyOwnVariant,
         values: tagsOwnVariant.map((_tag) => _tag.value),
         readonly: true,
      };
      setVariants((variants) => {
         return [...variants].concat(newVariant);
      });
      setTagsOwnVariant([]);
      setKeyOwnVariant('');
      setShowAddOwnVariant(false);
   }, [keyOwnVariant, tagsOwnVariant]);

   const handleCancel = useCallback(() => {
      setShowAddOwnVariant(false);
      setTagsOwnVariant([]);
      setKeyOwnVariant('');
   }, []);

   const handelVariantChange = useCallback(
      (variantName: string, values: string[], _index: number) => {
         setVariants((variants) => {
            let variantsClone = [...variants];
            variantsClone[_index] = {
               ...variantsClone[_index],
               key: variantName,
               values,
            };
            return variantsClone;
         });
      },
      []
   );

   useEffect(() => {
      onVariantsChange && onVariantsChange(variants);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variants]);

   return (
      <Card title="Product variants" isHaveClassBody>
         <div className="mb-4 flex items-center justify-between">
            <span className="text-muted  block">Add Product Variant.</span>
            <button
               className="text-vz-primary underline"
               onClick={() => {
                  setShowAddOwnVariant(true);
               }}
            >
               Add your variant
            </button>
         </div>
         {variants.length > 0 && (
            <div className="flex gap-4 flex-col">
               {variants.map((variant, _index) => {
                  return (
                     <VariantInput
                        variant={variant}
                        metadata={metadata}
                        key={variant.id}
                        onVariantChange={(variantName, values) => {
                           handelVariantChange(variantName, values, _index);
                        }}
                        onRemove={() => {
                           setVariants((variants) => {
                              return [...variants].filter((_, i) => {
                                 return i !== _index;
                              });
                           });
                        }}
                     />
                  );
               })}
            </div>
         )}
         <Button
            className="vz-button vz-button-primary mt-4"
            onClick={handleAddVariant}
         >
            {variants.length > 0 ? 'Add more variant' : 'Add variant'}
         </Button>
         <AnimatePresence>
            {showAddOwnVariant && (
               <ModalWrap
                  title="Add your own variant"
                  handleCancel={handleCancel}
                  handleOk={handelOk}
                  textOk="Add variant"
               >
                  <div className="flex flex-col space-y-4">
                     <InputCustom
                        placeholder="Enter variant"
                        onChange={(e) => {
                           setKeyOwnVariant(e.target.value);
                        }}
                     />
                     <InputTag
                        onTagChange={(tags) => {
                           setTagsOwnVariant(tags);
                        }}
                     />
                  </div>
               </ModalWrap>
            )}
         </AnimatePresence>
      </Card>
   );
};

interface VariantInputProps {
   variant: IVariantInput;
   metadata: IMetadata[] | undefined;
   onVariantChange?: (variantName: string, values: string[]) => any;
   onRemove: () => any;
}

const VariantInput = ({
   variant,
   metadata,
   onVariantChange,
   onRemove,
}: VariantInputProps) => {
   const [variantChoose, setVariantChoose] = useState<string>('');
   const [tagsChoose, setTagsChoose] = useState<string[]>([]);

   useEffect(() => {
      onVariantChange && onVariantChange(variantChoose, tagsChoose);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variantChoose, tagsChoose]);

   return (
      <div className="flex items-center gap-4 w-full" key={variant.id}>
         {variant.readonly ? (
            <ReadOnlyVariant variant={variant} />
         ) : (
            <div className="flex items-center space-x-4 w-full">
               <InputDropdown
                  listValues={
                     metadata
                        ? metadata?.map((_m) => {
                             return {
                                name: _m.name,
                                value: _m.name,
                             };
                          })
                        : []
                  }
                  onValueChange={(value) => {
                     setVariantChoose(value);
                  }}
               />
               <TreeSelect
                  className="w-full vz-select"
                  //@ts-ignore
                  treeData={metadata
                     ?.find((_mm) => {
                        return _mm.name === variantChoose;
                     })
                     ?.values.map((_v) => {
                        return {
                           title: _v,
                           key: _v,
                           value: _v,
                        };
                     })}
                  treeCheckable={true}
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  placeholder="Choose categories"
                  dropdownClassName="vz-dropdown"
                  onChange={(values) => {
                     setTagsChoose(values);
                  }}
               />
            </div>
         )}
         <button
            className="w-[37.5px] h-[37.5px] flex items-center justify-center bg-red-500 rounded flex-shrink-0"
            onClick={onRemove}
         >
            <IoIosClose className="w-6 h-6 text-white" />
         </button>
      </div>
   );
};

interface ReadOnlyProps {
   variant: IVariantInput;
}

const ReadOnlyVariant = ({ variant }: ReadOnlyProps) => {
   return (
      <div className="flex items-center space-x-4 w-full  ">
         <div className="vz-input w-full flex-1 hover:border-transparent">
            {variant.key}
         </div>
         <div className="vz-input w-full flex-1 hover:border-vz-input-border !h-[unset] min-h-[37.5px]">
            <div className="flex items-center gap-2 flex-wrap ">
               {variant.values.map((tag, _index) => (
                  <div
                     className="flex items-center rounded bg-vz-body-color p-2 w-fit"
                     key={_index}
                  >
                     <span className="mr-2">{tag}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default React.memo(VariantInputs);
