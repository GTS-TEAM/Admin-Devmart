import { IconType } from 'react-icons';
import {
   AiOutlineAppstore,
   AiOutlineContainer,
   AiOutlineInsertRowBelow,
   AiOutlineShop,
   AiOutlineSlack,
   AiOutlineUser,
} from 'react-icons/ai';

export const ERROR_TOKEN = 'RefreshAccessTokenError';

export const BASE_URL_API = 'https://urchin-app-imxhj.ondigitalocean.app/api';

export const ROUTES = {
   LOGIN: '/login',
   SIGN_UP: '/signup',
   HOME: '/',
   PRODUCTS: '/products',
   ADD_PRODUCT: '/products/add-product',
   ORDERS: '/orders',
   CUSTOMERS: '/customers',
   CATEGORIES: '/categories',
   ADD_CATEGORIES: '/add-category',
   PRODUCT_DETAIL: '/products/[id]',
   METADATA: '/metadata',
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
   {
      name: 'Metadata',
      path: ROUTES.METADATA,
      icon: AiOutlineInsertRowBelow,
   },
];

export const TYPE_VARIANTS = {
   HIDDEN: 'hidden',
   VISIBLE: 'visible',
   EXIT: 'exit',
};

export const SECOND = 1000;

export const MIN_WIDTH_TABLET = 1024;
export const MAX_WIDTH_TABLET = 1023;
