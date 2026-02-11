import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Hero from "@/Components/Partials/Hero";
import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Home() {
    return (
        <GuestLayout title="Home">
            <Hero
                title="Why Business Choose us?"
                desc="At Aurea Octave, we
don’t just offer services; we deliver trust, transparency,
and results that drive meaningful impact."
            />

            <WhatSetUsApart />

            <FinancialFreedom />
        </GuestLayout>
    );
}
