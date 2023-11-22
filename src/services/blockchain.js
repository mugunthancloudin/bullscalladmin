import abi from "../abis/src/contracts/BullsCall.sol/BullsCallPrediction.json";
import axios from "axios";
// import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import * as checkConnectionState from "../components/classic page/classicMode";
import Swal from "sweetalert2";


// function WalletBool() {
//   const { isConnected } = useAccount();
//   console.log(`wallet is ${isConnected}`);
// }
let success = "success";
let info = "info";
const minimumBalance = 0;
const { ethereum } = window;
const contractAddress = "0x9B9999381F3494AA6CE0c231c38D325f435dC961";
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "wss://flashy-rough-snowflake.matic-testnet.quiknode.pro/ee0480f322e2f011a467e1989a5689b567834c70/";
  

const provider = new ethers.providers.WebSocketProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    // reportError(error);
    // alert(error.message);
    reportError(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    let connectedAccount = setGlobalState(
      "connectedAccount",
      accounts[0]?.toLowerCase()
    );
    // console.log(connectedAccount);
    window.ethereum.on("chainChanged", (chainId) => {
      // window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
    }
  } catch (error) {
    reportError(error);
  }
};

//fetch owner address
const getContractOwner = async () => {
  try {
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await GetEthereumContract();
    const owner = await contract.owner();
    return owner;

    // return owner.toLowerCase();
  } catch (err) {
    // alert(err.message);
    reportError(err);
  }
};

const betBull = async (amount) => {
  try {
    const contract = await GetEthereumContract();
    let currentRound = await contract.currentEpoch();
    const connectedAccount = getGlobalState("connectedAccount");
    console.log(connectedAccount);
    let roundBetBull = await contract.BetBull(currentRound, {
      from: connectedAccount,
      value: ethers.utils.parseEther(amount),
    });

    let receiptUpStatus = await roundBetBull.wait();
    // console.log("Transaction hash:", roundBetBull.hash);
    let enterUpTransactionHash = roundBetBull.hash;

    alert_(success, enterUpTransactionHash);

    return roundBetBull.hash;
  } catch (error) {
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }

    // reportError(error.message);
  }
};

const betBear = async (amount) => {
  try {
    const contract = await GetEthereumContract();
    let currentRound = await contract.currentEpoch();
    const connectedAccount = getGlobalState("connectedAccount");
    let roundBetBear = await contract.BetBear(currentRound, {
      from: connectedAccount,
      value: ethers.utils.parseEther(amount),
    });

    let receiptDownStatus = await roundBetBear.wait();
    let enterDownTransactionHash = roundBetBear.hash;
    alert_(success, enterDownTransactionHash);
    let receiptStatus = await roundBetBear.wait();
    console.log("Transaction hash:", roundBetBear.hash);
    return roundBetBear.hash;
  } catch (error) {
    const errorMessage = error.message;
    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);
    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }
  }
};

// const FundsExtract=async()=>{
//   const contract =await  GetEthereumContract();

// }

const RoundStart = async () => {
  try {
    const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
    const connectedAccount = getGlobalState("connectedAccount");
    const start = await contract.RoundStart({ from: connectedAccount });
    let receiptStatus = await start.wait();
    console.log("Transaction hash:", start.hash);
    const pricedata = await getPythonPrice();
    return receiptStatus;
  } catch (error) {
    reportError(error);
  }
};

const gamePause = async () => {
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

  await contract.Pause();
};
const gameResume = async () => {
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

  await contract.Resume();
};

const getRoundDetails = async () => {
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
  let current_Round = await contract.currentEpoch();
  // console.log(parseInt(current_Round));
  // current_Round=parseInt(current_Round);
  const currentRound = await contract.Rounds(current_Round);
  // console.log(currentRound);
  // if(parseInt(current_Round)>1){
  const previousRound = await contract.Rounds(current_Round - 1);
  // }
  // if(parseInt(current_Round)>2){
  const executedRound = await contract.Rounds(current_Round - 2);
  // }

  let stageMapping = new Map([
    [
      "stageStart",
      new Map([
        ["epoch", currentRound[0].toString()],
        ["lockPrice", parseInt(currentRound[7].toString())],
        ["closePrice", parseInt(currentRound[8].toString())],
        ["startTimestamp", currentRound[9]],
        ["lockTimestamp", currentRound[10]],
        ["closeTimestamp", currentRound[11]],
        ["started", currentRound[12]],
        ["locked", currentRound[13]],
        ["closed", currentRound[14]],
        ["roundUpPayout", parseInt(currentRound[15].toString())],
        ["roundDownPayout",parseInt(currentRound[16].toString())],
        ["pricePool",parseInt(currentRound[1].toString())+parseInt(currentRound[2].toString())]
      ]),
    ],
    [
      "stageLock",
      new Map([
        ["epoch", previousRound[0].toString()],
        ["lockPrice", parseInt(previousRound[7].toString())],
        ["closePrice", parseInt(previousRound[8].toString())],
        ["startTimestamp", previousRound[9]],
        ["lockTimestamp", previousRound[10]],
        ["closeTimestamp", previousRound[11]],
        ["started", previousRound[12]],
        ["locked", previousRound[13]],
        ["closed", previousRound[14]],
        ["roundUpPayout", parseInt(previousRound[15].toString())],
        ["roundDownPayout",parseInt(previousRound[16].toString())],
        ["pricePool",parseInt(previousRound[1].toString())+parseInt(previousRound[2].toString())]
     
      ]),
    ],
    [
      "stageExecute",
      new Map([
        ["epoch", executedRound[0].toString()],
        ["lockPrice", parseInt(executedRound[7].toString())],
        ["closePrice", parseInt(executedRound[8].toString())],
        ["startTimestamp", executedRound[9]],
        ["lockTimestamp", executedRound[10]],
        ["closeTimestamp", executedRound[11]],
        ["started", executedRound[12]],
        ["locked", executedRound[13]],
        ["closed", executedRound[14]],
        ["roundUpPayout", parseInt(executedRound[15].toString())],
        ["roundDownPayout",parseInt(executedRound[16].toString())],
        ["pricePool",parseInt(executedRound[1].toString())+parseInt(executedRound[2].toString())]
      ]),
    ],
    [
      "stageCurrentPrice",
      new Map([
        ["currentPrice", ethers.utils.parseEther(await getPythonPrice())],
      ]),
    ],
  ]);
  const stageStartValues = stageMapping.get("stageExecute");
  // console.log(stageStartValues);
  return stageMapping;
};

//fetch all unclaimed reward of user
const getUserParticipatedRounds = async (userAddress) => {
  try {
    const contract = await GetEthereumContract();
    const owner = await contract.owner();
    const userRound = await contract.getUserParticipatedRounds(userAddress);
    const userRoundsNumbers = userRound.map((bigNumber) =>
      bigNumber.toNumber()
    );


    
    // console.log(userRoundsNumbers);
    return userRoundsNumbers;
  } catch (error) {
    reportError(error);
  }
};

const getUserUnclaimedRounds = async (userAddress) => {
  try {
    const contract = await GetEthereumContract();
    const userRounds = await contract.getUserParticipatedRounds(userAddress);
    const unclaimedRounds = [];

    for (const roundEpoch of userRounds) {
      const bet = await contract.Bets(roundEpoch, userAddress);
      const isClaimable = await contract.claimable(roundEpoch, userAddress);
      if (bet.amount > 0 && !bet.claimed && isClaimable) {
        // unclaimedRounds.push({
        //   epoch: roundEpoch.toNumber(),
        //   unclaimedAmount: bet.amount.toNumber(),
        // });
        unclaimedRounds.push(roundEpoch.toNumber());
      }
    }
    console.log(unclaimedRounds);
    return unclaimedRounds;
  } catch (error) {
    reportError(error);
  }
};

const claimRewards = async () => {
  try {
    // let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const contract = await GetEthereumContract();
    // const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
    const connectedAccount = getGlobalState("connectedAccount");
    const UserUnclaimedRounds = await getUserUnclaimedRounds(connectedAccount);
    console.log(UserUnclaimedRounds);
    const claim = await contract.Claim(UserUnclaimedRounds, {
      from: connectedAccount,
    });
    let cliamReceiptStatus = await claim.wait();
    let cliamTransactionHash = claim.hash;
    alert_(success, cliamTransactionHash);
    let receiptStatus = await claim.wait();
    console.log("Transaction hash:", claim.hash);
    return claim.hash;
  } catch (error) {
    const errorMessage = error.message;
    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);
    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }
  }
};

// const RoundLock = async (price) => {
//   try {
//     const contract = await GetEthereumContract();
//     await contract.RoundLock(price);
//   } catch (error) {
//     reportError(error);
//   }
// };

// const RoundExecute = async (price) => {
//   try {
//     const contract = await GetEthereumContract();
//     await contract.RoundExecute(price);
//   } catch (error) {
//     reportError(error);
//   }
// };

//to fetch live price data
const getPythonPrice = async () => {
  try {
    const apiUrl =
      "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
    const response = await axios.get(apiUrl);
    const livePrice = await response.data.price;
    // console.log( livePrice);
    return livePrice;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

//----------------------------------
const GetEthereumContract = async () => {

  const connectedAccount = getGlobalState("connectedAccount");
  // console.log(checkConnectionState);
  // const {isConnected} = useAccount();
  // console.log(connectedAccount);
  
  if (checkConnectionState) {
    //check whether device pc or mobile
    const provider = new ethers.providers.Web3Provider(ethereum);//pc
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // console.log(contract);
    return contract;
  } 
  else {
    // alert("error");
    console.log("wallet not connected");
    // return getGlobalState("mugunthan");
  }

  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const signer = provider.getSigner();
  // let contract = new ethers.Contract(contractAddress, contractAbi, signer);
  // return contract;
};

const fundInject = async (amount) => {
  try {
    const contract = await GetEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    console.log(typeof amount);
    // let amount=0.5
    const tx = await contract.FundsInject({
      value: ethers.utils.parseEther(amount.toString()), // Convert amount to wei
      from: connectedAccount,
    });

    await tx.wait();
    let injectFundTransactionHash = tx.hash;

    alert_(success, injectFundTransactionHash);

    // let injectFundStatus = await tx.wait();
    console.log("Transaction hash:", tx.hash);
    // return tx.hash;

    // console.log("Funds injected successfully.");
  } catch (error) {
    const errorMessage = error.message;
    const errorRe = /execution reverted: (.*?)"/;

    const errorMatch = errorRe.exec(errorMessage);
    console.log(errorMatch);
    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }
    // reportError(error);
  }
};

const fundExtract = async () => {
  try {
    const balanceWei = await provider.getBalance(contractAddress);

    // Convert balance from Wei to Ether
    const balanceInEther = ethers.utils.formatEther(balanceWei);

    let eligibleWithdrawalAmount = Math.abs(minimumBalance - balanceInEther);
    if (balanceInEther >= eligibleWithdrawalAmount) {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        wallet
      );
      const parsedValue = ethers.utils.parseUnits(
        eligibleWithdrawalAmount.toString(),
        18
      );
      console.log(parsedValue);

      const fundExtract = await contract.FundsExtract(parsedValue);

      let cliamReceiptStatus = fundExtract.wait();
      let extractFundTransactionHash = fundExtract.hash;

      alert_(success, extractFundTransactionHash);

      let extractFundStatus = await fundExtract.wait();
      console.log("Transaction hash:", fundExtract.hash);
      return fundExtract.hash;
    } else {
      console.log("cannot extract more than minimum amount");
    }
  } catch (error) {
    const errorMessage = error.message;
    const errorRe = /execution reverted: (.*?)"/;

    const errorMatch = errorRe.exec(errorMessage);
    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }
    console.log(error);
  }
};

const dashBoardData = async () => {
  let dashBoard = [];
  try {
    const contract = await GetEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    // console.log(typeof connectedAccount);
    
  //  if (connectedAccount!="") {
    let userStat = await contract.Users(connectedAccount);
    console.log(userStat);
    let netResult = parseInt(userStat[3]) + parseInt(userStat[5]);
    let bullBetAmount = parseInt(userStat[3]);
    let bearBetAmount = parseInt(userStat[5]);
    let bullBetCount = parseInt(userStat[2]);
    let bearBetCount = parseInt(userStat[4]);
    let totalPaidout = parseInt(userStat[7]);
    let userParticipatedRounds = await getUserParticipatedRounds(
      connectedAccount
    );
    console.log(userParticipatedRounds);
    let totalRounds = userParticipatedRounds.length;
    
    dashBoard[0] = netResult / 10 ** 18; //total amount betted
    dashBoard[1] = bullBetAmount / 10 ** 18; //total amount betted for bull
    dashBoard[2] = bearBetAmount / 10 ** 18; //total amount betted for bear
    dashBoard[3] = totalPaidout / 10 ** 18; //amount paidout in return
    dashBoard[4] = bullBetCount; //count of bull round
    dashBoard[5] = bearBetCount; //count of bear rounds
    dashBoard[6] = totalRounds; //total rounds participated
    dashBoard[7] = userParticipatedRounds; //array of user participated rounds
    dashBoard[8] = dashBoard[0] - dashBoard[3];
    console.log(dashBoard);
    // console.log(dashBoard);
    
  //  }
   return dashBoard;
  } catch (error) {
    reportError(error)
    // alert("please connect the wallet to access dashboard!!");
    return dashBoard;
  }
};

const roundHistory = async (epoch) => {
  try {
    const contract = await GetEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    const bets = await contract.Bets(epoch, connectedAccount);
    // let current_Round = await contract.currentEpoch();
    const currentRound = await contract.Rounds(epoch);

    let history = [];
console.log(bets);
    if (bets[0] == 0) {
      history.push("Bull");
    } else {
      history.push("Bear");
    }

    history.push(bets[0]); //bet position
    history.push(Number(bets[1].toString())); //bet timestamp
    history.push(Number(bets[3].toString()) / 10 ** 18); //amount betted in that round
    history.push(Number(currentRound[7].toString()) / 10 ** 8); //round lock price
    history.push(Number(currentRound[8].toString()) / 10 ** 8); //round close price
    history.push(Number(epoch));
    if (currentRound[14]) {
      if (history[0] == "Bull") {
        if (Number(history[4] < history[5])) {
          history.push("Won");
        } else {
          history.push("Lost");
        }
        // ['Bull', '0', 1694513484, 0.005, 0.5066, 0.5088, 347, 'Lost']
      } else {
        if (Number(history[4] > history[5])) {
          history.push("Won");
        } else {
          history.push("Lost");
        }
      }
    } else {
      history.push("Status pending");
    }


    console.log(history);
    return history;
  } catch (error) {}
};

const setLivePrice = async () => {
  try {
    const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
    let livePrice = await getPythonPrice();
    // let currentPrice=livePrice * 10 ** 8
    // return currentPrice
    const livePriceWei = ethers.utils.parseUnits(
      Number(livePrice).toString(),
      8
    );
    // let test=ethers.utils.parseUnits(
    //   ((Number(livePrice))).toString(),
    //   8
    // ).toString()
    // console.log(test);
    let price_ = await contract.SetPriceSource(livePriceWei);
    // await contract.SetPriceSource(1);
    await price_.wait();
    // console.log(await price_.hash);
    const price = await contract.getPriceSource();
    // console.log(Number(price));
    return Number(price);
    console.log(parseInt(price));
  } catch (error) {
    reportError(error);
  }
};

// const determineLoginSource = async () => {

//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
//   if (isMobile) { 
//     return true
//   } else {
//     return false
//   }
  
//   }

  const determineLoginSource = async () => {
    // Check the screen width to differentiate between mobile and desktop
    const isMobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let check
    if (isMobile_) {
      console.log("This is a mobile device");
      console.log("true");
      check="true"
      return check
    } else {
      console.log("This is a laptop/desktop computer");
      console.log("false");
      check="false"
      return check
    }
    }

const reportError = (error) => {
  console.log(error.message);
  // throw new Error("No ethereum object.");
};

const alert_ = (indication, hash) => {
  Swal.fire({
    position: "center",
    icon: indication,
    title: hash,
    showConfirmButton: true,
    focusCancel: false,
  });
};


// Swal.fire({
//   position: "center",
//   icon: "info",
//   title: err,
//   showConfirmButton: true,
//   inputAutoFocus: true,
// });

export {
  connectWallet,
  dashBoardData,
  getUserParticipatedRounds,
  getUserUnclaimedRounds,
  isWallectConnected,
  GetEthereumContract,
  betBear,
  betBull,
  getRoundDetails,
  RoundStart,
  gamePause,
  gameResume,
  getContractOwner,
  claimRewards,
  fundInject,
  fundExtract,
  setLivePrice,
  roundHistory,
  determineLoginSource,
  addAdminEntityAccess,
  removeAdminEntityAccess,
  getAllAdminEntity,
  changeCurrentAdminAccess,
};