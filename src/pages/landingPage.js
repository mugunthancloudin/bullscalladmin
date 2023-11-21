import React from "react";

import Navbar_header from "../components/landingPage/navbar";
import Home from "../components/landingPage/home";
import About from "../components/landingPage/about";
import Referal from "../components/landingPage/referal";
import Footer from "../components/landingPage/footer";
import '../pages/pages.css';

export default function LandingPage() {
  return (
    <>
      <div className="col-lg-12 landing_page">
        <Navbar_header />
        <Home />
        <About />
        <Referal />
        <Footer />
        
      </div>
    </>
  );
}
