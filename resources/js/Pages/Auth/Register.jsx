import { useEffect, useState } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from "lucide-react";
import Checkbox from "@/Components/App/Checkbox";

const ACCENT = "#E8A535";

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
                    bg-white/5 border border-white/8 focus:border-[#E8A535]/50 focus:ring-2 focus:ring-[#E8A535]/10
                    ${props.className || ""}`}
            />
        </div>
    );
}

function AuthButton({ children, disabled }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                ${disabled ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
            style={{ background: "linear-gradient(135deg, #E8A535, #10b981)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
        >
            {children}
        </button>
    );
}

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms: false,
    });

    useEffect(() => { return () => { reset("password", "password_confirmation"); }; }, []);

    const submit = (e) => { e.preventDefault(); post(route("register")); };

    return (
        <AuthLayout>
            <Head title="Register" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
                <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href={route("login")} className="font-medium hover:underline transition-colors" style={{ color: ACCENT }}>
                        Sign in
                    </Link>
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name */}
                <div>
                    <AuthLabel>Full name</AuthLabel>
                    <AuthInput
                        icon={User}
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        placeholder="John Doe"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

                {/* Email */}
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
                        required
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
                            className="flex items-center gap-1 text-xs"
                            style={{ color: ACCENT }}
                        >
                            {passwordVisible ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Show</>}
                        </button>
                    </div>
                    <AuthInput
                        icon={Lock}
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        placeholder="Min. 8 characters"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Confirm password */}
                <div>
                    <AuthLabel>Confirm password</AuthLabel>
                    <AuthInput
                        icon={Lock}
                        type={passwordVisible ? "text" : "password"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                    <Checkbox
                        name="terms"
                        checked={data.terms}
                        onChange={(e) => setData("terms", e.target.checked)}
                        className="mt-0.5"
                    />
                    <span className="text-xs text-gray-400 leading-relaxed">
                        I agree to the{" "}
                        <Link href={route("login")} className="hover:underline" style={{ color: ACCENT }}>Terms of use</Link>
                        {" "}and{" "}
                        <Link href={route("login")} className="hover:underline" style={{ color: ACCENT }}>Privacy Policy</Link>.
                        I'd also like product & marketing updates.
                    </span>
                </div>

                <div className="pt-1">
                    <AuthButton disabled={processing}>
                        <UserPlus size={16} />
                        {processing ? "Creating account…" : "Create account"}
                    </AuthButton>
                </div>
            </form>
        </AuthLayout>
    );
}
