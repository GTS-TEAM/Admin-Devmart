import { Auth, Layout } from 'components';
import { NextPage } from 'next';
import React from 'react';
import { WithLayout } from 'shared/types';

const Home: NextPage & WithLayout = () => {
   return <div>hi</div>;
};

export default Home;

Home.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};
