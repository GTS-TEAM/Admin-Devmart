import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { MAX_WIDTH_TABLET, MIN_WIDTH_TABLET } from 'constant';
import { useBodyOverflow, useObservationSize } from 'hooks';
import React, { useCallback, useMemo, useState } from 'react';

const Layout: React.FC<{
   children?: React.ReactNode;
}> = ({ children }) => {
   const [isExpandSidebar, setIsExpandSidebar] = useState<boolean>(true);
   const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
   const { width } = useObservationSize();

   useBodyOverflow(isShowSidebar);

   const handleToggleSidebar = useCallback(() => {
      if (width && width < MIN_WIDTH_TABLET) {
         setIsShowSidebar(!isShowSidebar);
      } else {
         setIsExpandSidebar(!isExpandSidebar);
      }
   }, [width, isExpandSidebar, isShowSidebar]);

   const handleCloseSidebar = useCallback(() => {
      width && width < MIN_WIDTH_TABLET && setIsShowSidebar(false);
   }, [width]);

   const leftOrMarginLeft = useMemo(() => {
      return width && width > MAX_WIDTH_TABLET
         ? !isExpandSidebar
            ? '70px'
            : undefined
         : undefined;
   }, [isExpandSidebar, width]);

   return (
      <div className="min-h-screen flex layout">
         <div
            className="fixed top-0 right-0 left-0 lg:left-vz-sidebar transition-[left] duration-300 z-50 "
            style={{
               left: leftOrMarginLeft,
            }}
         >
            <Header
               toggleSidebar={handleToggleSidebar}
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
            onClose={handleCloseSidebar}
         />
         <main
            className="mt-vz-header ml-0 lg:ml-vz-sidebar w-full transition-[margin-left] duration-300"
            style={{
               marginLeft: leftOrMarginLeft,
            }}
         >
            <div className="p-4 h-full">{children}</div>
         </main>
      </div>
   );
};

export default Layout;
