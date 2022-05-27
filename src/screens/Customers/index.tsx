import { Button, Popover, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { eCommerceApis, fetcher } from 'apis';
import {
   Auth,
   HeaderBreadcrumb,
   Layout,
   Menu,
   ModalCustomer,
} from 'components';
import { MONTHS, ROUTES } from 'constant';
import { TableCustom } from 'custom';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineRest } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { VscTrash } from 'react-icons/vsc';
import { IStatusUser, IUser, WithLayout } from 'shared/types';
import useSWR from 'swr';

const Customers: WithLayout = () => {
   const { data: customers } = useSWR(['/customer'], fetcher.getAllCustomers);
   const [isShowMenuActions, setIsShowMenuActions] = useState<{
      id: string;
      show: boolean;
   }>({
      id: '',
      show: false,
   });
   const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

   const handelChangeStatus = async (status: string, id: string) => {
      if (status === IStatusUser.ACTIVE) {
         await eCommerceApis.changeStatusCustomer(IStatusUser.BLOCK, id);
      } else {
         await eCommerceApis.changeStatusCustomer(IStatusUser.ACTIVE, id);
      }
   };

   const columns: ColumnsType<IUser> = [
      {
         title: '#User',
         key: 'name',
         dataIndex: 'name',
      },
      {
         title: 'Email',
         key: 'email',
         dataIndex: 'email',
      },
      {
         title: 'Phone',
         key: 'phone',
         dataIndex: 'phone',
         render: (_, record) => {
            return (
               <p>{record.phone.length === 0 ? 'Unknown' : record.phone}</p>
            );
         },
      },
      {
         title: 'Join date',
         key: 'created_at',
         dataIndex: 'created_at',
         render: (_, record) => {
            const date = new Date(record.created_at);
            return (
               <p>
                  {`${
                     date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
                  } ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`}
               </p>
            );
         },
      },
      {
         title: 'Status',
         key: 'status',
         dataIndex: 'status',
         render: (_, record) => {
            return (
               <Tag
                  className="uppercase"
                  color={
                     record.status === 'active'
                        ? 'rgba(10,179,156,.1)'
                        : 'rgba(240,101,72,.1)'
                  }
               >
                  <span
                     style={{
                        color:
                           record.status === 'active' ? '#0ab39c' : '#f06548',
                     }}
                  >
                     {record.status}
                  </span>
               </Tag>
            );
         },
      },
      {
         title: 'Action',
         key: 'action',
         dataIndex: 'action',

         render: (_, record) => {
            return (
               <Popover
                  trigger="click"
                  visible={
                     isShowMenuActions.show &&
                     record.id === isShowMenuActions.id
                  }
                  onVisibleChange={(visible) => {
                     setIsShowMenuActions({
                        id: record.id,
                        show: visible,
                     });
                  }}
                  content={
                     <div>
                        <Menu>
                           <Menu.MenuItem
                              onClick={() => {
                                 handelChangeStatus(record.status, record.id);
                              }}
                           >
                              <AiOutlineEdit className="w-4 h-4" />
                              <span className="text-vz-text-color-body">
                                 Change status
                              </span>
                           </Menu.MenuItem>
                           <Menu.MenuItem>
                              <AiOutlineEdit className="w-4 h-4" />
                              <span className="text-vz-text-color-body">
                                 Edit
                              </span>
                           </Menu.MenuItem>
                           <Menu.MenuItem>
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

   return (
      <div>
         <HeaderBreadcrumb
            title="Customers"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Customers' },
            ]}
         />
         <div className="card">
            <div className="w-full">
               <div className="flex items-center justify-between p-4">
                  <h4 className="font-bold text-base leading-[1.2]">
                     Customer List
                  </h4>
                  <div className="flex items-center gap-4">
                     <button className="vz-button w-[37.5px] !p-0 bg-[rgba(240,101,72,.1)] text-[#f06448] hover:bg-[#f06448] hover:text-white">
                        <VscTrash className="w-4 h-4 flex-shrink-0" />
                     </button>
                     <Button
                        className="vz-button vz-button-primary"
                        onClick={() => {
                           setShowModalAdd(true);
                        }}
                     >
                        Add customer
                     </Button>
                  </div>
               </div>
               <TableCustom
                  rowKey="id"
                  pagination={false}
                  dataSource={customers}
                  loading={!customers}
                  columns={columns}
                  rowSelection={{
                     type: 'checkbox',
                     onChange: (selectedRowKeys) => {},
                  }}
               />
            </div>
         </div>
         <AnimatePresence>
            {showModalAdd && (
               <ModalCustomer
                  type="ADD"
                  onClose={() => {
                     setShowModalAdd(false);
                  }}
               />
            )}
         </AnimatePresence>
      </div>
   );
};

Customers.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Customers;
