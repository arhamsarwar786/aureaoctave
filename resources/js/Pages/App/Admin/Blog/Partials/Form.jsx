import InputLabel from "@/Components/App/InputLabel";
import TextInput from "@/Components/App/TextInput";
import RichTextEditor from "@/Components/App/RichTextEditor";
import { useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";

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

export default function BlogForm({ post = null, categories = [], mode = "create" }) {
    const [formMessage, setFormMessage] = useState(null);
    const isEdit = mode === "edit" && post;
    const submitLabel = isEdit ? "Update Post" : "Create Post";
    const processingLabel = isEdit ? "Updating Post..." : "Creating Post...";

    const form = useForm({
        title: post?.title ?? "",
        slug: post?.slug ?? "",
        excerpt: post?.excerpt ?? "",
        content: post?.content ?? "",
        featured_image: null,
        blog_category_id: post?.blog_category_id ?? post?.category?.id ?? "",
        category_name: "",
        tags: post?.tags?.map((tag) => tag.name).join(", ") ?? "",
        is_published: post?.is_published ?? false,
        meta_title: post?.meta_title ?? "",
        meta_description: post?.meta_description ?? "",
        schema_markup: post?.schema_markup ?? "",
    });

    const selectedFileName = useMemo(() => {
        return typeof File !== "undefined" && form.data.featured_image instanceof File
            ? form.data.featured_image.name
            : "";
    }, [form.data.featured_image]);

    const validate = () => {
        const errors = {};
        const title = form.data.title.trim();
        const content = stripHtml(form.data.content);
        const slug = form.data.slug.trim();
        const excerpt = form.data.excerpt.trim();
        const categoryName = form.data.category_name.trim();
        const tags = form.data.tags.trim();
        const metaTitle = form.data.meta_title.trim();
        const metaDescription = form.data.meta_description.trim();
        const schemaMarkup = form.data.schema_markup.trim();
        const image = form.data.featured_image;

        if (!title) {
            errors.title = "The title field is required.";
        } else if (title.length > 255) {
            errors.title = "The title may not be greater than 255 characters.";
        }

        if (slug.length > 255) {
            errors.slug = "The slug may not be greater than 255 characters.";
        }

        if (excerpt.length > 1000) {
            errors.excerpt = "The excerpt may not be greater than 1000 characters.";
        }

        if (!content) {
            errors.content = "The content field is required.";
        }

        if (categoryName.length > 255) {
            errors.category_name = "The new category name may not be greater than 255 characters.";
        }

        if (tags.length > 1000) {
            errors.tags = "The tags may not be greater than 1000 characters.";
        }

        if (metaTitle.length > 255) {
            errors.meta_title = "The meta title may not be greater than 255 characters.";
        }

        if (metaDescription.length > 500) {
            errors.meta_description = "The meta description may not be greater than 500 characters.";
        }

        if (schemaMarkup) {
            try {
                JSON.parse(schemaMarkup);
            } catch {
                errors.schema_markup = "Schema markup must be valid JSON.";
            }
        }

        if (typeof File !== "undefined" && image instanceof File) {
            if (!image.type.startsWith("image/")) {
                errors.featured_image = "The featured image must be an image file.";
            } else if (image.size > 4096 * 1024) {
                errors.featured_image = "The featured image may not be greater than 4MB.";
            }
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
            forceFormData: true,
            preserveScroll: true,
            onStart: () => {
                setFormMessage(null);
            },
            onSuccess: () => {
                setFormMessage({
                    type: "success",
                    message: isEdit ? "Blog post updated successfully." : "Blog post created successfully.",
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
            form.post(route("blog-posts.update.post", post.id), options);
            return;
        }

        form.post(route("blog-posts.store"), options);
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

                <div className="space-y-2 lg:col-span-2">
                    <InputLabel value="Excerpt" />
                    <textarea
                        rows={4}
                        className={baseFieldClass}
                        value={form.data.excerpt}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.excerpt)}
                        onChange={(event) => form.setData("excerpt", event.target.value)}
                    />
                    <FieldError message={form.errors.excerpt} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Category" />
                    <select
                        className={baseFieldClass}
                        value={form.data.blog_category_id}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.blog_category_id)}
                        onChange={(event) => form.setData("blog_category_id", event.target.value)}
                    >
                        <option value="">Select an existing category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <FieldError message={form.errors.blog_category_id} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Or create a new category" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.category_name}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.category_name)}
                        onChange={(event) => form.setData("category_name", event.target.value)}
                        placeholder="Finance, Research, Insights"
                    />
                    <FieldError message={form.errors.category_name} />
                </div>

                <div className="space-y-2 lg:col-span-2">
                    <InputLabel value="Tags" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.tags}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.tags)}
                        onChange={(event) => form.setData("tags", event.target.value)}
                        placeholder="markets, investing, platform updates"
                    />
                    <FieldError message={form.errors.tags} />
                </div>

                <div className="space-y-2 lg:col-span-2">
                    <InputLabel value="Featured Image" />
                    <input
                        type="file"
                        accept="image/*"
                        className={baseFieldClass}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.featured_image)}
                        onChange={(event) => form.setData("featured_image", event.target.files?.[0] ?? null)}
                    />
                    <FieldError message={form.errors.featured_image} />
                    {selectedFileName && (
                        <p className="text-xs text-slate-500 dark:text-white/50">Selected: {selectedFileName}</p>
                    )}
                    {post?.featured_image_url && !form.data.featured_image && (
                        <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="mt-4 h-56 w-full rounded-2xl object-cover"
                        />
                    )}
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
                        Publish this post
                    </label>
                </div>

                <div className="space-y-2">
                    <InputLabel value="Meta Title" />
                    <TextInput
                        className={baseFieldClass}
                        value={form.data.meta_title}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.meta_title)}
                        onChange={(event) => form.setData("meta_title", event.target.value)}
                    />
                    <FieldError message={form.errors.meta_title} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Meta Description" />
                    <textarea
                        rows={3}
                        className={baseFieldClass}
                        value={form.data.meta_description}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.meta_description)}
                        onChange={(event) => form.setData("meta_description", event.target.value)}
                    />
                    <FieldError message={form.errors.meta_description} />
                </div>

                <div className="space-y-2 lg:col-span-2">
                    <InputLabel value="Schema Markup" />
                    <textarea
                        rows={5}
                        className={`${baseFieldClass} font-mono text-xs`}
                        value={form.data.schema_markup}
                        disabled={form.processing}
                        aria-invalid={Boolean(form.errors.schema_markup)}
                        onChange={(event) => form.setData("schema_markup", event.target.value)}
                        placeholder='{"@context":"https://schema.org","@type":"BlogPosting"}'
                    />
                    <FieldError message={form.errors.schema_markup} />
                </div>
            </div>

            <div className="space-y-2">
                <InputLabel value="Content" />
                <RichTextEditor
                    value={form.data.content}
                    onChange={(value) => form.setData("content", value)}
                    disabled={form.processing}
                />
                <FieldError message={form.errors.content} />
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
