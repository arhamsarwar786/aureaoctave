import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import UploadDocument from "./Partials/UploadDocuments";

export default function AccountDetails({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user} title={"Account Details"}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl text-white">Account Settings</h1>
                        <p>Update your account information</p>
                    </div>

                    <div className="p-4 sm:p-8 bg-[#0E151D] shadow sm:rounded-lg">
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
