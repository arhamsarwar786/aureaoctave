import React from "react";
import GridItem from "../GridItem";

const WhatSetUsApart = () => {
    const whatSetUsApart = [
        {
            title: "AI & Human Expertise",
            description:
                "We seamlessly combine advanced technology with expert analysis to deliver intelligent, tailored solutions for your investments and business needs.",
            img: "/assets/img/open-api.png",
        },
        {
            title: "Commitment to Excellence",
            description:
                "At Aurea Octave, we don’t just offer services; we deliver trust, transparency, and results that drive meaningful impact.",
            img: "/assets/img/grow-up.png",
        },
        {
            title: "Innovation at the Core",
            description:
                "From cryptocurrency ETFs to transformative M&A strategies, we bring you cutting-edge technologies to stay ahead in a rapidly evolving financial world.",
            img: "/assets/img/core.png",
        },
    ];
    return (
        <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center w-full font-semibold mb-8">
                What Sets Us Apart
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
                {whatSetUsApart.map((item, index) => (
                    <div
                        key={index}
                        className="relative space-y-3 bg-[#f5f5f5] py-10 px-5 text-center rounded-lg shadow"
                    >
                        <img src={item.img} className="mx-auto" />
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatSetUsApart;
