import { requireAuth } from 'components';
import type { GetServerSideProps } from 'next';
import { Home } from 'screens';

export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
