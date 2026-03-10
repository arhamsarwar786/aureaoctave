import {
    CogIcon,
    LogOutIcon,
    SparklesIcon,
} from "lucide-react";

import NavLink from "./NavLink";
import { Link, usePage } from "@inertiajs/react";
import { adminSidebarLinks, sidebarLinks } from "@/utils/constants";

const ACCENT = "#3BF5C4";

/* Sidebar Item */
function SidebarLink({ href, icon: Icon, label, isActive }) {
    return (
        <NavLink
            href={href}
            className={`relative flex h-20 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl px-2 py-3 transition-all duration-300 group-hover/sidebar:h-14 group-hover/sidebar:flex-row group-hover/sidebar:justify-start group-hover/sidebar:gap-0 group-hover/sidebar:px-4
            ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
            `}
        >
            {/* Active Glow */}
            {isActive && (
                <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: "linear-gradient(180deg,#3BF5C4 0%, transparent 100%)",
                        opacity: 0.25,
                        filter: "blur(10px)",
                    }}
                />
            )}

            {/* Active Indicator */}
            {isActive && (
                <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ background: ACCENT }}
                />
            )}

            <Icon
                size={22}
                className={`relative z-10 transition-all duration-200
                ${isActive ? "text-[#3BF5C4]" : "text-slate-400 group-hover:text-white"}
                `}
            />

            <span className="relative z-10 max-w-[4rem] text-center text-[11px] leading-[1.05rem] break-words transition-all duration-300 group-hover/sidebar:ml-3 group-hover/sidebar:max-w-[12rem] group-hover/sidebar:text-left group-hover/sidebar:text-sm group-hover/sidebar:leading-none group-hover/sidebar:whitespace-nowrap">
                {label}
            </span>
        </NavLink>
    );
}

const Sidebar = ({ user }) => {
    const { url } = usePage();
    const roles = usePage().props.auth.roles;
    const isAdmin = roles.includes("admin");

    return (
        <aside
            className="group/sidebar sticky left-0 top-0 flex h-screen w-20 flex-col items-stretch overflow-hidden px-3 transition-all duration-300 hover:w-80 max-md:hidden"
            style={{
                background:
                    "linear-gradient(180deg,#0d1117 0%,#111820 50%,#0d1117 100%)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
            }}
        >
            {/* Logo */}
            <div className="flex justify-center px-2 py-6 group-hover/sidebar:justify-start group-hover/sidebar:px-4">
                <Link href="/dashboard">
                    <img
                        src="/assets/img/logo4.png"
                        className="w-10 h-10 object-contain"
                    />
                </Link>
            </div>

            {/* Divider */}
            <div
                className="mb-6 h-px w-10 shrink-0 self-center transition-all duration-300 group-hover/sidebar:w-full"
                style={{ background: ACCENT }}
            />

            {/* Main Navigation */}
            <nav className="flex flex-1 flex-col gap-4">

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

                {/* Admin Section */}
                {isAdmin &&
                    adminSidebarLinks.map((item) => {
                        if (!item.roles.some((r) => roles.includes(r)))
                            return null;

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
            </nav>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4 pb-6">

                {/* Aurea AI */}
                <NavLink
                    href={route("aurea-ai")}
                    className="relative flex h-24 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl px-2 py-3 transition-all duration-300 group-hover/sidebar:h-14 group-hover/sidebar:flex-row group-hover/sidebar:justify-start group-hover/sidebar:gap-0 group-hover/sidebar:px-4"
                >
                    <SparklesIcon size={22} color={ACCENT} />

                    <span className="max-w-[4rem] text-center text-[11px] leading-[1.05rem] break-words transition-all duration-300 group-hover/sidebar:ml-3 group-hover/sidebar:max-w-[12rem] group-hover/sidebar:text-left group-hover/sidebar:text-sm group-hover/sidebar:leading-none group-hover/sidebar:whitespace-nowrap">
                        Aurea-AI
                    </span>
                </NavLink>

                {/* Settings */}
                <NavLink
                    href={route("settings")}
                    className="relative flex h-20 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl px-2 py-3 text-slate-400 transition-all duration-300 hover:text-white group-hover/sidebar:h-14 group-hover/sidebar:flex-row group-hover/sidebar:justify-start group-hover/sidebar:gap-0 group-hover/sidebar:px-4"
                >
                    <CogIcon size={22} />

                    <span className="max-w-[4rem] text-center text-[11px] leading-[1.05rem] break-words transition-all duration-300 group-hover/sidebar:ml-3 group-hover/sidebar:max-w-[12rem] group-hover/sidebar:text-left group-hover/sidebar:text-sm group-hover/sidebar:leading-none group-hover/sidebar:whitespace-nowrap">
                        Settings
                    </span>
                </NavLink>

                {/* User Avatar */}
                <div
                    className="flex h-20 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl px-2 py-3 transition-all duration-300 group-hover/sidebar:h-14 group-hover/sidebar:flex-row group-hover/sidebar:justify-start group-hover/sidebar:px-4"
                >
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black font-bold"
                        style={{
                            background: `linear-gradient(135deg, ${ACCENT}, #3BF5C4)`,
                        }}
                    >
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>

                    <span className="max-w-[4rem] text-center text-[11px] leading-[1.05rem] break-words text-slate-300 transition-all duration-300 group-hover/sidebar:ml-3 group-hover/sidebar:max-w-[12rem] group-hover/sidebar:text-left group-hover/sidebar:text-sm group-hover/sidebar:leading-none group-hover/sidebar:whitespace-nowrap group-hover/sidebar:truncate">
                        {user?.name ?? "User"}
                    </span>
                </div>

                {/* Logout */}
                <NavLink
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex h-20 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl px-2 py-3 text-slate-400 transition-all duration-300 hover:text-red-400 group-hover/sidebar:h-14 group-hover/sidebar:flex-row group-hover/sidebar:justify-start group-hover/sidebar:gap-0 group-hover/sidebar:px-4"
                >
                    <LogOutIcon size={18} />

                    <span className="max-w-[4rem] text-center text-[11px] leading-[1.05rem] break-words transition-all duration-300 group-hover/sidebar:ml-3 group-hover/sidebar:max-w-[12rem] group-hover/sidebar:text-left group-hover/sidebar:text-sm group-hover/sidebar:leading-none group-hover/sidebar:whitespace-nowrap">
                        Logout
                    </span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;