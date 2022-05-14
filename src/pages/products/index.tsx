import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Products } from 'screens';

export default Products;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
