import { useEffect } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/App/InputError";
import { Head, useForm } from "@inertiajs/react";
import { ShieldCheck, Lock, CheckCircle } from "lucide-react";

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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: "" });

    useEffect(() => { return () => { reset("password"); }; }, []);

    const submit = (e) => { e.preventDefault(); post(route("password.confirm")); };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2"
                style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.2)" }}>
                <ShieldCheck size={26} style={{ color: "#3BF5C4" }} />
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-1">Secure area</h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Please confirm your password to continue into this protected section.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <AuthLabel>Current password</AuthLabel>
                    <AuthInput
                        icon={Lock}
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus
                        placeholder="Enter your password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                        ${processing ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
                    style={{ background: "linear-gradient(135deg, #3BF5C4, #10b981)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
                >
                    <CheckCircle size={15} />
                    {processing ? "Confirming…" : "Confirm password"}
                </button>
            </form>
        </AuthLayout>
    );
}
