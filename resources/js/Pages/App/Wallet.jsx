import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import DepositForm from "@/Components/App/DepositForm";
import WithdrawForm from "@/Components/App/WithdrawForm";

export default function WalletPage({ auth, btcAddress: btc_address }) {
    const [tab, setTab] = useState("deposit");
    return (
        <AuthenticatedLayout user={auth.user} title="Wallet">
            <div className="p-6 lg:p-10">
                <div className="bg-gradient-to-br from-[#0F1720] to-[#0B1117] border border-slate-700 rounded-2xl shadow-2xl p-8 lg:p-12">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-10">
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${tab === "deposit" ? "bg-[#3BF5C4] text-black shadow" : "bg-[#111A22] text-slate-300 hover:bg-[#222C36]"}`}
                            onClick={() => setTab("deposit")}
                        >
                            Deposit
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${tab === "withdraw" ? "bg-[#3BF5C4] text-black shadow" : "bg-[#111A22] text-slate-300 hover:bg-[#222C36]"}`}
                            onClick={() => setTab("withdraw")}
                        >
                            Withdraw
                        </button>
                    </div>
                    {tab === "deposit" && <DepositForm btc_address={btc_address} />}
                    {tab === "withdraw" && <WithdrawForm />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
