import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount, transactionIndicator } from "@/libs/utils";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Flex, Code, Badge, IconButton, DataList } from "@radix-ui/themes";
import {
    BookOpenIcon,
    CopyIcon,
    FileIcon,
    PenSquareIcon,
    SquarePenIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";

export default function ShowUser({ auth, user }) {
    const { data: userData } = user;
    console.log(userData);
    const minWidthSize = "120px";

    return (
        <AuthenticatedLayout user={auth.user} title="User Details">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        User Details ({userData.name})
                    </h1>
                </header>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56 ">
                    <div className="p-6 space-y-4 max-w-2xl">
                        <DataList.Root>
                            <DataList.Item align="center">
                                <DataList.Label minWidth={minWidthSize}>
                                    Name
                                </DataList.Label>
                                <DataList.Value className="flex flex-wrap gap-2 items-center">
                                    {userData.name}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Email
                                </DataList.Label>
                                <DataList.Value>
                                    <Link href={`mailto:${userData.email}`}>
                                        {userData.email}
                                    </Link>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Amount
                                </DataList.Label>
                                <DataList.Value>
                                    {formatAmount(userData.balance)}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Joined Date
                                </DataList.Label>
                                <DataList.Value>
                                    {userData.created_at}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Action
                                </DataList.Label>
                                <DataList.Value>
                                    <div className="space-x-1">
                                        <Link
                                            href={route(
                                                "admin.users.edit",
                                                userData.id
                                            )}
                                            className="link-btn !p-2 !bg-blue-200 !text-blue-700 !border-blue-500"
                                        >
                                            <SquarePenIcon className="size-4" />
                                        </Link>
                                    </div>
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
