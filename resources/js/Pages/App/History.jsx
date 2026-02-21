import ForexChart from "@/Components/App/Charts/ForexChart";
import BuySellSection from "@/Components/App/Dashboard/BuySellSection";
import NewlyAddedSection from "@/Components/App/Dashboard/NewlyAddedSection";
import InvestmentCard from "@/Components/App/InvestmentCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount, transactionIndicator } from "@/libs/utils";
import { Head, Link } from "@inertiajs/react";
import { Flex, Table, Badge } from "@radix-ui/themes";
import { HandCoinsIcon, WalletIcon } from "lucide-react";

export default function Histo({ auth, deposits, withdrawals }) {
    const depositsData = deposits?.data || [];
    const withdrawalsData = withdrawals?.data || [];

    const totalDeposits = depositsData.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const totalWithdrawals = withdrawalsData.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    return (
        <AuthenticatedLayout user={auth.user} title="Transaction History">
            <div className="space-y-8">

                {/* ===== Summary Section ===== */}
                <div className="grid md:grid-cols-2 gap-6">
                    <SummaryCard
                        title="Total Deposits"
                        amount={formatAmount(totalDeposits)}
                        icon={<WalletIcon className="size-6" />}
                        color="bg-green-50"
                    />
                    <SummaryCard
                        title="Total Withdrawals"
                        amount={formatAmount(totalWithdrawals)}
                        icon={<HandCoinsIcon className="size-6" />}
                        color="bg-red-50"
                    />
                </div>

                {/* ===== Deposit Section ===== */}
                <HistorySection
                    title="Deposit History"
                    icon={<WalletIcon className="size-5 text-white" />}
                    data={depositsData}
                />

                {/* ===== Withdrawal Section ===== */}
                <HistorySection
                    title="Withdrawal History"
                    icon={<HandCoinsIcon className="size-5 text-white" />}
                    data={withdrawalsData}
                />
            </div>
        </AuthenticatedLayout>
    );
}

/* ===========================
   Section Component
=========================== */
const HistorySection = ({ title, icon, data }) => {
    return (
        <div className="bg-[#0E151D] shadow-sm rounded-xl border border-gray-700">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700 bg-[#0E151D] rounded-t-xl">
                {icon}
                <h2 className="font-semibold text-white">{title}</h2>
            </div>

            <div className="p-6 overflow-x-auto">
                <HistoryTable data={data} />
            </div>
        </div>
    );
};

/* ===========================
   Summary Card
=========================== */
const SummaryCard = ({ title, amount, icon, color }) => {
    return (
        <div className={`rounded-xl p-6 shadow-sm border border-gray-700 bg-[#0E151D]`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-white">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">{amount}</h3>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                    {icon}
                </div>
            </div>
        </div>
    );
};

/* ===========================
   Table
=========================== */
const HistoryTable = ({ data = [] }) => {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="text-white">
                        Transaction ID
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Amount (USD)
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-white">
                        Date
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.length > 0 ? (
                    data.map((history) => (
                        <Table.Row key={history.id}>
                            <Table.Cell>
                                {history.transaction_id}
                            </Table.Cell>
                            <Table.Cell>
                                {formatAmount(history.amount)}
                            </Table.Cell>
                            <Table.Cell>
                                <Badge
                                    color={transactionIndicator(history.status)}
                                    className="capitalize"
                                >
                                    {history.status}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                {history.transaction_date}
                            </Table.Cell>
                        </Table.Row>
                    ))
                ) : (
                    <Table.Row>
                        <Table.Cell colSpan={4}>
                            <div className="text-center py-8 text-gray-500">
                                No transactions found
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    );
};