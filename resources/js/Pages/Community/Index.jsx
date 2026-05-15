import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { communityFaqs } from "@/data/faqs";
import { Pagination } from "@/Components/App/Pagination";
import { MessageSquareIcon, EyeIcon, SearchIcon, XIcon, CheckCircleIcon, HelpCircleIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    
    const [searchValue, setSearchValue] = useState(queryParams.search || "");
    const [filterValue, setFilterValue] = useState(queryParams.filter || "");
    const isInitialMount = useRef(true);
    const debounceTimer = useRef(null);

    // Debounced search effect - only on user interaction, not initial mount
    useEffect(() => {
        // Skip initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new debounce timer
        debounceTimer.current = setTimeout(() => {
            const newQueryParams = { ...queryParams };
            if (searchValue) {
                newQueryParams.search = searchValue;
            } else {
                delete newQueryParams.search;
            }
            if (filterValue) {
                newQueryParams.filter = filterValue;
            } else {
                delete newQueryParams.filter;
            }

            router.get(route("community.index"), newQueryParams);
        }, 500); // 500ms debounce delay

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [searchValue, filterValue]);

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const handleFilterChange = (value) => {
        setFilterValue(value);
    };

    const clearSearch = () => {
        setSearchValue("");
        const newQueryParams = { ...queryParams };
        delete newQueryParams.search;
        if (filterValue) {
            newQueryParams.filter = filterValue;
        } else {
            delete newQueryParams.filter;
        }
        router.get(route("community.index"), newQueryParams);
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
                    <p className="pt-16 py-4 text-sm uppercase tracking-[0.3em] text-[#3BF5C4]">
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
                    {/* Search and Filter Section */}
                    <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-transparent">
                        {/* Enhanced Search Input */}
                        <div className="group relative w-full sm:max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-black ">
                                <SearchIcon className="size-4" />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-transparent text-sm text-black placeholder:text-black outline-none rounded-2xl border border-white/10 px-4 py-3.5 pl-10 pr-10 transition-all focus:border-[#3BF5C4]/50 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/20 focus:shadow-lg focus:shadow-[#3BF5C4]/10"
                                placeholder="Search discussions..."
                                value={searchValue}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                            {searchValue && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-black hover:text-black"
                                >
                                    <XIcon className="size-4 text-black" />
                                </button>
                            )}
                        </div>

                        {/* Enhanced Filter Dropdown */}
                        <select
                            className="rounded-2xl border border-white/10 bg-transparent px-4 py-3.5 text-sm text-black outline-none transition-all focus:border-[#3BF5C4]/50 focus:shadow-[#3BF5C4]/10 w-full sm:w-auto cursor-pointer hover:border-white/20"
                            value={filterValue}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value="">Latest Questions</option>
                            <option value="popular">Most Popular</option>
                            <option value="unanswered">Unanswered</option>
                        </select>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-4">
                        {data.length > 0 ? (
                            data.map((question) => (
                                <Link
                                    href={route("community.show", question.slug)}
                                    key={question.id}
                                    className="group block rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/5 p-6 transition-all duration-300 hover:border-[#3BF5C4]/30 hover:from-white/10 hover:to-white/8 hover:shadow-xl hover:shadow-[#3BF5C4]/10"
                                >
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex-1 min-w-0">
                                            {/* Question Title and Status Badge */}
                                            <div className="flex items-start gap-3">
                                                <h2 className="text-lg font-semibold text-black group-hover:text-[#3BF5C4] transition-colors flex-1">
                                                    {question.title}
                                                </h2>
                                                <div className="flex-shrink-0 mt-1">
                                                    {question.answers_count > 0 ? (
                                                        <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                                                            <CheckCircleIcon className="size-3" />
                                                            Answered
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/20">
                                                            <HelpCircleIcon className="size-3" />
                                                            Unanswered
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Question Preview */}
                                            <p className="mt-3 text-sm leading-6 text-white/60 line-clamp-2 group-hover:text-white/70 transition-colors">
                                                {question.body.replace(/<[^>]*>?/gm, '')}
                                            </p>

                                            {/* Metadata */}
                                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/40">
                                                <span className="flex items-center gap-1">
                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3BF5C4]"></span>
                                                    {question.author?.name}
                                                </span>
                                                <span>•</span>
                                                <span>{formatDate(question.created_at)}</span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 text-sm text-white/60 flex-shrink-0 pt-2 sm:pt-0">
                                            <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                <EyeIcon className="size-4 text-white/40" />
                                                <span className="text-xs font-medium text-white/70">{question.views_count}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                <MessageSquareIcon className="size-4 text-white/40" />
                                                <span className="text-xs font-medium text-white/70">{question.answers_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/5 p-12 text-center">
                                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                                    <SearchIcon className="size-6 text-white/40" />
                                </div>
                                <p className="text-white/70 font-medium mb-1">No discussions found</p>
                                <p className="text-sm text-white/50">Try adjusting your search or filter to find what you're looking for.</p>
                            </div>
                        )}
                    </div>

                    {links && links.length > 3 && (
                        <div className="mt-12">
                            <Pagination links={links} />
                        </div>
                    )}
                </div>
                    {/* FAQ accordion for Community page (first few items) */}
                    <div className="mt-8 max-w-2xl mx-auto">
                        <h3 className="text-sm font-semibold text-white mb-3">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            {communityFaqs.map((f, i) => (
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
