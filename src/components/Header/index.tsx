import { Avatar } from 'antd';
import { useTheme } from 'context/theme.context';
import { useObservationSize } from 'hooks';
import { useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
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
               {width && width > 767 ? (
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
               <div className="ml-4">
                  <Avatar>
                     {session?.user?.name?.slice(0, 1).toUpperCase()}
                  </Avatar>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
