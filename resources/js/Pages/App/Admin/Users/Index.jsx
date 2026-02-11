import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
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
    const { data: usersData, meta } = users;

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
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        User Management
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
                                            Name
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Email
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Account Balance
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Joined Date
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Action
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {usersData.length > 0 ? (
                                        usersData.map((user, indx) => {
                                            return (
                                                <Table.Row key={indx}>
                                                    <Table.Cell>
                                                        {user.name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {user.email}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {formatAmount(
                                                            user.balance
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
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
