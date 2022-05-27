import { Button, ButtonProps } from 'antd';
import { TYPE_VARIANTS } from 'constant';
import { motion } from 'framer-motion';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { dropIn, FadeIn } from 'utils';

export interface PropsWrap {
   children?: React.ReactNode;
   handleOk?: () => any;
   handleCancel?: () => any;
   propsButtonOk?: ButtonProps;
   propsButtonCancel?: ButtonProps;
   title?: string;
   customHeader?: JSX.Element | React.ReactNode;
   customFooter?: JSX.Element | React.ReactNode;
   width?: string | number;
   textOk?: string;
   textCancel?: string;
}

const ModalWrap: React.FC<PropsWrap> = (props) => {
   return (
      <motion.div
         variants={FadeIn}
         initial={TYPE_VARIANTS.HIDDEN}
         animate={TYPE_VARIANTS.VISIBLE}
         exit={TYPE_VARIANTS.EXIT}
         className="fixed inset-0 min-h-screen flex items-center justify-center w-full bg-black/50 z-[1000] "
         onClick={props.handleCancel}
      >
         <motion.div
            className="card w-full relative z-[10000]"
            variants={dropIn}
            initial={TYPE_VARIANTS.HIDDEN}
            animate={TYPE_VARIANTS.VISIBLE}
            exit={TYPE_VARIANTS.EXIT}
            style={{
               maxWidth: props.width
                  ? typeof props.width === 'string'
                     ? props.width
                     : `${props.width}px`
                  : '500px',
            }}
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <div className="w-full">
               <div className="p-4 w-full ">
                  <div className="flex items-center justify-between">
                     <h5 className="font-semibold">{props.title}</h5>
                     <button
                        className="w-8 h-8 flex items-center justify-center opacity-50"
                        onClick={props.handleCancel}
                     >
                        <IoCloseOutline className=" w-6 h-6 text-vz-text-color-body border-vz-border-color" />
                     </button>
                  </div>
               </div>
               <div className="p-4">{props.children}</div>
               <div className="p-4">
                  <div className="flex items-center justify-end">
                     <Button
                        {...props.propsButtonCancel}
                        className="vz-button vz-button-light mr-4"
                        onClick={props.handleCancel}
                     >
                        {props.textCancel || 'Cancel'}
                     </Button>
                     <Button
                        {...props.propsButtonOk}
                        className="vz-button-second vz-button"
                        onClick={props.handleOk}
                     >
                        {props.textOk || 'Ok'}
                     </Button>
                  </div>
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default ModalWrap;
