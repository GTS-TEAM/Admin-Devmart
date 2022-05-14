import { Button, Col, message, Row, Tree } from 'antd';
import { fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout } from 'components';
import { ROUTES } from 'constant';
import { InputCustom, TableCustom } from 'custom';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { WithLayout } from 'shared/types';
import useSWR from 'swr';

const LIMIT = 10;

const Products: WithLayout = () => {
   const [page, setPage] = useState<number>(1);
   const [limit, setLimit] = useState<number>(LIMIT);
   const { data: products } = useSWR(
      ['/product', page, limit],
      fetcher.getAllProducts
   );
   const { data: categories } = useSWR('/category', fetcher.getAllCategories);
   const [rangeInput, setRangeInput] = useState<{
      start: string;
      end: string;
   }>({ start: '', end: '' });

   const treeData = categories
      ? categories.map((_category) => {
           return {
              title: _category.name,
              value: _category.id,
              key: _category.id,
              children: _category.children
                 ? _category.children?.map((_child) => {
                      return {
                         title: _child.name,
                         value: _child.id,
                         key: _child.id,
                      };
                   })
                 : [],
           };
        })
      : [];

   return (
      <div>
         <HeaderBreadcrumb
            title="Products"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Products' },
            ]}
         />
         <Row gutter={16}>
            <Col span={6}>
               <div className="card">
                  <div className="w-full">
                     <div className="card-header flex items-center justify-between">
                        <div className="card-title">Filters</div>
                        <span className="cursor-pointer underline text-vz-primary">
                           Clear all
                        </span>
                     </div>
                     <div className="p-4 border-b border-vz-border-color ">
                        <span className="text-muted uppercase mb-4 block">
                           PRODUCTS
                        </span>
                        <div className="list-drop-down-selected">
                           <Tree
                              treeData={treeData}
                              checkable={true}
                              onCheck={() => {}}
                              switcherIcon={<IoIosArrowDown />}
                           />
                        </div>
                     </div>
                     <div className="p-4 border-b border-vz-border-color">
                        <span className="text-muted uppercase mb-4 block">
                           PRICE
                        </span>
                        <div>
                           <div className="flex items-center space-x-4 mb-4">
                              <InputCustom
                                 placeholder="Start"
                                 type="number"
                                 onChange={(e) => {
                                    setRangeInput({
                                       ...rangeInput,
                                       start: e.target.value,
                                    });
                                 }}
                                 value={rangeInput.start}
                              />
                              <InputCustom
                                 placeholder="End"
                                 type="number"
                                 onChange={(e) => {
                                    setRangeInput({
                                       ...rangeInput,
                                       end: e.target.value,
                                    });
                                 }}
                                 value={rangeInput.end}
                              />
                           </div>
                           <Button
                              className="vz-button vz-button-primary w-full"
                              onClick={() => {
                                 if (+rangeInput.start >= +rangeInput.end) {
                                    message.error(
                                       'Please enter the appropriate price range'
                                    );
                                    return;
                                 }
                              }}
                           >
                              Apply
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </Col>
            <Col span={18}>
               <div className="card">
                  <div className="w-full">
                     <div className="flex items-center justify-between p-4">
                        <Link href={ROUTES.ADD_PRODUCT}>
                           <a>
                              <Button className="vz-button-primary vz-button flex items-center justify-center text-xs transition-all">
                                 <AiOutlinePlus className="flex-shrink-0 mr-2 w-4 h-4" />
                                 <span className="flex-shrink-0">
                                    Add products
                                 </span>
                              </Button>
                           </a>
                        </Link>
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
                     <TableCustom
                        loading={!products}
                        dataSource={products?.products}
                        rowKey="id"
                        total={products?.total}
                     />
                  </div>
               </div>
            </Col>
         </Row>
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
