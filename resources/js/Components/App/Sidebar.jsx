import {
    ArrowDownToLineIcon,
    ArrowUpToLineIcon,
    BarChart3Icon,
    ChartNoAxesCombinedIcon,
    ClipboardMinusIcon,
    CogIcon,
    HomeIcon,
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
        <aside className="sticky left-0 top-0 h-screen w-80 flex flex-col justify-between 
bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
text-white shadow-2xl border-r border-slate-700 p-6 max-md:hidden">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
                <Link href="/">
                    <ApplicationLogo className="h-10 w-auto text-white drop-shadow-md" />
                </Link>
                <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#3AF5C4] to-cyan-400 bg-clip-text text-transparent">
                    AureaOctave
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-3">
                {sidebarLinks.map((item) => {
                    const hasRole = item.roles.some((role) => roles.includes(role));
                    if (!hasRole) return null;

                    const IconComponent = item.icon;
                    const isActive =
                        route().current(item.routeName) ||
                        url.startsWith(`${item.routeName}`);

                    return (
                        <NavLink
                            href={route(item.routeName)}
                            key={item.label}
                            active={isActive}
                            className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive
                                    ? "bg-[#3AF5C4] text-black shadow-lg backdrop-blur-md"
                                    : "hover:bg-white/10 text-slate-300"
                                }`}
                        >
                            <IconComponent
                                className={`size-5 lg:size-6 transition-all duration-300
                            ${isActive
                                        ? "text-black"
                                        : "text-slate-400 group-hover:text-white"
                                    }`}
                            />
                            <span className="ml-3 text-base font-medium tracking-wide">
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}

                {/* Admin Links */}
                {roles.includes("admin") && (
                    <div className="mt-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px flex-1 bg-slate-600"></div>
                            <span className="text-xs uppercase text-slate-400 tracking-widest">
                                Admin
                            </span>
                            <div className="h-px flex-1 bg-slate-600"></div>
                        </div>

                        {adminSidebarLinks.map((item) => {
                            const hasRole = item.roles.some((role) =>
                                roles.includes(role)
                            );
                            if (!hasRole) return null;

                            const IconComponent = item.icon;
                            const isActive =
                                route().current(item.routeName) ||
                                url.startsWith(`${item.routeName}`);

                            return (
                                <NavLink
                                    href={route(item.routeName)}
                                    key={item.label}
                                    active={isActive}
                                    className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                                ${isActive
                                            ? "bg-indigo-500/20 text-white shadow-lg"
                                            : "hover:bg-white/10 text-slate-300"
                                        }`}
                                >
                                    <IconComponent
                                        className={`size-5 lg:size-6 transition-all duration-300
                                    ${isActive
                                                ? "text-indigo-400"
                                                : "text-slate-400 group-hover:text-white"
                                            }`}
                                    />
                                    <span className="ml-3 text-base font-medium tracking-wide">
                                        {item.label}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* Bottom Section */}
            <div className="mt-10 flex flex-col gap-3">
                {/* Settings */}
                <NavLink
                    href={route("settings")}
                    active={route().current("settings")}
                    className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                ${route().current("settings")
                            ? "bg-indigo-500/20 text-white shadow-lg"
                            : "hover:bg-white/10 text-slate-300"
                        }`}
                >
                    <CogIcon className="size-5 lg:size-6 text-slate-400 group-hover:text-white transition" />
                    <span className="ml-3 font-medium">Settings</span>
                </NavLink>

                {/* Aurea AI */}
                <NavLink
                    href={route("aurea-ai")}
                    active={route().current("aurea-ai")}
                    className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                ${route().current("aurea-ai")
                            ? "bg-indigo-500/20 text-white shadow-lg"
                            : "hover:bg-white/10 text-slate-300"
                        }`}
                >
                    <LineChartIcon className="size-5 lg:size-6 text-slate-400 group-hover:text-white transition" />
                    <span className="ml-3 font-medium">Aurea AI</span>
                </NavLink>

                {/* Logout */}
                <NavLink
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="group flex items-center px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-all duration-300"
                >
                    <LogOutIcon className="size-5 lg:size-6 group-hover:text-red-300 transition" />
                    <span className="ml-3 font-medium">Log out</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
