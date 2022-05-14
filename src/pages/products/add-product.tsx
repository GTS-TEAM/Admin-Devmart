import { eCommerceApis } from 'apis';
import { requireAuth } from 'components';
import { GetServerSideProps } from 'next';
import { AddProduct } from 'screens';

export default AddProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   const _categories = await (
      await eCommerceApis.getAllCategories('/category')
   ).data.data;

   const treeData = _categories.map((_category) => {
      return {
         title: _category.name,
         value: _category.id,
         key: _category.id,
         children: _category.children
            ? _category.children?.map((_child) => {
                 return {
                    title: _child.name,
                    value: _child.id,
                    key: _child.id,
                 };
              })
            : [],
      };
   });

   return {
      props: {
         categories: treeData,
      },
   };
});
