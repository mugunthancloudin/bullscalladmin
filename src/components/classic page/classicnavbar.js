import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  GiPayMoney,
  GiReceiveMoney,
  GiTakeMyMoney,
  GiMoneyStack,
  GiCash,
} from "react-icons/gi";
import { truncate, useGlobalState } from "../../store";
import { useAccount, useBalance, useNetwork } from "wagmi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as blockchain from "../../services/blockchain";
import { getGlobalState, setGlobalState } from "../../store";
import logo from "../assets/images/Bull'sCallLogo.png";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

export default function Classicnavbar() {
  const { address, isConnected } = useAccount();
  const [startButtonText, setStartButtonText] = useState("Start");
  const [injectAmount, setInjectAmount] = useState(0);
  const [balanceAfterTransfer, setBalanceAfterTransfer] = useState(0);
  const [balance, setBalance] = useState();
  console.log(balance);
  const [ownerAddress, setOwnerAddress] = useState("");
  const { chain } = useNetwork();

  useState(() => {
    if (isConnected) {
      setGlobalState("connectedAccount", isConnected);
    }
  }, [isConnected]);

  const { data } = useBalance({
    address: address,
  });

  console.log(data);

  const { openAccountModal } = useAccountModal();

  const { openConnectModal } = useConnectModal();

  const { openChainModal } = useChainModal();

  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    async function fetchData() {
      try {
        const checkConnectionState = getGlobalState("connectedAccount");
        if (isConnected) {
          await blockchain.isWallectConnected();
          const ownerAddress = await blockchain.getContractOwner();
          setOwnerAddress(ownerAddress.toLowerCase());
          // console.log(ownerAddress);
        }
      } catch (error) {}
    }

    let userbalance = Math.round(data?.formatted * 10000) / 10000;
    console.log(userbalance);
    setBalance(userbalance.toString());

    let formattedFund = (balance - injectAmount).toFixed(4);
    setBalanceAfterTransfer(Number(formattedFund));

    fetchData();
  }, [isConnected, balance, injectAmount]);

  // const handleStartToggle = () => {
  //   if (startButtonText === "Start") {
  //     blockchain.RoundStart();
  //     setStartButtonText("Pause");
  //   } else if (startButtonText === "Pause") {
  //     blockchain.gamePause();
  //     setStartButtonText("Resume");
  //   } else if (startButtonText === "Resume") {
  //     blockchain.gameResume();
  //     setStartButtonText("Pause");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!injectAmount) return;
  //   // console.log(typeof injectAmount);
  //   if (injectAmount > 0) {
  //     // alert("hai mugunth");
  //     let amount = Number(injectAmount);
  //     await blockchain.fundInject(amount);
  //   } else {
  //     // alert("nothing");
  //   }
  // };

  const injectFundColorClass =
    balanceAfterTransfer < 0 ? "text-danger" : "text-success";
  const isSubmitDisabled = balanceAfterTransfer < 0;

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="classicnavbar">
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="classicLogo" alt="logoimg" />
          <h2 className="text-white ms-2 mt-2 fw-bold">Bull's Call</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">

          {/* <Nav className="me-3 ms-3">
            {isConnected ? (
              <div
              className="ms-3 justify-content-end d-flex classicButton mt-3"
              onClick={handleStartToggle}
            >
              {startButtonText}
            </div>
            ) : (
              <div>&nbsp;</div>
            )}
          </Nav> */}

          {/* <Nav className="me-3 justify-content-end">
            {!isConnected ? (
              <></>
            ) : (
              <div>
                {address.toLowerCase() === ownerAddress ? (
                  <>
                    <Popup
                      trigger={
                        <div className="ms-3 justify-content-end d-flex classicButton mt-3">
                          <spam className="me-2 text-nowrap">Inject Fund</spam>{" "}
                          <GiPayMoney size={25} />
                        </div>
                      }
                      modal
                    >
                      {(close) => (
                        <div className="modals">
                          <button className="close pb-2" onClick={close}>
                            &times;
                          </button>
                          <div className="content">
                            <div className="card-body classic_betting_body">
                              <form onSubmit={handleSubmit}>
                                <div className="classic_betting_body_bg">
                                  <div className="row  d-flex mt-2">
                                    <div className="col-lg-6">
                                      Max Amount To Inject
                                    </div>
                                    <div className="col-lg-6 text-end">
                                      {" "}
                                      {balance} {data?.symbol}
                                    </div>
                                  </div>
                                  <div className="row d-flex  mt-3">
                                    <div className="col-lg-6">Amount</div>
                                    <div className="col-lg-6">
                                      <input
                                        type="number"
                                        name="bettingAmount"
                                        id="bettingAmount"
                                        value={injectAmount}
                                        min="0"
                                        max={balanceAfterTransfer}
                                        onChange={(e) => {
                                          setInjectAmount(e.target.value);
                                        }}
                                        className="form-control w-100"
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex mt-3">
                                    <div className="col-lg-6">
                                      Balane After Transfer
                                    </div>
                                    <div
                                      className={`col-lg-6 text-end fw-bold  ${injectFundColorClass}`}
                                    >
                                      {balanceAfterTransfer} Matic
                                    </div>
                                  </div>
                                </div>

                                <div className="row text-center">
                                  <div className="col-lg-12">
                                    <button
                                      type="submit"
                                      className="bettingButton01 text-center"
                                      disabled={isSubmitDisabled}
                                      onClick={handleSubmit}
                                    >
                                      Inject Fund
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
            )}
          </Nav> */}

          
          <Nav className=" d-flex me-3">
            {!isConnected ? (
              ""
            ) : (
              <div>
                {address.toLowerCase() === ownerAddress ? (
                  <>
                    <div className="text-white justify-content-end d-flex fw-bold mt-2">
                      <span className="mt-1 me-2 text-nowrap">
                        Balance: {balance} {data?.symbol}
                      </span>{" "}
                      <GiCash className="flipped-horizontal" size={25} />
                    </div>
                  </>
                ) : (
                  <div className="d-flex w-100">
                    <div
                      className="mt-3 me-3 justify-content-end d-flex  classicButton "
                      onClick={blockchain.claimRewards}
                    >
                      <span className="me-0 mt-1">Claim</span>
                      <GiTakeMyMoney className="mb-2" size={25} />
                    </div>

                    <div className="text-white justify-content-end d-flex fw-bold mt-3">
                      <span className="mt-1 me-2 text-nowrap">
                        Balance: {balance} {data?.symbol}
                      </span>{" "}
                      <GiCash className="flipped-horizontal" size={25} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Nav>

          {/* <Nav className="me-3 ms-3">
            {isConnected ? (
              <div className="text-white justify-content-end d-flex fw-bold mt-2">
                <spam className="mt-1 me-2">
                  Balance: {balance} {data?.symbol}
                </spam>{" "}
                <GiCash className="flipped-horizontal" size={25} />
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
          </Nav> */}

          <Nav className="me-2">
            <div className="justify-content-end d-flex mt-1">
              {openAccountModal && (
                <button
                  className=" classicButton1 mt-2"
                  onClick={openAccountModal}
                  type="button"
                >
                  {truncate(address, 4, 4, 10)}
                </button>
              )}
              {openConnectModal && (
                <button
                  className={`ms-3 mt-2  classicButton1`}
                  onClick={openAccountModal || openConnectModal}
                  type="button"
                >
                  {openAccountModal ? "Wrong network     " : "Connect"}
                </button>
              )}

              {isConnected && chain.unsupported && openChainModal && (
                <button onClick={openChainModal} type="button">
                  Wrong Network
                </button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
