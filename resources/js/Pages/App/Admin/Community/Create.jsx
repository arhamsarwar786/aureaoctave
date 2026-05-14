import HeaderBox from "@/Components/App/HeaderBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import QuestionForm from "./Partials/Form";

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Create Question">
            <div className="mb-8 space-y-6  p-6 ">
                <HeaderBox
                    title="Create Community Question"
                    subtext="Start a new discussion or post a question to the community."
                />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111820]">
                    <QuestionForm mode="create" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
