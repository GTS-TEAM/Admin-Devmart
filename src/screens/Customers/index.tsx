import { Auth, Layout } from 'components';
import React from 'react';
import { WithLayout } from 'shared/types';

const Customers: WithLayout = () => {
   return <div>Customers</div>;
};

Customers.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Customers;
