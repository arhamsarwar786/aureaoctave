import React, { useState } from "react";

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-5">
            {items.map((item, index) => (
                <div
                    className="border rounded-lg transition-all duration-500"
                    key={index}
                >
                    <button
                        className="w-full flex items-center font-bold justify-between cursor-pointer p-5 space-x-2"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h1>{item.title}</h1>
                        <div className="shrink-0 inline-block">
                            <img
                                src="/assets/img/arrow-down.png"
                                alt="arrow"
                                className={`size-5 object-contain transition-all duration-500 ${
                                    openIndex !== index && "rotate-180"
                                }`}
                            />
                        </div>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ${
                            openIndex === index ? "max-h-screen" : "max-h-0"
                        }`}
                    >
                        <div className="pt-0 text-sm p-5">
                            <p>{item.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
