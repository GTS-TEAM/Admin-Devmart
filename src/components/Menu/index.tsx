import React, { HTMLProps } from 'react';

interface PropsMenu extends HTMLProps<HTMLDivElement> {}

interface PropsMenuItem extends HTMLProps<HTMLDivElement> {}

interface IMenuComposition {
   MenuItem: React.FC<PropsMenuItem>;
}

const Menu: React.FC<PropsMenu> & IMenuComposition = ({
   children,
   className,
   ...props
}) => {
   return (
      <div
         className={`py-2 min-w-[10rem] text-sm text-vz-text-color-body bg-vz-dropdown-bg border border-solid border-vz-border-color rounded shadow-vz-menu ${
            className || ''
         }`}
         {...props}
      >
         {children}
      </div>
   );
};

const MenuItem: React.FC<PropsMenuItem> = ({
   children,
   className,
   ...props
}) => {
   return (
      <div
         className={` py-[0.35rem] px-[1.2rem] text-vz-dropdown-link-color bg-transparent hover:bg-vz-dropdown-link-hover-bg hover:text-vz-dropdown-link-color-hover flex items-center justify-start transition-all duration-300 cursor-pointer gap-4 ${
            className || ''
         }`}
         {...props}
      >
         {children}
      </div>
   );
};

Menu.MenuItem = MenuItem;

export default Menu;
