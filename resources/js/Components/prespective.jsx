import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const perspectives = [
  {
    company: "BlackRock",
    quote:
      "We believe the next step going forward will be the tokenization of financial assets. This is a technological transformation for financial assets.",
    author: "Larry Fink · Founder, Chairman & CEO · BlackRock",
  },
  {
    company: "McKinsey",
    quote:
      "Regulated institutions have long desired more purpose-built infrastructure that meets their needs and makes it easier to transact on-chain.",
    author:
      "Matt Higginson · Partner & Global Leader, Digital Assets · McKinsey",
  },
  {
    company: "ABN AMRO",
    quote:
      "Purpose-built infrastructure for omnichannel distribution of tokenized assets has the potential to be highly disruptive to traditional financial institutions.",
    author:
      "Arrzah Moelah · Lead Digital Asset Intrapreneur · ABN AMRO",
  },
];

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    transition: { duration: 0.6, ease: "easeInOut" },
  }),
};

export default function PerspectivesCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % perspectives.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const paginate = (dir) => {
    setAutoPlay(false);
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + perspectives.length) % perspectives.length
    );
  };

  const active = perspectives[index];

  return (
    <section className="relative bg-[#0B0F14] py-32 px-6 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white text-4xl md:text-5xl font-light tracking-wide mb-20"
        >
          Perspectives
        </motion.h2>

        {/* Carousel */}
        <div className="relative min-h-[420px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="h-full rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl px-14 py-16 flex flex-col justify-between">
                
                {/* Company */}
                <div className="mb-12">
                  {active.company === "BlackRock" && (
                    <span className="text-white text-3xl font-semibold tracking-tight">
                      BlackRock
                    </span>
                  )}

                  {active.company === "McKinsey" && (
                    <span className="text-white text-2xl font-light leading-tight">
                      McKinsey
                      <span className="block text-lg text-[#9CA3AF]">
                        & Company
                      </span>
                    </span>
                  )}

                  {active.company === "ABN AMRO" && (
                    <span className="text-white text-2xl font-semibold tracking-widest">
                      ABN AMRO
                    </span>
                  )}
                </div>

                {/* Quote */}
                <div className="flex-1 flex items-center">
                  <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed max-w-4xl">
                    “{active.quote}”
                  </p>
                </div>

                {/* Author */}
                <div className="mt-12 text-sm text-[#9CA3AF]">
                  {active.author}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center transition"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center transition"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Accent Glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3BF5C4]/10 blur-[120px] rounded-full" />
    </section>
  );
}
