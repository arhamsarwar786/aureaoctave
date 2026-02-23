import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@/Components/App/ThemeContext";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <Theme>
                    <App {...props} />
                </Theme>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#FFE57E",
    },
});
