import { SquareArrowDownIcon, SquareArrowUpIcon } from "lucide-react";
import React from "react";

const InvestmentCard = ({
    title,
    amount,
    percentage,
    Icon,
    type = "neutral", // profit | loss | neutral
    active = false,
}) => {
    const isProfit = type === "profit";
    const isLoss = type === "loss";

    return (
        <div
            className={`
                relative rounded-2xl p-6 transition-all duration-300
                ${active
                    ? "bg-[#0E151D] text-white shadow-lg scale-[1.02] border border-gray-500"
                    : "bg-[#0E151D] text-white shadow-lg scale-[1.02] border border-gray-500"
                }
            `}
        >
            {/* Glow Accent */}
            {active && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            )}

            <div className="relative space-y-5">

                {/* Top Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className={`
                                w-10 h-10 flex items-center justify-center rounded-xl
                                ${active 
                                    ? "bg-white/20 text-white" 
                                    : "bg-blue-50 text-blue-600"
                                }
                            `}
                        >
                            <Icon className="w-5 h-5" />
                        </div>

                        <h3 className="text-sm font-medium opacity-80">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                    <div className="text-2xl font-bold tracking-tight">
                        {isLoss && "-"} {amount}
                    </div>

                    {/* Percentage */}
                    {percentage && percentage !== "—" && (
                        <div
                            className={`
                                inline-flex items-center gap-1 text-sm font-medium
                                ${isProfit && "text-emerald-500"}
                                ${isLoss && "text-red-500"}
                                ${type === "neutral" && "text-gray-400"}
                            `}
                        >
                            {isProfit && <SquareArrowUpIcon size={16} />}
                            {isLoss && <SquareArrowDownIcon size={16} />}
                            <span>{percentage}%</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentCard;