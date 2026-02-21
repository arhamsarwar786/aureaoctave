import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import Dropdown from "./Dropdown";
import { useState } from "react";
import NavLink from "@/Components/App/NavLink";
import ResponsiveNavLink from "@/Components/App/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { adminSidebarLinks, sidebarLinks } from "@/utils/constants";

const Navigation = ({ user }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { url } = usePage();

    const roles = usePage().props.auth.roles;
    return (
  <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700 shadow-xl">
    <div className="w-full mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">

            {/* Left Section - Welcome */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                        Welcome back
                    </span>

                    <h1 className="capitalize text-2xl font-bold text-white leading-tight">
                        {user.name}
                    </h1>

                    <span className="text-xs text-slate-400 font-medium">
                        to{" "}
                        <span className="bg-[#3AF5C4] bg-clip-text text-transparent font-semibold">
                            Aurea Octave
                        </span>
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden sm:flex items-center gap-6">

                {/* Aurea AI Button */}
                <Link
                    href="/aurea-ai"
                    className="px-5 py-2.5 rounded-xl 
                    bg-gradient-to-r from-[#3AF5C4] to-cyan-500 
                    text-black font-semibold shadow-lg 
                    hover:scale-105 hover:shadow-indigo-500/30 
                    transition-all duration-300"
                >
                    Aurea AI
                </Link>

                {/* Profile Dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-3 bg-slate-800/70 hover:bg-slate-700 px-3 py-2 rounded-xl transition-all duration-300 border border-slate-700">

                            {/* Avatar */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3AF5C4] to-cyan-500 text-white font-bold text-lg shadow-md">
                                {user.name[0]}
                            </div>

                            {/* Name */}
                            <span className="text-white font-medium hidden md:block">
                                {user.name}
                            </span>

                            {/* Arrow */}
                            <svg
                                className="h-4 w-4 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl">

                        <Dropdown.Link
                            href={route("profile.edit")}
                            className="text-black hover:bg-gray-100 transition-all duration-300"
                        >
                            Profile
                        </Dropdown.Link>

                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-red-400 hover:bg-red-500/10"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>

            {/* Mobile Toggle */}
            <div className="sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown((prev) => !prev)
                    }
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        {showingNavigationDropdown ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    {/* Mobile Menu */}
    {showingNavigationDropdown && (
        <div className="sm:hidden bg-slate-900 border-t border-slate-700 px-4 py-4 space-y-2">

            {sidebarLinks.map((item) => {
                const hasRole = item.roles.some((role) =>
                    roles.includes(role)
                );
                if (!hasRole) return null;

                const IconComponent = item.icon;

                return (
                    <ResponsiveNavLink
                        key={item.label}
                        href={route(item.routeName)}
                        className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 rounded-lg px-3 py-2"
                    >
                        <IconComponent className="size-5" />
                        {item.label}
                    </ResponsiveNavLink>
                );
            })}

            <div className="border-t border-slate-700 pt-3 mt-3">
                <ResponsiveNavLink href={route("profile.edit")}>
                    Profile
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    method="post"
                    href={route("logout")}
                    as="button"
                    className="text-red-400"
                >
                    Log Out
                </ResponsiveNavLink>
            </div>
        </div>
    )}
</nav>
    );
};

export default Navigation;
