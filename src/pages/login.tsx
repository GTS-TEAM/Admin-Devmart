import { ROUTES } from 'constant';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { Login } from 'screens';

export default Login;

export async function getServerSideProps(context: NextPageContext) {
   const session = await getSession(context);

   console.log(session);

   if (session) {
      return {
         redirect: {
            permanent: false,
            destination: ROUTES.HOME,
         },
      };
   }
   return {
      props: {
         session,
      },
   };
}
