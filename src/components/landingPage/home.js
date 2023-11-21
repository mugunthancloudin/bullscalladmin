import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import homeimg from '../assets/images/download.png';
import { Link } from 'react-router-dom';
import Lottie from "react-lottie";
import homeImage from '../assets/images/animation_lmfzfno1.json';



export default function Home() {

  const homeAnimation = {
    loop: true,
    autoplay: true,
    animationData: homeImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };


  return (
    <>
    <div className='container-fluid  pb-5 home_background'>
      <div className='row text-white '>
        <div className='col-lg-5'>
          <h1 className='home_text_h1'>Are you the Genie of the Market ?</h1>
          <p className='home_text_p'>Bull's Call is first and only multi-chain supported real-time price<br></br>
          prediction perform in the market.Play now and get your<br></br>
          chance to win.</p>
          <Link to="/classicBetting"><button className='home_button'><p>Launch App</p></button></Link> 
        </div>
        <div className='col-lg-7 text-center'>
        <div className="home_image ">
                {/* <img src={homeimg} className='home_image01'/> */}
                <Lottie options={homeAnimation} />
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
