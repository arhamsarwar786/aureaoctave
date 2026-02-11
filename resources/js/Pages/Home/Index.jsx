// import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
// import GoodCompany from "@/Components/Partials/GoodCompany";
// import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
// import WhatWeDo from "@/Components/Partials/WhatWeDo";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, Link } from "@inertiajs/react";

// export default function Home() {
//     const services = [
//         {
//             title: "Cryptocurrency",
//             description:
//                 "We leverage AI-driven analytics to track market trends, assess volatility, and uncover opportunities in the fast-evolving world of cryptocurrency. Paired with our human expertise in regulatory compliance and strategic planning, we help you navigate the complexities of digital assets with confidence and precision, ensuring secure and profitable investments.",
//             img: "/assets/img/xrp.png",
//         },
//         {
//             title: "ETFs",
//             description:
//                 "We analyze vast market data to identify high-performing ETFs and optimize portfolio allocations using ai. Combined with the insights of our seasoned advisors, we craft personalized strategies that align with your financial objectives, balancing innovation with a deep understanding of global markets to maximize your returns.",
//             img: "/assets/img/chart.png",
//         },
//         {
//             title: "Mergers & Acquisitions (M&A)",
//             description:
//                 "We integrate AI’s predictive capabilities and advanced analytics with our team’s extensive experience to deliver transformative M&A solutions. From identifying ideal acquisition targets to negotiating and closing deals, our hybrid approach ensures efficiency, precision, and strategic growth tailored to your business goals",
//             img: "/assets/img/handshake.png",
//         },
//     ];
//     return (
//         <GuestLayout title="Home">
//             {/* Hero Section */}
//             <section
//                 className="relative text-white min-h-[500px] h-full lg:min-h-[800px]"
//                 style={{
//                     backgroundImage: "url('/assets/img/hero.png')",
//                     backgroundPosition: "center right",
//                     backgroundSize: "cover",
//                     backgroundRepeat: "no-repeat",
//                     position: "relative",
//                 }}
//             >
//                 <div className="absolute inset-0 bg-secondary opacity-50"></div>
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-secondary text-white">
//                     <div className="absolute bottom-0 mb-20">
//                         <div className="grid md:grid-cols-2 items-center">
//                             <div className="relative">
//                                 <div className="relative space-y-5">
//                                     <p className="text-sm font-semibold text-white">
//                                         Your Trusted Investment Advisors
//                                     </p>

//                                     <h1 className="text-xl lg:text-3xl font-bold">
//                                         Future Of Investing
//                                     </h1>

//                                     <p className="relative pl-2 text-sm before:absolute before:top-0 before:left-0 before:bottom-0 before:w-[3px] before:h-full before:rounded-full before:bg-primary">
//                                         At Aurea Octave, we combine cutting-edge
//                                         artificial intelligence with deep
//                                         financial expertise to revolutionize how
//                                         investments are managed. Our Ai-driven
//                                         tools empower investors by delivering
//                                         faster insights, reducing risks and
//                                         uncovering opportunities that
//                                         traditional methods might miss.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//                 <div className="grid gap-y-10 gap-x-40 md:grid-cols-3">
//                     {services.map((service, index) => (
//                         <div key={index} className="relative space-y-1">
//                             <img src={service.img} alt={service.title} />
//                             <h3 className="text-lg font-semibold mb-2">
//                                 {service.title}
//                             </h3>
//                             <p className="text-sm">{service.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <WhatSetUsApart />

//             <GoodCompany />

//             <WhatWeDo />

//             <FinancialFreedom />
//         </GuestLayout>
//     );
// }
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GuestLayout from "@/Layouts/GuestLayout";
import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import GoodCompany from "@/Components/Partials/GoodCompany";
import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
import WhatWeDo from "@/Components/Partials/WhatWeDo";
import TokenizedAssetsSection from "@/Components/Globalmarkets";
import Benefits from "@/Components/Benefits";
import ServicesSection from "@/Components/Services";
import TaaS2 from "@/Components/Solution";
import PerspectivesCarousel from "@/Components/prespective";
import Newsletter from "@/Components/Newsletter";

const companies = [
  "Ethereum Foundation",
  "BlackRock",
  "Ripple",
  "Franklin Templeton",
  "Sui",
  "Aptos",
  "Jupiter",
  "Aon",
  "SECP",
];
const lines = [
  " Aurea Tokenized",
  "Assets (ATA)",
];

export default function Hero() {
    const [completedLines, setCompletedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // If we've completed all lines, wait 2 seconds then restart
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          setCompletedLines([]);
          setCurrentLine("");
          setCharIndex(0);
          setLineIndex(0);
        }, 2000);
        return;
      }

      if (charIndex < lines[lineIndex].length) {
        setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }
    }, charIndex < lines[lineIndex]?.length ? 45 : 300);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, currentLine]);
  
  return (

    <div>
          <GuestLayout title="Home">
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0F14]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/assets/videos/6823023-uhd_3840_2160_24fps.mp4"
          className="w-full h-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B0F14]/60 via-[#0B0F14]/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl space-y-10">
          {/* Heading */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-7xl font-light leading-[1.1] tracking-wide text-white"
            style={{ fontFamily: "var(--font-ui-serif)" }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, delay: 0.6 }}
              className="block overflow-hidden whitespace-nowrap text-white"
            >
              Aurea Tokenized
            </motion.span>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, delay: 2.9 }}
              className="block overflow-hidden whitespace-nowrap text-[#9CA3AF]"
            >
              Assets (ATA)
            </motion.span>
          </motion.h1> */}

           <h2 className="text-5xl md:text-6xl font-semibold leading-tight  text-white min-h-[130px]">
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.6 }}
            className="max-w-xl text-base md:text-xl font-light leading-relaxed text-[#9CA3AF]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            We specialize in creating tokenized investment vehicles and delivering
            tokenization-as-a-service for asset managers and private equity firms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.2 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              className="rounded-full bg-[#3BF5C4] px-8 py-4 text-sm font-semibold tracking-wide text-[#0B0F14] transition hover:scale-[1.04]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              LEARN MORE
            </button>

            <button
              className="rounded-full border border-[#3BF5C4]/30 px-8 py-4 text-sm font-medium tracking-wide text-[#3BF5C4] backdrop-blur-md transition hover:bg-[#3BF5C4]/10"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              READ MANIFESTO
            </button>
          </motion.div>
        </div>
      </div>

      {/* Company Marquee */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-[#3BF5C4]/20 bg-linear-to-t from-[#0B0F14]/70 to-transparent py-8 backdrop-blur-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...companies, ...companies].map((company, index) => (
            <div key={index} className="px-12">
              <span
                className="cursor-default text-sm md:text-base font-medium tracking-widest uppercase text-[#9CA3AF] transition hover:text-[#3BF5C4]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {company}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
      {/* <WhatSetUsApart /> */}
      <TokenizedAssetsSection/>
<Benefits/>
<ServicesSection/>
<TaaS2/>
<PerspectivesCarousel/>
<Newsletter/>
{/* //             <GoodCompany />

//             <WhatWeDo />

//             <FinancialFreedom /> */}
      </GuestLayout>
    </div>
  );
}
