import InputLabel from "@/Components/App/InputLabel";
import TextInput from "@/Components/App/TextInput";
import RichTextEditor from "@/Components/App/RichTextEditor";
import { useForm } from "@inertiajs/react";

const baseFieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#3BF5C4] focus:ring-2 focus:ring-[#3BF5C4]/20 dark:border-white/10 dark:bg-[#0B0F14] dark:text-white dark:focus:ring-[#3BF5C4]/10";

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-2 text-sm text-red-500">{message}</p>;
}

export default function QuestionForm({ question = null, mode = "create" }) {
    const form = useForm({
        title: question?.title ?? "",
        slug: question?.slug ?? "",
        body: question?.body ?? "",
        is_published: question?.is_published ?? true,
    });

    const submit = (event) => {
        event.preventDefault();

        if (mode === "edit" && question) {
            form.put(route("admin.community-questions.update", question.id));
            return;
        }

        form.post(route("admin.community-questions.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                    <InputLabel value="Title" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.title}
                        onChange={(event) => form.setData("title", event.target.value)}
                    />
                    <FieldError message={form.errors.title} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Slug" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.slug}
                        onChange={(event) => form.setData("slug", event.target.value)}
                    />
                    <FieldError message={form.errors.slug} />
                    <p className="text-xs text-slate-500 dark:text-white/50">Leave blank to generate automatically from the title.</p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#0B0F14] lg:col-span-2">
                    <input
                        id="is_published"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-[#3BF5C4] focus:ring-[#3BF5C4] dark:border-slate-600 dark:bg-slate-700"
                        checked={form.data.is_published}
                        onChange={(event) => form.setData("is_published", event.target.checked)}
                    />
                    <label htmlFor="is_published" className="text-sm font-medium text-slate-700 dark:text-white">
                        Publish this question
                    </label>
                </div>
            </div>

            <div className="space-y-2 dark:text-white ">
                <InputLabel value="Body" />
                <RichTextEditor
                    value={form.data.body}
                    onChange={(value) => form.setData("body", value)}
                    placeholder="Write the question body here..."
                />
                <FieldError message={form.errors.body} />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-xl bg-[#0B0F14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3BF5C4] dark:text-[#0B0F14] dark:hover:brightness-110"
                >
                    {mode === "edit" ? "Update Question" : "Create Question"}
                </button>
            </div>
        </form>
    );
}
