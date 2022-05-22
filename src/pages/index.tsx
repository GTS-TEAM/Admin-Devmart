import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Home } from 'screens';

export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
