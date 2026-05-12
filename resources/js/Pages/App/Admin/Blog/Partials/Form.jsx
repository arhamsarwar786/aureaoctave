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

export default function BlogForm({ post = null, categories = [], mode = "create" }) {
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

    const submit = (event) => {
        event.preventDefault();

        const options = {
            forceFormData: true,
        };

        if (mode === "edit" && post) {
            form.put(route("blog-posts.update", post.id), options);
            return;
        }

        form.post(route("blog-posts.store"), options);
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

                <div className="space-y-2 lg:col-span-2">
                    <InputLabel value="Excerpt" />
                    <textarea
                        rows={4}
                        className={baseFieldClass}
                        value={form.data.excerpt}
                        onChange={(event) => form.setData("excerpt", event.target.value)}
                    />
                    <FieldError message={form.errors.excerpt} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Category" />
                    <select
                        className={baseFieldClass}
                        value={form.data.blog_category_id}
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
                        onChange={(event) => form.setData("featured_image", event.target.files?.[0] ?? null)}
                    />
                    <FieldError message={form.errors.featured_image} />
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
                        className="h-4 w-4 rounded border-slate-300 text-[#3BF5C4] focus:ring-[#3BF5C4]"
                        checked={form.data.is_published}
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
                />
                <FieldError message={form.errors.content} />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-xl bg-[#0B0F14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3BF5C4] dark:text-[#0B0F14] dark:hover:brightness-110"
                >
                    {mode === "edit" ? "Update Post" : "Create Post"}
                </button>
            </div>
        </form>
    );
}