import { SquareArrowDownIcon, SquareArrowUpIcon } from "lucide-react";
import React from "react";

const InvestmentCard = ({
    title,
    amount,
    percentage,
    Icon,
    type,
    active = false,
}) => {
    return (
        <div
            className={`${
                active ? "bg-[#001B42]" : "bg-white"
            } overflow-hidden shadow-sm sm:rounded-lg w-full`}
        >
            <div
                className={`p-5 ${
                    active ? "text-white" : "text-black"
                } space-y-4`}
            >
                <div className="flex flex-nowrap gap-5">
                    <div className="inline-flex items-center gap-5 flex-1">
                        <div
                            className={`relative size-8 ${
                                active ? "bg-white" : "bg-[#D0DBFF]"
                            } inline-flex items-center justify-center text-[#001B42] rounded-full`}
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-lg font-bold">{title}</div>
                    </div>
                    <div>
                        {type === "profit" ? (
                            <svg
                                width="41"
                                height="41"
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.0789 9.52301C2.65369 13.3335 8.62044 19.4255 0.5 21.0076V40.0186H40.5V0.0185547C35.6564 2.86352 31.9081 14.7202 27.1121 17.6534C19.7141 22.1777 17.7687 5.57667 10.0789 9.52301Z"
                                    fill="url(#paint0_linear_851_3591)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_851_3591"
                                        x1="21"
                                        y1="-89"
                                        x2="21"
                                        y2="40"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#53D258" />
                                        <stop
                                            offset="1"
                                            stopColor="#53D258"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : (
                            <svg
                                width="41"
                                height="41"
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M30.9211 9.52301C38.3463 13.3335 32.3796 19.4255 40.5 21.0076V40.0186H0.5V0.0185547C5.34364 2.86352 9.09185 14.7202 13.8879 17.6534C21.2859 22.1777 23.2313 5.57667 30.9211 9.52301Z"
                                    fill="url(#paint0_linear_851_3609)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_851_3609"
                                        x1="20"
                                        y1="-89"
                                        x2="20"
                                        y2="40"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#E25C5C" />
                                        <stop
                                            offset="1"
                                            stopColor="#E25C5C"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="font-bold text-xl">
                        {type !== "profit" && "-"} {amount}
                    </div>
                    <div
                        className={`${
                            type === "profit"
                                ? "text-[#53D258]"
                                : "text-[#E25C5C]"
                        } space-x-1 inline-flex items-center`}
                    >
                        {type === "profit" ? (
                            <SquareArrowUpIcon className="inline-block" />
                        ) : (
                            <SquareArrowDownIcon className="inline-block" />
                        )}

                        <span>{percentage}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentCard;
