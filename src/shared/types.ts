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
}

export interface IProduct {}

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
