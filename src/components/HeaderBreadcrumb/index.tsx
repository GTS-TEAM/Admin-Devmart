import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

interface Props {
   title: string;
   items: {
      name: string;
      path?: string;
   }[];
}

const HeaderBreadcrumb: React.FC<Props> = ({ title, items }) => {
   return (
      <div className="flex items-center justify-between px-4 py-3 bg-vz-card-bg mb-4 rounded">
         <h4 className="font-bold text-base leading-[1.2]">{title}</h4>
         <Breadcrumb>
            {items.map((item) => {
               return (
                  <Breadcrumb.Item
                     key={item.name}
                     className="text-vz-text-color-body"
                  >
                     {item.path ? (
                        <Link href={item.path}>
                           <a className="!text-vz-text-color-body">
                              {item.name}
                           </a>
                        </Link>
                     ) : (
                        <p>{item.name}</p>
                     )}
                  </Breadcrumb.Item>
               );
            })}
         </Breadcrumb>
      </div>
   );
};

export default HeaderBreadcrumb;
