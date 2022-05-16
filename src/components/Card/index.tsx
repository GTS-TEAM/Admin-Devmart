import React from 'react';

interface Props {
   title?: string;
   children?: React.ReactNode;
   customHeader?: React.ReactNode;
   className?: string;
   isHaveClassBody?: boolean;
}

const Card: React.FC<Props> = ({
   title,
   children,
   customHeader,
   className,
   isHaveClassBody,
}) => {
   return (
      <div className={`${className || ''} card`}>
         <div className="w-full rounded">
            {customHeader ? (
               customHeader
            ) : (
               <div className="card-header">
                  <div className="card-title">{title}</div>
               </div>
            )}
            {isHaveClassBody ? (
               <div className="card-body">{children}</div>
            ) : (
               children
            )}
         </div>
      </div>
   );
};

export default Card;
