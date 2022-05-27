import InputDropdown from 'components/InputDropdown';
import { InputCustom } from 'custom';
import React from 'react';
import ModalWrap from './ModalWrap';

interface Props {
   type: 'EDIT' | 'ADD';
   onClose?: () => any;
   onOk?: () => any;
}

const ModalCustomer = (props: Props) => {
   return (
      <ModalWrap
         title={props.type === 'ADD' ? 'Add customer' : 'Edit customer'}
         handleCancel={props.onClose}
      >
         <div className="flex gap-4 flex-col">
            <InputCustom label="Customer Name" placeholder="Enter name" />
            <InputCustom label="Email" placeholder="Enter email" />
            <InputCustom label="Phone" placeholder="Enter phone" />
            <div>
               <label className="mb-2 font-medium block">Status</label>
               <InputDropdown
                  listValues={[
                     {
                        name: 'Block',
                        value: 'block',
                     },
                     {
                        name: 'Active',
                        value: 'active',
                     },
                  ]}
                  placeholder="Status"
                  defaultValue="active"
               />
            </div>
         </div>
      </ModalWrap>
   );
};

export default ModalCustomer;
