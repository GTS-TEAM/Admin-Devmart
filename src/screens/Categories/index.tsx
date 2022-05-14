import { Button, message, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { eCommerceApis, fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout, ModalAddCategory } from 'components';
import { ROUTES } from 'constant';
import { InputCustom, TableCustom } from 'custom';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ICategory, IChildCategory, WithLayout } from 'shared/types';
import useSWR from 'swr';

const Categories: WithLayout = () => {
   const { data: categories, mutate } = useSWR(
      '/category',
      fetcher.getAllCategories
   );
   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const [isShowModalAddChild, setIsShowModalAddChild] =
      useState<boolean>(false);
   const [idParentCategory, setIdParentCategory] = useState<string | null>(
      null
   );

   console.log(categories);

   const columns: ColumnsType<ICategory> = [
      {
         title: 'Category',
         key: 'name',
         dataIndex: 'name',
      },
      {
         title: 'Description',
         key: 'description',
         dataIndex: 'description',
      },
      {
         title: 'Children category',
         key: 'children-category',
         dataIndex: 'children-category',
         render: (_, record) => {
            return record.children?.map((_child) => {
               return (
                  <Tag color="success" key={_child.id}>
                     {_child.name}
                  </Tag>
               );
            });
         },
      },
      {
         title: 'Action',
         key: 'action',
         dataIndex: 'action',
         render: (_, record) => {
            return (
               <Button
                  className="vz-button vz-button-primary"
                  onClick={() => {
                     setIdParentCategory(record.id);
                     setIsShowModalAddChild(true);
                  }}
               >
                  Add child category
               </Button>
            );
         },
      },
   ];

   const handleAddCategory = async (name: string, desc: string) => {
      try {
         const {
            data: { data: newCategory, message: msg },
         } = await eCommerceApis.addCategory({
            name: name,
            description: desc,
         });
         if (categories) {
            mutate([...categories, newCategory]);
         }
         message.success(msg);
      } catch (error) {
         message.error('Something went wrong');
      }
   };

   const handleAddChildCategory = async (name: string, desc: string) => {
      if (idParentCategory) {
         try {
            const {
               data: { data: newChildCategory, message: msg },
            } = await eCommerceApis.addChildCategory({
               name: name,
               description: desc,
               parent_id: idParentCategory,
            });

            if (categories) {
               mutate(
                  categories.map((category) => {
                     if (category.id === newChildCategory.parent_id) {
                        return {
                           ...category,
                           children: [
                              ...(category.children as IChildCategory[]),
                              newChildCategory,
                           ],
                        };
                     }
                     return category;
                  })
               );
            }
            message.success(msg);
         } catch (error) {
            message.error('Something went wrong');
         }
      }
   };

   return (
      <div>
         <HeaderBreadcrumb
            title="Categories"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Categories' },
            ]}
         />
         <div className="card">
            <div className="w-full">
               <div className="flex items-center justify-between p-4">
                  <Button
                     className="vz-button-primary vz-button flex items-center justify-center text-xs transition-all"
                     onClick={() => {
                        setIsShowModal(true);
                     }}
                  >
                     <AiOutlinePlus className="flex-shrink-0 mr-2 w-4 h-4" />
                     <span className="flex-shrink-0">Add category</span>
                  </Button>
                  <div className="flex items-center ">
                     <InputCustom
                        placeholder="Search category"
                        classNameWrap="mr-4"
                     />
                     <Button className="vz-button-primary vz-button">
                        Search
                     </Button>
                  </div>
               </div>
               <TableCustom
                  loading={!categories}
                  dataSource={(categories as ICategory[]) || []}
                  rowKey="id"
                  columns={columns}
                  pagination={false}
                  expandable={{
                     childrenColumnName: 'none',
                  }}
               />
            </div>
         </div>
         <AnimatePresence>
            {isShowModal && (
               <ModalAddCategory
                  handleAdd={handleAddCategory}
                  handleClose={() => {
                     setIsShowModal(false);
                  }}
               />
            )}
            {isShowModalAddChild && (
               <ModalAddCategory
                  handleAdd={handleAddChildCategory}
                  handleClose={() => {
                     setIsShowModalAddChild(false);
                     setIdParentCategory(null);
                  }}
               />
            )}
         </AnimatePresence>
      </div>
   );
};

Categories.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Categories;
