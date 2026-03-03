"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Newsletter from "@/Components/Newsletter";
import {
    ArrowRight,
    ShieldCheck,
    Building2,
    Layers,
    Globe,
    TrendingUp,
    Zap,
    CheckCircle2,
    ChevronDown,
    Star,
    Lock,
    Eye,
    BarChart2,
    Users,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const DIFFERENTIATORS = [
    {
        icon: ShieldCheck,
        title: "Compliance First, Always",
        description:
            "Every product is issued under a rigorously regulated framework — SEC & FINRA-aligned structures, AICPA-audited, with cross-border regulatory coverage spanning North America, Europe, and Southeast Asia.",
        stat: "100%",
        statLabel: "Regulated Structures",
    },
    {
        icon: Building2,
        title: "Institutional-Grade Only",
        description:
            "We work exclusively with the world's pre-eminent custodians, broker-dealers, and asset managers. No retail shortcuts. BlackRock, Franklin Templeton, and other institutional-grade partners only.",
        stat: "Tier 1",
        statLabel: "Partner Network",
    },
    {
        icon: Layers,
        title: "Full-Stack Tokenization",
        description:
            "From legal structuring and custody, through smart-contract issuance and secondary market distribution — ATA is the only platform that handles the complete tokenization lifecycle end-to-end.",
        stat: "Full",
        statLabel: "Lifecycle Coverage",
    },
    {
        icon: TrendingUp,
        title: "AI-Powered Intelligence",
        description:
            "Aurea AI continuously analyzes live market data, volatility signals, and macro indicators — surfacing early opportunities and automating risk alerts so portfolio managers stay ahead.",
        stat: "Real-Time",
        statLabel: "Market Intelligence",
    },
    {
        icon: Globe,
        title: "Multi-Chain Distribution",
        description:
            "Deploy and distribute tokenized products across 10+ blockchain networks with full interoperability. Reach investors globally through regulated distribution partnerships.",
        stat: "10+",
        statLabel: "Supported Chains",
    },
    {
        icon: Lock,
        title: "Audited Security by Design",
        description:
            "Third-party audited smart contracts, enterprise-grade encryption, and continuously monitored infrastructure ensure assets are protected at every layer.",
        stat: "3rd-Party",
        statLabel: "Audited Security",
    },
];

const COMPARISON = [
    { feature: "Regulatory Compliance", ata: true, traditional: false, defi: false },
    { feature: "Institutional Custody", ata: true, traditional: true, defi: false },
    { feature: "On-Chain Transparency", ata: true, traditional: false, defi: true },
    { feature: "24/7 Settlement", ata: true, traditional: false, defi: true },
    { feature: "Fractional Ownership", ata: true, traditional: false, defi: true },
    { feature: "AICPA Audited", ata: true, traditional: true, defi: false },
    { feature: "AI-Driven Analytics", ata: true, traditional: false, defi: false },
    { feature: "Full Lifecycle Management", ata: true, traditional: false, defi: false },
];

const TESTIMONIALS = [
    {
        quote: "ATA gave us the infrastructure we needed to bring our flagship treasuries fund on-chain in under 60 days — compliant, custodied, and distributed globally.",
        name: "Chief Investment Officer",
        firm: "US-Based Alternative Asset Manager",
    },
    {
        quote: "What would have taken 18 months of legal and tech build-out was reduced to a single integration with ATA's TaaS platform.",
        name: "Managing Director",
        firm: "European Private Equity Firm",
    },
    {
        quote: "The combination of AI-driven risk alerts and on-chain settlement has meaningfully improved our operational efficiency.",
        name: "Head of Digital Assets",
        firm: "Gulf Region Family Office",
    },
];

const FAQS = [
    {
        q: "What makes ATA different from other tokenization platforms?",
        a: "ATA is the only platform that combines full-lifecycle tokenization infrastructure (legal, custody, issuance, distribution) with real-time AI market intelligence — all compliance-first and exclusively institutional.",
    },
    {
        q: "Who can access ATA's tokenized products?",
        a: "Our primary products (USDY) are available to qualified individual and institutional investors outside the US. OUSG and other structured vehicles are restricted to Qualified Purchasers and Accredited Investors.",
    },
    {
        q: "How are assets secured?",
        a: "All assets are held with third-party regulated custodians. Smart contracts are independently audited by AICPA-certified auditors, and the platform undergoes continuous security monitoring by enterprise security partners.",
    },
    {
        q: "Which blockchains does ATA support?",
        a: "ATA currently supports 10+ blockchain networks including Ethereum, Solana, Sui, Aptos, and several EVM-compatible chains, enabling maximum distribution reach and liquidity routing.",
    },
    {
        q: "Can my firm tokenize its own products using ATA?",
        a: "Yes. Our Tokenization-as-a-Service (TaaS) platform allows asset managers and private equity firms to tokenize their products end-to-end. Contact our team to discuss your specific use case.",
    },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border-b cursor-pointer"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
            onClick={() => setOpen(!open)}
        >
            <div className="flex items-center justify-between py-5 gap-4">
                <p className="text-white font-medium text-sm md:text-base leading-snug">{q}</p>
                <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-slate-400 transition-transform duration-300"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: open ? "#E8A535" : undefined }}
                />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-sm text-[#9CA3AF] leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Check / X cell ────────────────────────────────────────────────────────────
function Cell({ yes }) {
    return yes
        ? <CheckCircle2 size={18} style={{ color: "#E8A535" }} className="mx-auto" />
        : <span className="block text-center text-slate-600 text-lg leading-none">—</span>;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function WhyATA() {
    return (
        <GuestLayout title="Why ATA">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] bg-[#0B0F14] overflow-hidden flex flex-col justify-center pt-28 pb-20 px-6">

                {/* Grid bg */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(59,245,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,245,196,1) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
                {/* Glow */}
                <div
                    className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full pointer-events-none blur-[140px] opacity-8"
                    style={{ background: "radial-gradient(circle, #E8A535, transparent)", opacity: 0.08 }}
                />

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="max-w-3xl"
                    >
                        <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-6 font-semibold">
                            Why ATA
                        </motion.p>

                        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.06] text-white mb-8">
                            The infrastructure<br />
                            <span style={{
                                background: "linear-gradient(135deg, #E8A535, #67e8f9)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                institutions trust.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mb-12">
                            Aurea Tokenized Assets (ATA) is built at the intersection of compliance, custody, and code — the only platform that combines full-lifecycle tokenization with institutional-grade security and real-time AI intelligence.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                            <Link
                                href="/register"
                                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-[#0B0F14] transition hover:brightness-110 hover:scale-[1.03]"
                                style={{ background: "linear-gradient(135deg, #E8A535, #10b981)", boxShadow: "0 0 30px rgba(59,245,196,0.2)" }}
                            >
                                Get Started <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/contact-us"
                                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition"
                            >
                                Talk to an Expert <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 6 DIFFERENTIATORS GRID ───────────────────────────────────── */}
            <section className="bg-[#0B0F14] py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-4 font-semibold">
                            Our Advantage
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-5">
                            Six reasons ATA<br />
                            <span className="text-[#9CA3AF]">stands apart.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {DIFFERENTIATORS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={fadeUp}
                                    whileHover={{ y: -6, borderColor: "rgba(59,245,196,0.3)" }}
                                    className="group rounded-2xl p-8 border transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        borderColor: "rgba(255,255,255,0.06)",
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#E8A535]/15"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    >
                                        <Icon size={20} className="text-[#9CA3AF] group-hover:text-[#E8A535] transition-colors" />
                                    </div>

                                    {/* Stat */}
                                    <div className="mb-4">
                                        <span
                                            className="text-2xl font-semibold"
                                            style={{
                                                background: "linear-gradient(135deg, #E8A535, #67e8f9)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            {item.stat}
                                        </span>
                                        <span className="ml-2 text-xs uppercase tracking-widest text-[#9CA3AF]">{item.statLabel}</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
            <section className="bg-[#080c10] py-28 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-4 font-semibold">
                            ATA vs. The Rest
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white">
                            How we compare.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        {/* Header row */}
                        <div className="grid grid-cols-4 text-center"
                            style={{ background: "rgba(59,245,196,0.06)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="p-5 text-left text-[#9CA3AF] text-xs uppercase tracking-widest font-semibold">Feature</div>
                            <div className="p-5 text-sm font-bold" style={{ color: "#E8A535" }}>ATA</div>
                            <div className="p-5 text-sm font-medium text-white/50">Traditional Finance</div>
                            <div className="p-5 text-sm font-medium text-white/50">DeFi Protocols</div>
                        </div>

                        {COMPARISON.map((row, i) => (
                            <div
                                key={row.feature}
                                className="grid grid-cols-4 text-center transition-colors duration-150 hover:bg-white/[0.015]"
                                style={{ borderBottom: i < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                            >
                                <div className="p-4 text-left text-sm text-white/70 flex items-center">{row.feature}</div>
                                <div className="p-4 flex items-center justify-center"><Cell yes={row.ata} /></div>
                                <div className="p-4 flex items-center justify-center"><Cell yes={row.traditional} /></div>
                                <div className="p-4 flex items-center justify-center"><Cell yes={row.defi} /></div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
            <section className="bg-[#0B0F14] py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-4 font-semibold">
                            Client Perspectives
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white">
                            Trusted by institutions.
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="rounded-2xl p-8 flex flex-col gap-6"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} size={14} style={{ color: "#E8A535", fill: "#E8A535" }} />
                                    ))}
                                </div>

                                <p className="text-[#9CA3AF] text-sm leading-relaxed flex-1 italic">
                                    "{t.quote}"
                                </p>

                                <div>
                                    <p className="text-white text-sm font-semibold">{t.name}</p>
                                    <p className="text-[#9CA3AF] text-xs mt-0.5">{t.firm}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────────────── */}
            <section className="bg-[#080c10] py-28 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-4 font-semibold">
                            FAQ
                        </p>
                        <h2 className="text-4xl font-light text-white">
                            Common questions.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {FAQS.map((faq, i) => (
                            <FaqItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="bg-[#0B0F14] px-6 pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center rounded-3xl py-20 px-8 relative overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(59,245,196,0.15)",
                        boxShadow: "0 0 80px rgba(59,245,196,0.05)",
                    }}
                >
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-[100px]"
                        style={{ background: "radial-gradient(circle, #E8A535, transparent)", opacity: 0.08 }}
                    />
                    <p className="relative text-xs uppercase tracking-[0.3em] text-[#E8A535] mb-5 font-semibold">
                        Ready?
                    </p>
                    <h2 className="relative text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                        Join the institutions<br />
                        <span className="text-[#9CA3AF]">building with ATA.</span>
                    </h2>
                    <p className="relative text-[#9CA3AF] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Whether you're an asset manager looking to tokenize or an investor seeking institutional-grade yield — ATA has a solution for you.
                    </p>
                    <div className="relative flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="flex items-center gap-2 px-10 py-4 rounded-full text-sm font-semibold text-[#0B0F14] transition hover:brightness-110 hover:scale-[1.03]"
                            style={{ background: "linear-gradient(135deg, #E8A535, #10b981)", boxShadow: "0 0 30px rgba(59,245,196,0.25)" }}
                        >
                            Create Account <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact-us"
                            className="flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition"
                        >
                            Schedule a Call <ArrowRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Newsletter />
            <FinancialFreedom />

        </GuestLayout>
    );
}
