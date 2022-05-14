import { Button, message } from 'antd';
import { Card, InputDropdown, InputTag, ModalWrap } from 'components';
import { InputCustom } from 'custom';
import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { ITagInput, IVariantInput } from 'shared/types';
import { v4 } from 'uuid';

interface Props {
   onVariantsChange?: (variants: IVariantInput[]) => any;
}

const VariantInputs = ({ onVariantsChange }: Props) => {
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

      setVariants((_variants) => {
         return [..._variants].concat(newVariant);
      });
   }, []);

   useEffect(() => {
      onVariantsChange && onVariantsChange(variants);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variants]);

   return (
      <Card title="Product variants">
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
               {variants.map((_variant, _index) => {
                  return (
                     <div
                        className="flex items-center gap-4 w-full"
                        key={_variant.id}
                     >
                        {_variant.readonly ? (
                           <ReadOnlyVariant variant={_variant} />
                        ) : (
                           <div className="flex items-center space-x-4 w-full">
                              <InputDropdown
                                 listValues={[
                                    {
                                       name: 'hi',
                                       value: 'hi',
                                    },
                                    {
                                       name: 'h1',
                                       value: 'h1',
                                    },
                                 ]}
                                 onValueChange={(value) => {
                                    setVariants((variants) => {
                                       let variantsClone = [...variants];
                                       variantsClone[_index] = {
                                          ...variantsClone[_index],
                                          key: value,
                                       };
                                       return variantsClone;
                                    });
                                 }}
                              />
                              <InputTag
                                 onTagChange={(tags) => {
                                    setVariants((variants) => {
                                       let variantsClone = [...variants];
                                       variantsClone[_index] = {
                                          ...variantsClone[_index],
                                          values: tags.map(
                                             (_tag) => _tag.value
                                          ),
                                       };
                                       return variantsClone;
                                    });
                                 }}
                              />
                           </div>
                        )}
                        <button
                           className="w-[37.5px] h-[37.5px] flex items-center justify-center bg-red-500 rounded flex-shrink-0"
                           onClick={() => {
                              setVariants(
                                 [...variants].filter(
                                    (v) => v.id !== _variant.id
                                 )
                              );
                           }}
                        >
                           <IoIosClose className="w-6 h-6 text-white" />
                        </button>
                     </div>
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
                  handleCancel={() => {
                     setShowAddOwnVariant(false);
                     setTagsOwnVariant([]);
                     setKeyOwnVariant('');
                  }}
                  handleOk={() => {
                     if (
                        keyOwnVariant.trim().length === 0 ||
                        tagsOwnVariant.length === 0
                     ) {
                        message.error('Field variant and tags must enter');
                        return;
                     }
                     const newVariant: IVariantInput = {
                        id: v4(),
                        key: keyOwnVariant,
                        values: tagsOwnVariant.map((_tag) => _tag.value),
                        readonly: true,
                     };
                     setVariants((_variants) => {
                        return [..._variants].concat(newVariant);
                     });
                     setTagsOwnVariant([]);
                     setKeyOwnVariant('');
                  }}
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
