import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";

export default function GuestLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            <div
                className={`${
                    title === "Contact Us" ? "bg-[#f5f5f5]" : "bg-white"
                } min-h-screen relative"`}
            >
                <Header />

                <main>{children}</main>

                <Footer />
            </div>
        </>
    );
}
