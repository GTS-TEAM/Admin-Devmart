import React from 'react';
import ShapeLogin from '../../../public/images/shapeLogin.svg';

const BannerAuth = () => {
   return (
      <div
         className="absolute top-0 left-0 right-0 w-full h-[380px] bg-center bg-cover"
         style={{
            backgroundImage: `url('/public/images/auth-one-bg.jpg')`,
         }}
      >
         <div className="bg-gradient-to-r from-[#364574] to-[#405189] opacity-90 z-0 absolute inset-0 " />
         <div className="absolute right-0 -bottom-[1px] left-0 pointer-events-none ">
            <ShapeLogin className="fill-vz-body-color" />
         </div>
      </div>
   );
};

export default BannerAuth;
