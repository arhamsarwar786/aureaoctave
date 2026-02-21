import React from "react";
import ETH from "@/assets/img/eth.png";
import BTC from "@/assets/img/btc.png";
import BNB from "@/assets/img/Group.png";
import LUNA from "@/assets/img/luna.png";
import ADA from "@/assets/img/ada.png";
import { Table } from "@radix-ui/themes";
import { Link } from "@inertiajs/react";
import { SquareArrowUpIcon } from "lucide-react";

const TrendingMarket = () => {
    const trendingMarket = [
        {
            img: BNB,
            name: "BNB",
            symbol: "BNB",
            lastPrice: "41,263.00",
            change: "35.75",
            cap: "784,393M",
        },
        {
            name: "Bitcoin",
            symbol: "BTC",
            img: BTC,
            lastPrice: "41,263.00",
            change: "35.75",
            cap: "784,393M",
        },
        {
            name: "Ethereum",
            symbol: "ETH",
            img: ETH,
            lastPrice: "41,263.00",
            change: "35.75",
            cap: "784,393M",
        },
        {
            name: "Terra",
            symbol: "LUNA",
            img: LUNA,
            lastPrice: "41,263.00",
            change: "35.75",
            cap: "784,393M",
        },
        {
            name: "Cardano",
            symbol: "ADA",
            img: ADA,
            lastPrice: "41,263.00",
            change: "35.75",
            cap: "784,393M",
        },
    ];
    return (
        <div className="mb-8">
            <div className="bg-[#0E151D] overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 space-y-4">
                    <header className="w-ful flex gap-5 flex-wrap items-center justify-between">
                        <h1 className="text-xl font-bold text-black ">
                            Trending Market
                        </h1>
                        <Link className="text-sm text-[#001B42]">
                            View more markets
                        </Link>
                    </header>
                    <main>
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>
                                        Token
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        Symbol
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        Last Price
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>
                                        24H Change
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-right">
                                        Market Cap
                                    </Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {trendingMarket.map((market, index) => (
                                    <Table.Row key={index}>
                                        <Table.RowHeaderCell>
                                            <div className="flex space-x-2">
                                                <img src={market.img} />
                                                <span>{market.name}</span>
                                            </div>
                                        </Table.RowHeaderCell>
                                        <Table.Cell>{market.symbol}</Table.Cell>
                                        <Table.Cell>
                                            ${market.lastPrice}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="text-[#53D258] space-x-1 inline-flex items-center">
                                                <SquareArrowUpIcon className="inline-block" />
                                                <span>+{market.change}%</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="text-right">
                                            ${market.cap}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TrendingMarket;
