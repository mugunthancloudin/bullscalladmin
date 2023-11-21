import { faDollarSign, faSailboat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import aboutImage from '../assets/images/about.json';

export default function About() {

  const aboutAnimation = {
    loop: true,
    autoplay: true,
    animationData: aboutImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };

  return (
    <>
      <div className="container-fluid pb-1 about_container">
        <div className="row text-white">
          <div className="col-lg-5 order-lg-0 order-1">
            <div className="about_image text-center">
              {/* <img src={img} className="about_image01" /> */}
              <Lottie options={aboutAnimation} />
            </div>
          </div>
          <div className="col-lg-7  order-lg-1 order-0">
            <h1 className="about_text_h1">OVER</h1>
            <h1 className="">
              <FontAwesomeIcon icon={faDollarSign} size="2x" color="#E89A3A" />
              <spam className="about_num"> 8.662.541*</spam>{" "}
            </h1>
            <h6 className="mt-4 me-5">
              Worth of rewards were distributed to the Bull's Call users last in 257
              days. And <br></br>it keeps increasing ! Payments are fully paid
              by smart contracts on the <br></br> decentralized blockchain
              network. You can instantly claim your revards <br></br> to your
              wallet.
            </h6>

            <div className="row ">
              <div className="col-lg-2">
                <Link to="/under_development">
                  {" "}
                  <button className="about_button1">dapp</button>
                </Link>
              </div>
              <div className="col-lg-3">
              <Link to="/under_development">

                  <button className="about_button2 ">
                    <FontAwesomeIcon icon={faSailboat} size="1x" />
                    DappRaddor
                  </button>
                </Link>
              </div>
              <div className="col-lg-6">
                <small>
                  * The data was obtained by summing up the out transactions
                  paid by active smart contracts to users. Independent DApp
                  trackers to follow Bull's Call.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
