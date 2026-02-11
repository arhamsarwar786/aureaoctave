import Accordion from "@/Components/Accordion";
import Hero from "@/Components/Partials/Hero";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function BecomeOurClient() {
    const whyCostAureaOctave = [
        {
            title: "Unrivaled Expertise",
            desc: "Over a century of combined Wall Street experience guiding our research and analyses.",
        },
        {
            title: "Diverse Research Verticals",
            desc: "Comprehensive coverage from Macro to Digital Asset Strategy.",
        },
        {
            title: "Customized Services",
            desc: "Tailored recommendations, bespoke reports, and dedicated client interactions to serve unique needs.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <GuestLayout title="Become our client">
            <Hero
                title="Empower Your Investment Decisions with Aurea Octave"
                desc="Join the ranks of institutions and individual investors who trust Aurea Octave’s top-tier, evidence-based research for optimized financial outcomes."
                button={false}
            />

            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-5">
                    <h1>
                        Why Choose
                        <span className="font-bold"> Aurea Octave</span>
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Accordion items={whyCostAureaOctave} />
                    <div>
                        <img
                            src="/assets/img/client.png"
                            alt="AI & Human Expertise"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="relative bg-secondary text-white px-10 py-16">
                    <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
                        <div>
                            <h1 className="text-2xl mb-2">
                                Let’s shape the
                                <span className="text-primary"> future</span> of
                                investing, together
                            </h1>
                            <p className="text-sm">
                                Partner with Fundstrat and benefit from informed
                                decisions powered by top-tier research.
                            </p>
                        </div>
                        <div>
                            <Link
                                href={route("contact-us")}
                                className="block text-center min-w-80 w-full border border-white p-4 text-sm font-semibold capitalize tracking-widest text-white transition duration-150 ease-in-out"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
