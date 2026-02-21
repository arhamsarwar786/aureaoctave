import { useState } from "react";
import ApplicationLogo from "@/Components/App/ApplicationLogo";
import Dropdown from "@/Components/App/Dropdown";
import NavLink from "@/Components/App/NavLink";
import ResponsiveNavLink from "@/Components/App/ResponsiveNavLink";
import { Head, Link } from "@inertiajs/react";
import AuthLogo from "@/assets/img/auth-logo.png";
import Sidebar from "@/Components/App/Sidebar";
import Navigation from "@/Components/App/Navigation";
import { Toaster } from "sonner";
import FlashNotification, {
    useFlashMessages,
} from "@/Components/App/FlashNotification";

export default function Authenticated({ user, title, children }) {
    useFlashMessages();
    return (
        <>
            <Head title={title} />
            <main className="flex min-h-screen w-full font-inter bg-[#161B1F]">
                <Sidebar user={user} />
                <section className="w-full">
                    <div className="flex size-full flex-col">
                        <Navigation user={user} />

                        <div className="">
                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                                <FlashNotification />
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Toaster richColors position="top-right" closeButton />
        </>
    );
}
