import 'antd/dist/antd.css';
import ThemeProvider from 'context/theme.context';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <SessionProvider session={pageProps.session}>
         <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
         </ThemeProvider>
      </SessionProvider>
   );
}

export default MyApp;
