import { Link } from "@inertiajs/react";
import { ChevronRightIcon } from "lucide-react";
import LTC from "@/assets/img/ltc.png";
import GXS from "@/assets/img/gxs.png";
import HODL from "@/assets/img/hodl.png";
import ETC from "@/assets/img/etc.png";
import React, { useEffect, useRef, memo } from "react";
const NewlyAddedSection = () => {
    const newlyAdded = [
        {
            name: "Litecoin",
            img: LTC,
            date: "Added 2 days ago",
        },
        {
            name: "Euthereum Classic",
            img: ETC,
            date: "Added 2 days ago",
        },
        {
            name: "H0dlcoin",
            img: HODL,
            date: "Added 2 days ago",
        },
        {
            name: "GXchain",
            img: GXS,
            date: "Added 2 days ago",
        },
    ];
    return (
        <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 space-y-5">
                <header className="w-ful flex gap-5 flex-wrap items-center justify-between">
                    <h1 className="text-xl font-bold text-black ">
                        Newly Cryptocurrency
                    </h1>
                    <Link className="text-sm text-[#001B42]">See All</Link>
                </header>
                <main className="space-y-5">
                    {newlyAdded.map((newly, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="flex-1">
                                <div className="flex space-x-2">
                                    <div>
                                        <img src={newly.img} alt={newly.name} />
                                    </div>
                                    <div>
                                        <h3>{newly.name}</h3>
                                        <p className="text-[12px]">
                                            {newly.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-5">
                                <Link className="">
                                    <ChevronRightIcon />
                                </Link>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default NewlyAddedSection;

export const TradingViewWidget1 = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                ["Apple", "AAPL|1D"],
                ["Google", "GOOGL|1D"],
                ["Microsoft", "MSFT|1D"],
                ["BITSTAMP:BTCUSD|1D"],
                ["NASDAQ:TSLA|1D"],
                ["TVC:GOLD|1D"],
            ],
            chartOnly: false,
            width: "100%",
            height: "100%",
            locale: "en",
            colorTheme: "light",
            autosize: true,
            showVolume: false,
            showMA: false,
            hideDateRanges: false,
            hideMarketStatus: false,
            hideSymbolLogo: false,
            scalePosition: "right",
            scaleMode: "Normal",
            fontFamily:
                "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            fontSize: "10",
            noTimeScale: false,
            valuesTracking: "1",
            changeMode: "price-and-percent",
            chartType: "area",
            maLineColor: "#2962FF",
            maLineWidth: 1,
            maLength: 9,
            lineWidth: 2,
            lineType: 0,
            dateRanges: [
                "1d|1",
                "1m|30",
                "3m|60",
                "12m|1D",
                "60m|1W",
                "all|1M",
            ],
        });

        document
            .getElementById("tradingview-widget-container")
            .appendChild(script);
    }, []);

    return (
        <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div
                className="tradingview-widget-container newly-added"
                id="tradingview-widget-container"
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
             */}
            </div>
        </div>
    );
};
