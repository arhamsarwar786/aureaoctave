import { useMemo, useState } from "react";
import {
    ChevronDownIcon,
    CogIcon,
    LogOutIcon,
    SparklesIcon,
} from "lucide-react";

import NavLink from "./NavLink";
import { Link, usePage } from "@inertiajs/react";
import { adminSidebarSections, sidebarLinks } from "@/utils/constants";

const ACCENT = "#3BF5C4";

function isRouteActive(item, url) {
    return route().current(item.routeName) || url.startsWith(route(item.routeName, {}, false));
}

function SidebarLink({ href, icon: Icon, label, isActive }) {
    return (
        <NavLink
            href={href}
            className={`relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl px-3 text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white group-hover/sidebar:justify-start group-hover/sidebar:gap-3 group-hover/sidebar:px-4 ${
                isActive ? "bg-[#3BF5C4]/10 text-white ring-1 ring-[#3BF5C4]/20" : ""
            }`}
        >
            {isActive && (
                <span
                    className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full"
                    style={{ background: ACCENT }}
                />
            )}

            <span className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-white/10" : ""}`}>
                <Icon
                    size={20}
                    className={isActive ? "text-[#3BF5C4]" : "text-slate-400"}
                />
            </span>

            <span className={`relative z-10 hidden min-w-0 truncate text-sm group-hover/sidebar:block ${isActive ? "font-semibold" : "font-medium"}`}>
                {label}
            </span>
        </NavLink>
    );
}

function SidebarSection({ section, roles, url }) {
    const visibleLinks = useMemo(
        () => section.links.filter((item) => item.roles.some((role) => roles.includes(role))),
        [roles, section.links]
    );
    const hasActiveLink = visibleLinks.some((item) => isRouteActive(item, url));
    const [isOpen, setIsOpen] = useState(hasActiveLink);

    if (visibleLinks.length === 0) {
        return null;
    }

    return (
        <div className="space-y-1">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex min-h-9 w-full items-center justify-center rounded-lg px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300 group-hover/sidebar:justify-between group-hover/sidebar:px-4"
            >
                <span className="hidden group-hover/sidebar:block">{section.label}</span>
                <span className="group-hover/sidebar:hidden">{section.label.slice(0, 1)}</span>
                <ChevronDownIcon
                    size={14}
                    className={`hidden transition group-hover/sidebar:block ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="space-y-1">
                    {visibleLinks.map((item) => (
                        <SidebarLink
                            key={item.label}
                            href={route(item.routeName)}
                            icon={item.icon}
                            label={item.label}
                            isActive={isRouteActive(item, url)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function UtilityLink({ href, icon: Icon, label, isActive = false, method, as, danger = false }) {
    return (
        <NavLink
            href={href}
            method={method}
            as={as}
            className={`flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl px-3 text-slate-400 transition-all duration-200 hover:bg-white/[0.06] group-hover/sidebar:justify-start group-hover/sidebar:gap-3 group-hover/sidebar:px-4 ${
                danger ? "hover:text-red-400" : "hover:text-white"
            } ${isActive ? "bg-white/[0.06] text-white" : ""}`}
        >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Icon size={20} color={label === "Aurea AI" ? ACCENT : undefined} />
            </span>
            <span className="hidden min-w-0 truncate text-sm font-medium group-hover/sidebar:block">
                {label}
            </span>
        </NavLink>
    );
}

const Sidebar = ({ user }) => {
    const { url } = usePage();
    const pageProps = usePage().props;
    const roles = pageProps?.auth?.roles ?? (pageProps?.auth?.user ? ["user"] : []);
    const isAdmin = roles.includes("admin");

    return (
        <aside
            data-tour-sidebar
            className="group/sidebar sticky left-0 top-0 hidden h-screen w-24 flex-col overflow-hidden border-r border-white/5 bg-[#0d1117] px-3 transition-all duration-300 hover:w-80 md:flex"
            style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.35)" }}
        >
            <div className="flex h-20 shrink-0 items-center justify-center px-2 group-hover/sidebar:justify-start group-hover/sidebar:px-4">
                <Link href="/dashboard" className="flex min-w-0 items-center">
                    <img
                        src="/assets/img/logo4.png"
                        alt="Logo compact"
                        className="size-10 object-contain group-hover/sidebar:hidden"
                    />
                    <img
                        src="/assets/img/logo3.png"
                        alt="Logo full"
                        className="hidden h-11 max-w-48 object-contain group-hover/sidebar:block"
                    />
                </Link>
            </div>

            <div className="mb-4 h-px w-10 shrink-0 self-center bg-[#3BF5C4]/70 transition-all group-hover/sidebar:w-full" />

            <nav className="flex flex-1 flex-col gap-4 overflow-y-auto pb-4 pr-1">
                <div className="space-y-1">
                    {sidebarLinks.map((item) => {
                        if (!item.roles.some((role) => roles.includes(role))) return null;

                        return (
                            <SidebarLink
                                key={item.label}
                                href={route(item.routeName)}
                                icon={item.icon}
                                label={item.label}
                                isActive={isRouteActive(item, url)}
                            />
                        );
                    })}
                </div>

                {isAdmin && (
                    <div className="space-y-3 border-t border-white/5 pt-4">
                        {adminSidebarSections.map((section) => (
                            <SidebarSection
                                key={section.label}
                                section={section}
                                roles={roles}
                                url={url}
                            />
                        ))}
                    </div>
                )}
            </nav>

            <div className="shrink-0 space-y-2 border-t border-white/5 py-4">
                <UtilityLink
                    href={route("aurea-ai")}
                    icon={SparklesIcon}
                    label="Aurea AI"
                    isActive={route().current("aurea-ai")}
                />
                <UtilityLink
                    href={route("settings")}
                    icon={CogIcon}
                    label="Settings"
                    isActive={route().current("settings")}
                />

                <div className="flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl px-3 text-slate-300 transition-all group-hover/sidebar:justify-start group-hover/sidebar:gap-3 group-hover/sidebar:px-4">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-black"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, #10b981)` }}
                    >
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="hidden min-w-0 group-hover/sidebar:block">
                        <p className="truncate text-sm font-semibold text-white">
                            {user?.name ?? "User"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {user?.email ?? ""}
                        </p>
                    </div>
                </div>

                <UtilityLink
                    href={route("logout")}
                    method="post"
                    as="button"
                    icon={LogOutIcon}
                    label="Logout"
                    danger
                />
            </div>
        </aside>
    );
};

export default Sidebar;
