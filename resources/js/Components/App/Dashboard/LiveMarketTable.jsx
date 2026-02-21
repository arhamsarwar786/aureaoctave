import React, { useState, useEffect } from "react";
import axios from "axios";
import ETH from "@/assets/img/eth.png";
import BTC from "@/assets/img/btc.png";
import BNB from "@/assets/img/Group.png";
import LUNA from "@/assets/img/luna.png";
import ADA from "@/assets/img/ada.png";
import { Table } from "@radix-ui/themes";
import { Link } from "@inertiajs/react";
import { SquareArrowDownIcon, SquareArrowUpIcon } from "lucide-react";

const LiveMarketTable = () => {
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 10,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );
                setMarketData(response.data);
            } catch (error) {
                console.error("Error fetching market data:", error);
            }
        };

        fetchMarketData();

        const intervalId = setInterval(fetchMarketData, 60000); // Refresh every 60 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <div className="mb-8">
                <div className="bg-[#0E151D] overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 space-y-4 bg-[#0E151D]">
                        <header className="w-ful flex gap-5 flex-wrap items-center justify-between">
                            <h1 className="text-xl font-bold text-white ">
                                Trending Market
                            </h1>
                            <Link className="text-sm text-white">
                                View more markets
                            </Link>
                        </header>
                        <main>
                            <Table.Root>
                                <Table.Header >
                                    <Table.Row >
                                        <Table.ColumnHeaderCell className="text-white">
                                            Token
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell  className="text-white">
                                            Symbol
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell  className="text-white">
                                            Last Price
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell  className="text-white">
                                            24H Change
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className="text-right text-white">
                                            Market Cap
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {marketData.map((coin, index) => (
                                        <Table.Row key={index}>
                                            <Table.RowHeaderCell>
                                                <div className="flex items-center space-x-2">
                                                    <img
                                                        src={coin.image}
                                                        className="size-6"
                                                    />
                                                    <span className="text-white">{coin.name}</span>
                                                </div>
                                            </Table.RowHeaderCell>
                                            <Table.Cell className="text-white">
                                                {coin.symbol.toUpperCase()}
                                            </Table.Cell>
                                            <Table.Cell className="text-white">
                                                $
                                                {coin.current_price.toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div
                                                    className={`${
                                                        coin.price_change_percentage_24h >
                                                        0
                                                            ? "text-[#53D258]"
                                                            : "text-[#E25C5C]"
                                                    } space-x-1 inline-flex items-center`}
                                                >
                                                    {coin.price_change_percentage_24h >
                                                    0 ? (
                                                        <SquareArrowUpIcon className="inline-block" />
                                                    ) : (
                                                        <SquareArrowDownIcon className="inline-block" />
                                                    )}
                                                    <span>
                                                        {coin.price_change_percentage_24h.toFixed(
                                                            2
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-right text-white">
                                                $
                                                {coin.market_cap.toLocaleString()}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMarketTable;
