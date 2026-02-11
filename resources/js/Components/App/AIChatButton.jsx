import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

const AIChatButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div>
            <a
                // onClick={togglePopup}
                href="https://beta.aureaoctave.com/"
                className="fixed bottom-10 right-10 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none animate-bounce flex items-center space-x-2"
            >
                <ChatBubbleBottomCenterTextIcon className="size-8" />
                <span>AI Chat</span>
            </a>

            {/* Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-3/4 overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={togglePopup}
                            className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 focus:outline-none"
                        >
                            &times;
                        </button>

                        {/* Iframe */}
                        <iframe
                            key={isPopupOpen ? "iframe-open" : "iframe-closed"}
                            src="https://beta.aureaoctave.com/"
                            title="Popup Content"
                            className="w-full h-full border-none"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatButton;
