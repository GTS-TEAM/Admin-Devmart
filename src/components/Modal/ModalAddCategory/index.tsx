import { InputCustom } from 'custom';
import React, { useState } from 'react';
import ModalWrap from '../ModalWrap';

interface Props {
   handleClose?: () => any;
   handleAdd: (name: string, desc: string) => any;
}

const ModalAddCategory: React.FC<Props> = ({ handleClose, handleAdd }) => {
   const [name, setName] = useState<string>('');
   const [desc, setDesc] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

   const handleCloseModal = () => {
      setName('');
      setDesc('');
      handleClose && handleClose();
   };

   return (
      <ModalWrap
         title="Add categories"
         handleCancel={handleCloseModal}
         propsButtonOk={{
            disabled: name.trim().length === 0 || desc.trim().length === 0,
            loading: loading,
         }}
         handleOk={async () => {
            setLoading(true);
            await handleAdd(name, desc);
            setLoading(false);
            handleCloseModal();
         }}
      >
         <div className=" flex flex-col">
            <InputCustom
               className="mb-4"
               placeholder="Enter name category"
               label="Name"
               onChange={(e) => {
                  setName(e.target.value);
               }}
            />
            <InputCustom
               label="Description"
               isTextArea={true}
               propsTextArea={{
                  placeholder: 'Enter description category',
                  onChange: (e) => {
                     setDesc(e.target.value);
                  },
               }}
               className="resize-none !min-h-[120px]"
            />
         </div>
      </ModalWrap>
   );
};

export default ModalAddCategory;
