import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const lines = [
  "Built for",
  "Asset Managers,",
  "Private Equity,",
  "and Institutions",
];

export default function TaaS2() {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentText = lines[lineIndex];

    const timeout = setTimeout(() => {
      if (charIndex < currentText.length) {
        setCurrentLine((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setCompletedLines((prev) => [...prev, currentText]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }
    }, charIndex < currentText.length ? 45 : 300);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  const cards = [
    {
      title: "Tokenization as a Service",
      desc: "Tokenize institutional investment products on a compliance-first platform.",
      img: "/assets/img/pexels-timdurgan-7317649.jpg",
      link: "/services/taas",
    },
    {
      title: "Fund Administration",
      desc: "Operate your entire fund lifecycle within one integrated system.",
      img: "/assets/img/pexels-jimbear-998499.jpg",
      link: "/services/fund-admin",
    },
  ];

  return (
    <section className="relative bg-[#0B0F14] py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group relative h-[420px] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />

              <div className="relative h-full flex flex-col items-center justify-center text-center px-8 text-white">
                <h3 className="text-3xl font-semibold mb-4 leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-[#9CA3AF] mb-8 leading-relaxed">
                  {item.desc}
                </p>

                <Link
                  href={item.link}
                  className="flex items-center gap-2 text-sm text-[#3BF5C4] hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-[#3BF5C4]/20 via-transparent to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:pl-12 pt-6"
        >
          <p className="text-sm uppercase tracking-widest text-[#3BF5C4] mb-6">
            Solutions
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold leading-tight mb-10 text-white min-h-[260px]">
            {completedLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}

            {lineIndex < lines.length && (
              <div>
                {currentLine}
                <span className="ml-1 animate-pulse text-[#3BF5C4]">▍</span>
              </div>
            )}
          </h2>

          <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-xl">
            ATA operates as the issuance and tokenization division of
            <span className="text-white"> Aurea Octave</span>, positioned at
            the intersection of compliance, custody, and code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
