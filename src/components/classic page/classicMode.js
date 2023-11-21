import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./classic.css";
import Classicnavbar from "./classicnavbar";
import ClassicBeding from "./classicBeding";
import ClasicChart from "./clasicChart";
import Dashboardclassic from "./dashboardClassic";
import App from "./metamaskSDK";
import {
  FaChartBar,
  FaCoins,
  FaCopyright,
  FaTelegramPlane,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";

export default function ClassicMode() {
  const [activeComponent, setActiveComponent] = useState("ClassicBeding");

  const toggleClassicBeding = () => {
    setActiveComponent("ClassicBeding");
  };

  const toggleDashboard = () => {
    setActiveComponent("Dashboard");
  };

  const toggleChart = () => {
    setActiveComponent("Chart");
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="container-fluid classicBackground">
        <div className="container pb-4">
          <div className="row classicnavbar pt-2">
            <Classicnavbar />
          </div>
          <div className="row  classicRow justify-content-between text-white p-3 mt-4 p-0 m-0">
            <div className=" col-4 d-flex justify-content-center align-items-center">
              <button
                className="classic_mode_button_1 d-flex text-center"
                onClick={toggleChart}
              >
                <FaChartBar color="white" size="20px" className="mt-0" />
                <span className="d-none d-sm-block ms-2 fw-bold">Chart</span>
              </button>
            </div>

            <div className=" col-4 d-flex justify-content-center align-items-center">
              <button
                className="classic_mode_button_1 d-flex text-center"
                onClick={toggleClassicBeding}
              >
                <FaCoins color="white" size="20px" className="mt-0" />
                <span className="d-none d-sm-block ms-2 fw-bold">
                  Classic Betting
                </span>
              </button>
            </div>

            <div className="col-4 d-flex justify-content-center align-items-center ">
              <button
                className="classic_mode_button_1 d-flex"
                onClick={toggleDashboard}
              >
                <FaUser color="white" size="20px" className="mb-2 me-1" />
                <span className="d-none d-sm-block text-white  fw-bold">
                  Dashboard
                </span>
              </button>
            </div>
          </div>

          <div className="row p-0 m-0">
            {/* {activeComponent === "ClassicBeding" && <App />} */}
            {activeComponent === "ClassicBeding" && <ClassicBeding />}
            {activeComponent === "Dashboard" && <Dashboardclassic />}
            {activeComponent === "Chart" && <ClasicChart />}
          </div>

          <div className="row text-white mt-3 mb-4 p-0 m-0 classicFooter">
            <div className="col-lg-5 mt-4 ps-4 mb-3">
              <h5 className="classicfooter_text">Bull's Call</h5>
              <p className="classicfooter_P">
                Grow you assets while playing fun games. Powered by blockchain
                technology.
              </p>
              <div className="classicfooter_icons">
                <FaTelegramPlane color="white" size="25px" />
                <FaTwitter color="white" size="25px" className="ms-4" />
                <FaYoutube color="white" size="25px" className="ms-4" />
              </div>
              <div className="d-flex mt-3 classicfooter_copywrite ">
                <FaCopyright color="white" size="15px" className="mt-1  me-1" />
                - {currentYear}_<p>Candle Genie - All Rights Reserved</p>
              </div>
            </div>
            <div className="col-lg-5 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
