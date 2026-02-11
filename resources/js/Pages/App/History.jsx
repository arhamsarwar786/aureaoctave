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
    const { data: depositsData } = deposits;
    const { data: withdrawalsData } = withdrawals;
    return (
        <AuthenticatedLayout user={auth.user} title="History">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        Deposit History
                    </h1>
                </header>
                <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56">
                    <div className="p-6 space-y-4">
                        <main>
                            <HistoryTable data={depositsData} />
                        </main>
                    </div>
                </div>
            </div>
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        Withdrawal History
                    </h1>
                </header>
                <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56">
                    <div className="p-6 space-y-4">
                        <main>
                            <HistoryTable data={withdrawalsData} />
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const HistoryTableData = ({ history }) => {
    return (
        <Table.Row>
            <Table.Cell>{history.transaction_id}</Table.Cell>
            <Table.Cell>{formatAmount(history.amount)}</Table.Cell>
            <Table.Cell>
                <Badge
                    color={transactionIndicator(history.status)}
                    className="capitalize"
                >
                    {history.status}
                </Badge>
            </Table.Cell>
            <Table.Cell>{history.transaction_date}</Table.Cell>
        </Table.Row>
    );
};

const HistoryTableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Tnx ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Amount(USD)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

const HistoryTable = ({ data }) => {
    return (
        <Table.Root>
            <HistoryTableHeader />

            <Table.Body>
                {data.length > 0 ? (
                    data.map((history, indx) => {
                        return (
                            <HistoryTableData key={indx} history={history} />
                        );
                    })
                ) : (
                    <Table.Row>
                        <td colSpan="5">
                            <p className="text-center w-full py-5 font-bold">
                                No data available in the table
                            </p>
                        </td>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    );
};
