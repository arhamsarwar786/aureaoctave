import { useEffect, useState } from "react";
import Checkbox from "@/Components/App/Checkbox";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import TextInput from "@/Components/App/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

const ACCENT = "#3BF5C4";

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

function AuthButton({ children, disabled, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                ${disabled ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
            style={{ background: "linear-gradient(135deg, #3BF5C4, #3BF5C4)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
        >
            {children}
        </button>
    );
}

export default function Login({ status, canResetPassword }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => { return () => { reset("password"); }; }, []);

    const submit = (e) => { e.preventDefault(); post(route("login")); };

    return (
        <AuthLayout>
            <Head title="Log in" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                <p className="text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link href={route("register")} className="font-medium hover:underline transition-colors" style={{ color: ACCENT }}>
                        Sign up free
                    </Link>
                </p>
            </div>

            {status && (
                <div className="px-4 py-3 rounded-xl text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                    <AuthLabel>Email address</AuthLabel>
                    <AuthInput
                        icon={Mail}
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        placeholder="Enter your email"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <AuthLabel>Password</AuthLabel>
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="flex items-center gap-1 text-xs transition-colors"
                            style={{ color: ACCENT }}
                        >
                            {passwordVisible ? <><EyeOff size={13} /><span>Hide</span></> : <><Eye size={13} /><span>Show</span></>}
                        </button>
                    </div>
                    <AuthInput
                        icon={Lock}
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember + forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                        />
                        <span className="text-sm text-gray-400 select-none">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link href={route("password.request")} className="text-sm text-gray-400 hover:text-white transition-colors">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <AuthButton disabled={processing}>
                    <LogIn size={16} />
                    {processing ? "Signing in…" : "Sign in"}
                </AuthButton>
            </form>
        </AuthLayout>
    );
}
