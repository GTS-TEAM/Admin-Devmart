import Spiner from 'components/Spiner';
import React from 'react';

const Loading = () => {
   return (
      <div className="fixed inset-0 w-full h-screen flex items-center justify-center  bg-black">
         <Spiner fill="var(--vz-body-color)" />
      </div>
   );
};

export default Loading;
