// import React, { useState } from "react";
// import NavLink from "@/Components/NavLink";
// import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
// import { navLinks } from "@/utils/constants";
// import { Link } from "@inertiajs/react";

// const Header = () => {
//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
//         <header className="bg-[#333333] text-white  fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-md">
//             <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
//                 <div className="flex h-24 justify-between">
//                     <div className="flex items-center">
//                         <div className="flex shrink-0 items-center">
//                             <Link href="/">
//                                 <img src="/assets/img/logo.png" />
//                             </Link>
//                         </div>

//                         <div className="hidden space-x-8 md:-my-px md:ms-10 md:flex">
//                             {navLinks.map((link, index) => {
//                                 return (
//                                     <NavLink
//                                         key={index}
//                                         href={route(link.routeName)}
//                                         active={route().current(link.routeName)}
//                                     >
//                                         {link.label}
//                                     </NavLink>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     <div className="hidden md:ms-6 md:flex md:items-center space-x-8 relative ms-3">
//                         <Link
//                             href={"#"}
//                             className="bg-[#000] rounded-full flex text-sm py-1 px-2 space-x-2  items-center justify-between transition duration-150 ease-in-out"
//                         >
//                             <span>
//                                 <img src="/assets/img/search-normal.png" />
//                             </span>
//                             <span>AI Search</span>
//                         </Link>

//                         <NavLink href={route("login")}>Login</NavLink>
//                         <NavLink href="#">En(USA)</NavLink>
//                     </div>

//                     <div className="-me-2 flex items-center md:hidden">
//                         <button
//                             onClick={() =>
//                                 setShowingNavigationDropdown(
//                                     (previousState) => !previousState
//                                 )
//                             }
//                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
//                         >
//                             <svg
//                                 className="h-6 w-6"
//                                 stroke="currentColor"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     className={
//                                         !showingNavigationDropdown
//                                             ? "inline-flex"
//                                             : "hidden"
//                                     }
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 />
//                                 <path
//                                     className={
//                                         showingNavigationDropdown
//                                             ? "inline-flex"
//                                             : "hidden"
//                                     }
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18L18 6M6 6l12 12"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <div
//                 className={
//                     (showingNavigationDropdown ? "block" : "hidden") +
//                     " md:hidden"
//                 }
//             >
//                 <div className="space-y-1 pb-3 pt-2">
//                     {navLinks.map((link, index) => {
//                         return (
//                             <ResponsiveNavLink
//                                 key={index}
//                                 href={route(link.routeName)}
//                                 active={route().current(link.routeName)}
//                             >
//                                 {link.label}
//                             </ResponsiveNavLink>
//                         );
//                     })}
//                 </div>

//                 <div className="border-t px-4 py-6">
//                     <Link
//                         href={route("become-our-client")}
//                         className="capitalize border border-black text-sm py-2 px-4 transition duration-150 ease-in-out"
//                     >
//                         Become Our Client
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerBg = isScrolled
        ? "bg-[#0B0F14] shadow-lg"
        : "bg-transparent";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
        >
            <nav className="max-w-[1400px] mx-auto px-6">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className={`text-2xl font-light tracking-wide transition-colors ${
                            isScrolled ? "text-[#3BF5C4]" : "text-white"
                        }`}
                    >
                        ATA
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12 text-white">

                        <Link
                            href="/"
                            className={`transition-colors ${
                                isScrolled ? "text-gray-400" : "text-white"
                            } hover:text-[#3BF5C4]`}
                        >
                            Home
                        </Link>

                        {/* What We Do Dropdown */}
                        <div className="relative group">
                            <button
                                className={`flex items-center gap-1 transition-colors ${
                                    isScrolled ? "text-gray-400" : "text-white"
                                } hover:text-[#3BF5C4]`}
                            >
                                What We Do <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-full left-0 hidden group-hover:block bg-[#0B0F14]/95 border border-[#3BF5C4]/30 rounded-lg w-64 py-3 backdrop-blur-xl">
                                <Link
                                    href="/services/products"
                                    className="block px-4 py-2 hover:bg-[#3BF5C4]/10"
                                >
                                    Tokenized Investment Products
                                </Link>
                                <Link
                                    href="/services/taas"
                                    className="block px-4 py-2 hover:bg-[#3BF5C4]/10"
                                >
                                    Tokenization-as-a-Service
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="#ecosystem"
                            className={`transition-colors ${
                                isScrolled ? "text-gray-400" : "text-white"
                            } hover:text-[#3BF5C4]`}
                        >
                            WHY ATA
                        </Link>

                        {/* About Dropdown */}
                        <div className="relative group">
                            <button
                                className={`flex items-center gap-1 transition-colors ${
                                    isScrolled ? "text-gray-400" : "text-white"
                                } hover:text-[#3BF5C4]`}
                            >
                                About <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-full left-0 hidden group-hover:block bg-[#0B0F14]/95 border border-[#3BF5C4]/30 rounded-lg w-64 py-3 backdrop-blur-xl">
                                <Link className="block px-4 py-2 hover:bg-[#3BF5C4]/10">
                                    Docs & FAQs
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="block px-4 py-2 hover:bg-[#3BF5C4]/10"
                                >
                                    Contact Us
                                </Link>
                                <Link className="block px-4 py-2 hover:bg-[#3BF5C4]/10">
                                    Investor Relations
                                </Link>
                                <Link className="block px-4 py-2 hover:bg-[#3BF5C4]/10">
                                    Company
                                </Link>
                                <Link className="block px-4 py-2 hover:bg-[#3BF5C4]/10">
                                    Careers
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/register"
                            className={`px-6 py-2.5 rounded-full font-medium transition-colors ${
                                isScrolled
                                    ? "bg-[#3BF5C4] text-[#0B0F14] hover:bg-[#2fe6b9]"
                                    : "bg-white text-black hover:bg-gray-100"
                            }`}
                        >
                            Sign Up
                        </Link>

                        <Link
                            href="/login"
                            className={`px-6 py-2.5 rounded-full font-medium border transition-colors ${
                                isScrolled
                                    ? "border-[#3BF5C4] text-[#3BF5C4] hover:bg-[#3BF5C4]/10"
                                    : "border-white text-white hover:bg-white/10"
                            }`}
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(!showingNavigationDropdown)
                            }
                            className="text-white"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {showingNavigationDropdown && (
                <div className="md:hidden bg-[#0B0F14] px-6 py-4 space-y-3 text-gray-300">
                    <Link href="/" className="block">Home</Link>
                    <Link href="/services/products" className="block">
                        Tokenized Investment Products
                    </Link>
                    <Link href="/services/taas" className="block">
                        Tokenization-as-a-Service
                    </Link>
                    <Link href="/about-us/contact-us" className="block">
                        Contact Us
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
