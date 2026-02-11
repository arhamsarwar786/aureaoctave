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
        <nav className="bg-white border-b border-gray-100">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <div>
                                <h1 className="capitalize p-0 m-0">
                                    Welcome {user.name}!
                                </h1>
                                <p className="p-0 m-0 text-xs">
                                    to Aurea Octave
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center">
                        <a
                            href="https://beta.aureaoctave.com/"
                            className="font-bold"
                        >
                            <span>Aurea AI</span>
                        </a>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {/* {user.name} */}
                                            <div className="footer_name">
                                                <p className="text-xl font-bold text-gray-700">
                                                    {user.name[0]}
                                                </p>
                                            </div>
                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    {sidebarLinks.map((item) => {
                        // Check if the user has any of the required roles for the link
                        const hasRole = item.roles.some((role) =>
                            roles.includes(role)
                        );

                        if (!hasRole) {
                            return null;
                        }
                        const IconComponent = item.icon;
                        const isActive =
                            route().current(item.routeName) ||
                            url.startsWith(`${item.routeName}`);
                        return (
                            <ResponsiveNavLink
                                href={route(item.routeName)}
                                key={item.label}
                                active={isActive}
                            >
                                <IconComponent className="size-5" />
                                <span className="ml-1">{item.label}</span>
                            </ResponsiveNavLink>
                        );
                    })}

                    <a
                        href="https://beta.aureaoctave.com/"
                        className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-sm font-medium focus:outline-none transition duration-150 ease-in-out`}
                    >
                        <span>Aurea AI</span>
                    </a>
                    {/* Admin Links (Only for Admin Users) */}
                    {roles.includes("admin") && (
                        <>
                            <h3 className="text-gray-900 relative inline-flex max-xl:block items-center p-3 pl-4 rounded text-[16px] leading-5 w-full font-bold">
                                Admin Links
                            </h3>
                            {adminSidebarLinks.map((item) => {
                                // Check if the user has any of the required roles for the link
                                const hasRole = item.roles.some((role) =>
                                    roles.includes(role)
                                );

                                if (!hasRole) {
                                    return null;
                                }
                                const IconComponent = item.icon;
                                const isActive =
                                    route().current(item.routeName) ||
                                    url.startsWith(`${item.routeName}`);
                                return (
                                    <ResponsiveNavLink
                                        href={route(item.routeName)}
                                        key={item.label}
                                        active={isActive}
                                    >
                                        <IconComponent className="size-5" />
                                        <span className="ml-1">
                                            {item.label}
                                        </span>
                                    </ResponsiveNavLink>
                                );
                            })}
                        </>
                    )}
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
