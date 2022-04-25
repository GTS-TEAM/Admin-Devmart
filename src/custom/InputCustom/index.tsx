import { Input, InputProps } from 'antd';
import React from 'react';

interface Props extends InputProps {
   label?: string;
   classNameLabel?: string;
   styleLabel?: React.CSSProperties;
   classNameWrap?: string;
   isRequire?: boolean;
   error?: string;
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
            <Input
               //@ts-ignore
               {...props}
               className={`rounded focus:border-vz-input-focus-border  focus:shadow-vz-input-shadow hover:border-vz-input-focus-border px-4 py-2 placeholder:font-medium vz-input  ${
                  props.className || ''
               } ${error ? 'isError' : ''}`}
               //@ts-ignore
               ref={ref}
            />
            {error && <p className="text-red-600 mt-1">{error}</p>}
         </div>
      );
   }
);

InputCustom.displayName = 'InputCustom';
