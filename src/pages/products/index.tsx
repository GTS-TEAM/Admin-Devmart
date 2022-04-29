import { Button } from 'antd';
import { fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout, requireAuth } from 'components/common';
import { ROUTES } from 'constant';
import { InputCustom } from 'custom';
import { GetServerSideProps } from 'next';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { WithLayout } from 'shared/types';
import useSWR from 'swr';

const Products: WithLayout = () => {
   const { data } = useSWR('/product', fetcher.getAllProducts);

   console.log(data);

   return (
      <div>
         <HeaderBreadcrumb
            title="Products"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Products' },
            ]}
         />
         <div className="card">
            <div className="w-full">
               <div className="flex items-center justify-between p-4">
                  <Button className="vz-button-primary vz-button flex items-center justify-center text-xs transition-all">
                     <AiOutlinePlus className="flex-shrink-0 mr-2 w-4 h-4" />
                     <span className="flex-shrink-0">Add products</span>
                  </Button>
                  <div className="flex items-center ">
                     <InputCustom
                        placeholder="Search products"
                        classNameWrap="mr-4"
                        className="text-xs"
                     />
                     <Button className="vz-button-primary vz-button text-xs">
                        Search
                     </Button>
                  </div>
               </div>
               {/* <TableCustom
                  loading={!data}
                  dataSource={data?.data as ICategory[]}
                  rowKey="id"
               /> */}
            </div>
         </div>
      </div>
   );
};

Products.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Products;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
