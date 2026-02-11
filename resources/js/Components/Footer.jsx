// import { navLinks } from "@/utils/constants";
// import { Link } from "@inertiajs/react";
// import React from "react";

// const Footer = () => {
//     const socials = [
//         {
//             title: "Instagram",
//             link: "",
//             img: "/assets/img/socials/instagram.png",
//         },
//         { title: "X", link: "", img: "/assets/img/socials/x.png" },
//         { title: "Github", link: "", img: "/assets/img/socials/github.png" },
//         {
//             title: "Behance",
//             link: "",
//             img: "/assets/img/socials/behance.png",
//         },
//     ];
//     return (
//         <footer className="bg-[#f5f5f5] text-secondary pt-12 pb-8 mt-20">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10">
//                     <div className="col-span-2 space-y-5">
//                         <p className="text-sm">
//                             Aurea Octave is one of the world’s leading providers
//                             of investment, advisory and risk management
//                             solutions. We are a fiduciary to our clients. We’re
//                             investing for the future on behalf of our clients,
//                             inspiring our employees, and supporting our local
//                             communities.
//                         </p>
//                     </div>
//                     <div className="hidden md:block"></div>
//                     <div className="col-span-2 md:col-span-1 flex flex-col gap-3 md:gap-5 text-sm">
//                         {navLinks.map((link, index) => {
//                             return (
//                                 <Link
//                                     key={index}
//                                     href={route(link.routeName)}
//                                     className="hover:text-primary"
//                                 >
//                                     {link.label}
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                     <div className="relative space-y-5">
//                         <h3 className="text-lg font-semibold">Follow Us</h3>
//                         <div className="flex gap-2">
//                             {socials.map((social, index) => (
//                                 <Link
//                                     href={social.link}
//                                     key={index}
//                                     className="hover:text-primary"
//                                 >
//                                     <img
//                                         src={social.img}
//                                         alt={social.title}
//                                         className="size-10 object-cover"
//                                     />
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="lg:text-center pt-10">
//                     <p className="">
//                         &copy; {new Date().getFullYear()}{" "}
//                         <span className="font-bold text-primary">
//                             Aurea Octave
//                         </span>
//                         . All Rights Reserved.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.8,
            ease: "easeOut",
        },
    }),
};

const Footer = () => {
    return (
        <footer className="bg-[#0B0F14] text-[#9CA3AF]">
            {/* Legal Content */}
            <div className="max-w-[1400px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-xs leading-relaxed">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {index === 0 && (
                                <>
                                    <p className="mb-4">
                                        * The tokenized assets referenced herein
                                        Aurea Octave have not been registered under
                                        the US Securities Act of 1933 or the
                                        securities laws of any other jurisdiction.
                                        Tokens may not be offered in restricted
                                        jurisdictions.
                                    </p>
                                    <p>
                                        Token Markets may provide economic exposure
                                        to underlying assets, but Tokens are not
                                        stocks, ETFs, or ownership interests.
                                    </p>
                                </>
                            )}

                            {index === 1 && (
                                <>
                                    <p className="mb-4">
                                        This website is intended solely for
                                        business relationships and integrations.
                                        Nothing herein constitutes investment
                                        advice.
                                    </p>
                                    <p>
                                        Aurea Octave assumes no liability for
                                        third-party services or technologies
                                        referenced on this platform.
                                    </p>
                                </>
                            )}

                            {index === 2 && (
                                <>
                                    <p className="mb-4">
                                        † Market share reflects blockchain
                                        addresses holding Aurea-issued tokens.
                                    </p>
                                    <p className="mb-4">
                                        § Example rates only. Actual returns may
                                        vary.
                                    </p>
                                    <p>
                                        Additional terms apply. Refer to official
                                        documents and{" "}
                                        <Link
                                            href="/"
                                            className="text-[#3BF5C4] hover:opacity-80 transition"
                                        >
                                            Aurea Octave
                                        </Link>{" "}
                                        materials for disclosures.
                                    </p>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Brand Statement */}
            <div className="relative overflow-hidden py-28">
                <div className="max-w-[1400px] mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-light leading-none tracking-tight
                                   bg-gradient-to-r from-white via-[#3BF5C4] to-white
                                   bg-clip-text text-transparent select-none"
                    >
                        Aurea Octave
                    </motion.h2>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 py-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
                    >
                        <p>© 2025 Aurea Octave. All rights reserved.</p>

                        <div className="flex gap-6">
                            <Link
                                href="/privacy-policy"
                                className="relative group hover:text-[#3BF5C4] transition"
                            >
                                Privacy Policy
                                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#3BF5C4] transition-all group-hover:w-full" />
                            </Link>

                            <Link
                                href="/terms-of-service"
                                className="relative group hover:text-[#3BF5C4] transition"
                            >
                                Terms of Service
                                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#3BF5C4] transition-all group-hover:w-full" />
                            </Link>

                            <Link
                                href="/cookie-policy"
                                className="relative group hover:text-[#3BF5C4] transition"
                            >
                                Cookie Policy
                                <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#3BF5C4] transition-all group-hover:w-full" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
