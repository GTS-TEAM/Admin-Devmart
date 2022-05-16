import axios from 'axios';
import axiosClient from 'lib/axiosClient';
import {
   ICategory,
   IChildCategory,
   IFilterProduct,
   IProduct,
   IResData,
} from 'shared/types';

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
   getAllProducts: (url: string, filler?: IFilterProduct) => {
      return axiosClient.get<IResData<any>>(url, {
         params: {
            ...filler,
         },
      });
   },
   addProduct: (data: any) => {
      return axiosClient.post<IResData<IProduct>>('/product', data);
   },
   uploadImages: (data: any) => {
      return axios.post<{
         urls: Array<string>;
      }>('https://isekai-api.me/api/upload', data);
   },
};

export const fetcher = {
   getAllCategories: (url: string) =>
      eCommerceApis.getAllCategories(url).then((res) => res.data.data),
   getAllProducts: (url: string, filler?: IFilterProduct) =>
      eCommerceApis.getAllProducts(url, filler).then((res) => res.data.data),
};
