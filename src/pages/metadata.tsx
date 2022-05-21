import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { Metadata } from 'screens';

export default Metadata;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   return {
      props: {},
   };
});
