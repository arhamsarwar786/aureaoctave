import HeaderBox from "@/Components/App/HeaderBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BlogForm from "./Partials/Form";

export default function Create({ auth, categories }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Create Blog Post">
            <div className="mb-8 space-y-6 p-6">
                <HeaderBox
                    title="Create Blog Post"
                    subtext="Publish updates, articles, and announcements for the blog."
                />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111820]">
                    <BlogForm categories={categories} mode="create" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}