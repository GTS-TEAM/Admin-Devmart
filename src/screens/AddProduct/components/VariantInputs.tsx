import { Button } from 'antd';
import { Card, InputDropdown, InputTag } from 'components';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IVariantInput } from 'shared/types';

interface Props {
   onVariantChange?: (variant: IVariantInput, index: number) => any;
   index: number;
}

const VariantInput = ({ onVariantChange, index }: Props) => {
   const [variant, setVariant] = useState<IVariantInput | null>(null);

   useEffect(() => {
      if (variant) {
         onVariantChange && onVariantChange(variant, index);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variant]);

   return (
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
               const newVariant: IVariantInput = {
                  key: value,
                  values: [],
               };

               setVariant(newVariant);
            }}
         />
         <InputTag
            onTagChange={(tags) => {
               setVariant((_variant) => {
                  return {
                     key: _variant?.key as string,
                     values: tags.map((_tag) => _tag.value),
                  };
               });
            }}
         />
      </div>
   );
};

const VariantInputs = () => {
   const [variants, setVariants] = useState<IVariantInput[]>([]);

   console.log(variants);

   const handleAddVariant = () => {
      const newVariant: IVariantInput = {
         key: '',
         values: [],
      };
      setVariants([...variants, newVariant]);
   };

   console.log(variants);

   return (
      <Card title="Product variants">
         <span className="text-muted mb-4 block">Add Product Variant.</span>
         {variants.length > 0 && (
            <ul className="flex gap-4 flex-col">
               {variants.map((_variant, _index) => {
                  return (
                     <div
                        className="flex items-center gap-4 w-full"
                        key={_index}
                     >
                        <VariantInput
                           index={_index}
                           onVariantChange={(variantValue, index) => {
                              console.log(index);
                              let variantsClone = [...variants];
                              variantsClone[index] = variantValue;
                              setVariants(variantsClone);
                           }}
                        />
                        <button
                           className="w-[37.5px] h-[37.5px] flex items-center justify-center bg-red-500 rounded"
                           onClick={() => {
                              setVariants(
                                 [...variants].filter(
                                    (_, index) => index !== _index
                                 )
                              );
                           }}
                        >
                           <IoIosClose className="w-6 h-6 text-white" />
                        </button>
                     </div>
                  );
               })}
            </ul>
         )}
         <Button
            className="vz-button vz-button-primary mt-4"
            onClick={handleAddVariant}
         >
            {variants.length > 0 ? 'Add more variant' : 'Add variant'}
         </Button>
      </Card>
   );
};

export default React.memo(VariantInputs);
