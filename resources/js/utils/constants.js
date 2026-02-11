import {
    BarChartBigIcon,
    HandCoinsIcon,
    LandmarkIcon,
    ScrollTextIcon,
    UsersIcon,
    WalletMinimalIcon,
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
    WalletIcon,
} from "lucide-react";

export const DEFAULT_PROFILE =
    "https://via.placeholder.com/640x480.png/00ee44?text=praesentium";

export const sidebarLinks = [
    {
        routeName: "dashboard",
        icon: HomeIcon,
        label: "Dashboard",
        roles: ["admin", "user"],
    },
    {
        routeName: "deposit",
        icon: ArrowDownToLineIcon,
        label: "Deposit",
        roles: ["admin", "user"],
    },
    {
        routeName: "withdrawal",
        icon: ArrowUpToLineIcon,
        label: "Withdrawal",
        roles: ["admin", "user"],
    },
    {
        routeName: "portfolio",
        icon: ClipboardMinusIcon,
        label: "My Portfolio",
        roles: ["admin", "user"],
    },
    {
        routeName: "history",
        icon: BarChart3Icon,
        label: "History",
        roles: ["admin", "user"],
    },
    {
        routeName: "investment-package.index",
        icon: LineChartIcon,
        label: "Investment Packages",
        roles: ["admin", "user"],
    },
];

export const adminSidebarLinks = [
    {
        routeName: "admin.investment-package",
        icon: ChartNoAxesCombinedIcon,
        label: "Investment Packages",
        roles: ["admin"],
    },
    {
        routeName: "admin.transactions",
        icon: WalletIcon,
        label: "Transactions",
        roles: ["admin"],
    },
    {
        routeName: "admin.users.index",
        icon: UsersIcon,
        label: "Users",
        roles: ["admin"],
    },
    {
        routeName: "system-settings.index",
        icon: MonitorCogIcon,
        label: "System Settings",
        roles: ["admin"],
    },
];

export const navLinks = [
    {
        routeName: "home",
        label: "Home",
    },
    {
        routeName: "about-us",
        label: "About Us",
    },
    {
        routeName: "why-us",
        label: "Why Us",
    },
    {
        routeName: "contact-us",
        label: "Contact Us",
    },
];

// export const AI_BASE_API_URL = import.meta.env.VITE_AI_BASE_API_URL;
