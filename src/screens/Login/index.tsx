import { Button, message, Typography } from 'antd';
import { BannerAuth } from 'components';
import { ROUTES } from 'constant';
import { InputCustom } from 'custom';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login: React.FC = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   return (
      <>
         <Head>
            <title>Sign In | E-commerce Admin</title>
            <meta
               content="E-commerce Admin &amp; Dashboard Admin"
               name="description"
            ></meta>
         </Head>
         <div className="relative px-4 pt-8 min-h-screen">
            {/* banner here */}
            <BannerAuth />
            <div className="w-full  relative z-10">
               <div className="mb-12 text-center  font-medium my-4">
                  <h1 className=" font-black text-4xl mt-12 mb-6 text-white">
                     Logo here
                  </h1>
                  <span className="block text-white/50">E-commerce Admin</span>
               </div>
               <div>
                  <div className="card max-w-[456px] mx-auto ">
                     <div className="p-6 w-full  ">
                        <div className="text-center mb-2">
                           <h4 className="text-primary  font-medium  mb-2">
                              Welcome Back !
                           </h4>
                           <span className="block text-muted text-sm font-medium mb-4">
                              Sign in to continue to Velzon.
                           </span>
                           <form>
                              <InputCustom
                                 label="Email"
                                 placeholder="Enter email"
                                 classNameWrap="mb-4"
                                 type="email"
                                 onChange={(e) => {
                                    setEmail(e.target.value);
                                 }}
                                 value={email}
                                 required={true}
                              />
                              <InputCustom
                                 label="Password"
                                 placeholder="Enter password"
                                 classNameWrap="mb-4"
                                 type="password"
                                 onChange={(e) => {
                                    setPassword(e.target.value);
                                 }}
                                 value={password}
                                 required={true}
                              />
                              <Button
                                 htmlType="submit"
                                 className="w-full vz-button-primary vz-button"
                                 onClick={async (e) => {
                                    try {
                                       e.preventDefault();
                                       setIsLoading(true);
                                       const res: any = await signIn(
                                          'credentials',
                                          {
                                             email,
                                             password,
                                             callbackUrl: `${window.location.origin}/`,
                                             redirect: false,
                                          }
                                       );

                                       if (res?.error) {
                                          setIsLoading(false);
                                          message.error(res.error);
                                          return;
                                       }
                                       setIsLoading(false);
                                       router.push(ROUTES.HOME);
                                       message.success('Login successfully');
                                    } catch (error) {
                                       console.dir(error);
                                       setIsLoading(false);
                                    }
                                 }}
                                 loading={isLoading}
                                 disabled={
                                    email.trim().length === 0 ||
                                    password.trim().length === 0 ||
                                    !email.includes('@')
                                 }
                              >
                                 Sign in
                              </Button>
                           </form>
                        </div>
                     </div>
                  </div>
                  <Typography.Paragraph className="text-center mt-6">
                     {"Don't have an account ? "}
                     <Link href={ROUTES.SIGN_UP}>
                        <a className="!underline !text-vz-primary font-medium">
                           Signup
                        </a>
                     </Link>
                  </Typography.Paragraph>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;
