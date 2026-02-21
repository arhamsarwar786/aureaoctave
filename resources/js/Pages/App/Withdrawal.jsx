import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { CheckCheckIcon } from "lucide-react";

export default function Dashboard({ auth }) {
    const { data, setData, errors, post, processing } = useForm({
        amount: "",
        transaction_type: "debit",
        address: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("withdrawal.store"));
    };

    return (
     <AuthenticatedLayout user={auth.user} title="Withdrawal">
    <div className="p-6 lg:p-10">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT COLUMN - Rules Card */}
            <div className="bg-gradient-to-br from-[#0F1720] to-[#0B1117]
                            border border-slate-700
                            rounded-2xl shadow-2xl
                            p-8 space-y-6">

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Withdrawal Guidelines
                    </h2>
                    <p className="text-slate-400 mt-2 text-sm">
                        Please read carefully before submitting your withdrawal request.
                    </p>
                </div>

                <main className="space-y-5 text-sm text-slate-300">
                    {[
                        "Withdrawal request cut off time 12:00 AEST/AEDT.",
                        "Withdrawal amount must be less than or equal to your balance.",
                        "No third-party transfers allowed.",
                        "Credit card withdrawals go to the same card used.",
                        "At least 100% free margin must be available.",
                        "Add your bank details if withdrawing for the first time.",
                        "All withdrawals require email confirmation.",
                        "For first USDT withdrawals, upload wallet QR & ID.",
                    ].map((text, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <CheckCheckIcon className="text-[#3BF5C4] mt-1 shrink-0" />
                            <p className="leading-relaxed">{text}</p>
                        </div>
                    ))}
                </main>
            </div>

            {/* RIGHT COLUMN - Form Card */}
            <div className="bg-gradient-to-br from-[#0F1720] to-[#0B1117]
                            border border-slate-700
                            rounded-2xl shadow-2xl
                            p-8 space-y-8">

                <header>
                    <h1 className="text-3xl font-bold text-white">
                        Withdraw Funds
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Enter your withdrawal details below.
                    </p>
                </header>

                <form onSubmit={onSubmit} className="space-y-8">

                    {/* Amount */}
                    <div>
                        <label className="text-sm text-slate-400">
                            Withdrawal Amount (USD)
                        </label>

                        <input
                            type="text"
                            value={data.amount}
                            onChange={(e) =>
                                setData("amount", e.target.value)
                            }
                            required
                            placeholder="Enter amount"
                            className="mt-2 w-full bg-[#0B141B]
                                       border border-slate-700
                                       text-white rounded-xl px-4 py-3
                                       focus:border-[#3BF5C4]
                                       focus:ring-0 transition"
                        />

                        <InputError
                            message={errors.amount}
                            className="mt-2"
                        />
                    </div>

                    {/* BTC Address */}
                    <div>
                        <label className="text-sm text-slate-400">
                            BTC Address
                        </label>

                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) =>
                                setData("address", e.target.value)
                            }
                            required
                            placeholder="Enter your BTC wallet address"
                            className="mt-2 w-full bg-[#0B141B]
                                       border border-slate-700
                                       text-white rounded-xl px-4 py-3
                                       focus:border-[#3BF5C4]
                                       focus:ring-0 transition"
                        />

                        <InputError
                            message={errors.address}
                            className="mt-2"
                        />
                    </div>

                    {/* CTA Button */}
                    <button
                        disabled={processing}
                        className="w-full py-4 rounded-xl
                                   bg-gradient-to-r from-[#3BF5C4] to-[#2DD4BF]
                                   text-black font-semibold tracking-wide
                                   hover:scale-[1.02]
                                   hover:shadow-lg
                                   transition-all duration-300"
                    >
                        {processing ? "Processing..." : "Submit Withdrawal"}
                    </button>

                </form>
            </div>

        </section>
    </div>
</AuthenticatedLayout>
    );
}
