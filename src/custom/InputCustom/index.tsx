import { Input, InputProps } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import React from 'react';

interface Props extends InputProps {
   label?: string;
   classNameLabel?: string;
   styleLabel?: React.CSSProperties;
   classNameWrap?: string;
   isRequire?: boolean;
   error?: string;
   isTextArea?: boolean;
   propsTextArea?: TextAreaProps;
}

export const InputCustom = React.forwardRef<any, Props>(
   (
      {
         label,
         classNameLabel,
         styleLabel,
         classNameWrap,
         isRequire,
         error,
         className,
         ...props
      },
      ref
   ) => {
      return (
         <div className={`flex flex-col items-start ${classNameWrap || ''}`}>
            {label && (
               <label
                  className={`mb-2 font-medium  ${classNameLabel || ''}`}
                  style={styleLabel}
               >
                  {label}
                  {isRequire && <span className="text-red-600 ml-1">*</span>}
               </label>
            )}

            {props.isTextArea ? (
               <Input.TextArea
                  className={` vz-input  ${
                     props.propsTextArea?.className || ''
                  } ${className || ''} ${error ? 'isError' : ''} `}
                  //@ts-ignore
                  ref={ref}
                  {...props.propsTextArea}
               ></Input.TextArea>
            ) : (
               <Input
                  //@ts-ignore
                  className={` vz-input ${className || ''} ${
                     error ? 'isError' : ''
                  } `}
                  //@ts-ignore
                  ref={ref}
                  type={props.type}
                  {...props}
               />
            )}
            {error && <p className="text-red-600 mt-1">{error}</p>}
         </div>
      );
   }
);

InputCustom.displayName = 'InputCustom';
