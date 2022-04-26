import { Layout } from 'components/common';
import instance from 'lib/axiosClient';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { WithLayout } from 'shared/types';

const Home: NextPage & WithLayout = () => {
   const { data: session } = useSession();

   useEffect(() => {
      instance.get('user').then((value) => {
         console.log(value);
      });
   }, []);

   return <div>hi</div>;
};

export default Home;

Home.getLayout = (page) => {
   return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
//    return {
//       props: {},
//    };
// });
