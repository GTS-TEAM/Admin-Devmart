import { IconType } from 'react-icons';
import {
   AiOutlineAppstore,
   AiOutlineContainer,
   AiOutlineShop,
   AiOutlineSlack,
   AiOutlineUser,
} from 'react-icons/ai';

export const ERROR_TOKEN = 'RefreshAccessTokenError';

export const BASE_URL_API = 'https://api.devmart.software/api';

export const ROUTES = {
   LOGIN: '/login',
   SIGN_UP: '/signup',
   HOME: '/',
   PRODUCTS: '/products',
   ADD_PRODUCT: '/products/add-product',
   ORDERS: '/orders',
   CUSTOMERS: '/customer',
   CATEGORIES: '/categories',
   ADD_CATEGORIES: '/add-category',
   PRODUCT_DETAIL: '/products/[id]',
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
      name: 'Categories',
      icon: AiOutlineSlack,
      path: ROUTES.CATEGORIES,
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

export const TYPE_VARIANTS = {
   HIDDEN: 'hidden',
   VISIBLE: 'visible',
   EXIT: 'exit',
};

export const SECOND = 1000;
