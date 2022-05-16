import { Auth, Layout } from 'components';
import React from 'react';
import { WithLayout } from 'shared/types';

const Metadata: WithLayout = () => {
   return <div>Metadata</div>;
};

Metadata.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default Metadata;
