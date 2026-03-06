import InputError from "@/Components/App/InputError";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function WithdrawForm() {
    const { data, setData, errors, post, processing } = useForm({
        amount: "",
        transaction_type: "debit",
        withdrawal_address: "",
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("withdrawal.store"));
    };
    return (
        <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-8">
            <div>
                <label className="text-sm text-slate-400">Amount in USD</label>
                <input type="text" value={data.amount} onChange={e => setData("amount", e.target.value)} required className="mt-2 w-full bg-[#0B141B] border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-[#3BF5C4] focus:ring-0 transition" placeholder="Enter amount" />
                <InputError message={errors.amount} className="mt-2" />
            </div>
            <div>
                <label className="text-sm text-slate-400">Withdrawal Address</label>
                <input type="text" value={data.withdrawal_address} onChange={e => setData("withdrawal_address", e.target.value)} required className="mt-2 w-full bg-[#0B141B] border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-[#3BF5C4] focus:ring-0 transition" placeholder="Paste your BTC address" />
                <InputError message={errors.withdrawal_address} className="mt-2" />
            </div>
            <button disabled={processing} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3BF5C4] to-[#12BED3] text-black font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                {processing ? "Processing..." : "Withdraw Now"}
            </button>
        </form>
    );
}
