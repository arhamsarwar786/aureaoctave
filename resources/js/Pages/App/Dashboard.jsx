import ForexChart from "@/Components/App/Charts/ForexChart";
import BuySellSection from "@/Components/App/Dashboard/BuySellSection";
import LiveMarketTable from "@/Components/App/Dashboard/LiveMarketTable";
import NewCryptocurrency from "@/Components/App/Dashboard/NewCryptoCurrency";
import NewlyAddedSection, {
    TradingViewWidget1,
} from "@/Components/App/Dashboard/NewlyAddedSection";
import TradingViewTickerTape from "@/Components/App/Dashboard/TradingViewTickerTape";
import TrendingMarket from "@/Components/App/Dashboard/TrendingMarket";
import InvestmentCard from "@/Components/App/InvestmentCard";
import TradingViewWidget from "@/Components/App/TradingViewWidget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount } from "@/libs/utils";
import { Head, Link } from "@inertiajs/react";
import { CornerDownRightIcon, HandCoinsIcon, WalletIcon } from "lucide-react";

const quickLinks = [
    { label: "Dashboard", href: route("dashboard") },
    { label: "Wallet", href: route("deposit") },
    { label: "Portfolio", href: route("portfolio") },
    { label: "History", href: route("history") },
    { label: "Investment", href: route("investment-package.index") },
];

export default function Dashboard({ auth, balance }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Dashboard">
            {/* Main Content Grid */}
            <div className="container mx-auto py-4 px-2">
                <div className="mb-6 rounded-2xl border border-white/10 bg-[#0E151D] p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Quick Access
                            </h2>
                            <p className="mt-1 text-sm text-white/60">
                                Jump straight to the pages available in your account.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {quickLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-medium text-white transition-colors hover:border-[#3BF5C4]/40 hover:bg-[#3BF5C4]/10 hover:text-[#3BF5C4]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* TradingView Ticker Tape */}
                {/* <TradingViewTickerTape /> */}

                <div className="grid grid-cols-1  gap-5">
                    {/* Left Column (4 columns on desktop) */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Investment Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <InvestmentCard
                                title="Balance"
                                amount={formatAmount(balance)}
                                percentage="35.74"
                                Icon={WalletIcon}
                                type="profit"
                                active={true}
                            />
                            <InvestmentCard
                                title="Investment P/L"
                                amount="$40000"
                                percentage="35.74"
                                Icon={CornerDownRightIcon}
                                type="loss"
                            />
                            <InvestmentCard
                                title="Equity"
                                amount="$40000"
                                percentage="35.74"
                                Icon={HandCoinsIcon}
                                type="profit"
                            />
                        </div>

                        {/* TradingView Widget */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-[#0E151D]">
                                <TradingViewWidget />
                            </div>
                        </div>

                        {/* Live Market Table */}
                        <LiveMarketTable />
                    </div>

                    {/* Right Column (2 columns on desktop) */}
                    {/* <div className="lg:col-span-2 space-y-5"> */}
                        {/* Deposit and Withdrawal Buttons */}
                        {/* <div className="bg-[#0E151D] border border-gray-500 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 space-y-4">
                                <Link
                                    href={route("deposit")}
                                    className="block w-full text-center py-3 bg-[#3BF5C4] rounded text-black border border-[#3BF5C4] text-lg font-bold hover:bg-[#84f1d4] transition-colors"
                                >
                                    Deposit
                                </Link>
                                <Link
                                    href={route("withdrawal")}
                                    className="block w-full text-center py-3 bg-black rounded text-[#3BF5C4] border border-[#3BF5C4] text-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Withdrawal
                                </Link>
                            </div>
                        </div> */}

                        {/* Buy/Sell Section */}
                        {/* <BuySellSection /> */}

                        {/* New Cryptocurrency Section */}
                        {/* <NewCryptocurrency /> */}

                        {/* Newly Added Section */}
                        {/* <NewlyAddedSection /> */}

                        {/* TradingView Widget 1 */}
                        {/* <TradingViewWidget1 /> */}
                    {/* </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
