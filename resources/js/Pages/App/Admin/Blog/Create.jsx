import HeaderBox from "@/Components/App/HeaderBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BlogForm from "./Partials/Form";

export default function Create({ auth, categories }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Create Blog Post">
            <div className="mb-8 space-y-6">
                <HeaderBox
                    title="Create Blog Post"
                    subtext="Publish updates, articles, and announcements for the blog."
                />

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BlogForm categories={categories} mode="create" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}