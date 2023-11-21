import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  // const [currentyear, setCurrentYear] = useState();

  // useEffect(() => {
  //   let date = new Date();
  //   let year = date.getFullYear();
  //   setCurrentYear(year);
  //   console.log(currentyear);
  // }, []);

  const currentyear = (new Date()).getFullYear();

  return (
    <>
    <div className="container-fluid footer_background text-white">
      <div className="container pt-3 pb-4">
      <div className="row ">
        <h3 className="mt-3">Bull's Call</h3>
      </div>
      <div className="row">
        <div className="col-lg-7 mt-3">
          <p className="footer_text">The financial operations on this site may involve risks. By using the tools and services provided here, you may incur financial losses up to a complete loss of the funds on your Tradeing account. Please evaluate the risks and consult with an independent financial advisor before making any trades. Bull's Call is not responsible for any direct, indirect, consequential losses, or any other damages resulting from the user's actions on the platform. From 2018 to the present, Bull's Call is a category "A" member of the International Financial Commission, which guarantees our customers high-quality service, transparency, and dispute resolution by an independent regulator.</p>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4">
          <div className="row mt-2"><h5>CONTACTS</h5></div>
          <div className="row mt-4"><h6>Email</h6></div>
          <div className="row mt-3"><p>support@bullscall.in</p></div>
          <div className="d-flex mt-2 footer_copywrite">
              <FaCopyright color="white" size="25px" />-{currentyear}_<p>Bull's Call - All Rights Reserved</p> </div>
          <div className="row">
          <div className="footer_icons mt-3">
            <FaFacebook color="white" size="25px"  />
             <FaInstagram color="white" size="25px"  className="ms-4"/>
             <FaTelegramPlane color="white" size="25px" className="ms-4"/>
             <FaTwitter color="white" size="25px"  className="ms-4"/>
             <FaYoutube color="white" size="25px"  className="ms-4"/>
           

             </div>
          </div>

        </div>
      </div>
      </div>
    </div>
    
    </>
  );
}
