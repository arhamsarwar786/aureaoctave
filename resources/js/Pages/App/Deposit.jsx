import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";
import QRCode from "@/assets/img/deposit-qrcode.png";

export default function Dashboard({ auth, btcAddress: btc_address }) {
    const { data, setData, errors, post, processing } = useForm({
        amount: "",
        transaction_type: "credit",
        pasted_transaction_id: "",
    });
    const [copySuccess, setCopySuccess] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("deposit.store"));
    };

    const handleCopy = () => {
        setCopySuccess("Copied!");
        toast.info("Copied to clipboard.");
        setTimeout(() => {
            setCopySuccess("");
        }, 3000);
    };

    return (
       <AuthenticatedLayout user={auth.user} title="Deposit">
    <div className="p-6 lg:p-10">

        {/* Glass Card */}
        <div className="bg-gradient-to-br from-[#0F1720] to-[#0B1117] 
                        border border-slate-700 
                        rounded-2xl shadow-2xl 
                        p-8 lg:p-12">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white">
                    Deposit Funds
                </h1>
                <p className="text-slate-400 mt-2">
                    Send Bitcoin to the address below and submit your transaction ID.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* LEFT - QR Section */}
                <div className="flex flex-col items-center lg:items-start gap-6">

                    <div className="bg-[#111A22] p-6 rounded-2xl border border-slate-700 shadow-lg">
                        <img
                            src={QRCode}
                            alt="Deposit QR Code"
                            className="w-56 h-56 object-contain"
                        />
                    </div>

                    {/* BTC Address Box */}
                    <div className="w-full">
                        <label className="text-sm text-slate-400">
                            Bitcoin Address
                        </label>

                        <div className="mt-2 flex items-center bg-[#0B141B] border border-slate-700 rounded-xl overflow-hidden">
                            <input
                                type="text"
                                value={btc_address}
                                disabled
                                className="flex-1 bg-transparent text-slate-300 px-4 py-3 text-sm focus:outline-none"
                            />

                            <CopyToClipboard
                                text={btc_address}
                                onCopy={handleCopy}
                            >
                                <button
                                    type="button"
                                    className="px-4 py-3 bg-[#3BF5C4]/10 text-[#3BF5C4] hover:bg-[#3BF5C4]/20 transition font-medium"
                                >
                                    {copySuccess ? "Copied" : "Copy"}
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>

                {/* RIGHT - Form Section */}
                <form onSubmit={onSubmit} className="space-y-8">

                    {/* Amount */}
                    <div>
                        <label className="text-sm text-slate-400">
                            Amount in USD
                        </label>
                        <input
                            type="text"
                            value={data.amount}
                            onChange={(e) =>
                                setData("amount", e.target.value)
                            }
                            required
                            className="mt-2 w-full bg-[#0B141B] border border-slate-700 
                                       text-white rounded-xl px-4 py-3 
                                       focus:border-[#3BF5C4] focus:ring-0 
                                       transition"
                            placeholder="Enter amount"
                        />
                        <InputError
                            message={errors.amount}
                            className="mt-2"
                        />
                    </div>

                    {/* Transaction ID */}
                    <div>
                        <label className="text-sm text-slate-400">
                            Transaction ID
                        </label>
                        <input
                            type="text"
                            value={data.pasted_transaction_id}
                            onChange={(e) =>
                                setData(
                                    "pasted_transaction_id",
                                    e.target.value
                                )
                            }
                            required
                            className="mt-2 w-full bg-[#0B141B] border border-slate-700 
                                       text-white rounded-xl px-4 py-3 
                                       focus:border-[#3BF5C4] focus:ring-0 
                                       transition"
                            placeholder="Paste transaction hash"
                        />
                        <InputError
                            message={errors.pasted_transaction_id}
                            className="mt-2"
                        />
                    </div>

                    {/* Deposit Button */}
                    <button
                        disabled={processing}
                        className="w-full py-4 rounded-xl 
                                   bg-gradient-to-r from-[#3BF5C4] to-[#12BED3]
                                   text-black font-semibold tracking-wide
                                   hover:scale-[1.02] hover:shadow-lg
                                   transition-all duration-300"
                    >
                        {processing ? "Processing..." : "Deposit Now"}
                    </button>

                </form>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
    );
}
