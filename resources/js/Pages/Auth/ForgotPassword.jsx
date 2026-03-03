import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Send, ArrowLeft } from "lucide-react";

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

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: "" });

    const submit = (e) => { e.preventDefault(); post(route("password.email")); };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2"
                style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.2)" }}>
                <Mail size={26} style={{ color: "#E8A535" }} />
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Forgot your password?</h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                    No problem. Enter your email and we'll send you a link to reset your password.
                </p>
            </div>

            {status && (
                <div className="px-4 py-3 rounded-xl text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <AuthLabel>Email address</AuthLabel>
                    <AuthInput
                        icon={Mail}
                        type="email"
                        name="email"
                        value={data.email}
                        autoFocus
                        placeholder="you@example.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                        ${processing ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
                    style={{ background: "linear-gradient(135deg, #E8A535, #10b981)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
                >
                    <Send size={15} />
                    {processing ? "Sending link…" : "Send reset link"}
                </button>
            </form>

            <Link href={route("login")}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={14} /> Back to sign in
            </Link>
        </AuthLayout>
    );
}
