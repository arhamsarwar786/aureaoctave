import {
    ArrowDownToLineIcon,
    ArrowUpToLineIcon,
    BarChart3Icon,
    ChartNoAxesCombinedIcon,
    ClipboardMinusIcon,
    CogIcon,
    HomeIcon,
    InfoIcon,
    LineChartIcon,
    LogOutIcon,
    MonitorCogIcon,
    UsersIcon,
    WalletIcon,
} from "lucide-react";
import NavLink from "./NavLink";
import ApplicationLogo from "./ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { adminSidebarLinks, sidebarLinks } from "@/utils/constants";

const Sidebar = ({ user }) => {
    const { url } = usePage();

    const roles = usePage().props.auth.roles;
    console.log(roles);
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <div className=" shrink-0 flex items-center mx-auto">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                </div>
                <div className="space-y-5 divide-y-2 pt-2">
                    <div className="max-xl:space-y-2 space-y-4">
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
                                <NavLink
                                    href={route(item.routeName)}
                                    key={item.label}
                                    active={isActive}
                                >
                                    <IconComponent className="size-5 lg:size-6" />
                                    <span className="sidebar-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </div>
                    {/* Admin Links (Only for Admin Users) */}
                    {roles.includes("admin") && (
                        <div className="max-xl:space-y-2 space-y-4 pt-5">
                            <h3 className="max-xl:hidden inline-flex text-gray-900 relative items-center p-3 pl-4 rounded text-[16px] leading-5 w-full font-bold">
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
                                    <NavLink
                                        href={route(item.routeName)}
                                        key={item.label}
                                        active={isActive}
                                    >
                                        <IconComponent className="size-5 lg:size-6" />
                                        <span className="sidebar-label">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}

                    {/* Settings, Help, and Logout Links */}
                    <div className="max-xl:space-y-2 space-y-4 pt-5">
                        <NavLink
                            href={route("settings")}
                            active={route().current("settings")}
                        >
                            <CogIcon className="size-5 lg:size-6" />
                            <span className="sidebar-label">Settings</span>
                        </NavLink>
                        <NavLink href={route("dashboard")} active={false}>
                            <InfoIcon className="size-5 lg:size-6" />
                            <span className="sidebar-label">Help</span>
                        </NavLink>
                        <NavLink
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            <LogOutIcon className="size-5 lg:size-6" />
                            <span className="sidebar-label">Log out</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Sidebar;
