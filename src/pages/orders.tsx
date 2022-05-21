import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Orders } from 'screens';

export default Orders;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
