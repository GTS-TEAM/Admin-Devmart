import axios from 'axios';
import { BASE_URL_API } from 'constant';
import { getSession } from 'next-auth/react';

const ApiClient = () => {
   const instance = axios.create({
      baseURL: BASE_URL_API,
   });

   instance.interceptors.request.use(async (request) => {
      const session = await getSession();
      console.log(request.url);
      if (session && request.headers) {
         request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return request;
   });

   instance.interceptors.response.use(
      (response) => {
         return response;
      },
      (error) => {
         console.log(`error`, error);
      }
   );

   return instance;
};

export default ApiClient();
