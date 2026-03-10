import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
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
        <div className="flex flex-col gap-0.5 bg-gray-100 rounded-lg px-3 py-2">
            <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                {icon}
                <span>{label}</span>
            </div>
            <span className="text-gray-900 font-semibold text-sm">{value}</span>
        </div>
    );
}

/* ─────────────────────────────
   Marketplace Card
─────────────────────────────*/

function UserPackageCard({ pkg }) {
    const tags = pkg.tags || [];

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">

            {/* Banner */}
            <div className="relative h-[120px] w-full overflow-hidden">
                <img
                    src={
                        pkg.image ||
                        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
                    }
                    alt={pkg.name || "Fund"}
                    className="w-full h-full object-cover"
                />

                {/* Logo */}
                <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-xs font-bold border">
                    {(pkg.code || "FD").substring(0, 2)}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 pt-7 flex flex-col flex-1">

                {/* Title */}
                <div className="mb-2">
                    <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">
                        {pkg.name || "Investment Fund"}
                    </h2>

                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {pkg.company || "Investment Manager"}
                    </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {pkg.description ||
                        "Institutional investment opportunity providing diversified yield exposure."}
                </p>

                {/* Chain selector */}
                <div className="flex items-center gap-2 mb-4">
                    <select className="flex-1 border border-gray-300 rounded-md text-sm px-3 py-2">
                        <option>Select Chain</option>
                        <option>Ethereum</option>
                        <option>Polygon</option>
                        <option>Solana</option>
                    </select>

                    <button className="bg-[#0f6fff] text-white text-sm px-4 py-2 rounded-md hover:bg-[#0b57d0]">
                        View
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
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
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
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

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-400">
                    Investment Packages
                </h1>
                <p className="text-gray-500 text-sm">
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