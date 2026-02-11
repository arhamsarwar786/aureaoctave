import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Avatar } from "@radix-ui/themes";
import {
    FileTextIcon,
    LockIcon,
    SunDimIcon,
    UserRoundIcon,
} from "lucide-react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";

export default function ChangePassword({ auth }) {
    const { user } = auth;
    return (
        <AuthenticatedLayout user={user} title={"Account Settings"}>
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl">Account Settings</h1>
                        <p>Update your account information</p>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-8">
                        <header>
                            <h2 className="text-lg font-medium text-[#1D1D1F] flex items-center gap-2">
                                <LockIcon /> Change Password
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Ensure your account is using a long, random
                                password to stay secure.
                            </p>
                        </header>

                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
