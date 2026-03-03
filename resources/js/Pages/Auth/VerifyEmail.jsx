import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { MailCheck, RefreshCw, LogOut } from "lucide-react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => { e.preventDefault(); post(route("verification.send")); };

    return (
        <AuthLayout>
            <Head title="Email Verification" />

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2"
                style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.2)" }}>
                <MailCheck size={30} style={{ color: "#E8A535" }} />
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Check your inbox</h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Thanks for signing up! We sent a verification link to your email address. Click the link to activate your account.
                </p>
            </div>

            {status === "verification-link-sent" && (
                <div className="px-4 py-3 rounded-xl text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-center">
                    ✓ A new verification link has been sent to your email address.
                </div>
            )}

            <form onSubmit={submit} className="space-y-3">
                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                        ${processing ? "opacity-40 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
                    style={{ background: "linear-gradient(135deg, #E8A535, #10b981)", boxShadow: "0 0 24px rgba(59,245,196,0.2)" }}
                >
                    <RefreshCw size={15} className={processing ? "animate-spin" : ""} />
                    {processing ? "Resending…" : "Resend verification email"}
                </button>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full h-11 rounded-xl text-sm text-gray-400 hover:text-white border border-white/8 hover:border-white/15 flex items-center justify-center gap-2 transition-all duration-200"
                >
                    <LogOut size={14} />
                    Log out
                </Link>
            </form>

            <p className="text-center text-xs text-gray-600">
                Didn't get the email? Check your spam folder or click resend above.
            </p>
        </AuthLayout>
    );
}
