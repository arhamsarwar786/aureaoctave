import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatAmount, transactionIndicator } from "@/libs/utils";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Flex, Code, Badge, IconButton, DataList } from "@radix-ui/themes";
import { BookOpenIcon, CopyIcon, FileIcon, PenSquareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";

export default function ShowTransaction({ auth, transaction }) {
    const { data: transactionData } = transaction;
    const minWidthSize = "120px";
    const [copySuccess, setCopySuccess] = useState(false);

    const { data, setData, errors, put, processing } = useForm({
        status: transactionData.status || "",
    });

    useEffect(() => {
        const process = () => {
            put(
                route("admin.transactions.update-status", {
                    transaction: transactionData.id,
                })
            );
        };
        if (data.status !== transactionData.status) {
            process();
        }
    }, [data.status]);

    const handleCopy = () => {
        setCopySuccess(true);
        toast.info("Copied to clipboard.");
        setTimeout(() => {
            setCopySuccess("");
        }, 3000);
    };
    return (
        <AuthenticatedLayout user={auth.user} title="Transaction Details">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        Transactions
                    </h1>
                </header>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56 ">
                    <div className="p-6 space-y-4 max-w-2xl">
                        <DataList.Root>
                            <DataList.Item align="center">
                                <DataList.Label minWidth={minWidthSize}>
                                    Status
                                </DataList.Label>
                                <DataList.Value className="flex flex-wrap gap-2 items-center">
                                    <Badge
                                        color={transactionIndicator(
                                            transactionData.status
                                        )}
                                        className="capitalize"
                                    >
                                        {transactionData.status}
                                    </Badge>

                                    <select
                                        value={data.status}
                                        className="input-field"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        disabled={processing}
                                    >
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="approved">
                                            Approved
                                        </option>
                                        <option value="declined">
                                            Declined
                                        </option>
                                    </select>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Transaction Type
                                </DataList.Label>
                                <DataList.Value>
                                    {transactionData.transaction_type ===
                                    "credit"
                                        ? "Deposit"
                                        : "Withdrawal"}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Transaction ID
                                </DataList.Label>
                                <DataList.Value>
                                    <Flex align="center" gap="2">
                                        <Code variant="ghost">
                                            {transactionData.transaction_id}
                                        </Code>
                                        <CopyToClipboard
                                            text={
                                                transactionData.transaction_id
                                            }
                                            onCopy={handleCopy}
                                        >
                                            <IconButton
                                                size="1"
                                                aria-label="Copy value"
                                                color="gray"
                                                variant="ghost"
                                                type="button"
                                                className="cursor-pointer"
                                            >
                                                {copySuccess ? (
                                                    <FileIcon />
                                                ) : (
                                                    <CopyIcon />
                                                )}
                                            </IconButton>
                                        </CopyToClipboard>
                                    </Flex>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Amount
                                </DataList.Label>
                                <DataList.Value>
                                    {formatAmount(transactionData.amount)}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Pasted Transaction ID
                                </DataList.Label>
                                <DataList.Value>
                                    <Flex align="center" gap="2">
                                        <Code variant="ghost">
                                            {
                                                transactionData.pasted_transaction_id
                                            }
                                        </Code>

                                        <CopyToClipboard
                                            text={
                                                transactionData.pasted_transaction_id
                                            }
                                            onCopy={handleCopy}
                                        >
                                            <IconButton
                                                size="1"
                                                aria-label="Copy value"
                                                color="gray"
                                                variant="ghost"
                                                type="button"
                                            >
                                                {copySuccess ? (
                                                    <FileIcon />
                                                ) : (
                                                    <CopyIcon />
                                                )}
                                            </IconButton>
                                        </CopyToClipboard>
                                    </Flex>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Name
                                </DataList.Label>
                                <DataList.Value>
                                    {transactionData.user.name}
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Email
                                </DataList.Label>
                                <DataList.Value>
                                    <Link
                                        href={`mailto:${transactionData.user.email}`}
                                    >
                                        {transactionData.user.email}
                                    </Link>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth={minWidthSize}>
                                    Transaction Date
                                </DataList.Label>
                                <DataList.Value>
                                    {transactionData.transaction_date}
                                </DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
