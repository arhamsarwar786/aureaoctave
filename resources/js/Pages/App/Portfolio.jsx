import InvestmentCard from "@/Components/App/InvestmentCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HandCoinsIcon, WalletIcon, TrendingUpIcon, BanknoteIcon } from "lucide-react";

export default function Dashboard({ auth }) {
    const portfolioStats = [
        {
            title: "Total Equity",
            amount: "$40,000",
            percentage: "12.4",
            Icon: TrendingUpIcon,
            type: "profit",
        },
        {
            title: "Investment P/L",
            amount: "$4,200",
            percentage: "5.3",
            Icon: WalletIcon,
            type: "profit",
        },
        {
            title: "Total Deposits",
            amount: "$25,000",
            percentage: "—",
            Icon: BanknoteIcon,
            type: "neutral",
        },
        {
            title: "Total Withdrawals",
            amount: "$8,000",
            percentage: "—",
            Icon: HandCoinsIcon,
            type: "loss",
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user} title="My Portfolio">
            <div className="space-y-8">

                {/* ===== Header Section ===== */}
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Welcome back, {auth.user.name}
                    </h1>
                    <p className="text-sm text-white mt-1">
                        Here's a summary of your portfolio performance
                    </p>
                </div>

                {/* ===== Stats Cards ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolioStats.map((stat, index) => (
                        <InvestmentCard
                            key={index}
                            title={stat.title}
                            amount={stat.amount}
                            percentage={stat.percentage}
                            Icon={stat.Icon}
                            type={stat.type}
                        />
                    ))}
                </div>

                {/* ===== Analytics Section ===== */}
                <div className="bg-[#0E151D] shadow-sm rounded-xl border border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-700 bg-[#0E151D] rounded-t-xl">
                        <h2 className="font-semibold text-white">
                            Portfolio Analytics
                        </h2>
                    </div>

                    <div className="p-6 min-h-[400px] flex items-center justify-center text-gray-400">
                        {/* Replace this with ForexChart or any analytics chart */}
                        Portfolio chart coming soon...
                    </div>
                </div>

                {/* ===== Recent Activity Section ===== */}
                <div className="bg-[#0E151D] shadow-sm rounded-xl border border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-700 bg-[#0E151D] rounded-t-xl">
                        <h2 className="font-semibold text-white">
                            Recent Activity
                        </h2>
                    </div>

                    <div className="p-6 text-gray-500">
                        No recent transactions yet.
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}