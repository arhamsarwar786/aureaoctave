import { Link } from "@inertiajs/react";
import React from "react";

const Hero = ({ title, desc, button = true }) => {
    return (
        <section
            className="relative text-white flex flex-col justify-center items-center min-h-[443px]"
            style={{
                backgroundImage: "url('/assets/img/hero-second.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "relative",
            }}
        >
            <div className="absolute inset-0 bg-secondary opacity-80"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
                <div className="relative space-y-5 text-center">
                    <div className="relative space-y-5 text-center">
                        <h1 className="text-2xl lg:text-4xl font-bold">
                            {title}
                        </h1>
                        <p className="mb-6 text-sm">{desc}</p>
                        {button && (
                            <div className="">
                                <Link
                                    href={route("become-our-client")}
                                    className="inline-block text-center lg:min-w-80 items-center border border-white bg-transparent px-4 py-2 text-sm font-semibold capitalize tracking-widest text-white transition duration-150 ease-in-out rounded-full"
                                >
                                    Become our client
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
