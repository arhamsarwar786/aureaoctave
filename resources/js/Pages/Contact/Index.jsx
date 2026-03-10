import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Hero from "@/Components/Partials/Hero";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import {
    MapPinIcon,
    PhoneIcon,
    MailIcon,
    ClockIcon,
    SendIcon,
    CheckCircleIcon,
    LoaderIcon,
    AlertCircleIcon,
} from "lucide-react";

// ── EmailJS credentials from .env (Vite exposes VITE_* vars) ──────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// Active domain – passed as `page_url` so the EmailJS template can reference it
const PAGE_URL = import.meta.env.VITE_APP_URL ?? window.location.origin;

const INFO_CARDS = [
    {
        icon: MapPinIcon,
        label: "Address",
        text: "1250 Connecticut Ave NW, Washington, DC 20038",
    },
    {
        icon: PhoneIcon,
        label: "Call",
        text: "+1 610 721 6271",
    },
    {
        icon: MailIcon,
        label: "Email",
        text: "Nanaabban@aureaoctave.com",
        href: "mailto:Nanaabban@aureaoctave.com",
        wide: true,
    },
    {
        icon: ClockIcon,
        label: "Business Hours",
        text: "Mon – Fri · 9 AM – 6 PM (EST)",
    },
];

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    if (status === "success")
        return (
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl">
                <CheckCircleIcon size={16} />
                Message sent! We'll get back to you shortly.
            </div>
        );
    if (status === "error")
        return (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                <AlertCircleIcon size={16} />
                Something went wrong. Please try again or email us directly.
            </div>
        );
    return null;
}

export default function ContactPage() {
    const formRef = useRef(null);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [touched, setTouched] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.message.trim()) errs.message = "Message cannot be empty";
        return errs;
    };

    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleBlur = (e) =>
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });
        if (!isValid) return;

        setStatus("sending");
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                    reference_url: PAGE_URL,       // active domain reference
                    reply_to: form.email,
                },
                EMAILJS_PUBLIC_KEY
            );
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
            setTouched({});
        } catch (err) {
            console.error("EmailJS error:", err);
            setStatus("error");
        }
    };

    // ── Input component ──────────────────────────────────────────────────────
    const hasError = (field) => touched[field] && errors[field];

    const fieldClass = (field) =>
        `w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none
         transition-all duration-200 focus:ring-2 focus:ring-[#3BF5C4]/30
         ${hasError(field)
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/8 focus:border-[#3BF5C4]/50"
        }`;

    return (
        <GuestLayout title="Contact Us">
            <Head title="Contact Us" />

            <Hero
                title={
                    <span className="font-bold text-[2.5rem] md:text-[3.5rem] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Ready to innovate and grow?
                    </span>
                }
                desc={
                    <span className="text-lg text-white/80" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Grow with Aurea Octave today
                    </span>
                }
                button={false}
            />

            {/* ── Banner ── */}
            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 bg-black">
                <div
                    className="relative rounded-3xl text-white px-10 py-14 overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #161B1F 0%, #0e1a1a 100%)",
                        boxShadow: "0 0 60px rgba(59,245,196,0.06)",
                    }}
                >
                    {/* Decorative orb */}
                    <div
                        className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #3BF5C4, transparent)" }}
                    />
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Our <span style={{ color: "#3BF5C4" }}>expertise</span>, your success.
                    </h2>
                    <p className="text-base text-white/70" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Partner with Aurea Octave and benefit from informed decisions powered by top-tier research.
                    </p>
                </div>
            </section>

            {/* ── Main grid ── */}
            <section className="mx-auto max-w-7xl pb-20 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="grid lg:grid-cols-2 gap-10 items-start">

                    {/* ── Info cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {INFO_CARDS.map(({ icon: Icon, label, text, href, wide }) => (
                            <div
                                key={label}
                                className={`flex items-start gap-4 rounded-2xl p-6 transition-all duration-200 ${wide ? "sm:col-span-2" : ""}`}
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: "rgba(59,245,196,0.08)",
                                        border: "1px solid rgba(59,245,196,0.2)",
                                    }}
                                >
                                    <Icon size={20} style={{ color: "#3BF5C4" }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="block break-all text-sm leading-relaxed text-white/80 transition-colors duration-200 hover:text-[#3BF5C4]"
                                        >
                                            {text}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            {text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Domain badge */}
                        {/* <div
                            className="sm:col-span-2 flex items-center gap-3 px-5 py-3 rounded-xl"
                            style={{
                                background: "rgba(59,245,196,0.05)",
                                border: "1px solid rgba(59,245,196,0.15)",
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            <p className="text-xs text-slate-400">
                                Active portal:{" "}
                                <a
                                    href={PAGE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:underline"
                                    style={{ color: "#3BF5C4" }}
                                >
                                    {PAGE_URL}
                                </a>
                            </p>
                        </div> */}
                    </div>

                    {/* ── Contact form ── */}
                    <div
                        className="rounded-3xl p-8 sm:p-10"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,245,196,0.04)",
                        }}
                    >
                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                                Send us a message
                            </h2>
                            <p className="text-sm text-slate-400">
                                We'll reply within one business day. No spam, ever.
                            </p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="John Doe"
                                    className={fieldClass("name")}
                                    disabled={status === "sending"}
                                />
                                {hasError("name") && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="you@example.com"
                                    className={fieldClass("email")}
                                    disabled={status === "sending"}
                                />
                                {hasError("email") && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={5}
                                    placeholder="Tell us how we can help…"
                                    className={fieldClass("message") + " resize-none"}
                                    disabled={status === "sending"}
                                />
                                {hasError("message") && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                                )}
                                <p className="mt-1 text-right text-[10px] text-slate-600">
                                    {form.message.length} / 500
                                </p>
                            </div>

                            {/* Status badge */}
                            <StatusBadge status={status} />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`w-full h-12 rounded-xl font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all duration-200
                                    ${status === "sending"
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:brightness-110 active:scale-[0.98]"
                                    }`}
                                style={{
                                    background: "linear-gradient(135deg, #3BF5C4, #10b981)",
                                    boxShadow: "0 0 24px rgba(59,245,196,0.2)",
                                }}
                            >
                                {status === "sending" ? (
                                    <>
                                        <LoaderIcon size={16} className="animate-spin" />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        <SendIcon size={15} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <FinancialFreedom />
        </GuestLayout>
    );
}
