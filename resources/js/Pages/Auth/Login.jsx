import { useEffect, useState } from "react";
import Checkbox from "@/Components/App/Checkbox";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import PasswordRule from "@/Components/App/PasswordRule";

export default function Login({ status, canResetPassword }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const handleVisible = (e) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <header className="flex flex-col gap-5 md:gap-8">
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-[32px] font-semibold text-[#333333]">
                        Welcome to Aurea Octave
                        <p className="text-16 font-normal text-[#666666] mt-1">
                            Don’t have an account?{" "}
                            <Link
                                href={route("register")}
                                className="underline text-sm text-gray-900 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </h1>
                </div>
            </header>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 md:md-8">
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" />
                        <button
                            onClick={handleVisible}
                            className="flex items-center space-x-1 text-sm text-[#666]"
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
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                    <PasswordRule />
                </div>

                <div className="block mt-6 md:md-8">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-6 md:md-8">
                    <PrimaryButton className="" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-2">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
        </AuthLayout>
    );
}
