import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ResponsiveNavLink from "@/Components/App/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { sidebarLinks, adminSidebarLinks } from "@/utils/constants";
import {
    SparklesIcon,
    BellIcon,
    ChevronDownIcon,
    LogOutIcon,
    UserCircleIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";

const ACCENT = "#3BF5C4";

const Navigation = ({ user }) => {
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const pageProps = usePage().props;
    const roles = pageProps?.auth?.roles ?? (pageProps?.auth?.user ? ['user'] : []);

    // Get the label of the current active page for breadcrumb
    const allLinks = [...sidebarLinks, ...adminSidebarLinks];
    const activePage = allLinks.find(
        (item) =>
            route().current(item.routeName) ||
            url.startsWith(`/${item.routeName}`)
    );

    return (
        <>
            <nav
                className="sticky top-0 z-50 w-full"
                style={{
                    background: "rgba(13,17,23,0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
            >
                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}44, transparent)` }}
                />

                <div className="px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* ── LEFT — Page title / breadcrumb ── */}
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                        Welcome back
                                    </span>
                                    <span className="text-slate-600">·</span>
                                    {activePage && (
                                        <span
                                            className="text-[10px] font-semibold uppercase tracking-widest"
                                            style={{ color: ACCENT }}
                                        >
                                            {activePage.label}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-lg font-bold text-white leading-tight capitalize">
                                    {user.name}
                                </h1>
                            </div>
                        </div>

                        {/* ── RIGHT — Actions ── */}
                        <div className="hidden sm:flex items-center gap-3">

                            {/* Aurea AI button */}
                            <Link
                                href="/aurea-ai"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                                style={{
                                    background: `linear-gradient(135deg, ${ACCENT}, #10b981)`,
                                    boxShadow: `0 0 20px rgba(59,245,196,0.2)`,
                                }}
                            >
                                <SparklesIcon size={15} />
                                Aurea AI
                            </Link>

                            {/* Notification bell */}
                            {/* <button
                                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                            > */}
                            {/* <BellIcon size={16} /> */}
                            {/* Unread dot */}
                            {/* <span
                                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                                    style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                                />
                            </button> */}

                            {/* Profile dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-200"
                                        style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-black flex-shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${ACCENT}, #10b981)` }}
                                        >
                                            {user.name[0]?.toUpperCase()}
                                        </div>
                                        <span className="hidden md:block text-sm font-medium text-white max-w-[120px] truncate">
                                            {user.name}
                                        </span>
                                        <ChevronDownIcon size={14} className="text-slate-400" />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content
                                    className="mt-1 rounded-xl overflow-hidden shadow-2xl"
                                    style={{
                                        background: "#111820",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        minWidth: "200px",
                                    }}
                                >
                                    {/* User info header */}
                                    <div
                                        className="px-4 py-3 border-b"
                                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                                    >
                                        <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                                    </div>

                                    <div className="p-1">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-black hover:bg-white/5 hover:text-black transition-all"
                                        >
                                            {/* <UserCircleIcon size={15} className="text-slate-500" /> */}
                                            Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route("settings")}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-black hover:bg-white/5 hover:text-black transition-all"
                                        >
                                            {/* <span className="w-[30px] h-[30px] flex items-center justify-center text-slate-500">⚙</span> */}
                                            Settings
                                        </Dropdown.Link>

                                        <div
                                            className="my-1 h-px mx-2"
                                            style={{ background: "rgba(255,255,255,0.05)" }}
                                        />

                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                                        >
                                            <LogOutIcon size={15} />
                                            Log Out
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* ── Mobile toggle ── */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-200"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {open && (
                    <div
                        className="sm:hidden px-4 py-4 space-y-1"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0d1117" }}
                    >
                        {sidebarLinks.map((item) => {
                            if (!item.roles.some((r) => roles.includes(r))) return null;
                            const Icon = item.icon;
                            const isActive = route().current(item.routeName) || url.startsWith(`/${item.routeName}`);
                            return (
                                <ResponsiveNavLink
                                    key={item.label}
                                    href={route(item.routeName)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                                        ${isActive
                                            ? "text-black font-semibold"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                                    style={isActive ? {
                                        background: `linear-gradient(135deg, ${ACCENT}, #10b981)`,
                                    } : {}}
                                >
                                    <Icon size={16} className={isActive ? "text-black" : ""} />
                                    {item.label}
                                </ResponsiveNavLink>
                            );
                        })}

                        <div
                            className="my-3 h-px"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        />

                        <ResponsiveNavLink
                            href={route("profile.edit")}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5"
                        >
                            <UserCircleIcon size={16} />
                            Profile
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full"
                        >
                            <LogOutIcon size={16} />
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navigation;
