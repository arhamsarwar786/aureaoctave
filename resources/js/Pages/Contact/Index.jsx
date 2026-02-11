import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import Hero from "@/Components/Partials/Hero";
import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
import WhatWeDo from "@/Components/Partials/WhatWeDo";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Textarea } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";

export default function Home() {
    const indexIndex = [
        {
            label: "Address",
            text: "1250 Connecticut Ave Nw Washinton, District of Columbia 20038",
            icon: "/assets/img/location.png",
        },
        {
            label: "Call",
            text: "+1 610 721 6271",
            icon: "/assets/img/call.png",
        },
        {
            label: "Email Address",
            text: "Nanaabban@aureaoctave.com",
            icon: "/assets/img/sms.png",
        },
        {
            label: "Business Hours",
            text: "Monday to Friday – 9:00 AM to 6:00 PM (EST)",
            icon: "/assets/img/calendar.png",
        },
    ];
    return (
        <GuestLayout title="Contact Us">
            <Hero
                title="Ready to innovate and grow?"
                desc="Grow with Aurea Octave today"
                button={false}
            />
            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="relative bg-secondary text-white px-10 py-16">
                    <h1 className="text-2xl mb-2">
                        Our <span className="text-primary">expertise</span>,
                        your <span className="text-primary">success</span>.
                    </h1>
                    <p className="text-sm">
                        Partner with Fundstrat and benefit from informed
                        decisions powered by top-tier research.
                    </p>
                </div>
            </section>
            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                        <div className="grid grid-cols-2 gap-10">
                            {indexIndex.map((item, index) => (
                                <div className="relative space-y-1" key={index}>
                                    <div className="relative rounded-lg md:rounded-2xl bg-secondary size-[50px] md:size-[76px] flex flex-col items-center justify-center">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className="size-5 md:size-8"
                                        />
                                    </div>
                                    <div class="text-secondary">
                                        <h1 className="text-sm md:text-lg font-semibold">
                                            {item.label}
                                        </h1>
                                        <p className="text-xs md:text-sm">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="p-10 relative rounded-3xl bg-white">
                            <div className="relative text-secondary py-5">
                                <h1 className="text-lg font-semibold">
                                    Fill The Contact Form
                                </h1>
                                <p className="text-sm">
                                    Feel free to contact with us, we don’t spam
                                    your email
                                </p>
                            </div>
                            <div className="relative py-5">
                                <form className="relative space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="col-span-2 md:col-span-1">
                                            <TextInput
                                                placeholder="Your name"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <TextInput
                                                placeholder="Phone number"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <TextInput
                                                placeholder="E-mail"
                                                type="email"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <textarea
                                                rows="5"
                                                placeholder="Message"
                                                className="w-full border-none text-[#6767678C] outline-0 outline-none active:outline-0 focus:border-b-secondary"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <PrimaryButton className="py-4 text-lg">
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
