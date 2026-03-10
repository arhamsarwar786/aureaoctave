import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { TrendingUpIcon, BadgePercentIcon, CalendarIcon, DollarSignIcon, BarChart2Icon } from "lucide-react";

// ─── User-facing card (Securitize-style) ───────────────────────────────────
const gradients = [
    "from-[#0f2942] to-[#1a4a7a]",
    "from-[#1a1a2e] to-[#16213e]",
    "from-[#0d3b2e] to-[#1a5c47]",
    "from-[#2d1b4e] to-[#4a2c7a]",
    "from-[#2e1b0e] to-[#7a4a1a]",
    "from-[#0e2d2d] to-[#1a5c5c]",
];

function UserPackageCard({ pkg, index }) {
    const gradient = gradients[index % gradients.length];

    return (
        <div className="flex flex-col bg-[#1a2332] border border-white/10 rounded-2xl overflow-hidden hover:border-[#3BF5C4]/40 hover:shadow-lg hover:shadow-[#3BF5C4]/5 transition-all duration-300">
            {/* Header gradient banner */}
            <div className={`relative bg-gradient-to-br ${gradient} p-6 min-h-[120px] flex flex-col justify-between`}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-8 w-16 h-16 rounded-full bg-white/5 translate-y-1/2" />

                <div className="relative z-10 flex items-start justify-between">
                    {/* Logo placeholder */}
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border border-white/30">
                        {pkg.code?.substring(0, 2).toUpperCase() || "AU"}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#3BF5C4]/20 text-[#3BF5C4] border border-[#3BF5C4]/30">
                        Active
                    </span>
                </div>

                <div className="relative z-10 mt-3">
                    <h2 className="text-white font-bold text-lg leading-tight">{pkg.name}</h2>
                    <p className="text-white/60 text-sm font-medium mt-0.5">{pkg.code}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="grid grid-cols-2 gap-2">
                    <StatRow
                        icon={<BadgePercentIcon size={13} className="text-[#3BF5C4]" />}
                        label="Expense Ratio"
                        value={`${pkg.expense_ratio}%`}
                    />
                    <StatRow
                        icon={<TrendingUpIcon size={13} className="text-[#3BF5C4]" />}
                        label="SEC Yield"
                        value={`${pkg.sec_yield}%`}
                    />
                    <StatRow
                        icon={<CalendarIcon size={13} className="text-[#3BF5C4]" />}
                        label="YTD"
                        value={`${pkg.ytd}%`}
                    />
                    <StatRow
                        icon={<BarChart2Icon size={13} className="text-[#3BF5C4]" />}
                        label="1 Year"
                        value={`${pkg.one_year}%`}
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-1" />

                {/* Fund Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs">
                        <DollarSignIcon size={13} className="text-[#3BF5C4]" />
                        <span>Fund Price</span>
                    </div>
                    <span className="text-white font-bold text-base">{pkg.fund_price}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                    <Tag label={pkg.code} />
                    <Tag label="Tokenized" />
                </div>

                {/* CTA */}
                <button className="mt-auto w-full py-2.5 rounded-xl bg-[#3BF5C4]/10 border border-[#3BF5C4]/30 text-[#3BF5C4] font-semibold text-sm hover:bg-[#3BF5C4] hover:text-black-2 transition-all duration-200">
                    View Offer
                </button>
            </div>
        </div>
    );
}

function StatRow({ icon, label, value }) {
    return (
        <div className="flex flex-col gap-0.5 bg-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-1 text-white/40 text-[11px]">
                {icon}
                <span>{label}</span>
            </div>
            <span className="text-white font-semibold text-sm">{value}</span>
        </div>
    );
}

function Tag({ label }) {
    return (
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
            {label}
        </span>
    );
}

// ─── Dummy fallback packages ───────────────────────────────────────────────
const dummyPackages = [
    {
        id: 1,
        name: "Aurea Tokenized AAA CLO Fund",
        code: "AACLO",
        expense_ratio: "0.40",
        sec_yield: "4.85",
        ytd: "2.31",
        one_year: "6.12",
        fund_price: "$100.00",
    },
    {
        id: 2,
        name: "Hamilton Lane Senior Credit Fund",
        code: "HLSCF",
        expense_ratio: "2.00",
        sec_yield: "6.67",
        ytd: "3.10",
        one_year: "8.45",
        fund_price: "$10,000",
    },
    {
        id: 3,
        name: "VanEck Treasury Fund",
        code: "VNTF",
        expense_ratio: "0.20",
        sec_yield: "3.48",
        ytd: "1.95",
        one_year: "4.22",
        fund_price: "$100–$1M",
    },
    {
        id: 4,
        name: "Mantle Index Four Fund",
        code: "MI4",
        expense_ratio: "0.15",
        sec_yield: "5.20",
        ytd: "4.80",
        one_year: "12.35",
        fund_price: "$500",
    },
    {
        id: 5,
        name: "Apollo Diversified Credit Fund",
        code: "ACRED",
        expense_ratio: "1.50",
        sec_yield: "7.10",
        ytd: "3.60",
        one_year: "9.80",
        fund_price: "$1,000",
    },
    {
        id: 6,
        name: "BlackRock USD Digital Liquidity Fund",
        code: "BUIDL",
        expense_ratio: "0.50",
        sec_yield: "5.05",
        ytd: "2.75",
        one_year: "5.50",
        fund_price: "$100",
    },
];


export default function InvestmentPackage({ auth, investmentPackages }) {
    const { data } = investmentPackages;
    const roles = usePage().props.auth.roles ?? [];
    const isAdmin = roles.includes("admin");

    // Use real data if available, otherwise fall back to dummy cards (user view only)
    const displayData = data && data.length > 0 ? data : dummyPackages;

    // ── Admin view (original, unchanged) ──────────────────────────────────
    if (isAdmin) {
        const initialList = (pkg) => (
            <ul className="space-y-2 text-lg text-[#242424B2] list-disc">
                <li className="flex items-center justify-between">
                    <span className="flex-1">Expense Ratio</span>
                    <span className="w-36">{pkg.expense_ratio}%</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex-1">SEC Yield</span>
                    <span className="w-36">{pkg.sec_yield}% 30days</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex-1">YTD</span>
                    <span className="w-36">{pkg.ytd}%</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex-1">1 year</span>
                    <span className="w-36">{pkg.one_year}%</span>
                </li>
                <li className="pt-8 flex items-center justify-between">
                    <span className="flex-1">Fund Price</span>
                    <span className="w-36">{pkg.fund_price}</span>
                </li>
            </ul>
        );

        return (
            <AuthenticatedLayout user={auth.user} title="Investment Packages">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
                    {data.map((pkg, index) => (
                        <div
                            key={index}
                            className="overflow-hidden bg-white border shadow-sm sm:rounded-lg mb-8"
                        >
                            <div className={`${index === 0 ? "bg-[#001B42] text-white" : "bg-[#F5F8FE] text-black"} py-8 px-6 min-h-32`}>
                                <h1 className="font-bold text-2xl">{pkg.name}</h1>
                                <h3 className="font-bold text-lg">{pkg.code}</h3>
                            </div>
                            <div className="p-5 space-y-10">
                                <div>{initialList(pkg)}</div>
                                <div>
                                    <button className="relative w-full flex min-h-14 items-center justify-center bg-white rounded text-[#001B42] border border-[#001B42]">
                                        <span className="text-lg font-bold">Select Offer</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </AuthenticatedLayout>
        );
    }

    // ── User view (new Securitize-style design) ────────────────────────────
    return (
        <AuthenticatedLayout user={auth.user} title="Investment Packages">
            <Head title="Investment Packages" />

            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-white text-2xl font-bold">Investment Packages</h1>
                <p className="text-white/40 text-sm mt-1">
                    Explore our tokenized investment offerings
                </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayData.map((pkg, index) => (
                    <UserPackageCard key={pkg.id ?? index} pkg={pkg} index={index} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

