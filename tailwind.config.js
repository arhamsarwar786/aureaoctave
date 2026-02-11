import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            // screens: {
            //     "2xl": "1400px",
            // },
        },

        extend: {
            colors: {
                primary: "#FFE57E",
                secondary: "#1D1D1F",
                fill: {
                    1: "rgba(255, 255, 255, 0.10)",
                },
                bankGradient: "#0179FE",
                indigo: {
                    500: "#6172F3",
                    700: "#3538CD",
                },
                success: {
                    25: "#F6FEF9",
                    50: "#ECFDF3",
                    100: "#D1FADF",
                    600: "#039855",
                    700: "#027A48",
                    900: "#054F31",
                },
                pink: {
                    25: "#FEF6FB",
                    100: "#FCE7F6",
                    500: "#EE46BC",
                    600: "#DD2590",
                    700: "#C11574",
                    900: "#851651",
                },
                blue: {
                    25: "#F5FAFF",
                    100: "#D1E9FF",
                    500: "#2E90FA",
                    600: "#1570EF",
                    700: "#175CD3",
                    900: "#194185",
                },
                sky: {
                    1: "#F3F9FF",
                },
                black: {
                    1: "#00214F",
                    2: "#344054",
                },
                gray: {
                    25: "#FCFCFD",
                    200: "#EAECF0",
                    300: "#D0D5DD",
                    500: "#667085",
                    600: "#475467",
                    700: "#344054",
                    900: "#101828",
                },
            },
            backgroundImage: {
                "bank-gradient":
                    "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
                "gradient-mesh": "url('/icons/gradient-mesh.svg')",
                "bank-green-gradient":
                    "linear-gradient(90deg, #01797A 0%, #489399 100%)",
            },
            boxShadow: {
                form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                chart: "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
                profile:
                    "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
                creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
            },
            fontFamily: {
                inter: "var(--font-inter)",
                "ibm-plex-serif": "var(--font-ibm-plex-serif)",
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                bounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                bounce: "bounce 2s infinite",
            },
        },
    },

    plugins: [forms, require("tailwindcss-animate")],
};
