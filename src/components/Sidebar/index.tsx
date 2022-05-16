import { SIDEBAR } from 'constant';
import { useObservationSize } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
   isResize?: boolean;
   isShowSidebar?: boolean;
   onClose?: () => any;
}

const Sidebar: React.FC<Props> = ({ isResize, isShowSidebar, onClose }) => {
   const router = useRouter();
   const { width } = useObservationSize();

   return (
      <aside
         className="h-screen bg-vz-bg-sidebar fixed top-0 left-[-100%] lg:left-0 bottom-0 w-vz-sidebar lg:transition-[width] !duration-300 transition-[left] z-[110]"
         style={{
            width:
               width && width > 1023
                  ? isResize
                     ? '70px'
                     : undefined
                  : undefined,
            left:
               width && width < 1024
                  ? isShowSidebar
                     ? '0'
                     : '-100%'
                  : undefined,
         }}
      >
         <div className="h-vz-header flex items-center justify-center">
            <h1 className="font-black text-3xl text-white ">
               {width && width > 767 && (isResize ? 'O' : 'Logo')}
               {width && width < 767 && 'Logo'}
            </h1>
         </div>
         <div>
            <ul>
               {SIDEBAR.map((item) => {
                  return (
                     <li key={item.name}>
                        <Link href={item.path}>
                           <a
                              className={` block hover:text-vz-vertical-menu-item-active-color-dark ${
                                 router.pathname === item.path
                                    ? 'text-vz-vertical-menu-item-active-color-dark'
                                    : 'text-vz-vertical-menu-item-color-dark'
                              }`}
                              onClick={onClose}
                           >
                              <div className="flex items-center py-[0.625rem] px-6 ">
                                 <item.icon className="mr-3 w-[22px] h-[22px] flex-shrink-0 duration-200" />
                                 <span
                                    className={` duration-200 transition-[opacity] ${
                                       width &&
                                       width > 767 &&
                                       (isResize
                                          ? 'opacity-0 invisible'
                                          : 'opacity-100 visible')
                                    } ''`}
                                 >
                                    {item.name}
                                 </span>
                              </div>
                           </a>
                        </Link>
                     </li>
                  );
               })}
            </ul>
         </div>
      </aside>
   );
};

export default Sidebar;
