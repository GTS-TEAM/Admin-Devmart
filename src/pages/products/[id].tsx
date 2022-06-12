import { eCommerceApis } from 'apis';
import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { ProductDetail } from 'screens';

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = requireAuth(
   async (ctx) => {
      const { id } = ctx.params;

      const { data } = await eCommerceApis.getProductDetail(`/product/${id}`);

      return {
         props: {
            product: data.data === undefined ? null : data.data,
         },
      };
   }
);
