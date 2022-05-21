import { Button, Col, message, Popover, Radio, Row, Tree } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { eCommerceApis, fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout, Menu } from 'components';
import { ROUTES } from 'constant';
import { InputCustom, TableCustom } from 'custom';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
   AiFillStar,
   AiOutlineEdit,
   AiOutlineEye,
   AiOutlinePlus,
   AiOutlineRest,
} from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { IProduct, WithLayout } from 'shared/types';
import useSWR from 'swr';

const LIMIT = 10;
let fallbackPage = 1;
let fallbackMinPrice: number | undefined = undefined;
let fallbackMaxPrice: number | undefined = undefined;
let fallbackCategoriesId: Array<string> = [];
let minRating: undefined | number;

const Products: WithLayout = () => {
   const router = useRouter();
   const [page, setPage] = useState<number>(fallbackPage || 1);
   const { data: categories } = useSWR('/category', fetcher.getAllCategories);
   const [rangeInput, setRangeInput] = useState<{
      start: string;
      end: string;
   }>({ start: '', end: '' });
   const [filterPrice, setFilterPrice] = useState<{
      min_price?: number;
      max_price?: number;
   }>({
      max_price: fallbackMinPrice,
      min_price: fallbackMaxPrice,
   });
   const [rating, setRating] = useState<number | undefined>(minRating);
   const [category_id, setCategory_id] =
      useState<Array<string>>(fallbackCategoriesId);
   const { data: products, mutate } = useSWR(
      ['/product', { ...router.query }],
      fetcher.getAllProducts
   );
   const [idsToRemove, setIdsToRemove] = useState<Array<string>>([]);

   const handleClearAll = useCallback(() => {
      setCategory_id([]);
      setFilterPrice({
         max_price: undefined,
         min_price: undefined,
      });
      setRangeInput({
         end: '',
         start: '',
      });
      setRating(undefined);
   }, []);

   const handleFilterPrice = useCallback(() => {
      if (filterPrice.min_price && filterPrice.max_price) {
         setFilterPrice({
            max_price: undefined,
            min_price: undefined,
         });
         fallbackMinPrice = undefined;
         fallbackMaxPrice = undefined;
         setRangeInput({
            end: '',
            start: '',
         });
      } else {
         if (+rangeInput.start >= +rangeInput.end) {
            message.error('Please enter the appropriate price range');
            return;
         }
         fallbackMinPrice = +rangeInput.start;
         fallbackMaxPrice = +rangeInput.end;
         setFilterPrice({
            max_price: +rangeInput.end,
            min_price: +rangeInput.start,
         });
      }
   }, [filterPrice, rangeInput]);

   const treeData = useMemo(() => {
      return categories
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
   }, [categories]);

   const handleRemoveProducts = useCallback(
      async (ids: Array<string>) => {
         try {
            const {
               data: { message: msg },
            } = await eCommerceApis.removeProduct(ids);
            if (products) {
               mutate({
                  ...products, // get prev data
                  products: [...products.products].filter((_product) => {
                     if (ids.includes(_product.id)) {
                        // check id have in ids choose to delete
                        return false;
                     }
                     return true;
                  }),
               });
            }
            message.success(msg);
            setIdsToRemove([]);

            if (
               ids.length === LIMIT ||
               ids.length === products?.products.length
            ) {
               setPage(1);
            }
         } catch (error) {
            console.log(error);
            message.success('Something went wrong');
         }
      },
      [mutate, products]
   );

   const columns: ColumnsType<IProduct> = [
      {
         title: '#Product',
         key: 'name',
         dataIndex: 'name',
         render: (_, record) => {
            return (
               <div className="flex items-center text-xs">
                  <div className="mr-4 ">
                     <Image
                        src={record.images?.[0]}
                        alt={record.name}
                        width={40}
                        height={40}
                        placeholder="blur"
                        blurDataURL={record.images?.[0]}
                        className="rounded "
                     />
                  </div>
                  <div className="space-y-1">
                     <Link
                        href={{
                           pathname: ROUTES.PRODUCT_DETAIL,
                           query: { id: record.id },
                        }}
                     >
                        <a>
                           <h5 className="text-sm font-medium line-clamp-2 max-w-lg">
                              {record.name}
                           </h5>
                        </a>
                     </Link>
                     <div className="flex items-center space-x-1">
                        <span> Category: </span>{' '}
                        <h6 className="font-medium">{record.category}</h6>
                     </div>
                  </div>
               </div>
            );
         },
         width: '512px',
      },
      {
         title: 'Stock',
         key: 'stock',
         dataIndex: 'stock',
      },
      {
         title: 'Price',
         key: 'price',
         dataIndex: 'price',
         render: (_, record) => {
            return <span>${record.price}</span>;
         },
      },
      {
         title: 'Rating',
         key: 'rating',
         dataIndex: 'rating',
         render: (_, record) => {
            return (
               <div className="flex items-center space-x-1 bg-vz-light p-1 rounded w-14 justify-center">
                  <AiFillStar className="text-[#f7b84b]" />
                  <span>{Math.round(record.rating * 10) / 10}</span>
               </div>
            );
         },
      },
      {
         title: 'Actions',
         key: 'actions',
         dataIndex: 'actions',
         render: (_, record) => {
            return (
               <Popover
                  content={
                     <div>
                        <Menu>
                           <Menu.MenuItem
                              onClick={() => {
                                 router.push(`${ROUTES.PRODUCTS}/${record.id}`);
                              }}
                           >
                              <AiOutlineEye className="w-4 h-4" />
                              <span className="text-vz-text-color-body">
                                 View
                              </span>
                           </Menu.MenuItem>
                           <Menu.MenuItem>
                              <AiOutlineEdit className="w-4 h-4" />
                              <span className="text-vz-text-color-body">
                                 Edit
                              </span>
                           </Menu.MenuItem>
                           <Menu.MenuItem
                              onClick={() => {
                                 handleRemoveProducts([record.id]);
                              }}
                           >
                              <AiOutlineRest className="w-4 h-4" />
                              <span className="text-vz-text-color-body">
                                 Remove
                              </span>
                           </Menu.MenuItem>
                        </Menu>
                     </div>
                  }
                  placement="bottom"
                  overlayClassName="vz-popover"
               >
                  <button className="text-[#3577f1] bg-[rgba(53,119,241,.1)] w-8 h-8 flex items-center justify-center rounded hover:bg-[#3577f1] hover:text-white transition-all ">
                     <BiDotsHorizontalRounded />
                  </button>
               </Popover>
            );
         },
      },
   ];

   useEffect(() => {
      router.push({
         pathname: ROUTES.PRODUCTS,
         query: {
            min_rating: rating ? rating : [],
            category_id,
            page,
            limit: LIMIT,
            min_price: filterPrice.min_price ? filterPrice.min_price : [],
            max_price: filterPrice.max_price ? filterPrice.max_price : [],
         },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [rating, category_id, page, filterPrice]);

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
                        <span
                           className="cursor-pointer underline text-vz-primary"
                           onClick={handleClearAll}
                        >
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
                              onCheck={(checked, info) => {
                                 setCategory_id(checked as Array<string>);
                                 fallbackCategoriesId =
                                    checked as Array<string>;
                              }}
                              switcherIcon={<IoIosArrowDown />}
                              onSelect={(selectKey, info) => {
                                 console.log({ selectKey, info });
                              }}
                           />
                        </div>
                     </div>
                     <div className="p-4 border-b border-vz-border-color">
                        <span className="text-muted uppercase mb-4 block">
                           RATING
                        </span>
                        <div>
                           <Radio.Group
                              value={rating}
                              onChange={(e) => {
                                 setRating(e.target.value);
                                 minRating = e.target.value;
                              }}
                           >
                              <Radio className="vz-radio" value={4}>
                                 <div className="flex items-center space-x-1">
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <span>4 & Above</span>
                                 </div>
                              </Radio>
                              <Radio className="vz-radio" value={3}>
                                 <div className="flex items-center space-x-1">
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <span>3 & Above</span>
                                 </div>
                              </Radio>
                              <Radio className="vz-radio" value={2}>
                                 <div className="flex items-center space-x-1">
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <span>2 & Above</span>
                                 </div>
                              </Radio>
                              <Radio className="vz-radio" value={1}>
                                 <div className="flex items-center space-x-1">
                                    <AiFillStar className="text-[#f7b84b]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <span>1 & Above</span>
                                 </div>
                              </Radio>
                              <Radio className="vz-radio" value={0}>
                                 <div className="flex items-center space-x-1">
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <AiFillStar className="text-[#878A99]" />
                                    <span>0 & Above</span>
                                 </div>
                              </Radio>
                           </Radio.Group>
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
                              onClick={handleFilterPrice}
                           >
                              {filterPrice.min_price && filterPrice.max_price
                                 ? 'Clear price'
                                 : 'Apply price'}
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
                     {idsToRemove.length > 0 && (
                        <div className="p-4">
                           <div className="flex items-center justify-end gap-4">
                              <p>
                                 Selected <strong>{idsToRemove.length}</strong>{' '}
                                 results
                              </p>
                              <button
                                 className="text-red-500 hover:underline"
                                 onClick={() => {
                                    handleRemoveProducts(idsToRemove);
                                 }}
                              >
                                 Remove
                              </button>
                           </div>
                        </div>
                     )}
                     <TableCustom
                        loading={!products}
                        dataSource={products?.products}
                        rowKey="id"
                        total={products?.total}
                        columns={columns}
                        className="text-xs"
                        pagination={{
                           onChange: (page, pageSize) => {
                              console.log(pageSize);
                              setPage(page);
                              fallbackPage = page;
                           },
                           defaultCurrent: page,
                        }}
                        scroll={{
                           scrollToFirstRowOnChange: true,
                        }}
                        rowSelection={{
                           type: 'checkbox',
                           onChange: (selectedRowKeys) => {
                              setIdsToRemove(selectedRowKeys as Array<string>);
                           },
                        }}
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
