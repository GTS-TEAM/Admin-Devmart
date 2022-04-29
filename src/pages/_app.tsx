import 'antd/dist/antd.css';
import ThemeProvider from 'context/theme.context';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode, useEffect } from 'react';
import '../styles/globals.scss';

type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   const router = useRouter();

   useEffect(() => {
      const handleStart = (url: string) => {
         console.log(`Loading: ${url}`);
         NProgress.start();
      };
      const handleStop = () => {
         NProgress.done();
      };

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleStop);
      router.events.on('routeChangeError', handleStop);

      return () => {
         router.events.off('routeChangeStart', handleStart);
         router.events.off('routeChangeComplete', handleStop);
         router.events.off('routeChangeError', handleStop);
      };
   }, [router]);
   return (
      <SessionProvider session={pageProps.session}>
         <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
         </ThemeProvider>
      </SessionProvider>
   );
}

export default MyApp;
