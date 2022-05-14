import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Categories } from 'screens';

export default Categories;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
