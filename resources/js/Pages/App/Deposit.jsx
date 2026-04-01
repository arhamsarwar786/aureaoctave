import InputError from "@/Components/App/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";
import QRCode from "@/assets/img/deposit-qrcode.png";
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    BitcoinIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    FilterIcon,
    LandmarkIcon,
} from "lucide-react";

export default function Dashboard({ auth, btcAddress: btc_address }) {
    const [activeTab, setActiveTab] = useState("buy");

    const {
        data: buyData,
        setData: setBuyData,
        errors: buyErrors,
        post: postBuy,
        processing: buyProcessing,
    } = useForm({
        amount: "",
        transaction_type: "credit",
        pasted_transaction_id: "",
    });

    const {
        data: sellData,
        setData: setSellData,
        errors: sellErrors,
        post: postSell,
        processing: sellProcessing,
    } = useForm({
        amount: "",
        transaction_type: "debit",
        withdrawal_address: "",
    });

    const {
        data: convertData,
        setData: setConvertData,
        processing: convertProcessing,
    } = useForm({
        amount: "",
        from_asset: "BTC",
        to_asset: "ETH",
    });

    const [copySuccess, setCopySuccess] = useState("");

    const tabs = [
        { id: "buy", label: "Buy" },
        { id: "sell", label: "Sell" },
        { id: "convert", label: "Convert" },
    ];

    const historyGroups = [
        {
            month: "This month",
            items: [
                {
                    id: 1,
                    title: "Sent ETH",
                    status: "Pending",
                    amount: "-$10.04",
                    assetAmount: "-0.00505 ETH",
                    date: "Mar 29, 2026",
                    icon: "eth",
                    type: "negative",
                },
                {
                    id: 2,
                    title: "Converted to ETH",
                    status: "Completed",
                    amount: "+$1.95",
                    assetAmount: "+0.000979 ETH",
                    date: "Mar 29, 2026",
                    icon: "eth",
                    type: "positive",
                },
                {
                    id: 3,
                    title: "Converted to ETH",
                    status: "Completed",
                    amount: "+$9.90",
                    assetAmount: "+0.00497 ETH",
                    date: "Mar 29, 2026",
                    icon: "eth",
                    type: "positive",
                },
            ],
        },
        {
            month: "January",
            items: [
                {
                    id: 4,
                    title: "Sent BTC",
                    status: "Completed",
                    amount: "-$30.83",
                    assetAmount: "-0.000327 BTC",
                    date: "Jan 13, 2026",
                    icon: "btc",
                    type: "negative",
                },
                {
                    id: 5,
                    title: "Received BTC",
                    status: "Completed",
                    amount: "+$49.92",
                    assetAmount: "+0.000531 BTC",
                    date: "Jan 5, 2026",
                    icon: "btc",
                    type: "positive",
                },
            ],
        },
    ];

    const onBuySubmit = (e) => {
        e.preventDefault();
        postBuy(route("deposit.store"));
    };

    const onSellSubmit = (e) => {
        e.preventDefault();
        postSell(route("withdrawal.store"));
    };

    const onConvertSubmit = (e) => {
        e.preventDefault();
        toast.info("Convert flow will be connected in the next API step.");
    };

    const handleCopy = () => {
        setCopySuccess("Copied!");
        toast.info("Copied to clipboard.");
        setTimeout(() => {
            setCopySuccess("");
        }, 3000);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Wallet">
            <div className="p-4 md:p-6 lg:p-10">
                <div className="mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-[#233443] bg-gradient-to-b from-[#0b1724] via-[#08111c] to-[#0b1720] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                    <div className="grid lg:grid-cols-[1.75fr_1fr]">
                        <section className="p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#1c2e3d]">
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <button className="h-10 w-10 rounded-full border border-[#203243] bg-[#0f1f2f] text-[#9fb2c4] flex items-center justify-center">
                                    <FilterIcon className="h-4 w-4" />
                                </button>
                                {["Product", "Activity", "Status", "Asset", "Date"].map(
                                    (filter) => (
                                        <button
                                            key={filter}
                                            className="px-4 py-2 rounded-full bg-[#112132] text-[#b9c8d6] text-sm font-medium inline-flex items-center gap-2"
                                        >
                                            {filter}
                                            <ChevronDownIcon className="h-4 w-4" />
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="space-y-8">
                                {historyGroups.map((group) => (
                                    <div
                                        key={group.month}
                                        className="border-t border-[#1a2a39] first:border-t-0 pt-7 first:pt-0"
                                    >
                                        <h3 className="text-2xl font-semibold text-white mb-5">
                                            {group.month}
                                        </h3>

                                        <div className="space-y-5">
                                            {group.items.map((item) => (
                                                <article
                                                    key={item.id}
                                                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                                                >
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#1f3550]">
                                                        {item.icon === "btc" ? (
                                                            <BitcoinIcon className="h-5 w-5 text-[#f1a33b]" />
                                                        ) : (
                                                            <ArrowDownCircleIcon className="h-5 w-5 text-[#7ea4ff]" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="text-xl text-white font-medium">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-sm text-[#90a4b8]">
                                                            {item.status}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p
                                                            className={`text-2xl font-medium ${
                                                                item.type === "positive"
                                                                    ? "text-[#88ca9f]"
                                                                    : "text-[#d4dde7]"
                                                            }`}
                                                        >
                                                            {item.amount}
                                                        </p>
                                                        <p className="text-sm text-[#8fa0b0]">
                                                            {item.assetAmount}
                                                        </p>
                                                        <p className="text-sm text-[#aebdcb] mt-1">
                                                            {item.date}
                                                        </p>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-6 md:p-8 lg:p-9 bg-[#0b131f]">
                            <div className="inline-flex p-1 rounded-2xl bg-[#141f2b] border border-[#213546] mb-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                                            activeTab === tab.id
                                                ? "bg-black text-white"
                                                : "text-[#9db0c4]"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#151f2c] border border-[#22394b] text-[#c5d2de] font-medium mb-8"
                            >
                                One-time order
                                <ChevronDownIcon className="h-4 w-4" />
                            </button>

                            <div className="mb-8">
                                <p className="text-[#8497aa] text-sm mb-2">Amount</p>
                                <div className="flex items-start justify-between">
                                    <h2 className="text-7xl font-medium text-white leading-none">
                                        {activeTab === "convert" ? "0.00" : "0"}
                                        <span className="text-[#5f6e80] ml-2 text-6xl">
                                            USD
                                        </span>
                                    </h2>
                                    <button
                                        type="button"
                                        className="text-[#7f8fa2] font-semibold mt-3"
                                    >
                                        Max
                                    </button>
                                </div>
                                <p className="text-[#4d89ff] mt-2 font-semibold">
                                    0 BTC
                                </p>
                            </div>

                            {activeTab === "buy" && (
                                <form onSubmit={onBuySubmit} className="space-y-4">
                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <label className="text-sm text-[#9db0c4] block mb-2">
                                            Amount in USD
                                        </label>
                                        <input
                                            type="text"
                                            value={buyData.amount}
                                            onChange={(e) =>
                                                setBuyData("amount", e.target.value)
                                            }
                                            required
                                            className="w-full bg-transparent outline-none text-white placeholder:text-[#64788e]"
                                            placeholder="Enter amount"
                                        />
                                        <InputError
                                            message={buyErrors.amount}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <label className="text-sm text-[#9db0c4] block mb-2">
                                            Transaction ID
                                        </label>
                                        <input
                                            type="text"
                                            value={buyData.pasted_transaction_id}
                                            onChange={(e) =>
                                                setBuyData(
                                                    "pasted_transaction_id",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full bg-transparent outline-none text-white placeholder:text-[#64788e]"
                                            placeholder="Paste transaction hash"
                                        />
                                        <InputError
                                            message={buyErrors.pasted_transaction_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <p className="text-sm text-[#9db0c4] mb-2">
                                            Bitcoin Address
                                        </p>
                                        <div className="flex items-center rounded-xl overflow-hidden border border-[#2d465a]">
                                            <input
                                                type="text"
                                                value={btc_address}
                                                disabled
                                                className="flex-1 bg-transparent text-[#d2e0ec] px-3 py-2 text-sm"
                                            />
                                            <CopyToClipboard
                                                text={btc_address}
                                                onCopy={handleCopy}
                                            >
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-[#3BF5C4]/10 text-[#3BF5C4] hover:bg-[#3BF5C4]/20 transition"
                                                >
                                                    {copySuccess ? "Copied" : "Copy"}
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>

                                    <button
                                        disabled={buyProcessing}
                                        className="w-full mt-2 py-4 rounded-2xl bg-[#2b56e5] hover:bg-[#3863f4] text-white font-semibold transition"
                                    >
                                        {buyProcessing
                                            ? "Processing..."
                                            : "Continue to payment"}
                                    </button>
                                </form>
                            )}

                            {activeTab === "sell" && (
                                <form onSubmit={onSellSubmit} className="space-y-4">
                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <label className="text-sm text-[#9db0c4] block mb-2">
                                            Sell Amount in USD
                                        </label>
                                        <input
                                            type="text"
                                            value={sellData.amount}
                                            onChange={(e) =>
                                                setSellData("amount", e.target.value)
                                            }
                                            required
                                            className="w-full bg-transparent outline-none text-white placeholder:text-[#64788e]"
                                            placeholder="Enter amount"
                                        />
                                        <InputError
                                            message={sellErrors.amount}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <label className="text-sm text-[#9db0c4] block mb-2">
                                            Withdrawal Address
                                        </label>
                                        <input
                                            type="text"
                                            value={sellData.withdrawal_address}
                                            onChange={(e) =>
                                                setSellData(
                                                    "withdrawal_address",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full bg-transparent outline-none text-white placeholder:text-[#64788e]"
                                            placeholder="Paste your BTC address"
                                        />
                                        <InputError
                                            message={sellErrors.withdrawal_address}
                                            className="mt-2"
                                        />
                                    </div>

                                    <button
                                        disabled={sellProcessing}
                                        className="w-full mt-2 py-4 rounded-2xl bg-[#2b56e5] hover:bg-[#3863f4] text-white font-semibold transition"
                                    >
                                        {sellProcessing
                                            ? "Processing..."
                                            : "Continue to payment"}
                                    </button>
                                </form>
                            )}

                            {activeTab === "convert" && (
                                <form onSubmit={onConvertSubmit} className="space-y-4">
                                    <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                        <label className="text-sm text-[#9db0c4] block mb-2">
                                            Amount to Convert
                                        </label>
                                        <input
                                            type="text"
                                            value={convertData.amount}
                                            onChange={(e) =>
                                                setConvertData("amount", e.target.value)
                                            }
                                            required
                                            className="w-full bg-transparent outline-none text-white placeholder:text-[#64788e]"
                                            placeholder="Enter amount"
                                        />
                                    </div>

                                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                                        <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                            <p className="text-xs text-[#8ea1b5] mb-1">From</p>
                                            <p className="text-white font-semibold">
                                                {convertData.from_asset}
                                            </p>
                                        </div>
                                        <ArrowUpCircleIcon className="h-5 w-5 text-[#80a4c6]" />
                                        <div className="rounded-2xl border border-[#223a4b] bg-[#121c29] p-4">
                                            <p className="text-xs text-[#8ea1b5] mb-1">To</p>
                                            <p className="text-white font-semibold">
                                                {convertData.to_asset}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        disabled={convertProcessing}
                                        className="w-full mt-2 py-4 rounded-2xl bg-[#2b56e5] hover:bg-[#3863f4] text-white font-semibold transition"
                                    >
                                        Convert now
                                    </button>
                                </form>
                            )}

                            <div className="mt-10 pt-6 border-t border-[#1f3344] space-y-4">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between text-left text-[#d7e3ef]"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <ArrowUpCircleIcon className="h-5 w-5 text-[#3d69ff]" />
                                        Send crypto
                                    </span>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between text-left text-[#d7e3ef]"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <LandmarkIcon className="h-5 w-5 text-[#3d69ff]" />
                                        Receive crypto
                                    </span>
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
