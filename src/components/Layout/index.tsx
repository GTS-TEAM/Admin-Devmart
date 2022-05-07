import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useBodyOverflow, useObservationSize } from 'hooks';
import React, { useState } from 'react';

const Layout: React.FC<{
   children?: React.ReactNode;
}> = ({ children }) => {
   const [isExpandSidebar, setIsExpandSidebar] = useState<boolean>(true);
   const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
   const { width } = useObservationSize();

   useBodyOverflow(isShowSidebar);

   return (
      <div className="min-h-screen flex layout">
         <div
            className="fixed top-0 right-0 left-0 md:left-vz-sidebar transition-[left] duration-300 z-50 "
            style={{
               left:
                  width && width > 767
                     ? !isExpandSidebar
                        ? '70px'
                        : undefined
                     : undefined,
            }}
         >
            <Header
               toggleSidebar={() => {
                  if (width && width < 768) {
                     setIsShowSidebar(!isShowSidebar);
                  } else {
                     setIsExpandSidebar(!isExpandSidebar);
                  }
               }}
               isResize={!isExpandSidebar}
               isShowSidebar={isShowSidebar}
            />
         </div>
         <div
            className="bg-[rgba(33,37,41,.35)] fixed h-screen w-full inset-0 z-[100]"
            style={{
               display: isShowSidebar ? 'block' : 'none',
            }}
            onClick={() => {
               setIsShowSidebar(false);
            }}
         ></div>
         <Sidebar
            isResize={!isExpandSidebar}
            isShowSidebar={isShowSidebar}
            onClose={() => {
               width && width < 768 && setIsShowSidebar(false);
            }}
         />
         <main
            className="mt-vz-header ml-0 md:ml-vz-sidebar w-full transition-[margin-left] duration-300"
            style={{
               marginLeft:
                  width && width > 767
                     ? !isExpandSidebar
                        ? '70px'
                        : undefined
                     : undefined,
            }}
         >
            <div className="p-4 h-full">{children}</div>
         </main>
      </div>
   );
};

export default Layout;
