import InvestmentPackageCard from "@/Components/App/InvestmentPackageCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "@radix-ui/themes";
import { WalletIcon } from "lucide-react";

export default function InvestmentPackage({ auth, investmentPackages }) {
    console.log(investmentPackages);
    const { data } = investmentPackages;
    const initialList = (investmentPackage) => (
        <ul className="space-y-2 text-lg text-[#242424B2] list-disc">
            <li className="flex items-center justify-between">
                <span className="flex-1">Expense Ratio</span>
                <span className="w-36">{investmentPackage.expense_ratio}%</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="flex-1">SEC Yield</span>
                <span className="w-36">
                    {investmentPackage.sec_yield}% 30days
                </span>
            </li>
            <li className="flex items-center justify-between">
                <span className="flex-1">YTD</span>
                <span className="w-36">{investmentPackage.ytd}%</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="flex-1">1 year</span>
                <span className="w-36">{investmentPackage.one_year}%</span>
            </li>
            <li className="pt-8 flex items-center justify-between">
                <span className="flex-1">Fund Price</span>
                <span className="w-36">{investmentPackage.fund_price}</span>
            </li>
        </ul>
    );

    return (
        <AuthenticatedLayout user={auth.user} title="Investment Packages">
            <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-5">
                {data.map((investmentPackage, index) => (
                    <InvestmentPackageCard
                        key={index}
                        title={investmentPackage.name}
                        caption={investmentPackage.code}
                        active={index === 0}
                    >
                        {initialList(investmentPackage)}
                    </InvestmentPackageCard>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
