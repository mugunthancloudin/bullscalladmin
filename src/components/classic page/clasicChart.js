import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function ClasicChart() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_e6c1b") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          symbol: "BINANCE:MATICUSDT",
          autosize: true,
          interval: "D",
          timezone: "Asia/Colombo",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: "tradingview_e6c1b",
        });
      }
    }
  }, []);

  return (
    <>
      <div className="container-fluid mugunth mt-2 mb-2">
        <div className="row">
          <div className="col-lg-12 p-0 m-0 mt-2">
            <div className="tradingview-widget-container">
              <div
                id="tradingview_e6c1b"
                style={{ width: "100%", height:500}}
              />
            
            </div>
          </div>
          {/* <div className="col-lg-0">&nbsp</div> */} 
          {/* <div className="col-lg-3 text-center pt-5 text-white bg-dark">
            <h1>Development under progress<br></br>.<br></br>.<br></br>.</h1>
          </div> */}
        </div>
      </div>
    </>
  );
}
