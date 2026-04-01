import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

const ProductTour = ({ user, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Tour steps highlighting sidebar and main features
    const tourSteps = [
        {
            title: "Welcome to Your Dashboard",
            description:
                "Let's take a quick tour to help you get started with Aurea. We'll show you the key features you can use.",
            target: "[data-tour-sidebar]",
            position: "right",
            highlight: true,
        },
        {
            title: "Quick Navigation",
            description:
                "Use the sidebar to navigate between different sections. Hover over to expand and see full labels.",
            target: "[data-tour-sidebar]",
            position: "right",
            highlight: true,
        },
        {
            title: "Your Wallet",
            description:
                "Manage your deposits and withdrawals in the Wallet section. Check your balance and transaction history.",
            target: "a[href*='deposit']",
            position: "right",
            highlight: false,
        },
        {
            title: "Investment Opportunities",
            description:
                "Explore investment packages tailored to your financial goals. Start investing and grow your wealth.",
            target: "a[href*='investment-package']",
            position: "right",
            highlight: false,
        },
        {
            title: "View Your Portfolio",
            description:
                "Track all your investments and monitor their performance in real-time.",
            target: "a[href*='portfolio']",
            position: "right",
            highlight: false,
        },
        {
            title: "Transaction History",
            description:
                "Keep track of all your transactions and monitor your account activity.",
            target: "a[href*='history']",
            position: "right",
            highlight: false,
        },
        {
            title: "AI Assistant",
            description:
                "Meet Aurea-AI, your intelligent financial assistant. Get personalized insights and recommendations.",
            target: "a[href*='aurea-ai']",
            position: "right",
            highlight: false,
        },
        {
            title: "Account Settings",
            description:
                "Update your profile, change password, and manage your account settings here.",
            target: "a[href*='settings']",
            position: "right",
            highlight: false,
        },
        {
            title: "You're All Set!",
            description:
                "You're ready to explore! Feel free to revisit this tour anytime from your settings.",
            target: null,
            position: "center",
            highlight: false,
        },
    ];

    useEffect(() => {
        // Show tour only if user hasn't seen it
        if (user && !user.product_tour_shown) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                // Apply blur only to main content area, not sidebar or header
                const contentArea = document.querySelector('[data-tour-content]');
                if (contentArea) {
                    contentArea.style.filter = "blur(3px)";
                    contentArea.style.pointerEvents = "none";
                }
            }, 800);
            return () => clearTimeout(timer);
        }

        // Cleanup: remove blur when component unmounts
        return () => {
            const contentArea = document.querySelector('[data-tour-content]');
            if (contentArea) {
                contentArea.style.filter = "none";
                contentArea.style.pointerEvents = "auto";
            }
        };
    }, [user]);

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        setIsLoading(true);
        // Remove blur effect from content area
        const contentArea = document.querySelector('[data-tour-content]');
        if (contentArea) {
            contentArea.style.filter = "none";
            contentArea.style.pointerEvents = "auto";
        }
        try {
            await axios.post(route("product-tour.mark-shown"));
            setIsVisible(false);
            if (onComplete) onComplete();
        } catch (error) {
            console.error("Error marking tour as shown:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        // Remove blur effect from content area
        const contentArea = document.querySelector('[data-tour-content]');
        if (contentArea) {
            contentArea.style.filter = "none";
            contentArea.style.pointerEvents = "auto";
        }
        handleComplete();
    };

    const currentStepData = tourSteps[currentStep];
    const targetElement =
        currentStepData.target && currentStep < tourSteps.length - 1
            ? document.querySelector(currentStepData.target)
            : null;

    const getTooltipPosition = (element) => {
        if (!element) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

        try {
            const rect = element.getBoundingClientRect();
            const tooltipWidth = 300;
            const tooltipHeight = 200;

            let top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2;
            let left = 0;

            if (currentStepData.position === "right") {
                left = rect.right + window.scrollX + 30;
            } else if (currentStepData.position === "left") {
                left = rect.left + window.scrollX - tooltipWidth - 30;
            } else {
                left = window.innerWidth / 2 - tooltipWidth / 2;
                top = window.innerHeight / 2 - tooltipHeight / 2;
            }

            // Ensure tooltip is within viewport
            if (left + tooltipWidth > window.innerWidth) {
                left = window.innerWidth - tooltipWidth - 20;
            }
            if (left < 20) {
                left = 20;
            }

            return { top, left };
        } catch (error) {
            console.error("Error calculating tooltip position:", error);
            return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        }
    };

    const tooltipPosition = getTooltipPosition(targetElement);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        style={{
                            background: "transparent",
                        }}
                        onClick={handleSkip}
                    >
                        {/* Highlight Box */}
                        {targetElement && currentStep < tourSteps.length - 1 && (
                            <motion.div
                                key="highlight"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute border-2 rounded-xl pointer-events-none"
                                style={{
                                    top: targetElement.getBoundingClientRect().top + window.scrollY - 8,
                                    left: targetElement.getBoundingClientRect().left + window.scrollX - 8,
                                    width: targetElement.getBoundingClientRect().width + 16,
                                    height: targetElement.getBoundingClientRect().height + 16,
                                    borderColor: "#3BF5C4",
                                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.6), 0 0 30px rgba(59,245,196,0.3)",
                                }}
                            />
                        )}
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div
                        key="tooltip"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed z-50 w-80 rounded-2xl p-6 text-white"
                        style={{
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            background: "linear-gradient(135deg, rgba(30, 30, 32, 0.95) 0%, rgba(25, 25, 28, 0.95) 100%)",
                            border: "1.5px solid rgba(59, 245, 196, 0.3)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(59, 245, 196, 0.1)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3BF5C4]"></span>
                                    {currentStepData.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {currentStepData.description}
                                </p>
                            </div>
                            <button
                                onClick={handleSkip}
                                className="ml-3 text-slate-400 hover:text-white transition-colors shrink-0 p-1 hover:bg-white/10 rounded-lg"
                                disabled={isLoading}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                            <span className="text-xs text-slate-400 font-medium">
                                Step {currentStep + 1} of {tourSteps.length}
                            </span>

                            {/* Progress Bar */}
                            <div className="flex-1 mx-3 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${((currentStep + 1) / tourSteps.length) * 100}%`,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-[#3BF5C4] to-[#06d6a3] rounded-full"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-2 mt-6">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0 || isLoading}
                                className="flex items-center gap-1 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg"
                            >
                                <ChevronLeft size={16} />
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#3BF5C4] to-[#06d6a3] text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-[#3BF5C4]/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="animate-spin">⌛</span>
                                        Saving...
                                    </>
                                ) : currentStep === tourSteps.length - 1 ? (
                                    "Get Started"
                                ) : (
                                    <>
                                        Next
                                        <ChevronRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductTour;
