import { ConfigProvider, Table, TableProps } from 'antd';
import React, { useRef } from 'react';

interface Props<T> extends TableProps<T> {
   total?: number;
}

export const TableCustom: React.FC<Props<any>> = ({
   className,
   pagination,
   ...props
}) => {
   const ref = useRef(null);

   React.useEffect(() => {
      import('@lottiefiles/lottie-player');
   });

   return (
      <ConfigProvider
         renderEmpty={() => {
            return (
               <div>
                  <div className="flex items-center justify-center">
                     <lottie-player
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        background="transparent"
                        speed="1"
                        style={{
                           width: '72px',
                           height: '72px',
                        }}
                        loop
                        autoplay
                        ref={ref}
                     ></lottie-player>
                  </div>
                  <h4 className="mt-4">Sorry! No Result Found</h4>
               </div>
            );
         }}
      >
         <Table
            className={`vzTableCustom ${className || ''} `}
            pagination={{
               className: `vz-pagination-table flex flex-wrap ${
                  props.dataSource?.length === 0 || !props.dataSource
                     ? 'hidden'
                     : ''
               }`,
               total: props.total,
               showTotal: (total, range) => (
                  <p className="text-[#878a99] flex-shrink-0">{`Show ${range[0]} to ${range[1]} of ${total} results `}</p>
               ),
               itemRender: (page, type, originalElement) => {
                  if (type === 'prev') {
                     return (
                        <a className="h-full disabled:text-[#878a99] text-vz-link  bg-vz-card-bg border border-vz-border-color rounded py-1 px-4 flex items-center justify-center hover:text-vz-link">
                           Previous
                        </a>
                     );
                  }
                  if (type === 'next') {
                     return (
                        <a className="h-full disabled:text-[#878a99] text-vz-link  bg-vz-card-bg border border-vz-border-color rounded py-1 px-4 flex items-center justify-center hover:text-vz-link">
                           Next
                        </a>
                     );
                  }
                  return originalElement;
               },
               ...pagination,
            }}
            {...props}
         />
      </ConfigProvider>
   );
};
