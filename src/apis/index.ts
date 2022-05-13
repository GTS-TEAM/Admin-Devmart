import axiosClient from 'lib/axiosClient';
import { ICategory, IChildCategory, IProduct, IResData } from 'shared/types';

export const eCommerceApis = {
   getAllCategories: (url: string) => {
      return axiosClient.get<IResData<ICategory[]>>(url);
   },
   addCategory: (data: { name: string; description: string }) => {
      return axiosClient.post<IResData<ICategory>>('/category', data);
   },
   addChildCategory: (data: {
      name: string;
      description: string;
      parent_id: string;
   }) => {
      return axiosClient.post<IResData<IChildCategory>>('/category', data);
   },
   getAllProducts: (
      url: string,
      page?: number,
      limit?: number,
      sort?: string
   ) => {
      return axiosClient.get<IResData<any>>(url, {
         params: {
            page,
            limit,
            sort,
         },
      });
   },
   addProduct: (data: any) => {
      return axiosClient.post<IResData<IProduct>>('/product', data);
   },
};

export const fetcher = {
   getAllCategories: (url: string) =>
      eCommerceApis.getAllCategories(url).then((res) => res.data.data),
   getAllProducts: (
      url: string,
      page?: number,
      limit?: number,
      sort?: string
   ) =>
      eCommerceApis
         .getAllProducts(url, page, limit, sort)
         .then((res) => res.data.data),
};
