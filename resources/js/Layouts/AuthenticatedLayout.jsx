import { useState } from "react";
import ApplicationLogo from "@/Components/App/ApplicationLogo";
import Dropdown from "@/Components/App/Dropdown";
import NavLink from "@/Components/App/NavLink";
import ResponsiveNavLink from "@/Components/App/ResponsiveNavLink";
import { Head, Link } from "@inertiajs/react";
import AuthLogo from "@/assets/img/auth-logo.png";
import Sidebar from "@/Components/App/Sidebar";
import Navigation from "@/Components/App/Navigation";
import ProductTour from "@/Components/App/ProductTour";
import { Toaster } from "sonner";
import FlashNotification, {
    useFlashMessages,
} from "@/Components/App/FlashNotification";
import { useTheme } from "@/Components/App/ThemeContext";

export default function Authenticated({ user, title, children }) {
    useFlashMessages();
    const { theme } = useTheme();
    const [tourCompleted, setTourCompleted] = useState(false);

    return (
        <>
            <Head title={title} />
            <main
                className={`flex min-h-screen w-full theme-root ${theme === "dark" ? "bg-[#161B1F]" : "bg-white"
                    }`}
                data-theme={theme}
            >
                <Sidebar user={user} />
                <section className="w-full ">
                    <div className="flex size-full flex-col">
                        <Navigation user={user} />

                        <div className="" data-tour-content>
                            <div className="relative max-w-7xl pb-6 mx-auto px-4  sm:px-6 lg:px-8 space-y-6">
                                <FlashNotification />
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <ProductTour user={user} onComplete={() => setTourCompleted(true)} />
            <Toaster richColors position="top-right" closeButton />
        </>
    );
}
