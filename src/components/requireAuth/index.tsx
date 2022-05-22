import { ROUTES } from 'constant';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export function requireAuth(gssp: GetServerSideProps) {
   return async (ctx: GetServerSidePropsContext) => {
      const session = await getSession(ctx);

      console.log(session);

      if (!session) {
         return {
            redirect: {
               permanent: false,
               destination: ROUTES.LOGIN,
            },
         };
      }

      return await gssp(ctx);
   };
}
