import ApplicationLogo from "@/Components/App/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Auth from "@/assets/img/auth.png";
import AuthLogo from "@/assets/img/auth-logo.png";
import { useState } from "react";
import ResponsiveNavLink from "@/Components/App/ResponsiveNavLink";

export default function Guest({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <main className="min-h-screen w-full font-inter">
            <div className="flex w-full justify-between font-inter">
                <section className="flex-1 flex-center size-full max-sm:px-6">
                    <section className="auth-form">{children}</section>
                </section>
                <div className="auth-asset flex-0.5">
                    <img
                        src={Auth}
                        alt="Auth image"
                        className="object-contain h-full"
                    />
                </div>
            </div>
        </main>
    );
}
