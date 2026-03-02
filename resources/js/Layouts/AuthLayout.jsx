import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/App/ApplicationLogo";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const FEATURES = [
    { icon: TrendingUp, text: "Real-time market intelligence" },
    { icon: Shield, text: "Bank-grade security & privacy" },
    { icon: Zap, text: "AI-powered insights in seconds" },
];

export default function AuthLayout({ children }) {
    return (
        <main className="min-h-screen w-full flex bg-[#0B0F14]">

            {/* ── LEFT PANEL — branding ─────────────────────────────────── */}
            <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-14 overflow-hidden">

                {/* Layered background with online image */}
                <div className="absolute inset-0">
                    <img 
                        src="/assets/img/kevin-matos-Nl_FMFpXo2g-unsplash.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover object-center" 
                        style={{ filter: "brightness(0.5) blur(1px)" }}
                    />
                </div>

                {/* Decorative grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(59,245,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,245,196,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Floating orbs */}
                {/* <div className="absolute top-24 right-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
                    style={{ background: "radial-gradient(circle, #3BF5C4, transparent)" }} />
                <div className="absolute bottom-32 left-10 w-48 h-48 rounded-full opacity-8 blur-3xl"
                    style={{ background: "radial-gradient(circle, #3BF5C4, transparent)" }} /> */}

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/assets/img/logo1.svg" alt="" className="w-40 h-14" />
                        {/* <span className="text-xl font-bold text-white tracking-wide">Aurea Octave</span> */}
                    </Link>
                </div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-5xl font-bold text-white leading-tight mb-4">
                            Intelligent<br />
                            <span style={{
                                background: "linear-gradient(135deg, #3BF5C4, #10b981)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                Financial AI
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Make smarter investment decisions with real-time AI insights, advanced analytics, and personalized strategies.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FEATURES.map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.2)" }}>
                                    <Icon size={15} style={{ color: "#3BF5C4" }} />
                                </div>
                                <span className="text-gray-300 text-sm">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom badge */}
                <div className="relative z-10">
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-gray-500"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Trusted by 10,000+ investors worldwide
                    </div> */}
                </div>
            </div>

            {/* ── RIGHT PANEL — form ────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 relative">

                {/* Subtle top gradient */}
                <div className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(59,245,196,0.2), transparent)" }} />

                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(59,245,196,0.1)", border: "1px solid rgba(59,245,196,0.25)" }}>
                            <Sparkles size={18} style={{ color: "#3BF5C4" }} />
                        </div>
                        <span className="text-lg font-bold text-white">Aurea Octave</span>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl p-8 sm:p-10 space-y-7"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            backdropFilter: "blur(16px)",
                            boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,245,196,0.04)",
                        }}>
                        {children}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-600 mt-6">
                        © {new Date().getFullYear()} Aurea Octave. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
}
