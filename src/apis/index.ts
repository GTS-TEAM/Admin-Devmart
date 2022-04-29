import axiosClient from 'lib/axiosClient';
import { ICategory, IResData } from 'shared/types';

export const eCommerceApis = {
   getAllCategories: (url: string) => {
      return axiosClient.get<IResData<ICategory[]>>(url);
   },
   addCategory: (data: { name: string; description: string }) => {
      return axiosClient.post<IResData<ICategory>>('/category', data);
   },
   getAllProducts: (url: string) => {
      return axiosClient.get<any[]>(url, {
         params: {
            page: 1,
            limit: 10,
         },
      });
   },
};

export const fetcher = {
   getAllCategories: (url: string) =>
      eCommerceApis.getAllCategories(url).then((res) => res.data),
   getAllProducts: (url: string) =>
      eCommerceApis.getAllProducts(url).then((res) => res.data),
};
