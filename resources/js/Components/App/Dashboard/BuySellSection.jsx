import { Flex, Select } from "@radix-ui/themes";
import { RepeatIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

const BuySellSection = () => {
    const [tab, setTab] = useState("buy");

    return (
        <div className="mb-8 bg-[#0E151D] border border-gray-500 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 space-y-4">
                <div className="relative grid grid-cols-2 divide-x">
                    <button
                        className={`${
                            tab === "buy" ? "text-[#3AF5C4]" : "text-[#A9A9A9]"
                        } w-full p-3 text-lg font-semibold transition delay-150`}
                        onClick={() => setTab("buy")}
                    >
                        Buy
                    </button>
                    <button
                        className={`${
                            tab === "sell" ? "text-[#3AF5C4]" : "text-[#A9A9A9]"
                        } w-full p-3 text-lg font-semibold transition delay-150`}
                        onClick={() => setTab("sell")}
                    >
                        Sell
                    </button>
                </div>
                <div className="text-center relative py-1">
                    <h2 className="text-[#A9A9A9] text-lg">Ethereum Price</h2>
                    <h1 className="text-white text-2xl font-bold">$3110,31</h1>
                </div>
                <div className="relative space-y-5">
                    <div className="border rounded w-full overflow-hidden min-h-12">
                        <div className="flex gap-4 items-center min-h-12">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="0.1824"
                                    className="w-full min-h-12 border-none outline-none"
                                />
                            </div>
                            <div className="w-20 text-white">lore</div>
                        </div>
                    </div>

                    <div className="absolute !m-[0] !-mt-3 flex items-center justify-center w-full">
                        <div className="border w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <RepeatIcon className="rotate-90 text-[#001B42]" />
                        </div>
                    </div>

                    <div className="border rounded w-full overflow-hidden min-h-12">
                        <div className="flex items-center min-h-12">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="0.1824"
                                    className="w-full min-h-12 border-none outline-none text-[#001B42]"
                                />
                            </div>
                            <div className="w-20 text-white ">
                                <Select.Root defaultValue="apple" >
                                    <Select.Trigger variant="ghost" />
                                    <Select.Content>
                                        <Select.Item value="carrot">
                                            Carrot
                                        </Select.Item>
                                        <Select.Item value="potato">
                                            Potato
                                        </Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="relative w-full flex min-h-14 items-center justify-center bg-[#3AF5C4] rounded text-black border border-[#C58C42]">
                    <div className="text-lg font-bold ">Buy ETH</div>
                </button>
            </div>
        </div>
    );
};

export default BuySellSection;
