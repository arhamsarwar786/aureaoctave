import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function BlogFAQ() {
    const faqs = [
        {
            q: "How do I subscribe to new blog posts?",
            a: (
                <>
                    You can subscribe to our newsletter from the footer or follow our social channels. For automated notifications, look for a subscription form on the blog listing or individual post pages.
                </>
            ),
        },
        {
            q: "Who writes the blog content?",
            a: (
                <>
                    Blog posts are written by the Aurea Octave team: product, research, and leadership contributors. Guest posts may be published occasionally and are reviewed before publishing.
                </>
            ),
        },
        {
            q: "Can I republish or syndicate a post?",
            a: (
                <>
                    Contact us via the <Link href="/support" className="text-[#3BF5C4]">support page</Link> to request syndication rights. Republishing without permission is not allowed.
                </>
            ),
        },
        {
            q: "How do I suggest a topic or submit feedback?",
            a: (
                <>
                    Use the contact or support link, or reply to the post if comments are enabled. We welcome topic suggestions and constructive feedback.
                </>
            ),
        },
        {
            q: "Are blog posts investment advice?",
            a: (
                <>
                    No. Blog content is for informational purposes only and does not constitute investment advice. See our legal pages for disclosures.
                </>
            ),
        },
        {
            q: "How can I read older posts or browse by category?",
            a: (
                <>
                    Use the blog index to browse posts; filters and categories (when available) are shown on the listing page. Related posts appear on each article page.
                </>
            ),
        },
    ];

    return (
        <GuestLayout title="Blog FAQ">
            <Head title="Blog FAQ" />

            <section className="mx-auto max-w-3xl px-4 py-24">
                <h1 className="text-4xl font-bold text-white mb-6">Blog — FAQ</h1>

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
