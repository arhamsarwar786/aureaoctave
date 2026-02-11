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
            <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-5">
                {/* Header */}
                <header className="relative mb-8">
                    <h1 className="font-bold text-2xl">Deposit</h1>
                    <p>Deposit into your account</p>
                </header>

                {/* Main Content */}
                <main>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* QR Code */}
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src={QRCode}
                                alt="Deposit QR Code"
                                className="w-48 h-48 lg:w-64 lg:h-64"
                            />
                        </div>

                        {/* Deposit Form */}
                        <form onSubmit={onSubmit} className="flex-1 space-y-6">
                            {/* Bitcoin Address */}
                            <div>
                                <InputLabel
                                    htmlFor="address"
                                    value="Bitcoin Address"
                                />
                                <TextInput
                                    id="address"
                                    value={btc_address}
                                    type="text"
                                    className="mt-1 block w-full"
                                    disabled
                                />
                                <div className="mt-2">
                                    <CopyToClipboard
                                        text={btc_address}
                                        onCopy={handleCopy}
                                    >
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            {copySuccess
                                                ? copySuccess
                                                : "Copy Address"}
                                        </button>
                                    </CopyToClipboard>
                                </div>
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            {/* Amount in USD */}
                            <div>
                                <InputLabel
                                    htmlFor="amount"
                                    value="Amount in USD"
                                />
                                <TextInput
                                    id="amount"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>

                            {/* Transaction ID */}
                            <div>
                                <InputLabel
                                    htmlFor="pasted_transaction_id"
                                    value="Paste transaction ID here"
                                />
                                <TextInput
                                    id="pasted_transaction_id"
                                    value={data.pasted_transaction_id}
                                    onChange={(e) =>
                                        setData(
                                            "pasted_transaction_id",
                                            e.target.value
                                        )
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.pasted_transaction_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Deposit Button */}
                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    disabled={processing}
                                    className="w-full !bg-[#C58C42] !rounded"
                                >
                                    Deposit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
