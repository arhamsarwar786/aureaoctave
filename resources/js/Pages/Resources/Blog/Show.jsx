import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

function formatDate(value) {
    if (!value) return "";

    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogShow({ post, relatedPosts = [] }) {
    const metaTitle = post.meta_title || post.title;
    const metaDescription = post.meta_description || post.excerpt || "Read the latest Aurea Octave blog post.";

    return (
        <GuestLayout title={metaTitle}>
            <Head title={metaTitle}>
                <meta name="description" content={metaDescription} />
                {post.schema_markup && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: post.schema_markup }}
                    />
                )}
            </Head>

            <article className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[#3BF5C4]">
                    Blog
                </p>
                <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
                    {post.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
                    <span>{formatDate(post.published_at)}</span>
                    {post.category?.name && <span>• {post.category.name}</span>}
                    {post.author?.name && <span>• {post.author.name}</span>}
                </div>

                {post.featured_image_url && (
                    <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="mt-10 h-[24rem] w-full rounded-3xl object-cover"
                    />
                )}

                {post.excerpt && (
                    <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
                        {post.excerpt}
                    </p>
                )}

                <div className="prose prose-invert prose-lg mt-10 max-w-none text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {post.tags?.length > 0 && (
                    <div className="mt-12 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="rounded-full border border-[#3BF5C4]/30 bg-[#3BF5C4]/10 px-4 py-2 text-sm text-[#3BF5C4]"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {relatedPosts.length > 0 && (
                    <section className="mt-16 border-t border-white/10 pt-12">
                        <h2 className="text-2xl font-semibold text-white">
                            Related posts
                        </h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={route("blog.show", relatedPost.slug)}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                                >
                                    <p className="text-sm text-[#3BF5C4]">
                                        {relatedPost.category?.name ?? "Blog"}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-white">
                                        {relatedPost.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </GuestLayout>
    );
}