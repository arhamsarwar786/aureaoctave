import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const TokenizedAssetsSection = () => {
    const stats = [
        { value: "10", label: "Supported Chains", icon: Zap },
        { value: "149", label: "Integrated Projects", icon: Shield },
        { value: "80%", label: "Yieldcoin Market Share", icon: TrendingUp },
        { value: "$1.47B", label: "Total Value Locked", icon: TrendingUp },
    ];

    const products = [
        {
            name: "USDY",
            description: "US Dollar Yield*",
            apy: "3.75%",
            tag: "For Individuals and Institutions (non-US)",
        },
        {
            name: "OUSG",
            description: "Short-Term US Treasuries Fund*",
            apy: null,
            tag: "Qualified Purchasers & Accredited Investors",
        },
    ];

    return (
        <section className="min-h-screen bg-[#0B0F14] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
                        Aurea Tokenized Assets{" "}
                        <span className="text-[#9CA3AF]">(ATA)</span>
                    </h1>

                    <p className="text-[#9CA3AF] text-xl max-w-3xl mx-auto leading-relaxed">
                        An institutional gateway for bringing
                        <br />
                        real-world assets on-chain.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-4">
                        <span className="h-px w-24 bg-white/20" />
                        <span className="w-2 h-2 rounded-full bg-[#3BF5C4]" />
                        <span className="h-px w-24 bg-white/20" />
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
                        >
                            <stat.icon className="w-5 h-5 text-[#3BF5C4] mb-6" />

                            <div className="text-4xl md:text-5xl font-light mb-1">
                                {stat.value}
                            </div>

                            <p className="text-sm text-[#9CA3AF]">
                                {stat.label}
                            </p>

                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#3BF5C4]/10 to-transparent pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Cash Management Section */}
                <div className="mb-16">
                    <div className="flex gap-6 items-start mb-10">
                        <div className="hidden sm:block w-1 h-24 bg-gradient-to-b from-[#3BF5C4] to-transparent rounded-full" />
                        <div>
                            <h2 className="text-3xl md:text-4xl font-light mb-3">
                                Institutional-Grade
                            </h2>
                            <h2 className="text-3xl md:text-4xl font-light mb-4">
                                Cash Management
                            </h2>
                            <p className="text-[#9CA3AF] max-w-xl leading-relaxed">
                                Earn reliable yield backed by short-term US
                                Treasuries with daily distribution and full
                                transparency.
                            </p>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative group rounded-3xl bg-white/5 border border-white/10 p-8"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-light mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#9CA3AF] text-sm">
                                            {product.description}
                                        </p>
                                    </div>

                                    <span className="text-xs text-[#9CA3AF] max-w-[140px] text-right">
                                        {product.tag}
                                    </span>
                                </div>

                                {product.apy && (
                                    <div className="mb-10">
                                        <div className="text-6xl font-light">
                                            {product.apy}
                                        </div>
                                        <span className="text-sm text-[#9CA3AF]">
                                            APY*
                                        </span>
                                    </div>
                                )}

                                <div className="absolute bottom-6 right-6">
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3BF5C4] transition">
                                        <ArrowRight className="w-5 h-5 text-white group-hover:text-[#3BF5C4]" />
                                    </div>
                                </div>

                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#3BF5C4]/10 to-transparent pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footnote */}
                <p className="text-center text-xs text-[#9CA3AF]">
                    * Annual Percentage Yield. Past performance does not
                    guarantee future results.
                </p>
            </div>
        </section>
    );
};

export default TokenizedAssetsSection;
