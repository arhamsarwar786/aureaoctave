import InvestmentCard from "@/Components/App/InvestmentCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HandCoinsIcon, WalletIcon } from "lucide-react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} title="My Portfolio">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <InvestmentCard
                    title="Equity"
                    amount="$40000"
                    percentage="35.74"
                    Icon={HandCoinsIcon}
                    type="profit"
                />
                <InvestmentCard
                    title="Investment P/L"
                    amount="$40000"
                    percentage="35.74"
                    Icon={WalletIcon}
                    type="loss"
                />
                <InvestmentCard
                    title="Equity"
                    amount="$40000"
                    percentage="35.74"
                    Icon={HandCoinsIcon}
                    type="profit"
                />

                <InvestmentCard
                    title="Investment P/L"
                    amount="$40000"
                    percentage="35.74"
                    Icon={WalletIcon}
                    type="loss"
                />

                <InvestmentCard
                    title="Equity"
                    amount="$40000"
                    percentage="35.74"
                    Icon={HandCoinsIcon}
                    type="profit"
                />
                <InvestmentCard
                    title="Investment P/L"
                    amount="$40000"
                    percentage="35.74"
                    Icon={WalletIcon}
                    type="loss"
                />

                <InvestmentCard
                    title="Equity"
                    amount="$40000"
                    percentage="35.74"
                    Icon={HandCoinsIcon}
                    type="profit"
                />
                <InvestmentCard
                    title="Investment P/L"
                    amount="$40000"
                    percentage="35.74"
                    Icon={WalletIcon}
                    type="loss"
                />
            </div>

            <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-96">
                <div className="p-6 space-y-4">
                    {/* <ForexChart
                                        fromCurrency="USD"
                                        toCurrency="EUR"
                                    /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
