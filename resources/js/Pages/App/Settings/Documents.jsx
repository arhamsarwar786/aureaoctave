import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UploadDocument from "./Partials/UploadDocuments";

export default function AccountDetails({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user} title={"Account Details"}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl text-gray-400 ">
                            Account Settings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Update your account information
                        </p>
                    </div>

                    <div className=" bg-white/95 dark:bg-[#0E151D] border border-[#e5efed] dark:border-[#1b2a35] shadow-xl sm:rounded-2xl">
                        <UploadDocument
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
