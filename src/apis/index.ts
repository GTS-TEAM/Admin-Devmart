import axios from 'axios';
import axiosClient from 'lib/axiosClient';
import {
   ICategory,
   IChildCategory,
   IFilterProduct,
   IMetadata,
   IMetadataInput,
   IProduct,
   IResData,
   IStatusUser,
   IUser,
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
      return axiosClient.get<
         IResData<{
            total: number;
            products: IProduct[];
         }>
      >(url, {
         params: {
            ...filler,
         },
      });
   },
   addProduct: (data: any) => {
      return axiosClient.post<IResData<IProduct>>('/product', data);
   },
   removeProduct: (ids: Array<string>) => {
      return axiosClient.delete<IResData<null>>('/product', {
         data: ids,
      });
   },
   uploadImages: (data: any) => {
      return axios.post<{
         urls: Array<string>;
      }>('https://isekai-api.me/api/upload', data);
   },
   getAllMetaData: (url: string) => {
      return axiosClient.get<IResData<IMetadata[]>>(url);
   },
   createMetadata: (data: IMetadataInput) => {
      return axiosClient.post<IResData<IMetadata>>('/metadata', data);
   },
   updateMetadata: (id: string, data: IMetadataInput) => {
      return axiosClient.put<IResData<IMetadata>>(`/metadata/${id}`, data);
   },
   getAllCustomers: (
      url: string,
      params: {
         limit?: number;
         page?: number;
         status?: IStatusUser;
         name?: string;
         email?: string;
      }
   ) => {
      return axiosClient.get<IResData<Array<IUser>>>(url, {
         params: {
            ...params,
         },
      });
   },
   changeStatusCustomer: (status: string, customerId: string) => {
      return axiosClient.patch(
         '/customer',
         {},
         {
            params: {
               status,
               customer_id: customerId,
            },
         }
      );
   },
};

export const fetcher = {
   getAllCategories: (url: string) =>
      eCommerceApis.getAllCategories(url).then((res) => res.data.data),
   getAllProducts: (url: string, filler?: IFilterProduct) =>
      eCommerceApis.getAllProducts(url, filler).then((res) => res.data.data),
   getAllMetadata: (url: string) =>
      eCommerceApis.getAllMetaData(url).then((res) => res.data.data),
   getAllCustomers: (
      url: string,
      params: {
         limit?: number;
         page?: number;
         status?: IStatusUser;
         name?: string;
         email?: string;
      }
   ) => eCommerceApis.getAllCustomers(url, params).then((res) => res.data.data),
};
