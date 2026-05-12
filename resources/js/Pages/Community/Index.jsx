import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Pagination } from "@/Components/App/Pagination";
import { MessageSquareIcon, EyeIcon } from "lucide-react";

function formatDate(value) {
    if (!value) return "";

    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function CommunityIndex({ questions, queryParams = null }) {
    const { data, links } = questions;
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("community.index"), queryParams);
    };

    return (
        <GuestLayout title="Community Forum">
            <Head title="Community Forum">
                <meta
                    name="description"
                    content="Join the discussion. Ask questions and find answers in the Aurea Octave community."
                />
            </Head>

            <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#3BF5C4]">
                        Community
                    </p>
                    <h1 className="text-4xl font-bold text-white md:text-6xl">
                        Discussions
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
                        Ask questions, share insights, and connect with other members of the Aurea Octave community.
                    </p>
                </div>

                <div className="mt-14">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                            <input
                                type="text"
                                className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
                                placeholder="Search discussions..."
                                defaultValue={queryParams.search}
                                onBlur={(e) => searchFieldChanged("search", e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        searchFieldChanged("search", e.target.value);
                                    }
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <select
                                className="rounded-xl border border-white/10 bg-[#0F141B] px-4 py-3 text-sm text-white outline-none"
                                defaultValue={queryParams.filter || ""}
                                onChange={(e) => searchFieldChanged("filter", e.target.value)}
                            >
                                <option value="">Latest Questions</option>
                                <option value="popular">Most Popular</option>
                                <option value="unanswered">Unanswered</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {data.length > 0 ? (
                            data.map((question) => (
                                <Link
                                    href={route("community.show", question.slug)}
                                    key={question.id}
                                    className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                                >
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-white">
                                                {question.title}
                                            </h2>
                                            <p className="mt-2 text-sm leading-6 text-white/70 line-clamp-2">
                                                {question.body.replace(/<[^>]*>?/gm, '')}
                                            </p>

                                            <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                                                <span>Posted by {question.author?.name}</span>
                                                <span>•</span>
                                                <span>{formatDate(question.created_at)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-white/70">
                                            <div className="flex items-center gap-2">
                                                <EyeIcon className="size-4" />
                                                {question.views_count}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageSquareIcon className="size-4" />
                                                {question.answers_count}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
                                No discussions found.
                            </div>
                        )}
                    </div>

                    {links && links.length > 3 && (
                        <div className="mt-12">
                            <Pagination links={links} />
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
