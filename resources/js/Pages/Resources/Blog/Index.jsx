import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { blogFaqs } from "@/data/faqs";
import { Pagination } from "@/Components/App/Pagination";

function formatDate(value) {
    if (!value) return "";

    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function BlogIndex({ posts }) {
    const { data, meta } = posts;

    return (
        <GuestLayout title="Blog">
            <Head title="Blog">
                <meta
                    name="description"
                    content="Read the latest insights, updates, and announcements from Aurea Octave."
                />
            </Head>

            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="py-4 text-sm uppercase tracking-[0.3em] text-[#3BF5C4]">
                        Resources
                    </p>
                    <h1 className="text-4xl font-bold text-white md:text-6xl">
                        Blog
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
                        Read updates, commentary, and practical insights from the
                        Aurea Octave team.
                    </p>
              
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {data.length > 0 ? (
                        data.map((post) => (
                            <Link href={route("blog.show", post.slug)}>
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                               
                            >
                                {post.featured_image_url ? (
                                    <img
                                        src={post.featured_image_url}
                                        alt={post.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-48 w-full bg-gradient-to-br from-white/10 to-[#3BF5C4]/10" />
                                )}

                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                                        <span>{formatDate(post.published_at)}</span>
                                        {post.category?.name && <span>• {post.category.name}</span>}
                                    </div>
                                    <h2 className="mt-3 text-xl font-semibold text-white">
                                        {post.title}
                                    </h2>
                                    <p className="mt-3 text-sm leading-6 text-white/70">
                                        {post.excerpt_preview}
                                    </p>

                                    {post.tags?.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href={route("blog.show", post.slug)}
                                        className="mt-6 inline-flex text-sm font-medium text-[#3BF5C4] hover:opacity-80"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </article>
                            </Link>
                        ))
                    ) : (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 md:col-span-2 xl:col-span-3">
                            No blog posts are available yet.
                        </div>
                    )}
                </div>

                {meta?.links?.length > 3 && (
                    <div className="mt-12">
                        <Pagination links={meta.links} />
                    </div>
                )}
                    {/* FAQ accordion for Blog page (first few items) */}
                    <div className="mt-8 max-w-2xl mx-auto">
                        <h3 className="text-sm font-semibold text-white mb-3">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            {/** Render all blog faqs as <details> */}
                            {blogFaqs.map((f, i) => (
                                <details key={i} className="rounded-xl border border-white/8 bg-white/3 p-4">
                                    <summary className="cursor-pointer font-medium text-white">{f.q}</summary>
                                    <div className="mt-2 text-white/70">{f.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
            </section>
        </GuestLayout>
    );
}