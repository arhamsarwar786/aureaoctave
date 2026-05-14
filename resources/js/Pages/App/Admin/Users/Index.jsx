import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import { useTheme } from "@/Components/App/ThemeContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount } from "@/libs/utils";
import { Head, Link, router } from "@inertiajs/react";
import { Flex, Table, Badge } from "@radix-ui/themes";
import { BookOpenIcon, PenSquareIcon } from "lucide-react";

export default function AdminUsers({
    auth,
    users,
    queryParams = null,
    success,
}) {
    const { data: usersData = [], meta = { links: [] } } = users || {};
    const { theme } = useTheme();
    const pageBg = theme === "dark" ? "bg-[#0F141B]" : "";
    const cardBg = theme === "dark" ? "bg-[#111820] border-white/10" : "bg-white border-slate-200";
    const headingClass = theme === "dark" ? "text-white" : "text-slate-900";
    const mutedTextClass = theme === "dark" ? "text-white/65" : "text-slate-500";

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
        <AuthenticatedLayout user={auth.user} title="User Management">
            <div className={`mb-8 space-y-2 p-6 ${pageBg}`}>
                <header className="w-full">
                    <h1 className={`text-xl font-bold ${headingClass}`}>
                        User Management
                    </h1>
                </header>
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
                                            Email
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Account Balance
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Joined Date
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className={headingClass}>
                                            Action
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {usersData.length > 0 ? (
                                        usersData.map((user, indx) => {
                                            return (
                                                <Table.Row key={indx}>
                                                    <Table.Cell className={headingClass}>
                                                        {user.name}
                                                    </Table.Cell>
                                                    <Table.Cell className={mutedTextClass}>
                                                        {user.email}
                                                    </Table.Cell>
                                                    <Table.Cell className={headingClass}>
                                                        {formatAmount(
                                                            user.balance
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell className={mutedTextClass}>
                                                        {user.created_at}
                                                    </Table.Cell>
                                                    <Table.Cell className="space-x-1">
                                                        <Link
                                                            href={route(
                                                                "admin.users.show",
                                                                user.id
                                                            )}
                                                            className="link-btn !p-2"
                                                        >
                                                            <BookOpenIcon className="size-4" />
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "admin.users.edit",
                                                                user.id
                                                            )}
                                                            className="link-btn !p-2 !bg-blue-200 !border-blue-500 !text-blue-800"
                                                        >
                                                            <PenSquareIcon className="size-4" />
                                                        </Link>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
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
