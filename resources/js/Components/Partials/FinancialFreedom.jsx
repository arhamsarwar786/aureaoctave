import React from "react";

const FinancialFreedom = () => {
    return (
        <section className="relative bg-primary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-5 md:p-10 md:pr-4  text-secondary">
                        <h2 className="text-xl font-semibold mb-2">
                            We Help You Build Long-Term Financial Freedom
                        </h2>
                        <p className="text-sm">
                            At AUREA OCTAVE, we are committed to helping
                            individuals and businesses achieve their financial
                            goals and create lasting wealth. We provide tailored
                            investment solutions for institutional clients, such
                            as corporations and public funds, as well as
                            personalized strategies for individual investors.
                            Whether you’re saving for retirement, funding
                            education, buying a home, or growing a business, we
                            are here to guide you every step of the way.
                            Together, we’ll help you build the financial
                            foundation needed to turn your dreams into reality.
                        </p>
                        <h3 className="text-sm mt-2 font-bold">Learn More</h3>
                    </div>
                    <div className="relative overflow-hidden">
                        {/* className="" style=
                    {{
                        backgroundImage:
                            "url('')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                    }} */}
                        <img
                            src="/assets/img/fin-freedom.png"
                            className=" w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinancialFreedom;
