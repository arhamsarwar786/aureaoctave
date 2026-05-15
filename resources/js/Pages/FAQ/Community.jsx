import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function CommunityFAQ() {
    const faqs = [
        {
            q: "How do I join the community forum?",
            a: (
                <>
                    Create an account or sign in to participate. Once signed in you can ask questions, reply to threads, and follow discussions.
                </>
            ),
        },
        {
            q: "Are there community guidelines?",
            a: (
                <>
                    Yes — be respectful, avoid spam, and follow posting rules. Report abusive content using the report button or contact support.
                </>
            ),
        },
        {
            q: "Can I edit or delete my posts?",
            a: (
                <>
                    You can edit or delete your own posts within a short window after posting. For older posts, contact an admin for assistance.
                </>
            ),
        },
        {
            q: "How do I get notified about replies?",
            a: (
                <>
                    Enable notifications in your account settings or subscribe to specific threads to receive updates by email.
                </>
            ),
        },
        {
            q: "What content is not allowed?",
            a: (
                <>
                    Illegal content, hate speech, harassment, spam, and unsolicited promotions are prohibited. Moderator action may be taken for violations.
                </>
            ),
        },
        {
            q: "How do I search effectively in the forum?",
            a: (
                <>
                    Use the search box with keywords, and apply filters (Latest, Most Popular, Unanswered). Use exact phrases for more precise results.
                </>
            ),
        },
    ];

    return (
        <GuestLayout title="Community FAQ">
            <Head title="Community FAQ" />

            <section className="mx-auto max-w-3xl px-4 py-24">
                <h1 className="text-4xl font-bold text-white mb-6">Community — FAQ</h1>

                <div className="space-y-6">
                    {faqs.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-white/8 bg-white/3 p-5">
                            <h3 className="font-semibold text-white">{item.q}</h3>
                            <div className="mt-2 text-white/70">{item.a}</div>
                        </div>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
