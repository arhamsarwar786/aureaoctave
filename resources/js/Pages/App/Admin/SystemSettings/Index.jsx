import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount, transactionIndicator } from "@/libs/utils";
import { Link, router } from "@inertiajs/react";
import { Table, Badge } from "@radix-ui/themes";
import { BookOpenIcon, PenSquareIcon } from "lucide-react";

export default function systemSettings({ auth, settings: systemSettings }) {
    return (
        <AuthenticatedLayout user={auth.user} title="User Management">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        System Settings
                    </h1>
                </header>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56">
                    <div className="p-6 space-y-4">
                        <main>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>
                                            Name
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Value
                                        </Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>
                                            Action
                                        </Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {systemSettings.length > 0 ? (
                                        systemSettings.map((setting, indx) => {
                                            return (
                                                <Table.Row key={indx}>
                                                    <Table.Cell className="capitalize">
                                                        {setting.key.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {setting.value}
                                                    </Table.Cell>
                                                    <Table.Cell className="space-x-1">
                                                        <Link
                                                            href={route(
                                                                "system-settings.edit",
                                                                setting.id
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
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
