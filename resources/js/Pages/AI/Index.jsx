import Header from "@/Components/Header";
import FinancialFreedom from "@/Components/Partials/FinancialFreedom";
import GoodCompany from "@/Components/Partials/GoodCompany";
import WhatSetUsApart from "@/Components/Partials/WhatSetUsApart";
import WhatWeDo from "@/Components/Partials/WhatWeDo";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

// export default function AureaAI() {
//     const services = [
//         {
//             title: "Cryptocurrency",
//             description:
//                 "We leverage AI-driven analytics to track market trends, assess volatility, and uncover opportunities in the fast-evolving world of cryptocurrency. Paired with our human expertise in regulatory compliance and strategic planning, we help you navigate the complexities of digital assets with confidence and precision, ensuring secure and profitable investments.",
//             img: "/assets/img/xrp.png",
//         },
//         {
//             title: "ETFs",
//             description:
//                 "We analyze vast market data to identify high-performing ETFs and optimize portfolio allocations using ai. Combined with the insights of our seasoned advisors, we craft personalized strategies that align with your financial objectives, balancing innovation with a deep understanding of global markets to maximize your returns.",
//             img: "/assets/img/chart.png",
//         },
//         {
//             title: "Mergers & Acquisitions (M&A)",
//             description:
//                 "We integrate AI’s predictive capabilities and advanced analytics with our team’s extensive experience to deliver transformative M&A solutions. From identifying ideal acquisition targets to negotiating and closing deals, our hybrid approach ensures efficiency, precision, and strategic growth tailored to your business goals",
//             img: "/assets/img/handshake.png",
//         },
//     ];
//     return (
//         <>
//             <Head title={title} />
//             <div
//                 className={`${
//                     title === "Contact Us" ? "bg-[#f5f5f5]" : "bg-white"
//                 } min-h-screen relative"`}
//             >
//                 <Header />
//             </div>
//         </>
//     );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUpCircleIcon, Loader } from "lucide-react";
import { marked } from "marked";
const AI_BASE_API_URL = "https://beta.aureaoctave.com";

const AureaAI = () => {
    // State management
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [userName, setUserName] = useState("");

    // Profile data
    const [clientProfile, setClientProfile] = useState({
        risk_profile: "",
        account_type: "",
        goals: "",
        additional_context: "",
    });

    // Profile descriptions
    const profileDescriptions = {
        risk_profiles: {
            conservative:
                "Emphasis on preserving capital with lower but stable returns",
            moderate:
                "Balanced approach between growth and capital preservation",
            aggressive:
                "Focus on maximum growth potential with higher volatility",
        },
        account_types: {
            individual:
                "Personal investment account with flexible contributions and withdrawals",
            ira: "Tax-advantaged retirement account with annual contribution limits",
            "401k": "Employer-sponsored retirement plan with potential employer matching",
            trust: "Legal arrangement for managing assets on behalf of beneficiaries",
        },
        investment_goals: {
            retirement: "Building wealth for long-term retirement security",
            wealth: "Growing assets for general wealth accumulation",
            education: "Saving for educational expenses",
            income: "Generating regular income from investments",
        },
    };

    // Categories and suggested questions
    const categories = [
        { id: "portfolio", label: "Portfolio Analysis", icon: "📊" },
        { id: "planning", label: "Financial Planning", icon: "🎯" },
        { id: "education", label: "Investment Education", icon: "📚" },
        { id: "market", label: "Market Insights", icon: "📈" },
    ];

    const suggestedQuestions = {
        portfolio: [
            "How should I rebalance my portfolio?",
            "What's a good asset allocation for my risk profile?",
        ],
        planning: [
            "How much should I save for retirement?",
            "Should I prioritize my 401(k) or IRA?",
        ],
        education: [
            "What's the difference between stocks and bonds?",
            "How do ETFs work?",
        ],
        market: [
            "How might current market conditions affect my portfolio?",
            "What are the key market trends to watch?",
        ],
    };

    // // Authentication check
    // const checkAuth = async () => {
    //     const isDevelopment = window.location.hostname === "localhost";
    //     console.log("Running checkAuth. isDevelopment:", isDevelopment);

    //     if (isDevelopment) {
    //         return true;
    //     }

    //     try {
    //         const response = await axios.get(`${AI_BASE_API_URL}/api/user`);
    //         console.log("Auth check response:", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.log("Auth check failed:", error);
    //         if (
    //             error.response?.status === 401 &&
    //             error.response?.data?.detail?.redirect
    //         ) {
    //             const currentUrl = encodeURIComponent(window.location.href);
    //             const redirectUrl = `${error.response.data.detail.redirect}?redirect=${currentUrl}`;
    //             window.location.href = redirectUrl;
    //             return false;
    //         }
    //         return false;
    //     }
    // };

    // Load user info
    const loadUserInfo = async () => {
        if (window.location.hostname === "localhost") {
            setUserName("Development User");
            return;
        }

        try {
            const response = await axios.get(`${AI_BASE_API_URL}/api/user`);
            setUserName(response.data.name);
        } catch (error) {
            console.error("Error loading user info:", error);
        }
    };

    // // Load profile data
    // const loadProfile = async () => {
    //     setProfileLoading(true);
    //     setProfileError(null);
    //     try {
    //         const response = await axios.get(`${AI_BASE_API_URL}/api/profile`);
    //         setClientProfile(response.data);
    //     } catch (error) {
    //         if (error.response?.status === 401) {
    //             const redirectUrl = error.response?.data?.detail?.redirect;
    //             if (redirectUrl) {
    //                 window.location.href = redirectUrl;
    //                 return;
    //             }
    //         }
    //         setProfileError("Error loading profile. Please try again.");
    //         console.error("Error loading profile:", error);
    //     } finally {
    //         setProfileLoading(false);
    //     }
    // };

    // Submit question handler
    const submitQuestion = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setError("");

        try {
            const newMessages = [
                ...messages,
                {
                    role: "user",
                    content: question,
                    timestamp: new Date().toISOString(),
                },
            ];
            setMessages(newMessages);

            const result = await axios.post(`${AI_BASE_API_URL}/api/ask`, {
                question: question,
                risk_profile: clientProfile.risk_profile,
                account_type: clientProfile.account_type,
                goals: clientProfile.goals,
            });

            setMessages([
                ...newMessages,
                {
                    role: "assistant",
                    content: result.data.response,
                    timestamp: new Date().toISOString(),
                },
            ]);

            setQuestion("");
        } catch (err) {
            console.error("Error:", err);
            if (err.response?.status === 401) {
                const redirectUrl = err.response?.data?.detail?.redirect;
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                    return;
                }
            }
            setError(
                err.response?.data?.detail?.message ||
                    "Error processing your request."
            );
        } finally {
            setLoading(false);
        }
    };

    // Format time
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    // Format message with markdown
    const formatMessage = (content) => {
        try {
            return marked.parse(content, {
                breaks: true,
                gfm: true,
                sanitize: true,
            });
        } catch (e) {
            console.error("Error parsing markdown:", e);
            return content;
        }
    };

    // // Initialize on mount
    // useEffect(() => {
    //     const initialize = async () => {
    //         if (await checkAuth()) {
    //             loadProfile();
    //             loadUserInfo();
    //         }
    //     };
    //     initialize();
    // }, []);

    return (
        <>
            <Head title={"Aurea AI"} />
            <Header />
            <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center px-4">
                <div className="mw8 center p-3 ph4-ns">
                    {/* Navigation
                     <nav className="pb3 bb b--light-gray mb4 flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="f3 f2-ns fw6 mid-gray mv0">
                                Investment AI Assistant{" "}
                                <code className="f6">v0.0.5</code>
                            </h1>
                            {userName && (
                                <div className="ml3 ml5-ns gray">
                                    Welcome, {userName}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            <a href="/history" className="link blue mr3">
                                History
                            </a>
                            <a
                                href="/profile"
                                className="link bg-blue white br2 ph3 pv2"
                            >
                                Edit Profile
                            </a>
                        </div>
                    </nav> */}

                    {/* Client Profile Summary
                    <div className="bg-washed-blue ba b--blue br2 pa3 mb4 mw7 center">
                        <div className="flex justify-between items-center mb2">
                            <h2 className="f5 mv0">Current Profile</h2>
                            <a href="/profile" className="link blue">
                                Edit Profile
                            </a>
                        </div>

                        {profileLoading ? (
                            <div className="gray i">Loading profile...</div>
                        ) : profileError ? (
                            <div className="dark-red">{profileError}</div>
                        ) : (
                            <div className="mt2">

                                <div className="mb3">
                                    <div className="flex items-baseline">
                                        <p className="mv1 fw6">Risk Profile:</p>
                                        <p className="mv1 ml2">
                                            {clientProfile.risk_profile
                                                .charAt(0)
                                                .toUpperCase() +
                                                clientProfile.risk_profile.slice(
                                                    1
                                                )}
                                        </p>
                                    </div>
                                    <p className="f6 gray mt1 mb0">
                                        {
                                            profileDescriptions.risk_profiles[
                                                clientProfile.risk_profile
                                            ]
                                        }
                                    </p>
                                </div>

                                <div className="mb3">
                                    <div className="flex items-baseline">
                                        <p className="mv1 fw6">Account Type:</p>
                                        <p className="mv1 ml2">
                                            {clientProfile.account_type.toUpperCase()}
                                        </p>
                                    </div>
                                    <p className="f6 gray mt1 mb0">
                                        {
                                            profileDescriptions.account_types[
                                                clientProfile.account_type
                                            ]
                                        }
                                    </p>
                                </div>

                                <div className="mb3">
                                    <div className="flex items-baseline">
                                        <p className="mv1 fw6">
                                            Investment Goals:
                                        </p>
                                        <p className="mv1 ml2">
                                            {clientProfile.goals
                                                .charAt(0)
                                                .toUpperCase() +
                                                clientProfile.goals.slice(1)}
                                        </p>
                                    </div>
                                    <p className="f6 gray mt1 mb0">
                                        {
                                            profileDescriptions
                                                .investment_goals[
                                                clientProfile.goals
                                            ]
                                        }
                                    </p>
                                </div>

                                {clientProfile.additional_context && (
                                    <div className="mt3 pt3 bt b--black-10">
                                        <p className="mv1 fw6">
                                            Additional Context:
                                        </p>
                                        <p className="f6 gray mt1 mb0">
                                            {clientProfile.additional_context}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div> */}

                    {/* Main Content */}
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl md:text-3xl font-medium">
                            Welcome to Aurea Ai Search
                        </h1>
                        <h2 className="text-lg md:text-xl text-gray-300">
                            How can I help you today?
                        </h2>

                        {/* Categories */}
                        {/* <div className="mb4 tc">
                    <div className="flex flex-wrap items-center justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`bn br2 pa2 pointer flex items-center mr2 mb2 ${
                                    selectedCategory === category.id
                                        ? "bg-blue white"
                                        : "bg-light-gray dark-gray"
                                }`}
                            >
                                <span className="mr2">{category.icon}</span>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div> */}

                        {/* Tag Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className={`flex items-center gap-2 hover:bg-[#444] text-white px-4 py-2 rounded-lg ${
                                        selectedCategory === category.id
                                            ? "bg-[#666] "
                                            : "bg-[#333] "
                                    }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Suggested Questions */}
                        {selectedCategory && (
                            <div className="mb-4">
                                <h3 className="font-bold text-lg text-left mb-2">
                                    Suggested Questions
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    {suggestedQuestions[selectedCategory].map(
                                        (question, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setQuestion(question)
                                                }
                                                className="text-left bg-[#333] hover:bg-[#444] text p-2 rounded pointer "
                                            >
                                                {question}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Chat Interface */}
                        <div>
                            {error && (
                                <div className="bg-washed-red dark-red br2 pa3 mb3">
                                    {error}
                                </div>
                            )}

                            {messages.length > 0 && (
                                <div className="mb4">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`br2 pa3 mb2 ${
                                                msg.role === "user"
                                                    ? "bg-light-blue ml4"
                                                    : "bg-white mr4"
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div
                                                    className="ma0 markdown-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatMessage(
                                                            msg.content
                                                        ),
                                                    }}
                                                />
                                                <span className="f7 gray ml3">
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={submitQuestion}
                                className="mt-8 w-full"
                            >
                                {/* Input Box */}
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                        // placeholder="What would you like to know about your investments?"
                                        disabled={loading}
                                        placeholder="How can I help you today?"
                                        className="flex-1 bg-[#2a2a2a] text-white placeholder-gray-400 px-4 py-3 rounded-l-lg outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#444] hover:bg-[#555] p-3 rounded-r-lg"
                                        disabled={loading || !question}
                                    >
                                        {loading ? (
                                            <Loader
                                                className="animate-spin text-white"
                                                size={24}
                                            />
                                        ) : (
                                            <ArrowUpCircleIcon
                                                className="text-white"
                                                size={24}
                                            />
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Terms */}
                            <p className="text-sm text-gray-500 mt-4">
                                By sending us a message, you accept our{" "}
                                <span className="underline">Terms of Use</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AureaAI;
