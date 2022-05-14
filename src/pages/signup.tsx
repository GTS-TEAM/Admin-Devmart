import { ROUTES } from 'constant';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { SignUp } from 'screens';

export default SignUp;

export async function getServerSideProps(context: NextPageContext) {
   const session = await getSession(context);
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
