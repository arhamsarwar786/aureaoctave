import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Coffee,
  Shield,
  Scale,
} from "lucide-react";

const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const CARD_WIDTH = 320;
  const GAP = 24;
  const VISIBLE_CARDS = 3;

  const services = [
    {
      icon: <Building2 className="w-8 h-8 text-[#3BF5C4]" />,
      title: "High-Quality Assets and Managers",
      description:
        "We work exclusively with the world's preeminent asset managers.",
      company: "BlackRock",
    },
    {
      icon: <Coffee className="w-8 h-8 text-[#3BF5C4]" />,
      title: "Regulated Service Providers",
      description:
        "All partners meet stringent regulatory and compliance standards.",
      company: "",
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#3BF5C4]" />,
      title: "Experienced Leadership",
      description:
        "Decades of financial services expertise and institutional experience.",
      company: "",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#3BF5C4]" />,
      title: "Third-Party Audited Security",
      description:
        "Independent audits ensure the highest protection standards.",
      company: "",
    },
    {
      icon: <Scale className="w-8 h-8 text-[#3BF5C4]" />,
      title: "Compliance-First Focus",
      description:
        "Built with regulatory alignment and global best practices.",
      company: "",
    },
  ];

  const maxScroll = Math.max(0, services.length - VISIBLE_CARDS);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(maxScroll, prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setExpandedCard((prev) => {
        const next = (prev + 1) % services.length;

        if (next <= maxScroll) setScrollPosition(next);
        else setScrollPosition(maxScroll);
        if (next === 0) setScrollPosition(0);

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, services.length, maxScroll]);

  const handleCardClick = (index) => {
    setExpandedCard(index);
    setIsPaused(true);

    if (index <= maxScroll) setScrollPosition(index);
    else setScrollPosition(maxScroll);

    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0B0F14]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(11,15,20,0.75), rgba(11,15,20,0.75)), url('/assets/img/pexels-ben-cheung-140183-441379.jpg')`,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <p className="text-[#9CA3AF] text-sm tracking-widest uppercase mb-4">
            Trust & Transparency
          </p>

          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            Institutional Grade
            <br />
            In All We Do
          </h1>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  scrollPosition * (CARD_WIDTH + GAP)
                }px)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`flex-shrink-0 w-80 h-72 rounded-2xl p-8 cursor-pointer transition-all duration-500 border ${
                    expandedCard === index
                      ? "bg-white/5 border-[#3BF5C4] scale-105 shadow-xl"
                      : "bg-white/10 border-white/10 hover:bg-[#3BF5C4]/10"
                  }`}
                >
                  <div className="text-white">
                    <div className="mb-6">{service.icon}</div>

                    <h3 className="text-lg font-medium mb-3">
                      {service.title}
                    </h3>

                    {expandedCard === index && (
                      <div className="animate-fadeIn">
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                          {service.description}
                        </p>

                        {service.company && (
                          <p className="text-lg font-semibold text-white">
                            {service.company}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-10">
            <button
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
              className="w-12 h-12 rounded-lg bg-[#3BF5C4]/20 hover:bg-[#3BF5C4]/30 disabled:opacity-40 flex items-center justify-center transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={scrollRight}
              disabled={scrollPosition >= maxScroll}
              className="w-12 h-12 rounded-lg bg-[#3BF5C4]/20 hover:bg-[#3BF5C4]/30 disabled:opacity-40 flex items-center justify-center transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
