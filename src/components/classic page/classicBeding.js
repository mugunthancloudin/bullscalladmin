import React, { useEffect, useState } from "react";
import "./classic.css";
import "./loading.css";
import { useSDK } from '@metamask/sdk-react';
import { CgPlayButtonO } from "react-icons/cg";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import styles from "./classic.module.css";
import "./classic.module.css";
import network from "../assets/images/network_bnb.png";
import Lottie from "react-lottie";
import loadingBull from "../assets/images/bull.json";
import wallet from "../assets/images/wallet.json";
import ReactCardFlip from "react-card-flip";
import * as blockchain from "../../services/blockchain";
import { truncate, useGlobalState } from "../../store";
import { FaWalking, FaWallet } from "react-icons/fa";

export default function ClassicBeding() {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [lockRoundLoading, setLockRoundLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flip, setFlip] = useState(false);
  const [bettingChoice, setBettingChoice] = useState(true);
  const [bettingAmount, setBettingAmount] = useState(0);
  const [data, setData] = useState(null);
  const [stageStart, setStageStart] = useState([]);
  // console.log(stageStart);
  const [stageLock, setStageLock] = useState([]);
  // console.log(stageLock);
  const [stageExecute, setStageExecute] = useState([]);
  // console.log(stageExecute);
  const [stageCurrentPrice, setStageCurrentPrice] = useState();
  const [currentPrice, setCurrentPrice] = useState();


  // const { sdk, connected, connecting, provider, chainId } = useSDK();

  // const connect = async () => {
  //   try {
  //     const accounts = await sdk.connect;
  //     setAccount(accounts?.[0]);
  //   } catch(err) {
  //     console.warn(`failed to connect..`, err);
  //   }
  // };
  //Start Round
  const [startRoundNumber, setStartRoundNumber] = useState([]);

  const [startUpPrice, setStartUpPrice] = useState();
  const [startDownPrice, setStartDownPrice] = useState();
  const [startPricePool, setStartPricePool] = useState();


   //Lock Round
  const [lockRoundNumber, setLockRoundNumber] = useState([]);
  // console.log(lockRoundNumber);
  const [lockLockprice, setLockLockprice] = useState();
  // console.log(typeof lockLockprice);
  const [lockPriceDiffrence, setLockPriceDiffrence] = useState();
  // console.log(lockPriceDiffrence);

  const [lockUpPrice, setLockUpPrice] = useState();
  const [lockDownPrice, setlockDownPrice] = useState();
  const [lockPricePool, setlockPricePool] = useState();

  //lock Round time diffrence
  const [currentTime, setCurrentTime] = useState();
  const [lockRoundLockTime, setlockRoundLockTime] = useState();



  //Execute Round
  const [executeRoundNumber, setExecuteRoundNumber] = useState([]);
  // console.log(executeRoundNumber);
  const [executeLockPrice, setExecuteLockPrice] = useState();
  // console.log(executeLockPrice);
  const [executecloseprice, setExecutecloseprice] = useState();
    // console.log(executecloseprice);
  const [executePriceDiffrence, setExecutePriceDiffrence] = useState();
  // console.log(executePriceDiffrence);
  const [executeUpPrice, setExecuteUpPrice] = useState();
  const [executeDownPrice, setExecuteDownPrice] = useState();
  const [executePricePool, setExecutePricePool] = useState();
 


  const lottieAnimation = {
    loop: true,
    autoplay: true,
    animationData: loadingBull,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };

  
  const walletAnimation = {
    loop: true,
    autoplay: true,
    animationData: wallet,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };

  const handleToggle = () => {
    setBettingChoice((prevState) => !prevState);
  };

  let usdtValue = bettingAmount * 0.62;
  // console.log(usdtValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bettingAmount) return;

    if (bettingChoice === true) {
      console.log("up");
      const enteringUp = await blockchain.betBull(bettingAmount);
    } else {
       console.log("down");
       const enteringDown = await blockchain.betBear(bettingAmount);
    }
  };

  // useState(() => {
  //   if (isConnected) {
  //     setGlobalState('connectedAccount', isConnected);
  //   }
  // }, [isConnected]);

  const fetchData = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(2000);
    let contract = await blockchain.GetEthereumContract();
// console.log("get contract");
    let rounds = await blockchain.getRoundDetails();
    // console.log(rounds);
    let stage_Start = rounds.get("stageStart");
    let stage_Lock = rounds.get("stageLock");
    let stage_Execute = rounds.get("stageExecute");
    let stage_CurrentPrice = rounds.get("stageCurrentPrice");
    // console.log(stage_Lock);
    // console.log(stage_CurrentPrice);
    // console.log(stage_Execute);
    //current price
    setStageCurrentPrice(stage_CurrentPrice);
    let currentPri = stage_CurrentPrice.get("currentPrice");
    // console.log(currentPri.toString());
    const formattedNumber = currentPri / 10 ** 18;
    // console.log(typeof currentPri);
    setCurrentPrice(formattedNumber);


    //start round
    setStageStart(stage_Start);
    let startRoundno = stage_Start.get("epoch");
    setStartRoundNumber(Number(startRoundno));

    let startRoundUpPayoutpri = stage_Start.get("roundUpPayout");
    // console.log(startRoundUpPayoutpri);
    setStartUpPrice(startRoundUpPayoutpri / 1000);

    let startRoundDownPayout = stage_Start.get("roundDownPayout");
    // console.log(startRoundDownPayout);
    setStartDownPrice(startRoundDownPayout / 1000);

    let startRoundPricePool = stage_Start.get("pricePool");
    // console.log(startRoundPricePool);
    setStartPricePool(startRoundPricePool / 10**18);


    //lock Round
    setStageLock(stage_Lock);
    let lockRoundno = stage_Lock.get("epoch");
    setLockRoundNumber(lockRoundno);

    let lockLockpri = stage_Lock.get("lockPrice");
    // console.log(lockLockpri);
    setLockLockprice(lockLockpri / 10 ** 8);

    let lockRoundUpPayoutpri = stage_Lock.get("roundUpPayout");
    // console.log(lockRoundUpPayoutpri);
    setLockUpPrice(lockRoundUpPayoutpri / 1000);

    let lockRoundDownPayout = stage_Lock.get("roundDownPayout");
    // console.log(lockRoundDownPayout);
    setlockDownPrice(lockRoundDownPayout / 1000);

    let lockRoundPricePool = stage_Lock.get("pricePool");
    // console.log(lockRoundPricePool);
    setlockPricePool(lockRoundPricePool / 10**18);


    let lockPriceDiff = formattedNumber - lockLockpri / 10 ** 8;
    // console.log(Number(lockPriceDiff));
    // console.log(lockLockprice);
    setLockPriceDiffrence(Number(lockPriceDiff).toFixed(4));

    var lockCloseTimeStam = stage_Lock.get("closeTimestamp");
    setlockRoundLockTime(lockCloseTimeStam);
  
  

    //Executed Round
    setStageExecute(stage_Execute);
    let executeRoundno = stage_Execute.get("epoch");
    setExecuteRoundNumber(executeRoundno);

    let executelockpri = stage_Execute.get("lockPrice");
    setExecuteLockPrice(executelockpri / 10 ** 8);

    let executeclosepri = stage_Execute.get("closePrice");
    // console.log(executeclosepri);
    setExecutecloseprice(executeclosepri / 10 ** 8);

    let executeRoundUpPayoutpri = stage_Execute.get("roundUpPayout");
    // console.log(executeRoundUpPayoutpri);
    setExecuteUpPrice(executeRoundUpPayoutpri / 1000);

    let executeRoundDownPayout = stage_Execute.get("roundDownPayout");
    // console.log(executeclosepri);
    setExecuteDownPrice(executeRoundDownPayout / 1000);

    let executeRoundPricePool = stage_Execute.get("pricePool");
    // console.log(executeRoundPricePool);
    setExecutePricePool(executeRoundPricePool / 10**18);
   

    let executePriceDiff = executeclosepri - executelockpri ;
    setExecutePriceDiffrence((Number(executePriceDiff) / 10 ** 8).toFixed(4));

    setData(rounds);
  };

  const lockcolorClassup = lockPriceDiffrence >= 0 ? "green-bg" : "black-bg";
  const lockcolorClassdown = lockPriceDiffrence <= 0 ? "red-bg" : "black-bg";
  const executecolorClassup =
    executePriceDiffrence > 0 ? "green-bg" : "black-bg";
  const executecolorClassdown =
    executePriceDiffrence <= 0 ? "red-bg" : "black-bg";
  const ExecutecolorClass = executePriceDiffrence > 0 ? "green-bg" : "red-bg";
  const lockcolorClass = lockPriceDiffrence > 0 ? "green-bg" : "red-bg";
  const borderColor = lockPriceDiffrence < 0 ? "green" : "red";

  let executeIcon =
    executePriceDiffrence > 0 ? (
      <AiOutlineArrowUp color="white" fontSize={20} className="mb-1 me-1 " />
    ) : (
      <AiOutlineArrowDown color="white" fontSize={20} className="mb-1 me-1 " />
    );

  let lockIcon =
    lockPriceDiffrence > 0 ? (
      <AiOutlineArrowUp color="white" fontSize={20} className="mb-1 me-1 " />
    ) : (
      <AiOutlineArrowDown
        color="white"
        fontSize={20}
        className="mb-1 me-1 fw-bold"
      />
    );

  const borderColorClass =
    lockPriceDiffrence >= 0 ? "border-success" : "border-danger";

  const livePrice = async () => {
    let checkingData = await blockchain.setLivePrice();
    // console.log(checkingData);
  };

  const getCurrentTimestamp = () => {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    setCurrentTime(Number(currentTimestamp));
    // console.log(currentTimestamp);
  }; 
  
  var lockTimeDiffrence = ((lockRoundLockTime - currentTime )+28)
  // console.log(lockTimeDiffrence);

  if (lockTimeDiffrence < 0) {
    lockTimeDiffrence = 0;
  }

  if (lockTimeDiffrence < 0) {
    lockTimeDiffrence = 0;
  }

  if (lockTimeDiffrence < 0) {
    lockTimeDiffrence = 0;
  }

  // console.log(Math.floor(lockTimeDiffrence/3600));

  const lockMin = Math.floor(lockTimeDiffrence/60)
  const lockSec = Math.floor(lockTimeDiffrence%60)

  const formattedMinutes = String(lockMin).padStart(2, '0');
  const formattedSeconds = String(lockSec).padStart(2, '0');

  useEffect(() => {
 
    setInterval(() => {
      fetchData();
      setLoading(false);
    }, 5000);

    setInterval(() =>{
      getCurrentTimestamp()
    },1000);

    // livePrice();
    setInterval(() => {
      console.log("mugunth");
      livePrice();
    }, 30000);

    setLockRoundLoading(true);
    setTimeout(() => {
      setLockRoundLoading(false);
    }, 5000);

    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 8000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="container loading_fingers">
          <div class="loading-wrapper">
            <div className="loading">
              <div className="finger finger-1">
                <div className="finger-item">
                  <span></span>
                  <i></i>
                </div>
              </div>
              <div className="finger finger-2">
                <div className="finger-item">
                  <span></span>
                  <i></i>
                </div>
              </div>
              <div className="finger finger-3">
                <div className="finger-item">
                  <span></span>
                  <i></i>
                </div>
              </div>
              <div className="finger finger-4">
                <div className="finger-item">
                  <span></span>
                  <i></i>
                </div>
              </div>
              <div className="last-finger">
                <div className="last-finger-item">
                  <i></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container p-0">

          <div className="row mt-3 justify-content-between ">
            <div className="col-lg-4 col-md-4 ml-0 mt-2">
              {/* //executed round */}
              <div className="card betting_card  h-100 d-flex flex-column">
                <div className="card-header d-flex betting_card_header pt-3 pb-3">
                  <div className="">
                    <span className="me-2">
                      <CgPlayButtonO
                        color="white"
                        fontSize="22"
                        className="betting_head_icon"
                      />
                    </span>
                    <span className="betting_head_title ">
                      Round {executeRoundNumber}
                    </span>
                    </div>
                    <div className="">
                   
                  </div>
                </div>
                <div className="card-body  betting_card_body">
                  <div>
                    <div className={`betting_up ${executecolorClassup}`}>
                      <h5 className="betting_up_text pb-0 mb-0">UP</h5>
                      <h6 className="betting_payout_text pb-0 mb-0"> {executeUpPrice} x payout</h6>
                    </div>
                  </div>

                  <div className="betting_body">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="mb-0 betting_body_h6_1">
                            $ {executeLockPrice}
                          </h6>
                          <div className="tooltip-content">
                            This is lock price additional information.
                          </div>
                          <h6 className="betting_body_h6 mt-5 yellow-text">
                            $ {executecloseprice}
                          </h6>
                          <div class="tooltip-content">
                            This is close price additional information.
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`betting_body_btn btn mt-4 pe-4 ps-4 text-center ${ExecutecolorClass}`}
                          >
                            <span className="h6 fw-bold text-white ms-1 ">
                              {executeIcon} $ {executePriceDiffrence}
                            </span>
                            <div className="tooltip-content">
                              Diff:$ {executePriceDiffrence}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className={`betting_down ${executecolorClassdown}`}>
                    <h5 className="betting_up_text pb-0 mb-0">DOWN</h5>
                    <h6 className="betting_payout_text pb-0 mb-0"> {executeDownPrice} x payout</h6>
                  </div>
                </div>
                <h5 className="text-white text-center pricePool pt-2 pb-0 ">Price pool : {executePricePool} Matic </h5>

              </div>
            </div>
            {/* <div className="col-lg-4 col-md-4 mt-2">
            <div className="card betting_card">
              <div className="card-body">
                <Lottie options={lottieAnimation} />
              </div>
            </div>
          </div> */}
            <div className="col-lg-4 col-md-4 mt-2">
              {(lockTimeDiffrence === 0) ? (
                <div className="card lock_betting_card  h-100 d-flex flex-column border border-warning border-4">
                  <div className="card-body">
                    <Lottie options={lottieAnimation} />
                  </div>
                </div>
              ) : (
                <div className="card lock_betting_card  h-100 d-flex flex-column border border-warning border-4">
                  <div className="card-header betting_card_header pt-3 pb-3">
                    <div className="">
                      <span className="me-2">
                        <CgPlayButtonO
                          color="white"
                          fontSize="22"
                          className="betting_head_icon"
                        />
                      </span>
                      <span className="betting_head_title">
                        Round {lockRoundNumber}
                      </span>
                      </div>
                      <div>
                      <span className="betting_timer ">{formattedMinutes} : {formattedSeconds}</span>
                    </div>
                  </div>
                  <div className="card-body  betting_card_body">
                    <div>
                      <div className={`betting_up ${lockcolorClassup}`}>
                        <h5 className="betting_up_text pb-0 mb-0">UP</h5>
                        <h6 className="betting_payout_text pb-0 mb-0"> {lockUpPrice} x payout</h6>
                      </div>
                    </div>

                    <div
                      className={`lock_betting_body ${borderColorClass}`}
                      style={{ border: "3px solid" }}
                    >
                      <div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-0 betting_body_h6_1 ">
                              $ {lockLockprice}
                            </h6>
                            <div className="tooltip-content">
                              This is lock price additional information.
                            </div>
                            <h6 className="betting_body_h6 mt-5  yellow-text d-flex">
                              <div class="blinking-dot mt-2"></div>

                              <div className="ms-2">
                                ${currentPrice}{" "}
                                <small className="text-light poly_value">MATIC / USDT</small>{" "}
                              </div>
                            </h6>
                            <div className="tooltip-content">
                              Latest price from Binance v3 API
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className={`betting_body_btn btn mt-4 ${lockcolorClass}`}
                            >
                              <span>{lockIcon}</span>
                              <span className="h6 fw-bold text-white ">
                                $ {lockPriceDiffrence}
                              </span>
                            </button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className={`betting_down ${lockcolorClassdown}`}>
                      <h5 className="betting_up_text pb-0 mb-0">DOWN</h5>
                      <h6 className="betting_payout_text pb-0 mb-0"> {lockDownPrice} x payout</h6>
                    </div>
                  </div>
                  <h5 className="text-dark text-center  pricePool pt-2 pb-0">Price pool : {lockPricePool} Matic </h5>

                </div>
              )}
            </div>

            <div className="col-lg-4 col-md-4 mt-2 ">
              <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                <div>
                  <div className="card betting_card  h-100 d-flex flex-column">
                    <div className="card-header betting_card_header pt-3 pb-3">
                      <div className="">
                        <span className="me-2">
                          <CgPlayButtonO
                            color="white"
                            fontSize="22"
                            className="betting_head_icon"
                          />
                        </span>
                        <span className="betting_head_title">
                          Round {startRoundNumber}
                        </span>
                        {/* <span className="betting_timer">(02:29)</span> */}
                      </div>
                    </div>
                    <div className="card-body betting_card_body">
                      <div>
                        <div className="betting_up black-bg">
                          <h5 className="betting_up_text pb-0 mb-0">UP</h5>
                          <h6 className="betting_payout_text pb-0 mb-0"> {startUpPrice} x payout</h6>
                        </div>
                      </div>

                      <div
                        className="betting_body"
                        onClick={() => setFlip(!flip)}
                      >
                        <div>
                          <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex justify-content-center">
                              <button
                                className="betting_enter_btn btn mt-1 green-bg text-white"
                                onClick={() => setBettingChoice(true)}
                              >
                                Enter UP
                              </button>
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                              <button
                                className="betting_enter_btn btn red-bg text-white"
                                onClick={() => setBettingChoice(false)}
                              >
                                Enter Down
                              </button>
                            </div>
                          </div>
                        </div>


                      </div>
                      <div className="betting_down black-bg">
                        <h5 className="betting_up_text pb-0 mb-0">DOWN</h5>
                        <h6 className="betting_payout_text pb-0 mb-0"> {startDownPrice} x payout</h6>
                      </div>
                    </div>
                    <h5 className="text-white text-center pricePool pt-2 pb-0 ">Price pool : {startPricePool} Matic </h5>

                  </div>
                </div>

                <div className="card betting_card  h-100 d-flex flex-column">
                  <div className="card-header bg-dark text-white ">
                    <div className="row d-flex">
                      <div className="col-lg-2 pt-1">
                        <AiOutlineArrowLeft
                          color="white"
                          fontSize={30}
                          onClick={() => setFlip(!flip)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <h5 className="pt-1">Enter Round</h5>
                      </div>
                      {/* <div className="col-lg-4">
                      <button className=" pb-2 bettingButton">
                        <AiOutlineArrowUp fontSize={25} />
                        up
                      </button> */}

                      <div className="col-lg-4">
                        {bettingChoice ? (
                          <button
                            onClick={handleToggle}
                            className=" pb-2 bettingButtonUp  "
                          >
                            <AiOutlineArrowUp fontSize={25} className="me-2" />
                            UP
                          </button>
                        ) : (
                          <button
                            onClick={handleToggle}
                            className=" pb-2 bettingButtonDown"
                          >
                            <AiOutlineArrowDown fontSize={25} />
                            Down
                          </button>
                        )}
                      </div>
                      {/* </div> */}
                    </div>
                  </div>

                  {!connectedAccount ? (
                    <div className="col-lg-12 betting_card">
                      <div className="card-body  ">
                        <div className="row wallet_connection text-center">
                        <Lottie options={walletAnimation} />
                          Please connect to you wallet
                        </div>
                        {/*  */}
                      </div>
                    </div>
                  ) : (
                    <div className="card-body classic_betting_body">
                      <form onSubmit={handleSubmit}>
                        <div className="classic_betting_body_bg">
                          <p className="text-center fw-bold">WELCOME TO  BETTING</p>
                          <div className="row  d-flex mt-4">
                            <div className="col-lg-6">Balance</div>
                            <div className="col-lg-6">0.000000 MATIC</div>
                          </div>
                          <div className="row d-flex  mt-5">
                            <div className="col-lg-6">Amount</div>
                            <div className="col-lg-6">
                              <input
                                type="number"
                                name="bettingAmount"
                                id="bettingAmount"
                                
                                value={bettingAmount}
                                onChange={(e) =>
                                  setBettingAmount(e.target.value)
                                }
                                className="form-control w-100"
                              />
                            </div>
                          </div>
                          <div className="row d-flex mt-5">
                            <div className="col-lg-6">Total </div>
                            <div className="col-lg-6 text-end">
                              {usdtValue} USDT
                            </div>
                          </div>
                          {/* <div className="row d-flex mt-2">
                            <div className="col-lg-6">Fee</div>
                            <div className="col-lg-6 text-end">5%</div>
                          </div> */}
                          <div className="row d-flex mt-5">
                            <div className="col-lg-6">Min Amount</div>
                            <div className="col-lg-6 text-end">
                              0.05 MATIC
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <button type="submit" className="bettingButton01">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </ReactCardFlip>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}