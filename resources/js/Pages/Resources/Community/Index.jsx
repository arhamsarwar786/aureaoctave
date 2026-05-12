import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

const communityLinks = [
    {
        title: "Join the discussion",
        description:
            "Connect with other users, ask questions, and share your experience.",
        href: "/contact-us",
    },
    {
        title: "Help and support",
        description:
            "Reach out to the team if you need help getting started or want to share feedback.",
        href: "/contact-us",
    },
];

export default function CommunityIndex() {
    return (
        <GuestLayout title="Community">
            <Head title="Community" />

            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#3BF5C4]">
                        Resources
                    </p>
                    <h1 className="text-4xl font-bold text-white md:text-6xl">
                        Community
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
                        Learn how to connect with the Aurea Octave community,
                        get support, and stay informed.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {communityLinks.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        >
                            <h2 className="text-xl font-semibold text-white">
                                {item.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-white/70">
                                {item.description}
                            </p>
                            <Link
                                href={item.href}
                                className="mt-6 inline-flex text-sm font-medium text-[#3BF5C4] hover:opacity-80"
                            >
                                Contact us
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}