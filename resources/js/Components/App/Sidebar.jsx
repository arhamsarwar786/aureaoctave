import {
    CogIcon,
    LogOutIcon,
    SparklesIcon,
    ShieldCheckIcon,
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
            className={`relative flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group
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

            {/* Tooltip */}
            <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
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
            className="sticky left-0 top-0 h-screen w-20 flex flex-col items-center max-md:hidden"
            style={{
                background:
                    "linear-gradient(180deg,#0d1117 0%,#111820 50%,#0d1117 100%)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
            }}
        >
            {/* Logo */}
            <div className="flex justify-center py-6">
                <Link href="/dashboard">
                    <img
                        src="/assets/img/logo4.png"
                        className="w-10 h-10 object-contain"
                    />
                </Link>
            </div>

            {/* Divider */}
            <div className="w-10 h-px mb-6" style={{ background: ACCENT }} />

            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col items-center gap-4">

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
            <div className="flex flex-col items-center gap-4 pb-6">

                {/* Aurea AI */}
                <NavLink
                    href={route("aurea-ai")}
                    className="relative flex items-center justify-center w-14 h-14 rounded-xl group"
                >
                    <SparklesIcon size={22} color={ACCENT} />

                    <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Aurea AI
                    </span>
                </NavLink>

                {/* Settings */}
                <NavLink
                    href={route("settings")}
                    className="relative flex items-center justify-center w-14 h-14 rounded-xl group text-slate-400 hover:text-white"
                >
                    <CogIcon size={22} />

                    <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Settings
                    </span>
                </NavLink>

                {/* User Avatar */}
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold"
                    style={{
                        background: `linear-gradient(135deg, ${ACCENT}, #3BF5C4)`,
                    }}
                >
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>

                {/* Logout */}
                <NavLink
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center justify-center w-10 h-10 text-slate-400 hover:text-red-400"
                >
                    <LogOutIcon size={18} />
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;