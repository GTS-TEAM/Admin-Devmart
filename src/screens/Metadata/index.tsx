import { Button, Popover, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { fetcher } from 'apis';
import { Auth, HeaderBreadcrumb, Layout, Menu } from 'components';
import { ROUTES } from 'constant';
import { TableCustom } from 'custom';
import React from 'react';
import { AiOutlineEdit, AiOutlinePlus, AiOutlineRest } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IMetadata, WithLayout } from 'shared/types';
import stylesTag from 'styles/components/tag.module.scss';
import useSWR from 'swr';

const Metadata: WithLayout = () => {
   const { data: metadata } = useSWR('/metadata', fetcher.getAllMetadata);

   const columns: ColumnsType<IMetadata> = [
      {
         title: '#Metadata',
         key: 'name',
         dataIndex: 'name',
      },
      {
         title: 'Values',
         key: 'values',
         dataIndex: 'values',
         render: (_, record) => {
            return (
               <ul className="flex items-center gap-2">
                  {record.values.map((_value) => {
                     return (
                        <li key={_value}>
                           <Tag className={`${stylesTag['ant-tag']} h`}>
                              {_value}
                           </Tag>
                        </li>
                     );
                  })}
               </ul>
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
            title="Metadata"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Metadata' },
            ]}
         />
         <div className="card">
            <div className="w-full">
               <div className="flex items-center justify-between p-4">
                  <Button className="vz-button-primary vz-button flex items-center justify-center text-xs transition-all">
                     <AiOutlinePlus className="flex-shrink-0 mr-2 w-4 h-4" />
                     <span className="flex-shrink-0">Add metadata</span>
                  </Button>
               </div>
               <TableCustom
                  loading={!metadata}
                  dataSource={metadata}
                  rowKey="id"
                  columns={columns}
                  pagination={false}
               />
            </div>
         </div>
      </div>
   );
};

Metadata.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Metadata;
