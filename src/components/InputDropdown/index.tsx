import Menu from 'components/Menu';
import { TYPE_VARIANTS } from 'constant';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { moveUpDropdown } from 'utils';

interface Props {
   listValues: {
      name: string;
      value: string;
   }[];
   defaultValue?: string;
   onValueChange?: (value: string) => any;
}

export const InputDropdown: React.FC<Props> = ({
   listValues,
   defaultValue,
   onValueChange,
}) => {
   const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
   const [value, setValue] = useState<string>(defaultValue || '');
   const listValueRef = useRef<HTMLDivElement | null>(null);

   useOnClickOutside(listValueRef, () => {
      setIsShowDropdown(false);
   });

   useEffect(() => {
      onValueChange && onValueChange(value);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value]);

   return (
      <div className="relative w-full">
         <div
            className="min-h-[37.5px] bg-vz-input-bg border border-vz-input-border rounded text-[.8125rem] flex items-center justify-center px-4 cursor-pointer"
            onClick={() => setIsShowDropdown(true)}
         >
            <div className="flex items-center h-full w-full justify-between">
               <span>{value.trim().length > 0 ? value : 'Choose variant'}</span>
               <MdOutlineKeyboardArrowDown
                  className="w-4 h-4"
                  style={{
                     transform: isShowDropdown
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                  }}
               />
            </div>
         </div>
         <AnimatePresence>
            {isShowDropdown && (
               <motion.div
                  className="absolute z-40 mt-2 w-full "
                  variants={moveUpDropdown}
                  ref={listValueRef}
                  initial={TYPE_VARIANTS.HIDDEN}
                  animate={TYPE_VARIANTS.VISIBLE}
                  exit={TYPE_VARIANTS.EXIT}
               >
                  <Menu>
                     {listValues?.map((_value) => {
                        return (
                           <Menu.MenuItem
                              key={_value.name}
                              data-value={value}
                              onClick={() => {
                                 setValue(_value.value);
                                 setIsShowDropdown(false);
                              }}
                              style={{
                                 backgroundColor:
                                    _value.value === value
                                       ? ' var(--vz-dropdown-link-hover-bg)'
                                       : undefined,
                              }}
                           >
                              {_value.name}
                           </Menu.MenuItem>
                        );
                     })}
                  </Menu>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
