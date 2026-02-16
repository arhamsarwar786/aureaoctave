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
                title={<span className="font-bold text-[2.5rem] md:text-[3.5rem] text-[#fffff]" style={{fontFamily:'Poppins, sans-serif'}}>Ready to innovate and grow?</span>}
                desc={<span className="text-lg text-white/80" style={{fontFamily:'Poppins, sans-serif'}}>Grow with Aurea Octave today</span>}
                button={false}
            />
            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="relative rounded-3xl bg-[#161B1F] text-white px-10 py-16 shadow-xl" style={{fontFamily:'Poppins, sans-serif'}}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Our <span className="text-[#3BF5C4]">expertise</span>, your <span className="text-primary">success</span>.
                    </h1>
                    <p className="text-base text-white/80">
                        Partner with Aurea Octave and benefit from informed decisions powered by top-tier research.
                    </p>
                </div>
            </section>
            <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                        <div className="grid grid-cols-2 gap-10">
                            {indexIndex.map((item, index) => (
                                <div className="relative space-y-3" key={index} style={{fontFamily:'Poppins, sans-serif'}}>
                                    <div className="relative rounded-xl md:rounded-2xl bg-[#3BF5C4]/10 size-[56px] md:size-[86px] flex flex-col items-center justify-center shadow-lg">
                                        <img
                                            src={item.icon}
                                            alt={item.label}
                                            className="size-6 md:size-10"
                                        />
                                    </div>
                                    <div className="text-secondary">
                                        <h1 className="text-base md:text-xl font-bold text-[#3BF5C4]">{item.label}</h1>
                                        <p className="text-xs md:text-base text-[#fff] opacity-80">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="p-10 relative rounded-3xl bg-[#161B1F] shadow-2xl" style={{fontFamily:'Poppins, sans-serif'}}>
                            <div className="relative text-secondary py-5">
                                <h1 className="text-2xl font-bold text-[#ffffff]">Fill The Contact Form</h1>
                                <p className="text-base text-[#ffffff]/70">Feel free to contact with us, we don’t spam your email</p>
                            </div>
                            <div className="relative py-5">
                                <form className="relative space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="col-span-2 md:col-span-1">
                                            <TextInput
                                                placeholder="Your name"
                                                className="w-full bg-[#F5F5F5] border-none text-[#1D1D1F] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#3BF5C4]"
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <TextInput
                                                placeholder="Phone number"
                                                className="w-full bg-[#F5F5F5] border-none text-[#1D1D1F] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#3BF5C4]"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <TextInput
                                                placeholder="E-mail"
                                                type="email"
                                                className="w-full bg-[#F5F5F5] border-none text-[#1D1D1F] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#3BF5C4]"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <textarea
                                                rows="5"
                                                placeholder="Message"
                                                className="w-full bg-[#F5F5F5] border-none text-[#1D1D1F] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#3BF5C4]"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <PrimaryButton className="py-4 text-lg bg-[#3BF5C4] hover:bg-[#2bcfa2] text-black font-bold border-none px-8 rounded-full shadow-lg transition-all duration-200">
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
