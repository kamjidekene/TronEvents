import { Fragment } from "react";
import { HowItWorksSection, IndexHero, PartnerSection } from "@components";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
      <PartnerSection />
    </Fragment>
  );
};

export default Home;
