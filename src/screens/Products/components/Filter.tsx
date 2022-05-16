import { Button, message, Radio, Tree } from 'antd';
import { fetcher } from 'apis';
import { ROUTES } from 'constant';
import { InputCustom } from 'custom';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { IFilterProduct } from 'shared/types';
import useSWR from 'swr';

const Filter = () => {
   const { data: categories } = useSWR('/category', fetcher.getAllCategories);
   const [rangeInput, setRangeInput] = useState<{
      start: string;
      end: string;
   }>({ start: '', end: '' });
   const [rating, setRating] = useState<number | undefined>(undefined);
   const router = useRouter();

   useEffect(() => {
      const filter: IFilterProduct = {
         min_rating: rating,
      };
      router.push({
         pathname: ROUTES.PRODUCTS,
         query: { ...filter },
      });
   }, [router, rating]);

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

   return (
      <div className="card">
         <div className="w-full">
            <div className="card-header flex items-center justify-between">
               <div className="card-title">Filters</div>
               <span className="cursor-pointer underline text-vz-primary">
                  Clear all
               </span>
            </div>
            <div className="p-4 border-b border-vz-border-color ">
               <span className="text-muted uppercase mb-4 block">PRODUCTS</span>
               <div className="list-drop-down-selected">
                  <Tree
                     treeData={treeData}
                     checkable={true}
                     onCheck={(checked, info) => {
                        console.log({ checked, info });
                     }}
                     switcherIcon={<IoIosArrowDown />}
                     onSelect={(selectKey, info) => {
                        console.log({ selectKey, info });
                     }}
                  />
               </div>
            </div>
            <div className="p-4 border-b border-vz-border-color">
               <span className="text-muted uppercase mb-4 block">RATING</span>
               <div>
                  <Radio.Group
                     value={rating}
                     onChange={(e) => {
                        setRating(e.target.value);
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
               <span className="text-muted uppercase mb-4 block">PRICE</span>
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
                     Apply Price
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Filter;
