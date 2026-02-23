import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";

export default function GuestLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            <div
                className="bg-[#0B0F14] min-h-screen relative"
            >
                <Header />

                <main>{children}</main>

                <Footer />
            </div>
        </>
    );
}
