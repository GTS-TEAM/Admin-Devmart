import { Auth, Layout } from "components";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { WithLayout } from "shared/types";

const Home: NextPage & WithLayout = () => {
  return <div>hi</div>;
};

export default Home;

Home.getLayout = (page) => {
  const session = getSession();
  console.log("session", session);
  return (
    <Auth>
      <Layout>{page}</Layout>
    </Auth>
  );
};
