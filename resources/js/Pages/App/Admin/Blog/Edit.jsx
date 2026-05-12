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

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <BlogForm post={post} categories={categories} mode="edit" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}