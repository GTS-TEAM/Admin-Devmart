import { Auth, Layout } from 'components';
import React from 'react';
import { WithLayout } from 'shared/types';

const Order: WithLayout = () => {
   return <div>Order</div>;
};

Order.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Order;
