import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie"
import referalImage from '../assets/images/referalStatictics.json'

export default function Referal() {

  
  const referalAnimation = {
    loop: true,
    autoplay: true,
    animationData: referalImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };

  return (
    <>
      <div className="container-fluid referral_background">
        <div className="container">
        <div className="row text-white  pb-5">
          <div className="col-lg-6 ">
            <h1 className="referal_h1">REFERRALS</h1>
            <p className="referral_p">
              We sharing with you %1 of all wagers placed from your friends on
              CG. To <br></br> start earning referral rewards, simply send your referral
              code to your <br></br> friend.
            </p>

            <Link to="/under_development"><button className="referral_button">Share Referal Code</button></Link> 
          </div>
          <div className="col-lg-6">
          <div className="referal_image text-center ">
                {/* <img src={refImg} className='referal_image01'/> */}
                <Lottie options={referalAnimation} /> 
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
