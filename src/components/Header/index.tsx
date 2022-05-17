import { Avatar, Popover } from 'antd';
import Menu from 'components/Menu';
import { MAX_WIDTH_TABLET } from 'constant';
import { useTheme } from 'context/theme.context';
import { useObservationSize } from 'hooks';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import {
   AiOutlineLogout,
   AiOutlineMenu,
   AiOutlineSetting,
   AiOutlineUser,
} from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface Props {
   toggleSidebar?: () => any;
   isResize?: boolean;
   isShowSidebar?: boolean;
}

const Header: React.FC<Props> = ({
   toggleSidebar,
   isResize,
   isShowSidebar,
}) => {
   const { data: session } = useSession();
   const theme = useTheme();
   const { width } = useObservationSize();

   return (
      <header className="bg-vz-header-bg flex items-center h-vz-header">
         <div className=" px-4 w-full flex items-center justify-between">
            <button onClick={toggleSidebar}>
               {width && width > MAX_WIDTH_TABLET ? (
                  isResize ? (
                     <MdOutlineKeyboardArrowRight className="w-6 h-6" />
                  ) : (
                     <AiOutlineMenu className="w-6 h-6" />
                  )
               ) : isShowSidebar ? (
                  <MdOutlineKeyboardArrowRight className="w-6 h-6" />
               ) : (
                  <AiOutlineMenu className="w-6 h-6" />
               )}
            </button>
            <div className="flex items-center">
               <button
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[rgba(53,119,241,.1)] hover:text-vz-blue transition-all"
                  onClick={() => {
                     theme?.toggleChangeTheme && theme.toggleChangeTheme();
                  }}
               >
                  {theme?.darkMode ? (
                     <BiMoon className="w-6 h-6" />
                  ) : (
                     <BiSun className="w-6 h-6" />
                  )}
               </button>
               <div className="ml-4 ">
                  <Popover
                     trigger="click"
                     content={
                        <Menu>
                           <div className="pb-2">
                              <Menu.MenuItem>
                                 <AiOutlineUser className="w-4 h-4" />
                                 <span>Profile</span>
                              </Menu.MenuItem>
                              <Menu.MenuItem>
                                 <AiOutlineSetting className="w-4 h-4" />
                                 <span>Setting</span>
                              </Menu.MenuItem>
                           </div>
                           <div className="pt-2 border-t border-vz-border-color">
                              <Menu.MenuItem
                                 onClick={() => {
                                    signOut();
                                 }}
                              >
                                 <AiOutlineLogout className="w-4 h-4" />
                                 <span>Logout</span>
                              </Menu.MenuItem>
                           </div>
                        </Menu>
                     }
                     placement="bottomRight"
                     overlayClassName="vz-popover z-[200]"
                  >
                     <Avatar
                        alt={session?.user?.name as string}
                        className="cursor-pointer"
                     >
                        {session?.user?.name?.charAt(0)}
                     </Avatar>
                  </Popover>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
