"use client";

import Hero from "../components/front-components/Hero";
import Features from "../components/front-components/Features";
import Pricing from "../components/front-components/Pricing";
import Footer from "../components/front-components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      {/*<Pricing />   ***TO REVIEW*** */}
      <Footer />
    </div>
  );
}
