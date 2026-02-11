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

export default function Dashboard({ auth, balance }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Dashboard">
            {/* Main Content Grid */}
            <div className="container mx-auto py-4 px-2">
                {/* TradingView Ticker Tape */}
                <TradingViewTickerTape />

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
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
                            <div className="p-6">
                                <TradingViewWidget />
                            </div>
                        </div>

                        {/* Live Market Table */}
                        <LiveMarketTable />
                    </div>

                    {/* Right Column (2 columns on desktop) */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Deposit and Withdrawal Buttons */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 space-y-4">
                                <Link
                                    href={route("deposit")}
                                    className="block w-full text-center py-3 bg-[#C58C42] rounded text-white border border-[#C58C42] text-lg font-bold hover:bg-[#B37B3A] transition-colors"
                                >
                                    Deposit
                                </Link>
                                <Link
                                    href={route("withdrawal")}
                                    className="block w-full text-center py-3 bg-white rounded text-[#2752E7] border border-[#2752E7] text-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Withdrawal
                                </Link>
                            </div>
                        </div>

                        {/* Buy/Sell Section */}
                        <BuySellSection />

                        {/* New Cryptocurrency Section */}
                        <NewCryptocurrency />

                        {/* Newly Added Section */}
                        <NewlyAddedSection />

                        {/* TradingView Widget 1 */}
                        <TradingViewWidget1 />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
