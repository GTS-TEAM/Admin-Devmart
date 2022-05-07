import React from 'react';

interface Props {
   title?: string;
   children?: React.ReactNode;
   customHeader?: React.ReactNode;
}

const Card: React.FC<Props> = ({ title, children, customHeader }) => {
   return (
      <div className="card">
         <div className="w-full rounded">
            {customHeader ? (
               customHeader
            ) : (
               <div className="card-header">
                  <div className="card-title">{title}</div>
               </div>
            )}
            <div className="card-body">{children}</div>
         </div>
      </div>
   );
};

export default Card;
