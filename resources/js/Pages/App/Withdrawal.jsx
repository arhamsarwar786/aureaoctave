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
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Column: Withdrawal Information */}
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-5">
                    <main className="space-y-5 text-sm">
                        {[
                            "Withdrawal request cut off time 12:00 AEST/AEDT. Withdrawal submitted before this time will be processed same day, requests made after will be processed next business day.",
                            "The requested withdrawal amount should be less than or equal to the account balance at the time of the processing of your withdrawal request.",
                            "Phoenix Trading does not allow third-party transfers, funds will need to be returned to a bank account under the same name as your trading account.",
                            "Credit card withdrawals are to be processed according to the same card that was used to deposit with.",
                            "There should be at least 100% free margin available in your trade account. This requirement is in place to reduce the likelihood of a margin call.",
                            "You must add your bank details here if you are making a request to your bank account for the first time.",
                            "Kindly note to ensure the security of your funds, all withdrawal requests require additional confirmation. You can do this by clicking the 'Confirm Withdrawal' button in the email you will receive after submitting your request.",
                            "For First USDT withdrawals, we require that you upload a screenshot of the Wallet QR Code and the Wallet ID for the Verification.",
                        ].map((text, index) => (
                            <div key={index} className="flex gap-5">
                                <div>
                                    <CheckCheckIcon className="text-green-500" />
                                </div>
                                <div>{text}</div>
                            </div>
                        ))}
                    </main>
                </div>

                {/* Right Column: Withdrawal Form */}
                <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-5">
                    <header>
                        <h1 className="font-bold text-2xl">Withdrawal</h1>
                        <p>Fill the form to withdraw from your account.</p>
                    </header>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="amount"
                                value="Withdrawal Amount"
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

                        <div>
                            <InputLabel htmlFor="address" value="BTC Address" />
                            <TextInput
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <PrimaryButton
                                disabled={processing}
                                className="w-full !bg-[#3B4FE4] !rounded"
                            >
                                Withdraw
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
