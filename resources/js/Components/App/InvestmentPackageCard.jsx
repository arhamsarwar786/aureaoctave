import { SquareArrowDownIcon, SquareArrowUpIcon } from "lucide-react";
import React from "react";

const InvestmentPackageCard = ({
    title,
    caption,
    active = false,
    children,
}) => {
    return (
        <div
            className={`overflow-hidden bg-white border shadow-sm sm:rounded-lg mb-8`}
        >
            <div
                className={`${
                    active
                        ? "bg-[#001B42] text-white"
                        : "bg-[#F5F8FE] text-black"
                } py-8 px-6 min-h-32`}
            >
                <h1 className="font-bold text-2xl">{title}</h1>
                <h3 className="font-bold text-lg">{caption}</h3>
            </div>
            <div className={`p-5 space-y-10 `}>
                <div className="relative">
                    <div>{children}</div>
                </div>
                <div className="relation">
                    <button className="relative w-full flex min-h-14 items-center justify-center bg-white rounded text-[#001B42] border border-[#001B42]">
                        <span className="text-lg font-bold">Select Offer</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPackageCard;
