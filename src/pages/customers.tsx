import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Customers } from 'screens';

export default Customers;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
