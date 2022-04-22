import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { IResLogin } from 'shared/types';

const handleRefreshToken = async () => {};

export default NextAuth({
   // Configure one or more authentication providers
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: {
               label: 'Email',
               type: 'email',
               placeholder: 'email@domain.com',
            },
            password: { label: 'Password', type: 'password' },
         },
         //@ts-ignore
         authorize: async (credentials) => {
            try {
               //login
               const data: IResLogin = await axios
                  .post(`http://3.0.102.186/api/auth/login`, {
                     email: credentials?.email,
                     password: credentials?.password,
                  })
                  .then((value) => value.data.data);

               if (data) {
                  // neu co data
                  const {
                     access_token: accessToken,
                     refresh_token: refreshToken,
                  } = data.token;

                  const accessTokenExpirationTime =
                     (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000; // parse tk token ra de lay cai gia tri het han * 1000 de lay ms

                  return {
                     ...data.user,
                     accessToken,
                     accessTokenExpires: accessTokenExpirationTime,
                     refreshToken,
                  };
               }
               return null;
            } catch (e: any) {
               console.log(e);
               // throw new Error(errorMessage);
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (token && user) {
            const {
               accessToken,
               accessTokenExpires,
               refreshToken,
               ...userData
            } = user;
            return {
               accessToken,
               accessTokenExpires,
               refreshToken,
               user: userData,
            };
         }
         // get time => tg hien tai theo kieu ms check thu neu ma thoi gian hien tai nho hon cai thoi gian het han thi k lam di het :)
         // @ts-ignore
         if (new Date().getTime() < token.accessTokenExpires) {
            return token;
         }

         // refresh token here
         // nguoc lai thi refresh token
         return token;
      },
      async session({ session, token }) {
         //@ts-ignore
         session.user = token.user;
         session.accessToken = token.accessToken;
         session.error = token.error;
         return session;
      },
   },
});
