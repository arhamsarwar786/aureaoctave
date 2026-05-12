import HeaderBox from "@/Components/App/HeaderBox";
import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import { useTheme } from "@/Components/App/ThemeContext";
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
    const { data: investmentPackagesData = [], meta = { links: [] } } = investmentPackages || {};
    const { theme } = useTheme();
    const pageBg = theme === "dark" ? "bg-[#0F141B]" : "bg-slate-50";
    const cardBg = theme === "dark" ? "bg-[#111820] border-white/10" : "bg-white border-slate-200";
    const headingClass = theme === "dark" ? "text-white" : "text-slate-900";
    const mutedTextClass = theme === "dark" ? "text-white/65" : "text-slate-500";

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
            <div className={`mb-8 space-y-2 p-4 ${pageBg}`}>
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

                <div className={`overflow-hidden shadow-sm sm:rounded-lg min-h-56 border ${cardBg}`}>
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
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Name
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Expense Ratio
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Sec Yield
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            YTD
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            One Year
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Fund Price
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
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
                                                        <Table.Cell className={headingClass}>
                                                            {`${investmentPackage.name} (${investmentPackage.code})`}
                                                        </Table.Cell>
                                                        <Table.Cell className={headingClass}>
                                                            {
                                                                investmentPackage.expense_ratio
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell className={headingClass}>
                                                            {
                                                                investmentPackage.sec_yield
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell className={headingClass}>
                                                            {
                                                                investmentPackage.ytd
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell className={headingClass}>
                                                            {
                                                                investmentPackage.one_year
                                                            }
                                                            %
                                                        </Table.Cell>
                                                        <Table.Cell className={headingClass}>
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
                                                <p className={`text-center w-full py-5 font-bold ${mutedTextClass}`}>
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
