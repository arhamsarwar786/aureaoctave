import { Link } from "@inertiajs/react";
import { ChevronRightIcon } from "lucide-react";
import LTC from "@/assets/img/ltc.png";
import GXS from "@/assets/img/gxs.png";
import HODL from "@/assets/img/hodl.png";
import ETC from "@/assets/img/etc.png";
import React, { useEffect } from "react";

// ================= Newly Added Section =================
const newlyAdded = [
    {
        name: "Litecoin",
        img: LTC,
        date: "Added 2 days ago",
    },
    {
        name: "Ethereum Classic",
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

const NewlyAddedSection = () => {
    return (
        <div className="mb-8 bg-[#0E151D] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 space-y-5">
                <header className="w-full flex gap-5 flex-wrap items-center justify-between">
                    <h1 className="text-xl font-bold text-white">
                        Newly Added Cryptocurrency
                    </h1>
                    <Link
                        href="/newly-added"
                        className="text-sm text-[#3AF5C4] hover:underline"
                    >
                        See All
                    </Link>
                </header>
                <main className="space-y-5">
                    {newlyAdded.map((newly, index) => (
                        <div
                            className="flex items-center justify-between"
                            key={index}
                        >
                            <div className="flex items-center space-x-2 flex-1">
                                <img
                                    src={newly.img}
                                    alt={newly.name}
                                    className="w-10 h-10 rounded-full"
                                    loading="lazy"
                                />
                                <div>
                                    <h3 className="font-medium text-white">{newly.name}</h3>
                                    <p className="text-[12px] text-white">
                                        {newly.date}
                                    </p>
                                </div>
                            </div>
                            <Link>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                            </Link>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

// ================= TradingView Widget =================
export const TradingViewWidget1 = () => {
    useEffect(() => {
        const container = document.getElementById(
            "tradingview-widget-container"
        );
        if (!container) return;

        // Clear previous content
        container.innerHTML = "";

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.async = true;

        // TradingView widget config
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
            dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
        });

        container.appendChild(script);
    }, []);

    return (
        <div className="mb-8 bg-[#0E151D] overflow-hidden shadow-sm sm:rounded-lg">
            <div
                className="tradingview-widget-container w-full h-64"
                id="tradingview-widget-container"
            >
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
};

export default NewlyAddedSection;