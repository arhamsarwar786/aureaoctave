import {
    CogIcon,
    LogOutIcon,
    SparklesIcon,
    ChevronRightIcon,
    ShieldCheckIcon,
} from "lucide-react";
import NavLink from "./NavLink";
import { Link, usePage } from "@inertiajs/react";
import { adminSidebarLinks, sidebarLinks } from "@/utils/constants";

const ACCENT = "#3BF5C4";

/* Single nav item */
function SidebarLink({ href, icon: Icon, label, isActive, isAdmin = false }) {
    return (
        <NavLink
            href={href}
            active={isActive}
            className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 overflow-hidden
                ${isActive
                    ? isAdmin
                        ? "bg-indigo-500/15 text-white"
                        : "text-black"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            style={isActive && !isAdmin ? {
                background: `linear-gradient(135deg, ${ACCENT}, #10b981)`,
                boxShadow: `0 4px 20px rgba(59,245,196,0.25)`,
            } : {}}
        >
            {/* Active left bar */}
            {isActive && (
                <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: isAdmin ? "#818cf8" : "#000" }}
                />
            )}

            <Icon
                size={18}
                className={`flex-shrink-0 transition-all duration-200
                    ${isActive
                        ? isAdmin ? "text-indigo-400" : "text-black"
                        : "text-slate-500 group-hover:text-slate-200"
                    }`}
            />
            <span className="text-sm font-medium leading-none">{label}</span>

            {isActive && (
                <ChevronRightIcon
                    size={13}
                    className={`ml-auto ${isAdmin ? "text-indigo-400" : "text-black/60"}`}
                />
            )}
        </NavLink>
    );
}

const Sidebar = ({ user }) => {
    const { url } = usePage();
    const roles = usePage().props.auth.roles;
    const isAdmin = roles.includes("admin");

    return (
        <aside
            className="sticky left-0 top-0 h-screen w-72 flex flex-col max-md:hidden overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #0d1117 0%, #111820 50%, #0d1117 100%)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
            }}
        >
            {/* Top glow accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}55, transparent)` }}
            />

            {/* ── LOGO ── */}
            <div className="px-6 pt-8 pb-6">
                <Link href="/dashboard" className="flex items-center gap-3">
                    {/* <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                            background: `rgba(59,245,196,0.1)`,
                            border: `1px solid rgba(59,245,196,0.25)`,
                        }}
                    > */}
                    <img src="/assets/img/logo1.png" alt="Logo" className="w-12 h-10 object-contain" />
                    {/* </div> */}
                    <span
                        className="text-lg font-bold tracking-wide"
                        style={{
                            background: `linear-gradient(135deg, ${ACCENT}, #67e8f9)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Aurea Octave
                    </span>
                </Link>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px mb-5" style={{ background: "rgba(255,255,255,0.05)" }} />

            {/* ── MAIN NAV ── */}
            <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto scrollbar-hide">

                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                    Main Menu
                </p>

                {sidebarLinks.map((item) => {
                    if (!item.roles.some((r) => roles.includes(r))) return null;
                    const isActive =
                        route().current(item.routeName) ||
                        url.startsWith(`/${item.routeName}`);
                    return (
                        <SidebarLink
                            key={item.label}
                            href={route(item.routeName)}
                            icon={item.icon}
                            label={item.label}
                            isActive={isActive}
                        />
                    );
                })}

                {/* ── ADMIN SECTION ── */}
                {isAdmin && (
                    <div className="mt-6">
                        <div className="flex items-center gap-2 px-3 mb-3">
                            <ShieldCheckIcon size={11} className="text-indigo-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
                                Admin Panel
                            </span>
                            <div className="flex-1 h-px" style={{ background: "rgba(99,102,241,0.2)" }} />
                        </div>

                        {adminSidebarLinks.map((item) => {
                            if (!item.roles.some((r) => roles.includes(r))) return null;
                            const isActive =
                                route().current(item.routeName) ||
                                url.startsWith(`/${item.routeName}`);
                            return (
                                <SidebarLink
                                    key={item.label}
                                    href={route(item.routeName)}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={isActive}
                                    isAdmin
                                />
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* ── BOTTOM ── */}
            <div className="px-4 pb-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>

                {/* Aurea AI pill */}
                <NavLink
                    href={route("aurea-ai")}
                    active={route().current("aurea-ai")}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 transition-all duration-200 group"
                    style={route().current("aurea-ai") ? {
                        background: "rgba(59,245,196,0.08)",
                        border: "1px solid rgba(59,245,196,0.2)",
                    } : {}}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(59,245,196,0.06)";
                        e.currentTarget.style.border = "1px solid rgba(59,245,196,0.15)";
                    }}
                    onMouseLeave={e => {
                        if (!route().current("aurea-ai")) {
                            e.currentTarget.style.background = "";
                            e.currentTarget.style.border = "";
                        }
                    }}
                >
                    <SparklesIcon size={17} style={{ color: ACCENT }} />
                    <span className="text-sm font-medium" style={{ color: ACCENT }}>Aurea AI</span>
                    <span
                        className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: `${ACCENT}22`, color: ACCENT }}
                    >
                        NEW
                    </span>
                </NavLink>

                {/* Settings */}
                <NavLink
                    href={route("settings")}
                    active={route().current("settings")}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group mb-1
                        ${route().current("settings") ? "bg-white/5 text-white" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"}`}
                >
                    <CogIcon size={17} className="group-hover:rotate-45 transition-transform duration-300" />
                    <span className="text-sm font-medium">Settings</span>
                </NavLink>

                {/* Divider */}
                <div className="my-3 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

                {/* User card + logout */}
                <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                    {/* Avatar */}
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-black"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, #10b981)` }}
                    >
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                    </div>

                    <NavLink
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400  transition-all duration-200 flex-shrink-0"
                        title="Log out"
                    >
                        <LogOutIcon size={14} />
                    </NavLink>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
