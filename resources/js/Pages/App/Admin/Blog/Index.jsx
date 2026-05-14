import HeaderBox from "@/Components/App/HeaderBox";
import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";
import { useTheme } from "@/Components/App/ThemeContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Badge, Table } from "@radix-ui/themes";
import { BookOpenIcon, PenSquareIcon, PlusIcon, TrashIcon } from "lucide-react";

function formatDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function Index({ auth, posts, queryParams = null }) {
    const { data, meta, links } = posts;
    const paginationLinks = links ?? meta?.links ?? [];
    const { theme } = useTheme();
    const pageBg = theme === "dark" ? "bg-[#0F141B]" : "";
    const cardBg = theme === "dark" ? "bg-[#111820] border-white/10" : "bg-white border-slate-200";
    const headingClass = theme === "dark" ? "text-white" : "text-slate-900";
    const mutedTextClass = theme === "dark" ? "text-white/65" : "text-slate-500";
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("blog-posts.index"), queryParams);
    };

    const deletePost = (id) => {
        if (!window.confirm("Are you sure you want to delete this blog post?")) {
            return;
        }

        router.delete(route("blog-posts.destroy", id));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Blog Posts">
            <Head title="Blog Posts" />

            <div className={`mb-8 space-y-6 p-6 ${pageBg}`}>
                <HeaderBox
                    title="Blog Posts"
                    subtext="Create, edit, publish, and delete posts for the public blog."
                    actionButton={
                        <Link
                            href={route("blog-posts.create")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#3BF5C4] px-4 py-3 text-sm font-semibold text-[#0B0F14] transition hover:brightness-110"
                        >
                            <PlusIcon size={16} />
                            New Post
                        </Link>
                    }
                />

                <div className={`rounded-3xl shadow-sm border ${cardBg}`}>
                    <div className={`border-b p-6 ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                        <div className="max-w-md">
                            <TextInput
                                className="w-full font-normal"
                                defaultValue={queryParams.search}
                                placeholder="Search posts"
                                onBlur={(event) =>
                                    searchFieldChanged("search", event.target.value)
                                }
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        searchFieldChanged("search", event.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell className={headingClass}>Image</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className={headingClass}>Title</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className={headingClass}>Category</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className={headingClass}>Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className={headingClass}>Published</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className={headingClass}>Action</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.length > 0 ? (
                                    data.map((post) => (
                                        <Table.Row key={post.id}>
                                            <Table.Cell>
                                                {post.featured_image_url ? (
                                                    <img
                                                        src={post.featured_image_url}
                                                        alt={post.title}
                                                        className="h-12 w-16 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-white/10">
                                                        —
                                                    </div>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="space-y-1">
                                                    <p className={`font-semibold ${headingClass}`}>
                                                        {post.title}
                                                    </p>
                                                    <p className={`text-xs ${mutedTextClass}`}>
                                                        /blog/{post.slug}
                                                    </p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className={headingClass}>{post.category?.name ?? "—"}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge color={post.is_published ? "green" : "gray"}>
                                                    {post.is_published ? "Published" : "Draft"}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell className={mutedTextClass}>{formatDate(post.published_at)}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Link
                                                    href={route("blog.show", post.slug)}
                                                    className="link-btn !p-2"
                                                >
                                                    <BookOpenIcon className="size-4" />
                                                </Link>
                                                <Link
                                                    href={route("blog-posts.edit", post.id)}
                                                    className="link-btn !p-2 !bg-blue-200 !border-blue-500 !text-blue-800"
                                                >
                                                    <PenSquareIcon className="size-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => deletePost(post.id)}
                                                    className="link-btn !p-2 !bg-red-200 !border-red-500 !text-red-800"
                                                >
                                                    <TrashIcon className="size-4" />
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>
                                            <p className={`py-10 text-center text-sm font-medium ${mutedTextClass}`}>
                                                No blog posts found.
                                            </p>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Root>

                        {paginationLinks.length > 0 && (
                            <Pagination links={paginationLinks} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
