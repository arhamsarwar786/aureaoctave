import React from "react";

const GoodCompany = () => {
    return (
        <section className="relative bg-[#f5f5f5]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="py-10 px-5 md:p-10   text-secondary">
                        <h2 className="text-xl font-semibold mb-2">
                            You are in good company
                        </h2>
                        <p className="relative pl-2 text-sm before:absolute before:top-0 before:left-0 before:bottom-0 before:w-[3px] before:h-full before:rounded-full before:bg-primary">
                            Aurea Octave is one of the world’s leading providers
                            of investment, advisory and risk management
                            solutions. We are a fiduciary to our clients. We’re
                            investing for the future on behalf of our clients,
                            inspiring our employees, and supporting our local
                            communities.
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
                            src="/assets/img/good-company.png"
                            className=" w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoodCompany;
