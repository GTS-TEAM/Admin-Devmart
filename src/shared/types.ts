import { MenuProps } from 'antd';
import { ReactElement, ReactNode } from 'react';

export interface IUser {
   id: string;
   created_at: string;
   updated_at: string;
   deleted_at: null | string;
   name: string;
   email: string;
   role: string;
}

export interface ICategory {
   id: string;
   created_at: string;
   updated_at: string;
   deleted_at: any;
   name: string;
   description: string;
   children?: Array<IChildCategory>;
}

export interface IChildCategory {
   created_at: string;
   description: string;
   id: string;
   name: string;
   parent_id: string;
   updated_at: string;
}

export interface IVariant {
   id: string;
   created_at: string;
   updated_at: string;
   key: string;
   values: Array<string>;
}

export interface IProduct {
   name: string;
   description: string;
   price: number;
   quantity: number;
   stock: number;
   images: Array<string>;
   categories: Array<ICategory>;
   categories_id: Array<string>;
   creator: null | any;
   specific: {
      [key: string]: any;
   };
   variants: Array<IVariant>;
   rating: number;
   category: string;
   id: string;
}

export interface IToken {
   access_token: string;
   refresh_token: string;
}

export interface IResLogin {
   user: IUser;
   token: IToken;
}

export interface IResData<T> {
   message: string;
   data: T;
}

export type WithLayout = {
   getLayout?: (page: ReactElement) => ReactNode;
};

export type MenuItem = Required<MenuProps>['items'][number];

export interface IVariantInput {
   id: string;
   key: string;
   values: Array<string>;
   readonly?: boolean;
}

export interface ITagInput {
   id: string;
   value: string;
}

export interface IFilterProduct {
   category_id?: string;
   sort?: string;
   page?: string;
   limit?: string;
   min_price?: number;
   max_price?: number;
   min_rating?: number;
}

export interface IMetadata {
   id: string;
   created_at: string;
   updated_at: string;
   name: string;
   values: Array<string>;
}

export interface IMetadataInput {
   name: string;
   values: Array<string>;
}
