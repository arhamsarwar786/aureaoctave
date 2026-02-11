import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function EditInvestmentPackage({ auth, investmentPackage }) {
    const { data, setData, errors, put, processing } = useForm({
        name: investmentPackage.name || "",
        code: investmentPackage.code || "",
        expense_ratio: investmentPackage.expense_ratio || "",
        sec_yield: investmentPackage.sec_yield || "",
        ytd: investmentPackage.ytd || "",
        one_year: investmentPackage.one_year || "",
        fund_price: investmentPackage.fund_price || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("investment-package.update", investmentPackage.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Add Investment Package">
            <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-5">
                <header className="relative mb-8">
                    <h1 className="font-bold text-2xl">
                        Edit Investment Package
                    </h1>
                    <p>Edit investment package details.</p>
                </header>
                <main className="">
                    <form onSubmit={onSubmit} className="mt-6 space-y-6 flex-1">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="code" value="Code" />
                                <TextInput
                                    id="code"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="expense_ratio"
                                    value="Expense Ratio"
                                />
                                <TextInput
                                    id="expense_ratio"
                                    value={data.expense_ratio}
                                    onChange={(e) =>
                                        setData("expense_ratio", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.expense_ratio}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="sec_yield"
                                    value="Sec Yield"
                                />
                                <TextInput
                                    id="sec_yield"
                                    value={data.sec_yield}
                                    onChange={(e) =>
                                        setData("sec_yield", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.sec_yield}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="ytd" value="YTD" />
                                <TextInput
                                    id="ytd"
                                    value={data.ytd}
                                    onChange={(e) =>
                                        setData("ytd", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.ytd}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="one_year"
                                    value="One Year"
                                />
                                <TextInput
                                    id="one_year"
                                    value={data.one_year}
                                    onChange={(e) =>
                                        setData("one_year", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.one_year}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="fund_price"
                                    value="Fund Price"
                                />
                                <TextInput
                                    id="fund_price"
                                    value={data.fund_price}
                                    onChange={(e) =>
                                        setData("fund_price", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.fund_price}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full !bg-[#3B4FE4] !rounded"
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
