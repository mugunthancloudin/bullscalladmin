// src/App.js
import React from "react";
import "./mobileLogin.css";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import Lottie from "react-lottie";
import secureLogin from "../assets/images/loginSecurity.json";
import metamask from "../assets/images/metamask.png";
import trustWallet from "../assets/images/image.png";
import coinBase from "../assets/images/coinBase.png";
import { Link } from "react-router-dom";
import logo from "../assets/images/Bull'sCallLogo.png";

export default function MobileLogin() {
  const lottieAnimation = {
    loop: true,
    autoplay: true,
    animationData: secureLogin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row navbar_background">
          <div className="d-flex pt-2 pb-2">
          <img src={logo} className="mobilelogo" />
          <h2 className="text-white ms-2 mt-2 fw-bold">Bull's Call</h2>
          </div>
          
        </div>
        <div className="container">
          <div className="row">
            <h1 className="text-white mt-4 text-center">
              Secure your login with wallet browser
            </h1>
            <div className="col-lg-6 walletContainer">
              <div className="row wallet01 d-flex">
                <Link to="https://metamask.app.link/dapp/-genie-kvki.vercel.app/classic">
                  <div className="d-flex">
                    <img src={metamask} className="walletLogo" />
                    <button className="walletButtonBg text-white ms-2 border-0 mt-2">
                      <h4>Continue with MetaMask</h4>
                    </button>
                  </div>{" "}
                </Link>
              </div>
              <div className="row wallet">
                <Link to="https://link.trustwallet.com/open_url?coin_id=60&url=https://-genie-kvki.vercel.app/classic">
                  <div className="d-flex">
                    <img src={trustWallet} className="walletLogo" />
                    <button className="walletButtonBg text-white ms-2 border-0 mt-2">
                      <h4>Continue with Trust</h4>
                    </button>
                  </div>
                </Link>
              </div>
              <div className="row wallet">
                <Link to="https://go.cb-w.com/dapp?cb_url=https://-genie-kvki.vercel.app/classic">
                  <div className="d-flex">
                    <img src={coinBase} className="walletLogo" />
                    <button className="walletButtonBg text-white ms-2 border-0 mt-2">
                      <h4>Continue with CoinBase</h4>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="mt-5">
                <Lottie
                  options={lottieAnimation}
                  className="seculeLoginLootie"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
