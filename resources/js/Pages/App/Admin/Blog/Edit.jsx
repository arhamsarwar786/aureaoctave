import HeaderBox from "@/Components/App/HeaderBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BlogForm from "./Partials/Form";

export default function Edit({ auth, post, categories }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Edit Blog Post">
            <div className="mb-8 space-y-6">
                <HeaderBox
                    title="Edit Blog Post"
                    subtext={`Updating ${post.title}`}
                />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111820]">
                    <BlogForm post={post} categories={categories} mode="edit" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}