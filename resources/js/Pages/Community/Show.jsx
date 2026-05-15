import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { MessageSquareIcon, EyeIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}

export default function CommunityShow({ question, answers }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        body: "",
    });

    const submitAnswer = (e) => {
        e.preventDefault();
        post(route("community.answers.store", question.slug), {
            onSuccess: () => reset("body"),
        });
    };

    const handleVote = (answerId, type) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        router.post(route("community.vote"), {
            answer_id: answerId,
            type: type,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <GuestLayout title={question.title}>
            <Head title={question.title} />

            <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
                <Link
                    href={route("community.index")}
                    className="mb-8 inline-flex items-center text-sm text-[#3BF5C4] hover:opacity-80"
                >
                    &larr; Back to discussions
                </Link>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                    <h1 className="text-3xl font-bold text-white">
                        {question.title}
                    </h1>

                    <div className="mt-4 flex items-center gap-6 border-b border-white/10 pb-6 text-sm text-white/50">
                        <span>Posted by <strong className="text-white/70">{question.author?.name}</strong></span>
                        <span>{formatDate(question.created_at)}</span>
                        <div className="flex items-center gap-2 ml-auto">
                            <EyeIcon className="size-4" />
                            {question.views_count} Views
                        </div>
                    </div>

                    <div
                        className="prose prose-invert mt-8 max-w-none text-white/80"
                        dangerouslySetInnerHTML={{ __html: question.body }}
                    />
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <MessageSquareIcon className="size-5" />
                        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
                    </h3>

                    <div className="mt-6 space-y-6">
                        {answers.map((answer) => (
                            <div key={answer.id} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                                <div className="flex min-w-16 flex-col items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleVote(answer.id, 1)}
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition ${answer.user_vote === 1 ? "bg-[#3BF5C4]/20 text-[#3BF5C4]" : "text-white/50 hover:bg-white/10 hover:text-white"}`}
                                        aria-label={`${answer.upvotes_count} likes`}
                                    >
                                        <ThumbsUpIcon className="size-5" />
                                        <span>{answer.upvotes_count}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleVote(answer.id, -1)}
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition ${answer.user_vote === -1 ? "bg-red-500/20 text-red-500" : "text-white/50 hover:bg-white/10 hover:text-white"}`}
                                        aria-label={`${answer.downvotes_count} dislikes`}
                                    >
                                        <ThumbsDownIcon className="size-5" />
                                        <span>{answer.downvotes_count}</span>
                                    </button>
                                </div>

                                <div className="flex-1 border-l border-white/10 pl-6">
                                    <div className="flex items-center justify-between text-sm text-white/50">
                                        <span className="font-medium text-white/80">{answer.author?.name}</span>
                                        <span>{formatDate(answer.created_at)}</span>
                                    </div>
                                    <div className="mt-4 text-white/80 whitespace-pre-wrap">
                                        {answer.body}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 rounded-3xl border border-white/10 bg-[#0F141B] p-8">
                    <h3 className="text-xl font-bold text-white">Your Answer</h3>

                    {auth.user ? (
                        <form onSubmit={submitAnswer} className="mt-6">
                            <textarea
                                rows={5}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#3BF5C4] focus:ring-2 focus:ring-[#3BF5C4]/20"
                                placeholder="Type your answer here..."
                                value={data.body}
                                onChange={(e) => setData("body", e.target.value)}
                            />
                            {errors.body && (
                                <p className="mt-2 text-sm text-red-500">{errors.body}</p>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 rounded-xl bg-[#3BF5C4] px-6 py-3 text-sm font-bold text-[#0B0F14] transition hover:brightness-110 disabled:opacity-50"
                            >
                                Post Answer
                            </button>
                        </form>
                    ) : (
                        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-8 text-center">
                            <p className="text-white/70">You must be logged in to post an answer.</p>
                            <Link
                                href={route("login")}
                                className="mt-4 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#0B0F14] transition hover:bg-[#3BF5C4]"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
