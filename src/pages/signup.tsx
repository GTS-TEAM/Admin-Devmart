import { yupResolver } from '@hookform/resolvers/yup';
import { Button, message, Typography } from 'antd';
import axios from 'axios';
import BannerAuth from 'components/common/BannerAuth';
import { BASE_URL_API, ROUTES } from 'constant';
import { InputCustom } from 'custom';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInputs {
   email: string;
   username: string;
   password: string;
   confirmPassword: string;
}

const schema = yup.object().shape({
   email: yup
      .string()
      .required('Please enter your email')
      .email('Invalid email'),
   username: yup.string().required('Please enter your name'),
   password: yup
      .string()
      .required('Please enter your password')
      .min(8, 'Password at least 8 letter'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Password don't match"),
});

const SignUp = () => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
   });
   const [loading, setLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit = async (data: IFormInputs) => {
      try {
         setLoading(true);
         const res = await axios.post(`${BASE_URL_API}/auth/register`, {
            email: data.email,
            password: data.password,
            name: data.username,
         });
         setLoading(false);
         message.success('Register successfully');
         router.push(ROUTES.LOGIN);
      } catch (error: any) {
         setLoading(false);
         message.error(error.response?.data.message);
      }
   };

   return (
      <>
         <Head>
            <title>Sign Up | E-commerce Admin</title>
            <meta
               content="E-commerce Admin &amp; Dashboard Admin"
               name="description"
            ></meta>
         </Head>
         <div className="relative px-4 py-8 min-h-screen">
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
                           <form onSubmit={handleSubmit(onSubmit)}>
                              <Controller
                                 control={control}
                                 name="email"
                                 render={({
                                    field: {
                                       onChange,
                                       onBlur,
                                       value,
                                       ref,
                                       name,
                                    },
                                 }) => (
                                    <InputCustom
                                       label="Email"
                                       placeholder="Enter email"
                                       classNameWrap="mb-4"
                                       type="email"
                                       onChange={onChange}
                                       onBlur={onBlur}
                                       value={value}
                                       ref={ref}
                                       name={name}
                                       isRequire={true}
                                       error={errors.email?.message}
                                    />
                                 )}
                              />
                              <Controller
                                 control={control}
                                 name="username"
                                 render={({
                                    field: {
                                       onChange,
                                       onBlur,
                                       value,
                                       ref,
                                       name,
                                    },
                                 }) => (
                                    <InputCustom
                                       label="Username"
                                       placeholder="Enter username"
                                       classNameWrap="mb-4"
                                       type="text"
                                       onChange={onChange}
                                       onBlur={onBlur}
                                       value={value}
                                       ref={ref}
                                       name={name}
                                       isRequire={true}
                                       error={errors.username?.message}
                                    />
                                 )}
                              />
                              <Controller
                                 control={control}
                                 name="password"
                                 render={({
                                    field: {
                                       onChange,
                                       onBlur,
                                       value,
                                       ref,
                                       name,
                                    },
                                 }) => (
                                    <InputCustom
                                       label="Password"
                                       placeholder="Enter password"
                                       classNameWrap="mb-4"
                                       type="password"
                                       onChange={onChange}
                                       onBlur={onBlur}
                                       value={value}
                                       ref={ref}
                                       name={name}
                                       isRequire={true}
                                       error={errors.password?.message}
                                    />
                                 )}
                              />
                              <Controller
                                 control={control}
                                 name="confirmPassword"
                                 render={({
                                    field: {
                                       onChange,
                                       onBlur,
                                       value,
                                       ref,
                                       name,
                                    },
                                 }) => (
                                    <InputCustom
                                       label="Confirm password"
                                       placeholder="Enter confirm password"
                                       classNameWrap="mb-4"
                                       type="password"
                                       onChange={onChange}
                                       onBlur={onBlur}
                                       value={value}
                                       ref={ref}
                                       name={name}
                                       isRequire={true}
                                       error={errors.confirmPassword?.message}
                                    />
                                 )}
                              />

                              <Button
                                 htmlType="submit"
                                 className="w-full vz-button-primary vz-button"
                                 loading={loading}
                              >
                                 Sign in
                              </Button>
                           </form>
                        </div>
                     </div>
                  </div>
                  <Typography.Paragraph className="text-center mt-6">
                     {'Already have an account ?'}
                     <Link href={ROUTES.LOGIN}>
                        <a className="!underline !text-vz-primary font-medium">
                           Login
                        </a>
                     </Link>
                  </Typography.Paragraph>
               </div>
            </div>
         </div>
      </>
   );
};

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
