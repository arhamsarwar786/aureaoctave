import HeaderBox from "@/Components/App/HeaderBox";
import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount } from "@/libs/utils";
import { Head, Link, router } from "@inertiajs/react";
import { Flex, Table, Badge } from "@radix-ui/themes";
import { BookOpenIcon, PenSquareIcon, TrashIcon } from "lucide-react";

export default function AdminInvestmentPackage({
    auth,
    investmentPackages,
    queryParams = null,
    success,
}) {
    const { data: investmentPackagesData, meta } = investmentPackages;

    const deleteInvestmentPackage = (id) => {
        console.log(id);
        if (
            !window.confirm(
                "Are you sure you want to delete the investment package?"
            )
        ) {
            return;
        }
        router.delete(
            route("investment-package.destroy", { investment_package: id })
        );
    };
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("admin.users.index"), queryParams);
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
        router.get(route("admin.users.index"), queryParams);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Admin Investment Packages">
            <div className="mb-8 space-y-2">
                <div className="transactions-header">
                    <HeaderBox
                        subtext={"Investment Packages"}
                        title={"Investment Packages"}
                        actionButton={
                            <Link
                                href={route("investment-package.create")}
                                className="view-all-btn"
                            >
                                Add New Investment Package
                            </Link>
                        }
                    />
                </div>

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
                                            Name
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Expense Ratio
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Sec Yield
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            YTD
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            One Year
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Fund Price
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Action
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {investmentPackagesData.length > 0 ? (
                                        investmentPackagesData.map(
                                            (investmentPackage, indx) => {
                                                return (
                                                    <Table.Row key={indx}>
                                                        <Table.Cell>
                                                            {`${investmentPackage.name} (${investmentPackage.code})`}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                investmentPackage.expense_ratio
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                investmentPackage.sec_yield
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                investmentPackage.ytd
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                investmentPackage.one_year
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                investmentPackage.fund_price
                                                            }
                                                        </Table.Cell>
                                                        <Table.Cell className="space-x-1">
                                                            <Link
                                                                href={route(
                                                                    "investment-package.edit",
                                                                    investmentPackage.id
                                                                )}
                                                                className="link-btn !p-2 !bg-blue-200 !border-blue-500 !text-blue-800"
                                                            >
                                                                <PenSquareIcon className="size-4" />
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteInvestmentPackage(
                                                                        investmentPackage.id
                                                                    )
                                                                }
                                                                className="link-btn !p-2 !bg-red-200 !border-red-500 !text-red-800"
                                                            >
                                                                <TrashIcon className="size-4" />
                                                            </button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            }
                                        )
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
