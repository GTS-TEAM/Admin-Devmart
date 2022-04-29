import { Button, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { eCommerceApis, fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout, requireAuth } from 'components/common';
import ModalWrap from 'components/Modal/ModalWrap';
import { ROUTES } from 'constant';
import { InputCustom, TableCustom } from 'custom';
import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { ICategory, WithLayout } from 'shared/types';
import useSWR from 'swr';

const rowSelection = {
   onChange: (selectedRowKeys: React.Key[], selectedRows: ICategory[]) => {
      console.log(
         `selectedRowKeys: ${selectedRowKeys}`,
         'selectedRows: ',
         selectedRows
      );
   },
   getCheckboxProps: (record: ICategory) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
   }),
};

const Categories: WithLayout = () => {
   const { data, mutate } = useSWR('/category', fetcher.getAllCategories);
   const [isShowModal, setIsShowModal] = useState<boolean>(false);
   const [nameCategory, setNameCategory] = useState<string>('');
   const [desc, setDesc] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

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
         title: 'Actions',
         key: 'actions',
         dataIndex: 'actions',
         render: () => {
            return (
               <Button>
                  <BsThreeDots />
               </Button>
            );
         },
      },
   ];

   const handleCloseModal = () => {
      setIsShowModal(false);
      setNameCategory('');
      setDesc('');
   };

   const handleAddCategory = async () => {
      try {
         setLoading(true);
         const {
            data: { data: newCategory, message: msg },
         } = await eCommerceApis.addCategory({
            name: nameCategory,
            description: desc,
         });
         if (data) {
            mutate({
               message: data?.message as string,
               data: [...(data?.data as ICategory[]), newCategory],
            });
         }
         setLoading(false);
         message.success(msg);
         handleCloseModal();
      } catch (error) {
         message.error('Something went wrong');
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
                  loading={!data}
                  dataSource={data?.data as ICategory[]}
                  rowKey="id"
                  columns={columns}
                  rowSelection={{
                     type: 'checkbox',
                     ...rowSelection,
                  }}
               />
            </div>
         </div>
         <AnimatePresence>
            {isShowModal && (
               <ModalWrap
                  title="Add categories"
                  handleCancel={handleCloseModal}
                  propsButtonOk={{
                     disabled:
                        nameCategory.trim().length === 0 ||
                        desc.trim().length === 0,
                     loading: loading,
                  }}
                  handleOk={handleAddCategory}
               >
                  <div className="p-4 flex flex-col">
                     <InputCustom
                        className="mb-4"
                        placeholder="Enter name category"
                        label="Name"
                        onChange={(e) => {
                           setNameCategory(e.target.value);
                        }}
                     />
                     <InputCustom
                        label="Description"
                        isTextArea={true}
                        propsTextArea={{
                           placeholder: 'Enter description category',
                           onChange: (e) => {
                              setDesc(e.target.value);
                           },
                        }}
                        className="resize-none !min-h-[120px]"
                     />
                  </div>
               </ModalWrap>
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

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
