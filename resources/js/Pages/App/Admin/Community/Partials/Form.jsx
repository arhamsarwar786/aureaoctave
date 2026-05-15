import InputLabel from "@/Components/App/InputLabel";
import TextInput from "@/Components/App/TextInput";
import RichTextEditor from "@/Components/App/RichTextEditor";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const baseFieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#3BF5C4] focus:ring-2 focus:ring-[#3BF5C4]/20 dark:border-white/10 dark:bg-[#0B0F14] dark:text-white dark:focus:ring-[#3BF5C4]/10";

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-2 text-sm text-red-500">{message}</p>;
}

function stripHtml(value = "") {
    return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function FormMessage({ type = "error", message }) {
    if (!message) return null;

    const classes =
        type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
            : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200";

    return (
        <div className={`rounded-xl border px-4 py-3 text-sm ${classes}`} role="alert">
            {message}
        </div>
    );
}

export default function QuestionForm({ question = null, mode = "create" }) {
    const [formMessage, setFormMessage] = useState(null);
    const isEdit = mode === "edit" && question;
    const submitLabel = isEdit ? "Update Question" : "Create Question";
    const processingLabel = isEdit ? "Updating Question..." : "Creating Question...";

    const form = useForm({
        title: question?.title ?? "",
        slug: question?.slug ?? "",
        body: question?.body ?? "",
        is_published: question?.is_published ?? true,
    });

    const validate = () => {
        const errors = {};
        const title = form.data.title.trim();
        const slug = form.data.slug.trim();
        const body = stripHtml(form.data.body);

        if (!title) {
            errors.title = "The title field is required.";
        } else if (title.length > 255) {
            errors.title = "The title may not be greater than 255 characters.";
        }

        if (slug.length > 255) {
            errors.slug = "The slug may not be greater than 255 characters.";
        }

        if (!body) {
            errors.body = "The body field is required.";
        }

        return errors;
    };

    const submit = (event) => {
        event.preventDefault();

        if (form.processing) return;

        setFormMessage(null);
        form.clearErrors();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            form.setError(validationErrors);
            setFormMessage({
                type: "error",
                message: "Please fix the highlighted fields before submitting.",
            });
            return;
        }

        const options = {
            preserveScroll: true,
            onStart: () => {
                setFormMessage(null);
            },
            onSuccess: () => {
                setFormMessage({
                    type: "success",
                    message: isEdit ? "Question updated successfully." : "Question created successfully.",
                });
            },
            onError: (errors) => {
                setFormMessage({
                    type: "error",
                    message: errors?.message || errors?.form || "Please fix the highlighted fields before submitting.",
                });
            },
        };

        if (isEdit) {
            form.put(route("admin.community-questions.update", question.id), options);
            return;
        }

        form.post(route("admin.community-questions.store"), options);
    };

    return (
        <form onSubmit={submit} className="space-y-8" noValidate>
            <FormMessage type={formMessage?.type} message={formMessage?.message} />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                    <InputLabel value="Title" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.title}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.title)}
                        onChange={(event) => form.setData("title", event.target.value)}
                    />
                    <FieldError message={form.errors.title} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Slug" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.slug}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.slug)}
                        onChange={(event) => form.setData("slug", event.target.value)}
                    />
                    <FieldError message={form.errors.slug} />
                    <p className="text-xs text-slate-500 dark:text-white/50">Leave blank to generate automatically from the title.</p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#0B0F14] lg:col-span-2">
                    <input
                        id="is_published"
                        type="checkbox"
                        className="h-4 w-4 rounded border border-slate-400 bg-white text-[#3BF5C4] shadow-sm checked:border-[#3BF5C4] focus:ring-[#3BF5C4] dark:border-white/30 dark:bg-[#0B0F14]"
                        checked={form.data.is_published}
                        disabled={form.processing}
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
                    disabled={form.processing}
                />
                <FieldError message={form.errors.body} />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0B0F14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3BF5C4] dark:text-[#0B0F14] dark:hover:brightness-110"
                >
                    {form.processing && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-[#0B0F14]/30 dark:border-t-[#0B0F14]" />
                    )}
                    {form.processing ? processingLabel : submitLabel}
                </button>
            </div>
        </form>
    );
}
