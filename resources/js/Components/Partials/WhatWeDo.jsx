import React from "react";
import GridItem from "../GridItem";

const WhatWeDo = () => {
    const whatWeDo = [
        {
            title: "We Guide Your Business Growth with Care, Trust, and Strategic Expertise",
            description:
                "We understand the challenges of growth and expansion, which is why we provide strategic M&A solutions to help your business thrive. Whether you’re exploring new markets or seeking the perfect partnership, we combine deep expertise with a personal touch to uncover opportunities that align with your vision. At <span className='outline-text'>Aurea Octave</span>, we’re not just advisors—we’re your trusted partners in building a stronger future.red solutions for your investments and business needs.",
            img: "/assets/img/streamline_industry-innovation-and-infrastructure.png",
        },
        {
            title: "We Provide Tailored Investment Options to Help You Reach Your Financial Goals",
            description:
                "We believe more and more people put their trust in Aurea Octave to manage their investments in large part because we offer choice. Our global platform is designed to help our clients become better positioned to meet the financial goals that matter most to them.",
            img: "/assets/img/trend-up.svg",
        },
    ];
    return (
        <section className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center w-full font-semibold mb-8">
                What we do
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
                {whatWeDo.map((item, index) => (
                    <div className="relative space-y-1" key={index}>
                        <img src={item.img} className="mx-auto" />
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatWeDo;
