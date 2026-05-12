import HeaderBox from "@/Components/App/HeaderBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import QuestionForm from "./Partials/Form";

export default function Edit({ auth, question }) {
    return (
        <AuthenticatedLayout user={auth.user} title="Edit Question">
            <div className="mb-8 space-y-6 bg-slate-50 p-6 dark:bg-[#0F141B]">
                <HeaderBox
                    title="Edit Community Question"
                    subtext={`Updating ${question.title}`}
                />

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111820]">
                    <QuestionForm question={question} mode="edit" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
