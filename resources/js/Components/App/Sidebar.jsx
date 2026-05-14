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
            className={`group/link relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-200 ${
                isActive
                    ? "bg-[#3BF5C4]/12 text-white shadow-[inset_0_0_0_1px_rgba(59,245,196,0.18)]"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
        >
            <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-md transition ${
                    isActive ? "bg-[#3BF5C4]/15" : "bg-white/[0.04] group-hover/link:bg-white/[0.08]"
                }`}
            >
                <Icon size={18} className={isActive ? "text-[#3BF5C4]" : "text-slate-400"} />
            </span>
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {isActive && <span className="size-1.5 rounded-full bg-[#3BF5C4]" />}
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
        <section className="space-y-1.5">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"
            >
                <span>{section.label}</span>
                <ChevronDownIcon
                    size={14}
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
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
        </section>
    );
}

function UtilityLink({ href, icon: Icon, label, isActive = false, method, as, danger = false }) {
    return (
        <NavLink
            href={href}
            method={method}
            as={as}
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                danger
                    ? "text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                    : isActive
                        ? "bg-white/[0.06] text-white"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/[0.04]">
                <Icon size={18} color={label === "Aurea AI" ? ACCENT : undefined} />
            </span>
            <span className="min-w-0 flex-1 truncate">{label}</span>
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
            className="sticky left-0 top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-[#0b1016] md:flex"
            style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.28)" }}
        >
            <div className="flex h-20 shrink-0 items-center border-b border-white/5 px-5">
                <Link href="/dashboard" className="flex min-w-0 items-center">
                    <img
                        src="/assets/img/logo3.png"
                        alt="Aurea Octave"
                        className="h-11 max-w-48 object-contain"
                    />
                </Link>
            </div>

            <div className="px-4 py-4">
                <div className="rounded-xl border border-white/6 bg-white/[0.035] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Workspace
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                        Aurea Octave
                    </p>
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4">
                <section className="space-y-1">
                    <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Main
                    </p>
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
                </section>

                {isAdmin && (
                    <div className="space-y-4 border-t border-white/5 pt-4">
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

            <div className="shrink-0 border-t border-white/5 p-4">
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-3">
                    <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-black"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, #10b981)` }}
                    >
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                            {user?.name ?? "User"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {user?.email ?? ""}
                        </p>
                    </div>
                </div>

                <div className="grid gap-1">
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
                    <UtilityLink
                        href={route("logout")}
                        method="post"
                        as="button"
                        icon={LogOutIcon}
                        label="Logout"
                        danger
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
