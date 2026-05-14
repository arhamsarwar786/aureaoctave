import HeaderBox from "@/Components/App/HeaderBox";
import { Pagination } from "@/Components/App/Pagination";
import TextInput from "@/Components/App/TextInput";

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

export default function Index({ auth, questions, queryParams = null }) {
    const { data, meta, links } = questions;
    const paginationLinks = links ?? meta?.links ?? [];
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("admin.community-questions.index"), queryParams);
    };

    const deleteQuestion = (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) {
            return;
        }

        router.delete(route("admin.community-questions.destroy", id));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Community Questions">
            <Head title="Community Questions" />

            <div className="mb-8 space-y-6  p-6 ">
                <HeaderBox
                    title="Community Questions"
                    subtext="Manage community questions and discussions."
                    actionButton={
                        <Link
                            href={route("admin.community-questions.create")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#3BF5C4] px-4 py-3 text-sm font-semibold text-[#0B0F14] transition hover:brightness-110"
                        >
                            <PlusIcon size={16} />
                            New Question
                        </Link>
                    }
                />

                <div className="rounded-3xl shadow-sm border bg-white border-slate-200 dark:bg-[#111820] dark:border-white/10">
                    <div className="border-b p-6 border-slate-200 dark:border-white/10">
                        <div className="max-w-md">
                            <TextInput
                                className="w-full font-normal"
                                defaultValue={queryParams.search}
                                placeholder="Search questions"
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
                                    <Table.ColumnHeaderCell className="text-slate-900 dark:text-white">Title</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-slate-900 dark:text-white">Answers</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-slate-900 dark:text-white">Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-slate-900 dark:text-white">Created</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-slate-900 dark:text-white">Action</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.length > 0 ? (
                                    data.map((question) => (
                                        <Table.Row key={question.id}>
                                            <Table.Cell>
                                                <div className="space-y-1 max-w-sm truncate">
                                                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                                                        {question.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-white/65 truncate">
                                                        /community/{question.slug}
                                                    </p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="text-slate-900 dark:text-white">{question.answers_count}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge color={question.is_published ? "green" : "gray"}>
                                                    {question.is_published ? "Published" : "Draft"}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell className="text-slate-500 dark:text-white/65">{formatDate(question.created_at)}</Table.Cell>
                                            <Table.Cell className="space-x-2">
                                                <Link
                                                    href={route("community.show", question.slug)}
                                                    className="link-btn !p-2"
                                                >
                                                    <BookOpenIcon className="size-4" />
                                                </Link>
                                                <Link
                                                    href={route("admin.community-questions.edit", question.id)}
                                                    className="link-btn !p-2 !bg-blue-200 !border-blue-500 !text-blue-800"
                                                >
                                                    <PenSquareIcon className="size-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteQuestion(question.id)}
                                                    className="link-btn !p-2 !bg-red-200 !border-red-500 !text-red-800"
                                                >
                                                    <TrashIcon className="size-4" />
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={5}>
                                            <p className="py-10 text-center text-sm font-medium text-slate-500 dark:text-white/65">
                                                No community questions found.
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
