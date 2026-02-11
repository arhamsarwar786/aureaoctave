import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import { ChevronRightIcon } from "lucide-react";
const NewCryptocurrency = () => {
    const [newCoins, setNewCoins] = useState([]);

    useEffect(() => {
        const fetchNewCoins = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/list"
                );
                // Assuming the API provides a `added_date` or similar attribute to determine new coins.
                const newCoinsData = response.data
                    .slice(0, 4)
                    .map((coin, index) => ({
                        ...coin,
                        addedDate: `${index + 2} days ago`, // Mocking added date for illustration
                    }));
                setNewCoins(newCoinsData);
            } catch (error) {
                console.error("Error fetching new coins:", error);
            }
        };

        fetchNewCoins();
    }, []);

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
                    {newCoins.map((coin, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="flex-1">
                                <div className="flex space-x-2">
                                    <div>
                                        <img
                                            // src={coin.image}
                                            // src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                                            src={`https://assets.coingecko.com/coins/images/${coin.id}/large/${coin.symbol}.png?1696501400`}
                                            alt={coin.name}
                                        />
                                    </div>
                                    <div>
                                        <h3>{coin.name}</h3>
                                        <p className="text-[12px]">
                                            Added {coin.addedDate}
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

export default NewCryptocurrency;
