import { useEffect, useState } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import { Head, useForm } from "@inertiajs/react";
import { Eye, EyeOff, KeyRound, Mail, Lock, RotateCcw } from "lucide-react";

function AuthLabel({ children }) {
    return <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{children}</label>;
}

function AuthInput({ icon: Icon, ...props }) {
    return (
        <div className="relative">
            {Icon && (
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Icon size={16} />
                </span>
            )}
            <input
                {...props}
                className={`w-full h-12 rounded-xl text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-200
                    ${Icon ? "pl-10 pr-4" : "px-4"}
                    bg-white/5 border border-white/8 focus:border-[#3BF5C4]/50 focus:ring-2 focus:ring-[#3BF5C4]/10
                    ${props.className || ""}`}
            />
        </div>
    );
}

export default function ResetPassword({ token, email }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => { return () => { reset("password", "password_confirmation"); }; }, []);

    const submit = (e) => { e.preventDefault(); post(route("password.store")); };

    return (
        <AuthLayout>
            <Head title="Reset Password" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2"
                style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.2)" }}>
                <KeyRound size={26} style={{ color: "#3BF5C4" }} />
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-1">Set a new password</h1>
                <p className="text-sm text-gray-400">Choose a strong password for your account.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Email (read-only) */}
                <div>
                    <AuthLabel>Email address</AuthLabel>
                    <AuthInput
                        icon={Mail}
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        placeholder="you@example.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* New password */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <AuthLabel>New password</AuthLabel>
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "#3BF5C4" }}
                        >
                            {passwordVisible ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Show</>}
                        </button>
                    </div>
                    <AuthInput
                        icon={Lock}
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={data.password}
                        autoFocus
                        autoComplete="new-password"
                        placeholder="Min. 8 characters"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Confirm */}
                <div>
                    <AuthLabel>Confirm password</AuthLabel>
                    <AuthInput
                        icon={Lock}
                        type={passwordVisible ? "text" : "password"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        placeholder="Re-enter new password"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                        ${processing ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
                    style={{ background: "linear-gradient(135deg, #3BF5C4, #10b981)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
                >
                    <RotateCcw size={15} />
                    {processing ? "Resetting…" : "Reset password"}
                </button>
            </form>
        </AuthLayout>
    );
}
