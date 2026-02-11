import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Hero from "@/Components/Partials/Hero";
import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
import WhatWeDo from "@/Components/Partials/WhatWeDo";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function About() {
    return (
        <GuestLayout title="About Us">
            {/* Hero Section */}
            <Hero
                title="About Aurea Octave"
                desc="At Aurea Octave, we don't just invest in software – we
                        create it. Specializing in both the acquisition and
                        development of software-as-a-service (SaaS) businesses,
                        we bring a unique blend of private equity precision and
                        innovative software engineering to every project. Our
                        mission is to transform ideas into industry-leading
                        solutions that drive growth and deliver exceptional
                        value"
            />

            <WhatSetUsApart />

            <FinancialFreedom />

            <WhatWeDo />

            <section className="relative py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2">
                        <div
                            style={{
                                backgroundImage:
                                    "url('/assets/img/people-walk.png')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                position: "relative",
                            }}
                        ></div>
                        <div className="p-10 bg-secondary text-white">
                            <p className="relative pl-2 text-sm before:absolute before:top-0 before:left-0 before:bottom-0 before:w-[3px] before:h-full before:rounded-full before:bg-primary">
                                Aurea Octave stands as a premier research
                                boutique dedicated to supporting a diverse
                                clientele, including institutional investors,
                                wealth advisors, pension funds, family offices,
                                and high-net-worth individuals. An independent
                                research provider, we offer innovative, unbiased
                                intelligence for a fresh perspective our clients
                                can use to make highly informed, high-value
                                investment decisions.
                            </p>
                            <h3 className="text-primary text-xl p-10">
                                Our Mission
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
