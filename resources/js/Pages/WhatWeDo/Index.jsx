"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Newsletter from "@/Components/Newsletter";
import {
    ArrowRight,
    Building2,
    Shield,
    TrendingUp,
    Zap,
    Layers,
    Globe,
    ChevronRight,
    CheckCircle2,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const HERO_SERVICES = [
    {
        id: "01",
        title: "Tokenized Investment Products",
        short: "Institutional-grade tokenized funds on compliant blockchain rails.",
        href: "/register",
    },
    {
        id: "02",
        title: "Tokenization-as-a-Service",
        short: "End-to-end infrastructure for asset managers to bring products on-chain.",
        href: "/register",
    },
    {
        id: "03",
        title: "AI-Powered Analytics",
        short: "Real-time market intelligence to surface alpha and manage risk.",
        href: "/register",
    },
];

const PILLARS = [
    {
        icon: Building2,
        title: "Tokenized Investment Vehicles",
        description:
            "We create and manage tokenized versions of institutional investment products — from short-term treasuries to diversified equity funds — enabling 24/7 settlement, fractional access, and on-chain transparency.",
        points: ["USDY & OUSG instruments", "24/7 programmable settlement", "On-chain NAV transparency"],
    },
    {
        icon: Layers,
        title: "Tokenization-as-a-Service (TaaS)",
        description:
            "Our TaaS platform allows asset managers and private equity firms to tokenize their products end-to-end — legal structuring, custody, issuance, and distribution — all in one compliance-first system.",
        points: ["Full lifecycle management", "Regulated custody partners", "Multi-chain support"],
    },
    {
        icon: Shield,
        title: "Compliance & Legal Framework",
        description:
            "Every product is issued under a rigorously regulated framework. We partner only with audited custodians, licensed broker-dealers, and compliance-approved legal counsel across multiple jurisdictions.",
        points: ["SEC & FINRA aligned structures", "Third-party AICPA audited", "Cross-border regulatory coverage"],
    },
    {
        icon: TrendingUp,
        title: "AI-Driven Market Intelligence",
        description:
            "Aurea AI analyses live global market data, volatility signals, and macroeconomic indicators to surface early-stage opportunities and automate risk alerts for portfolio managers.",
        points: ["Real-time signal processing", "Portfolio risk scoring", "Predictive rebalancing alerts"],
    },
    {
        icon: Globe,
        title: "Global Asset Distribution",
        description:
            "Through strategic partnerships with regulated distributors, we connect tokenized instruments to institutional investors in North America, Europe, the Middle East, and Southeast Asia.",
        points: ["10+ supported chains", "149 integrated projects", "$1.47B total value locked"],
    },
    {
        icon: Zap,
        title: "Fund Administration & Reporting",
        description:
            "Manage your entire fund lifecycle within one integrated dashboard — from NAV calculations and investor cap tables to regulatory reporting and automated distributions.",
        points: ["Automated NAV computation", "Investor portal access", "Custom regulatory reports"],
    },
];

// const STATS = [
//     { value: "10+", label: "Blockchain Networks" },
//     { value: "149", label: "Integrated Projects" },
//     { value: "$1.47B", label: "Total Value Locked" },
//     { value: "80%", label: "Yieldcoin Market Share" },
// ];

// ── Fade-in variants ──────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function WhatWeDo() {
    const [activeCard, setActiveCard] = useState(null);

    return (
        <GuestLayout title="What We Do">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen bg-[#0B0F14] overflow-hidden flex flex-col justify-center pt-24 pb-16 px-6">

                {/* Grid bg */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(59,245,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,245,196,1) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                    }}
                />

                {/* Glow */}
                <div
                    className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] opacity-10"
                    style={{ background: "radial-gradient(circle, #3BF5C4, transparent)" }}
                />

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        {/* Left */}
                        <div>
                            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#3BF5C4] mb-6 font-semibold">
                                What We Do
                            </motion.p>

                            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] text-white mb-8">
                                Redefining<br />
                                <span style={{
                                    background: "linear-gradient(135deg, #3BF5C4, #67e8f9)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    Institutional
                                </span><br />
                                Finance
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-lg text-[#9CA3AF] leading-relaxed max-w-lg mb-10">
                                Aurea Octave sits at the intersection of compliance, custody, and code — creating the infrastructure that transforms traditional investment products into programmable, on-chain instruments.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                                <Link
                                    href="/register"
                                    className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-[#0B0F14] transition hover:brightness-110 hover:scale-[1.03]"
                                    style={{ background: "linear-gradient(135deg, #3BF5C4, #10b981)", boxShadow: "0 0 30px rgba(59,245,196,0.2)" }}
                                >
                                    Get Started <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-[#3BF5C4] border border-[#3BF5C4]/30 hover:bg-[#3BF5C4]/8 transition"
                                >
                                    Talk to Us <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right — service pills */}
                        <motion.div variants={stagger} className="flex flex-col gap-4">
                            {HERO_SERVICES.map((svc, i) => (
                                <motion.div
                                    key={svc.id}
                                    variants={fadeUp}
                                    whileHover={{ x: 8 }}
                                    className="group flex items-start gap-5 p-6 rounded-2xl border cursor-pointer transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        borderColor: "rgba(255,255,255,0.07)",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = "rgba(59,245,196,0.3)";
                                        e.currentTarget.style.background = "rgba(59,245,196,0.04)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    }}
                                >
                                    <span className="text-2xl font-light text-[#3BF5C4]/40 font-mono w-8 flex-shrink-0 mt-0.5">
                                        {svc.id}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold mb-1 group-hover:text-[#3BF5C4] transition-colors">
                                            {svc.title}
                                        </h3>
                                        <p className="text-sm text-[#9CA3AF] leading-relaxed">{svc.short}</p>
                                    </div>
                                    <ChevronRight size={18} className="text-[#9CA3AF] group-hover:text-[#3BF5C4] transition-colors flex-shrink-0 mt-1" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── STATS BAR ────────────────────────────────────────────────── */}
            {/* <section
                className="w-full py-8 px-6"
                style={{
                    background: "rgba(59,245,196,0.04)",
                    borderTop: "1px solid rgba(59,245,196,0.1)",
                    borderBottom: "1px solid rgba(59,245,196,0.1)",
                }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-light text-white mb-1">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-[#9CA3AF]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* ── PILLARS GRID ─────────────────────────────────────────────── */}
            <section className="bg-[#0B0F14] py-28 px-6">
                <div className="max-w-7xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#3BF5C4] mb-4 font-semibold">
                            Our Services
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-5">
                            Everything we build,<br />
                            <span className="text-[#9CA3AF]">in one place.</span>
                        </h2>
                        <p className="text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
                            Six core disciplines that form the backbone of ATA's institutional offering — from issuance to distribution to analytics.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {PILLARS.map((pillar, i) => {
                            const Icon = pillar.icon;
                            const isActive = activeCard === i;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    variants={fadeUp}
                                    onClick={() => setActiveCard(isActive ? null : i)}
                                    className="group cursor-pointer rounded-2xl p-8 border transition-all duration-300"
                                    style={{
                                        background: isActive ? "rgba(59,245,196,0.06)" : "rgba(255,255,255,0.02)",
                                        borderColor: isActive ? "rgba(59,245,196,0.35)" : "rgba(255,255,255,0.06)",
                                        boxShadow: isActive ? "0 0 40px rgba(59,245,196,0.08)" : "none",
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{
                                            background: isActive ? "rgba(59,245,196,0.15)" : "rgba(255,255,255,0.05)",
                                            border: `1px solid ${isActive ? "rgba(59,245,196,0.35)" : "rgba(255,255,255,0.08)"}`,
                                        }}
                                    >
                                        <Icon size={22} style={{ color: isActive ? "#3BF5C4" : "#9CA3AF" }} />
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-3 leading-snug" style={{ color: isActive ? "#3BF5C4" : "#fff" }}>
                                        {pillar.title}
                                    </h3>

                                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">
                                        {pillar.description}
                                    </p>

                                    <div className={`space-y-2 overflow-hidden transition-all duration-300 ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                        {pillar.points.map((pt) => (
                                            <div key={pt} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                                                <CheckCircle2 size={14} style={{ color: "#3BF5C4", flexShrink: 0 }} />
                                                {pt}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center gap-1.5 text-xs font-medium" style={{ color: isActive ? "#3BF5C4" : "#ffffff55" }}>
                                        {isActive ? "Click to collapse" : "Click to expand"}
                                        <ChevronRight size={13} className={`transition-transform ${isActive ? "rotate-90" : ""}`} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA BANNER ───────────────────────────────────────────────── */}
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
                    {/* Glow orb */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-[100px] opacity-10"
                        style={{ background: "radial-gradient(circle, #3BF5C4, transparent)" }}
                    />

                    <p className="relative text-xs uppercase tracking-[0.3em] text-[#3BF5C4] mb-5 font-semibold">
                        Ready to start?
                    </p>
                    <h2 className="relative text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                        Bring your assets<br />
                        <span className="text-[#9CA3AF]">on-chain with ATA.</span>
                    </h2>
                    <p className="relative text-[#9CA3AF] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Whether you're an asset manager looking to tokenize, or an investor seeking institutional-grade yield, we have a solution for you.
                    </p>
                    <div className="relative flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="flex items-center gap-2 px-10 py-4 rounded-full text-sm font-semibold text-[#0B0F14] transition hover:brightness-110 hover:scale-[1.03]"
                            style={{ background: "linear-gradient(135deg, #3BF5C4, #10b981)", boxShadow: "0 0 30px rgba(59,245,196,0.25)" }}
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
