import { IconType } from 'react-icons';
import {
   AiOutlineAppstore,
   AiOutlineContainer,
   AiOutlineShop,
   AiOutlineUser,
} from 'react-icons/ai';

export const ERROR_TOKEN = 'RefreshAccessTokenError';
export const BASE_URL_API = 'http://3.0.102.186/api';
export const ROUTES = {
   LOGIN: '/login',
   SIGN_UP: '/signup',
   HOME: '/',
   PRODUCTS: '/products',
   ADD_PRODUCT: '/add-product',
   ORDERS: '/orders',
   CUSTOMERS: '/customer',
};
export const IS_SERVER = typeof window === 'undefined';
export const SIDEBAR: {
   name: string;
   icon: IconType;
   path: string;
}[] = [
   {
      name: 'Dashboard',
      icon: AiOutlineAppstore,
      path: ROUTES.HOME,
   },
   {
      name: 'Products',
      icon: AiOutlineContainer,
      path: ROUTES.PRODUCTS,
   },
   {
      name: 'Customers',
      icon: AiOutlineUser,
      path: ROUTES.CUSTOMERS,
   },
   {
      name: 'Orders',
      icon: AiOutlineShop,
      path: ROUTES.ORDERS,
   },
];
