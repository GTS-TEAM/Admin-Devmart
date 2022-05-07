import { Auth, Layout, requireAuth } from 'components';
import type { GetServerSideProps, NextPage } from 'next';
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

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
