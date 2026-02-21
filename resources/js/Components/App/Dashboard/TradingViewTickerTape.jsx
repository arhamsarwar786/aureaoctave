import React, { useEffect } from "react";

const TradingViewTickerTape = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                {
                    proName: "FOREXCOM:SPXUSD",
                    title: "S&P 500 Index",
                },
                {
                    proName: "FOREXCOM:NSXUSD",
                    title: "US 100 Cash CFD",
                },
                {
                    proName: "FX_IDC:EURUSD",
                    title: "EUR to USD",
                },
                {
                    proName: "BITSTAMP:BTCUSD",
                    title: "Bitcoin",
                },
                {
                    proName: "BITSTAMP:ETHUSD",
                    title: "Ethereum",
                },
                {
                    description: "Gold",
                    proName: "TVC:GOLD",
                },
                {
                    description: "NVDA",
                    proName: "NASDAQ:NVDA",
                },
                {
                    description: "TSLA",
                    proName: "NASDAQ:TSLA",
                },
                {
                    description: "Apple",
                    proName: "NASDAQ:AAPL",
                },
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: "adaptive",
            colorTheme: "dark",
            locale: "en",
        });

        document
            .getElementById("tradingview-ticker-tape-container")
            .appendChild(script);
    }, []);

    return (
        <div
            className="tradingview-widget-container ticker-tap mb-8 bg-[#0E151D] "
            id="tradingview-ticker-tape-container"
        >
            <div className="tradingview-widget-container__widget"></div>
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
};

export default TradingViewTickerTape;
