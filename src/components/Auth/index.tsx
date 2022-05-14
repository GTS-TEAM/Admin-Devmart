import Loading from 'components/Loading';
import { ERROR_TOKEN, SECOND } from 'constant';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Auth: React.FC<{
   children?: React.ReactNode;
}> = ({ children }) => {
   const { data: session, status } = useSession();
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const timmer = setTimeout(() => {
         if (status !== 'loading') {
            setLoading(false);
         }
      }, SECOND * 1);
      return () => clearTimeout(timmer);
   }, [status]);

   useEffect(() => {
      if (session?.error === ERROR_TOKEN) {
         signOut();
      }
   });

   if (loading) {
      return <Loading />;
   }

   return <>{children}</>;
};

export default Auth;
