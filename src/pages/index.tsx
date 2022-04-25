import { ERROR_TOKEN } from 'constant';
import instance from 'lib/axiosClient';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
const Home: NextPage = () => {
   const { data: session } = useSession();

   useEffect(() => {
      instance.get('user').then((value) => {
         console.log(value);
      });
   }, []);

   useEffect(() => {
      console.log(session?.error);
      if (session?.error === ERROR_TOKEN) {
         signIn();
         return;
      }
   }, [session]);

   return <div></div>;
};

export default Home;
