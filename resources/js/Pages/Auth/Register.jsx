import { useEffect } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Checkbox from "@/Components/App/Checkbox";
import PasswordRule from "@/Components/App/PasswordRule";

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    const handleVisible = (e) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <header className="flex flex-col gap-5 md:gap-8">
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-[32px] font-semibold text-white">
                        Welcome toAurea Octave
                        <p className="text-16 font-normal text-white mt-1">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="underline text-sm text-[#3BF5C4] hover:text-[#6bfbd5] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log in
                            </Link>
                        </p>
                    </h1>
                </div>
            </header>

            <form onSubmit={submit}>
                <div className="mt-6 md:mt-0">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-6 md:mt-8">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 md:mt-8">
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" />
                        <button
                            onClick={handleVisible}
                            className="flex items-center space-x-1 text-sm text-[#3BF5C4]"
                        >
                            {passwordVisible ? (
                                <>
                                    <EyeOff className="h-5 w-5" />
                                    <span>Hide</span>
                                </>
                            ) : (
                                <>
                                    <Eye className="h-5 w-5" />
                                    <span>Show</span>
                                </>
                            )}
                        </button>
                    </div>
                    <TextInput
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 md:mt-8">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type={passwordVisible ? "text" : "password"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                    <PasswordRule />
                </div>

                <div className="block mt-6 md:mt-8">
                    <label className="flex items-top">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            onChange={(e) => setData("terms", e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-[#3BF5C4]">
                            I want to receive emails about the product, feature
                            updates, events, and marketing promotions.
                        </span>
                    </label>
                </div>

                <div className="mt-6 md:mt-8">
                    <p className="text-white text-sm">
                        By creating an account, you agree to the{" "}
                        <Link
                            href={route("login")}
                            className="underline text-sm text-[#3BF5C4] hover:text-[#6bfbd5] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Terms of use
                        </Link>{" "}
                        and{" "}
                        <Link
                            href={route("login")}
                            className="underline text-sm text-[#3BF5C4] hover:text-[#6bfbd5] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Privacy Policy.
                        </Link>
                    </p>
                </div>

                <div className="mt-6 md:mt-8">
                    <PrimaryButton className="" disabled={processing}>
                        Create an account
                    </PrimaryButton>
                </div>

                <div className="mt-2">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-200 hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
