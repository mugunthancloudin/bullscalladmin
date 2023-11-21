import React, { useEffect,useState } from "react";
import { Navbar } from "react-bootstrap";
import { FaChartLine, FaHistory } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import * as blockchain from "../../services/blockchain";


export default function Dashboardclassic() {
  const [dashboardDetails, setDashboardDetails] = useState([]);
  // console.log(dashboardDetails);
  const [partispatedRoundHistory, setPartispatedRoundHistory] = useState([]);
  console.log(partispatedRoundHistory);

  const [selectedRound, setSelectedRound] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalAmountBedded = dashboardDetails[0];
  const totalAmountBeddedForBull = dashboardDetails[1];
  const totalAmountBeddedForBear = dashboardDetails[2];
  const amountPaidInReturn = dashboardDetails[3];
  const countOfBullRound = dashboardDetails[4];
  const countOfBearRound = dashboardDetails[5];
  const totalRoundPartispated = dashboardDetails[6];
  const roundHistory = dashboardDetails[7];
  // console.log(roundHistory);

  const userRoundHistory = async (item) => {
    let partispatedRoundDetails = await blockchain.roundHistory(item);
    setPartispatedRoundHistory(partispatedRoundDetails);
    // console.log(partispatedRoundDetails);
    setSelectedRound(item);

    // console.log(`Type of 'item': ${typeof item}`);
    // alert(`User clicked on Round  ${item}`);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    let dashBoardData = await blockchain.dashBoardData();
    // console.log(dashBoardData);
    if (dashBoardData.length <= 0) {
      alert("no Round History");
    } else {
      setDashboardDetails(dashBoardData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const timestampMilliseconds = partispatedRoundHistory[2];

  const date = new Date(timestampMilliseconds * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // console.log(formattedDate);
  return (
    <>
      {!loading ? (
        <div className="container-fluid mt-3">
          <div className="row dashboard_bg">
            <div className="col-lg-6 mt-3 mb-3  text-center ">
              <div className="row">
                <h5>PLAYER DASHBOARD</h5>
              </div>

              <div className="card  ">
                <div className="card-header text-white dashboard_header">
                  <div className="col-lg-4  fw-bold d-flex">
                    <FaChartLine color="white" size="25px" className="" />
                    <span className="ms-3">STATS/PNL</span>
                  </div>
                </div>

                <div className="card-body rounded-bottom-3 dashboard_bg">
                  <div className="row text-center fw-bold mt-3">
                    <div className="col-lg-6">AVERAGE RETURN</div>
                    <div className="col-lg-6 text-success">
                      {amountPaidInReturn} MATIC
                    </div>
                  </div>

                  <div className="row text-center fw-bold mt-5">
                    <div className="col-lg-6">TOTAL BULL AMOUNT</div>
                    <div className="col-lg-6 text-success">
                      {totalAmountBeddedForBull} MATIC
                    </div>
                  </div>

                  <div className="row text-center fw-bold mt-5">
                    <div className="col-lg-6">TOTAL BEAR AMOUNT</div>
                    <div className="col-lg-6 text-success">
                      {totalAmountBeddedForBear} MATIC
                    </div>
                  </div>
                  <div className="row text-center fw-bold mt-5">
                    <div className="col-lg-6">Total ROUND AMOUNT</div>
                    <div className="col-lg-6 text-success">
                      {totalAmountBedded} MATIC
                    </div>
                  </div>
                  <div className="row text-center fw-bold mt-5">
                    <div className="col-lg-6">Total BULL ROUNDS</div>
                    <div className="col-lg-6 text-success">
                      {countOfBullRound} Rounds
                    </div>
                  </div>

                  <div className="row text-center fw-bold mt-5">
                    <div className="col-lg-6">Total BEAR ROUNDS</div>
                    <div className="col-lg-6 text-success">
                      {countOfBearRound} Rounds
                    </div>
                  </div>
   
                  <div className="row text-center fw-bold mt-5 mb-4 pb-2">
                    <div className="col-lg-6">TOTAL ROUNDS</div>
                    <div className="col-lg-6 text-success">
                      {totalRoundPartispated} Rounds
                    </div>
                  </div>

                  {/* <div className="card border border-light  mt-4">
                  <div className="col-lg-12 rounded-top-3  dashboard_header">
                    <div className="col-lg-4 mt-3 ms-3 mb-3 fw-bold d-flex">
                      <BsCheckCircle color="white" size="25px" className="" />
                      <span className="ms-3 text-white">SUMMARY</span>
                    </div>
                  </div>

                  <div className="col-lg-12 d-flex text-success dashboard_summary_card fw-bold">
                    <div className="col-lg-6  mt-3 ms-3 mb-3">WON 0 ROUNDS</div>
                    <div className="col-lg-6 mt-3">0.000000 MATIC </div>
                  </div>
                  <div className="col-lg-12 d-flex text-danger dashboard_summary_card01 fw-bold">
                    <div className="col-lg-6  mt-3 ms-3 mb-3">
                      LOST 0 ROUNDS
                    </div>
                    <div className="col-lg-6 mt-3">0.000000 MATIC </div>
                  </div>
                  <div className="col-lg-12 rounded-bottom-3  d-flex text-light dashboard_summary_card  fw-bold">
                    <div className="col-lg-6  mt-3 ms-3 mb-3">
                      ENTERED {totalRoundPartispated} ROUNDS(%NaN)
                    </div>
                    <div className="col-lg-6 mt-3">
                      MATIC{" "}
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6  mt-3 mb-3 text-center ">
              <div className="row">
                <h5>PLAYER HISTORY</h5>
              </div>
              <div className="card">
                <div className="card-header  text-white dashboard_header">
                  <div className="col-lg-12 rounded-bottom-3 fw-bold d-flex">
                    <FaHistory color="white" size="25px" className="" />
                    <span className="ms-3 ">ROUND HISTORY</span>
                  </div>
                </div>
                <div className="card-body rounded-bottom-3 dashboard_bg ">
                  <div className="row fw-bold">
                    <div className="col-lg-6">
                      <h6>PARTICIPATED ROUNDS</h6>
                    </div>
                    <div className="col-lg-12 scrollable">
                      {roundHistory.map((item, index) => (
                        <div key={index} className="">
                          <button
                            className="mt-2 dashboard_button"
                            onClick={() => userRoundHistory(item)}
                          >
                            Round {item}
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedRound !== null && (
                      <div className="mt-4">
                        <div className="col-lg-12  pt-1 pb-1 rounded-top-3  dashboard_header">
                          <div className="col-lg-8 mt-3 ms-3 mb-3 fw-bold d-flex">
                            <BsCheckCircle
                              color="white"
                              size="25px"
                              className=""
                            />
                            <span className="ms-2 d-flex text-white">
                              Round Number {partispatedRoundHistory[6]}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card text-white fw-bold pt-2 pb-2">
                          <div className="col-lg-6 ">Bet position</div>
                          <div className="col-lg-6">
                            {partispatedRoundHistory[0]}
                          </div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card01 text-white fw-bold pt-2 pb-2">
                          <div className="col-lg-6"> Betting date </div>                          <div className="col-lg-6">{formattedDate}</div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card text-white fw-bold pt-2 pb-2">
                          <div className="col-lg-6"> Amount Betted</div>
                          <div className="col-lg-6">
                            {partispatedRoundHistory[3]} MATIC
                          </div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card01 text-white fw-bold pt-2 pb-2">
                          <div className="col-lg-6">Round Lock Price </div>
                          <div className="col-lg-6">
                            {partispatedRoundHistory[4]} MATIC
                          </div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card text-white fw-bold rounded-bottom pt-2 pb-2">
                          <div className="col-lg-6">Round close price</div>
                          <div className="col-lg-6">
                            {partispatedRoundHistory[5]} MATIC
                          </div>
                        </div>

                        <div className="col-lg-12  d-lg-flex dashboard_summary_card text-white fw-bold rounded-bottom pt-2 pb-2">
                          <div className="col-lg-6">Round status</div>
                          <div className="col-lg-6">
                            {partispatedRoundHistory[7]}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
