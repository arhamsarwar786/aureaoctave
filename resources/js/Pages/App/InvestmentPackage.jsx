import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUpIcon,
    BadgePercentIcon,
    CalendarIcon,
    BarChart2Icon,
} from "lucide-react";

/* ─────────────────────────────
   Stat Row
─────────────────────────────*/

function StatRow({ icon, label, value }) {
    return (
        <motion.div
            whileHover={{ 
                y: -6, 
                scale: 1.05,
                rotateX: 5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="relative flex flex-col gap-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Animated gradient accent on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DDFAC]/20 via-[#08C48C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2DDFAC]/20 to-[#08C48C]/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            
            <div className="relative flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider  transition-colors duration-300">
                <motion.span 
                    className="text-[#2DDFAC]"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                >
                    {icon}
                </motion.span>
                <span>{label}</span>
            </div>
            <span className="relative text-gray-900 dark:text-gray-100 font-bold text-base  transition-colors duration-300">{value}</span>
        </motion.div>
    );
}

/* ─────────────────────────────
   Marketplace Card
─────────────────────────────*/

function UserPackageCard({ pkg }) {
    const tags = pkg.tags || [];
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgSrc = pkg.image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3";

    // preload image so skeleton displays until it's ready
    useEffect(() => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => setImgLoaded(true);
    }, [imgSrc]);

    if (!imgLoaded) {
        return (
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-xl animate-pulse">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
                
                <div className="h-[180px] w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />

                <div className="p-6">
                    <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3" />
                    <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-5" />

                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-11 flex-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                        <div className="h-11 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                        <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                        <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                        <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                    </div>

                    <div className="flex gap-2 mt-5">
                        <div className="h-7 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full" />
                        <div className="h-7 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                scale: 1.03, 
                y: -8,
                rotateY: 2,
                rotateX: 2,
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900  dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-300 flex flex-col will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Animated neon glow border on hover */}
            {/* <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-[#2DDFAC] via-[#08C48C] to-[#2DDFAC] blur-lg animate-pulse" />
            </div> */}
            
            {/* Decorative gradient border on hover */}
            {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2DDFAC]/30 via-transparent to-[#08C48C]/30 blur-xl" />
            </div> */}

            {/* Banner */}
            <div className="relative h-[180px] w-full overflow-hidden">
                <motion.img
                    src={pkg.image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"}
                    alt={pkg.name || "Fund"}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.15, rotate: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* Always visible gradient overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" /> */}
                
                {/* Animated vibrant gradient on hover */}
                {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#2DDFAC]/40 via-[#08C48C]/20 to-[#2DDFAC]/40 opacity-0 group-hover:opacity-100 transition-all duration-700" /> */}
                
                {/* Shimmer effect on hover */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div> */}

                {/* Logo */}
                {/* <div className="absolute -bottom-6 left-5 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center text-sm font-bold border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-white dark:ring-gray-900">
                    {(pkg.code || "FD").substring(0, 2)}
                </div> */}
            </div>

            {/* Content */}
            <div className="relative p-6 flex flex-col flex-1">

                {/* Title */}
                <div className="mb-3">
                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">
                        {pkg.name || "Investment Fund"}
                    </h2>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">
                        {pkg.company || "Investment Manager"}
                    </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 transition-colors duration-200">
                    {pkg.description ||
                        "Institutional investment opportunity providing diversified yield exposure."}
                </p>

                {/* Chain selector */}
                <div className="flex items-center gap-3 mb-5">
                    <ChainSelect className="flex-1" />

                    <motion.button
                        whileHover={{ 
                            y: -6, 
                            scale: 1.08,
                            boxShadow: "0 20px 40px rgba(45, 223, 172, 0.4)",
                        }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        className="relative group/btn bg-gradient-to-r from-[#2DDFAC] to-[#08C48C] text-gray-900 dark:text-gray-900 text-sm font-bold px-6 py-2.5 rounded-xl  overflow-hidden"
                    >
                        {/* Animated glow effect */}
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity" /> */}
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        
                        <span className="relative">View</span>
                    </motion.button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <StatRow
                        icon={<BadgePercentIcon size={13} />}
                        label="Expense Ratio"
                        value={pkg.expense_ratio || "0.40%"}
                    />

                    <StatRow
                        icon={<TrendingUpIcon size={13} />}
                        label="SEC Yield"
                        value={pkg.sec_yield || "4.5%"}
                    />

                    <StatRow
                        icon={<CalendarIcon size={13} />}
                        label="YTD"
                        value={pkg.ytd || "2.3%"}
                    />

                    <StatRow
                        icon={<BarChart2Icon size={13} />}
                        label="1 Year"
                        value={pkg.one_year || "6.1%"}
                    />
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                        {tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ 
                                    scale: 1.15, 
                                    y: -4,
                                    rotate: [0, -2, 2, 0],
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="relative text-xs bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#2DDFAC] dark:hover:text-[#2DDFAC] font-medium px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-600/50 hover:border-[#2DDFAC]/50 shadow-sm hover:shadow-lg hover:shadow-[#2DDFAC]/20 transform transition-all duration-300 cursor-pointer group/tag overflow-hidden"
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2DDFAC]/10 to-[#08C48C]/10 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 rounded-full" />
                                <span className="relative">{tag}</span>
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* Chain select with icons */
function ChainSelect({ className = "" }) {
    const OPTIONS = [
        {
            value: "",
            label: "Select Chain",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#9CA3AF" />
                </svg>
            ),
        },
        {
            value: "ethereum",
            label: "Ethereum",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L6.8 12.4L12 15.2L17.2 12.4L12 2Z" fill="#627EEA" />
                    <path d="M6.8 12.4L12 22L17.2 12.4L12 15.2L6.8 12.4Z" fill="#4A2ECC" />
                </svg>
            ),
        },
        {
            value: "polygon",
            label: "Polygon",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3.2L18.2 6.8V17.2L12 20.8L5.8 17.2V6.8L12 3.2Z" fill="#8247E5" />
                </svg>
            ),
        },
        {
            value: "solana",
            label: "Solana",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6.5" width="18" height="2" rx="1" transform="skewX(-18)" fill="#00FFA3" />
                    <rect x="3" y="10.5" width="18" height="2" rx="1" transform="skewX(-18)" fill="#00E1FF" opacity="0.85" />
                    <rect x="3" y="14.5" width="18" height="2" rx="1" transform="skewX(-18)" fill="#7EE0FF" opacity="0.6" />
                </svg>
            ),
        },
    ];

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(OPTIONS[0]);
    const ref = useRef(null);

    useEffect(() => {
        function onClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    return (
        <div ref={ref} className={`${className} relative`}>
            <motion.button
                type="button"
                onClick={() => setOpen((s) => !s)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full flex items-center gap-2 justify-between border border-gray-200/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 rounded-xl text-sm px-3 py-2.5 hover:bg-white dark:hover:bg-gray-800 hover:border-[#2DDFAC]/50 hover:shadow-lg hover:shadow-[#2DDFAC]/10 transition-all shadow-sm group/select"
            >
                <div className="flex items-center gap-2">
                    <motion.span 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                        {selected.icon}
                    </motion.span>
                    <span className="truncate font-medium group-hover/select:text-[#2DDFAC] transition-colors duration-300">{selected.label}</span>
                </div>

                <svg className={`h-4 w-4 text-gray-500 dark:text-gray-400 group-hover/select:text-[#2DDFAC] ${open ? "rotate-180" : ""} transition-all duration-300`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.button>

            {open && (
                <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    className="absolute z-30 mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
                >
                    {OPTIONS.map((opt, index) => (
                        <motion.li
                            key={opt.value + opt.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                                setSelected(opt);
                                setOpen(false);
                            }}
                            whileHover={{ x: 4, backgroundColor: "rgba(45, 223, 172, 0.1)" }}
                            className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-gradient-to-r hover:from-[#2DDFAC]/15 hover:to-transparent transition-all duration-200 group/option"
                        >
                            <motion.span 
                                className="flex-shrink-0"
                                whileHover={{ scale: 1.3, rotate: 10 }}
                            >
                                {opt.icon}
                            </motion.span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover/option:text-[#2DDFAC] transition-colors duration-200">{opt.label}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
}

/* ─────────────────────────────
   Dummy Data
─────────────────────────────*/

const dummyPackages = [
    {
        id: 1,
        name: "Securitize Tokenized AAA CLO Fund",
        code: "STAC",
        company: "SECURITIZE CAPITAL · BNY",
        image:
            "https://images.unsplash.com/photo-1639322537228-f710d846310a",
        description:
            "Earn attractive income with a fund that invests in AAA-rated CLO tranches.",
        expense_ratio: "0.40%",
        sec_yield: "4.41%",
        ytd: "2.31%",
        one_year: "6.12%",
        tags: ["Instant Mint", "CLOs"],
    },
    {
        id: 2,
        name: "Hamilton Lane Senior Credit Opportunities",
        code: "HLCO",
        company: "SECURITIZE CAPITAL",
        image:
            "https://images.unsplash.com/photo-1621504450181-5d356f61d307",
        description:
            "Earn consistent income with senior credit investment strategies.",
        expense_ratio: "2.00%",
        sec_yield: "6.67%",
        ytd: "3.10%",
        one_year: "8.45%",
        tags: ["Collateral", "Senior Credit"],
    },
    { id: 3, name: "VanEck Treasury Fund", code: "VBIL", company: "VANECK", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3", description: "Earn stable yield with a treasury-backed fund designed to maintain $1 token value while distributing daily yield to investors.", min_investment: "$100k – $1M", expense_ratio: "0.20%", sec_yield: "3.48%", liquidity: "Instant", tags: ["Yield Daily", "U.S. Treasuries"], },
     { id: 4, name: "Mantle Index Four Fund", code: "MI4", company: "MANTLE", image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307", description: "Diversified crypto exposure through a structured index fund designed for institutional-grade blockchain portfolio strategies.", min_investment: "$500", expense_ratio: "0.15%", sec_yield: "5.20%", liquidity: "Daily", tags: ["Index", "Crypto"], }, { id: 5, name: "Apollo Diversified Credit Fund", code: "ACRED", company: "SECURITIZE CAPITAL · APOLLO", image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476", description: "Institutional diversified credit exposure across multiple asset classes with strong yield potential.", min_investment: "$1,000", expense_ratio: "1.50%", sec_yield: "7.10%", liquidity: "Monthly", tags: ["Diversified", "Credit"], }, { id: 6, name: "BlackRock USD Digital Liquidity Fund", code: "BUIDL", company: "BLACKROCK", image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c", description: "A tokenized institutional liquidity fund investing in short-term U.S. treasury assets for secure yield.", min_investment: "$100", expense_ratio: "0.50%", sec_yield: "5.05%", liquidity: "Instant", tags: ["Instant Mint", "U.S. Treasuries"], },
];

/* ─────────────────────────────
   Main Page
─────────────────────────────*/

export default function InvestmentPackage({ auth, investmentPackages }) {
    const roles = usePage().props.auth.roles ?? [];
    const isAdmin = roles.includes("admin");

    const displayData =
        investmentPackages?.data?.length > 0
            ? investmentPackages.data
            : dummyPackages;

    return (
        <AuthenticatedLayout user={auth.user} title="Investment Packages">
            <Head title="Investment Packages" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                    Investment Packages
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Explore tokenized institutional investment opportunities
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayData.map((pkg, index) => (
                    <UserPackageCard key={index} pkg={pkg} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}