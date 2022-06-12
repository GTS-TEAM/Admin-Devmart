import { Auth, Card, HeaderBreadcrumb, Layout } from 'components';
import { ROUTES } from 'constant';
import React from 'react';
import { IProduct, WithLayout } from 'shared/types';

interface Props {
   product: IProduct;
}

const ProductDetail: WithLayout = ({ product }: Props) => {
   return (
      <div>
         <HeaderBreadcrumb
            title="Product Detail"
            items={[
               { name: 'Dashboard', path: ROUTES.HOME },
               { name: 'Product Detail' },
            ]}
         />
         <Card></Card>
      </div>
   );
};

ProductDetail.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default ProductDetail;
