"use client";

import Brands from "./_components/Brands";
// import Noise from "@/components/global/Noise";
import CTA from "./_components/CTA";
import Expertise from "./_components/Expertise";
import FAQ from "./_components/Faq";
// import Noise from "@/components/global/Noise";
import Hero from "./_components/Hero";
import Phrase from "./_components/Prhase";
import Proccess from "./_components/Proccess";
import ServicesSection from "./_components/services";
import Steps from "./_components/steps";


export default  function HomePage() {


  return (
    <>
      <Hero/>
      <CTA/>
      <Expertise/>
      <ServicesSection/>
      <Steps/>
      <Phrase/>
      <Brands/>
      <Proccess/>
      <FAQ/>
      {/* <Noise
            patternSize={250}
            patternScaleX={1.2}
            patternScaleY={1.2}
            patternRefreshInterval={2}
            patternAlpha={20}
          /> */}
    </>
  );
}
