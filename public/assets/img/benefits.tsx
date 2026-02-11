// @ts-nocheck
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: number;
  image: string;
  title: string;
  description: string;
  category: "Benefits" | "Why Us";
}

const articles: Article[] = [
  {
    id: 1,
    image: "/Images/Flexible_Governance_Framework.png",
    title: "Flexible Governance Framework",
    description:
      "Define, evolve, and enforce asset rules with precision-grade compliance and transparency.",
    category: "Benefits",
  },
  {
    id: 2,
    image: "/Images/Multi_Blockchain_Support.png",
    title: "Multi-Blockchain Support",
    description:
      "Deploy assets across multiple chains with interoperability and optimal execution layers.",
    category: "Benefits",
  },
  {
    id: 3,
    image: "/Images/Robust_Developer_Offering.png",
    title: "Robust Developer Offering",
    description:
      "Institutional APIs, SDKs, and tooling to accelerate secure tokenization workflows.",
    category: "Benefits",
  },
  {
    id: 4,
    image: "/Images/Security_Core_.png",
    title: "Security at the Core",
    description:
      "Audited smart contracts, encryption, and enterprise-grade security by design.",
    category: "Benefits",
  },
  {
    id: 5,
    image: "/Images/Unified_Platform.png",
    title: "Unified Platform",
    description:
      "Issuance, compliance, analytics, and lifecycle management in one system.",
    category: "Benefits",
  },
  {
    id: 6,
    image: "/Images/pexels-anh-nguyen-517648218-19813340.jpg",
    title: "Institutional-Grade Tokenization",
    description:
      "Purpose-built tokenized investment infrastructure for professional markets.",
    category: "Why Us",
  },
  {
    id: 7,
    image: "/Images/pexels-cato-s-2151997403-32744592.jpg",
    title: "Tokenization-as-a-Service",
    description:
      "Bring real-world assets on-chain with compliance-first execution.",
    category: "Why Us",
  },
  {
    id: 8,
    image: "/Images/pexels-narcissan-32678951.jpg",
    title: "Clarity-Driven Design",
    description:
      "A minimalist, trust-oriented interface built for institutions.",
    category: "Why Us",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export default function Benefits() {
  const [activeTab, setActiveTab] = useState<"Benefits" | "Why Us">("Benefits");

  const filtered = articles.filter(
    (item) => item.category === activeTab
  );

  return (
    <section
      className="relative w-full bg-[#0B0F14] py-28 px-6"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-semibold mb-3">
              {activeTab === "Benefits"
                ? "Platform Benefits"
                : "Why Institutions Choose Us"}
            </h2>
            <p className="text-[#9CA3AF] max-w-2xl">
              {activeTab === "Benefits"
                ? "Infrastructure designed for secure, compliant, and scalable tokenization."
                : "Professional-grade technology aligned with institutional standards."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {(["Benefits", "Why Us"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-[#3BF5C4] text-black shadow-lg"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`grid gap-8 ${
              activeTab === "Benefits"
                ? "md:grid-cols-2 lg:grid-cols-4"
                : "md:grid-cols-3"
            }`}
          >
            {filtered.map((article) => (
              <motion.article
                key={article.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
              >
                <div className="relative h-44">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="relative p-6">
                  <h3 className="text-white text-lg font-medium mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
                    {article.description}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#3BF5C4]">Explore →</span>
                    <span className="text-white/40 uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#3BF5C4]/20 via-transparent to-transparent" />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
