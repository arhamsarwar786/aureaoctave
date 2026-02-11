import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
    }, []);

    return (
        <div
            className="tradingview-widget-container chart"
            ref={container}
            style={{ height: "24rem !important", width: "100%" }}
        >
            <div
                className="tradingview-widget-container__widget"
                style={{ height: "24rem !important", width: "100%" }}
            ></div>
            {/* <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">
                        Track all markets on TradingView
                    </span>
                </a>
            </div> */}
        </div>
    );
}

export default memo(TradingViewWidget);
