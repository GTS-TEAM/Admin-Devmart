import { message } from 'antd';
import { eCommerceApis } from 'apis';
import InputTag from 'components/InputTag';
import { InputCustom } from 'custom';
import React, { useCallback, useState } from 'react';
import { IMetadata, ITagInput } from 'shared/types';
import { useSWRConfig } from 'swr';
import ModalWrap from './ModalWrap';

interface Props {
   type: 'edit' | 'add';
   initDataEdit?: {
      name: string;
      values: Array<ITagInput>;
      id: string;
   } | null;
   onCancel?: () => any;
   onOk?: () => any;
}

const ModalMetadata: React.FC<Props> = ({
   type,
   initDataEdit,
   onCancel,
   onOk,
}) => {
   const [name, setName] = useState<string>(initDataEdit?.name || '');
   const [values, setValues] = useState<Array<ITagInput>>(
      initDataEdit?.values || []
   );
   const { mutate } = useSWRConfig();
   const [loading, setLoading] = useState<boolean>(false);

   const handleCancel = useCallback(() => {
      setName('');
      setValues([]);
      onCancel && onCancel();
   }, [onCancel]);

   const handleAddMetadata = useCallback(async () => {
      if (name.trim().length === 0 || values.length === 0) {
         message.error('You must enter name and tags');
         return;
      }

      await mutate('/metadata', async (metadatas: IMetadata[]) => {
         try {
            setLoading(true);
            const {
               data: { data: newMetadata },
            } = await eCommerceApis.createMetadata({
               name,
               values: values.map((_value) => _value.value),
            });
            message.success('Add new metadata successfully');
            setLoading(false);
            return [...metadatas, newMetadata];
         } catch (error) {
            console.log(error);
            setLoading(false);
            return metadatas;
         }
      });

      handleCancel();
   }, [handleCancel, name, values, mutate]);

   const handleEditMetadata = useCallback(async () => {
      if (name.trim().length === 0 || values.length === 0) {
         message.error('You must enter name and tags');
         return;
      }
      await mutate('/metadata', async (metadatas: IMetadata[]) => {
         try {
            setLoading(true);
            const {
               data: { data: newUpdateMetadata },
            } = await eCommerceApis.updateMetadata(initDataEdit?.id as string, {
               name,
               values: values.map((_value) => _value.value),
            });
            message.success('Add new metadata successfully');
            const _metadatas = metadatas.map((_m) => {
               if (_m.id === newUpdateMetadata.id) {
                  return {
                     ..._m,
                     ...newUpdateMetadata,
                  };
               }
               return _m;
            });
            setLoading(false);
            return _metadatas;
         } catch (error) {
            console.log(error);
            setLoading(false);
            return metadatas;
         }
      });
      handleCancel();
   }, [handleCancel, name, values, initDataEdit?.id, mutate]);

   return (
      <ModalWrap
         handleCancel={handleCancel}
         handleOk={type === 'add' ? handleAddMetadata : handleEditMetadata}
         title={type === 'add' ? 'Add metadata' : 'Edit metadata'}
         propsButtonOk={{
            loading,
         }}
      >
         <div className="flex flex-col space-y-4">
            <InputCustom
               isRequire
               placeholder="Enter name"
               onChange={(e) => {
                  setName(e.target.value);
               }}
               value={name}
            />
            <InputTag
               values={initDataEdit?.values || []}
               onTagChange={(tags) => {
                  setValues(tags);
               }}
            />
         </div>
      </ModalWrap>
   );
};

export default ModalMetadata;
