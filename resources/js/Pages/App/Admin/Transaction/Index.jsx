import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount, transactionIndicator } from "@/libs/utils";
import { Link, router } from "@inertiajs/react";
import { Table, Badge } from "@radix-ui/themes";
import { BookOpenIcon } from "lucide-react";

export default function AdminUsers({
    auth,
    transactions,
    queryParams = null,
    success,
}) {
    const { data: transactionsData, meta } = transactions;
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("admin.transactions"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("admin.transactions"), queryParams);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="User Management">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        Transactions
                    </h1>
                </header>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56">
                    <div className="p-6 space-y-4">
                        <main>
                            <div className="md:flex justify-end">
                                <TextInput
                                    className="max-w-3xl font-normal"
                                    defaultValue={queryParams.search}
                                    placeholder="Search"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "search",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("search", e)}
                                />
                            </div>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>
                                            Tnx ID
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Name
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Amount
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Type
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Status
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Date
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Action
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {transactionsData.length > 0 ? (
                                        transactionsData.map((tnx, indx) => {
                                            return (
                                                <Table.Row key={indx}>
                                                    <Table.Cell>
                                                        {tnx.transaction_id}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {tnx.user.name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {formatAmount(
                                                            tnx.amount
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {tnx.transaction_type ===
                                                        "credit"
                                                            ? "Deposit"
                                                            : "Withdrawal"}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Badge
                                                            color={transactionIndicator(
                                                                tnx.status
                                                            )}
                                                            className="capitalize"
                                                        >
                                                            {tnx.status}
                                                        </Badge>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {tnx.transaction_date}
                                                    </Table.Cell>
                                                    <Table.Cell className="space-x-1">
                                                        <Link
                                                            href={route(
                                                                "admin.transactions.show",
                                                                tnx.id
                                                            )}
                                                            className="link-btn !p-2"
                                                        >
                                                            <BookOpenIcon className="size-4" />
                                                        </Link>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    ) : (
                                        <Table.Row>
                                            <td colSpan="5">
                                                <p className="text-center w-full py-5 font-bold">
                                                    No data available in the
                                                    table
                                                </p>
                                            </td>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table.Root>
                            <Pagination links={meta.links} />
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
