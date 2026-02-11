import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Avatar } from "@radix-ui/themes";
import {
    FileTextIcon,
    LockIcon,
    SunDimIcon,
    UserRoundIcon,
} from "lucide-react";

export default function Settings({ auth }) {
    const { user } = auth;
    return (
        <AuthenticatedLayout user={user} title={"Account Settings"}>
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl">Account Settings</h1>
                        <p>Update your account information</p>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow rounded-lg space-y-5">
                        <div className="flex items-center gap-5">
                            <Avatar
                                size="5"
                                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                                fallback="A"
                                radius="full"
                            />
                            <div>
                                <h1 className="capitalize font-bold text-xl">
                                    {user.name}
                                </h1>
                                <p className="text-[#00000080]">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Link
                                href={route("settings.account-details")}
                                className="relative flex items-center space-x-2 md:space-x-4 text-[#1D1D1F]"
                            >
                                <UserRoundIcon className="h-5 w-5 md:h-6 md:w-6" />
                                <p className="text-lg">Account Details</p>
                            </Link>
                            <Link
                                href={route("settings.upload-document")}
                                className="relative flex items-center space-x-2 md:space-x-4 text-[#1D1D1F]"
                            >
                                <FileTextIcon className="h-5 w-5 md:h-6 md:w-6" />
                                <p className="text-lg">Upload Documents</p>
                            </Link>
                            <Link
                                href={route("settings.change-password")}
                                className="relative flex items-center space-x-2 md:space-x-4 text-[#1D1D1F]"
                            >
                                <LockIcon className="h-5 w-5 md:h-6 md:w-6" />
                                <p className="text-lg">Change Password</p>
                            </Link>
                            <Link
                                href={"#"}
                                className="relative flex items-center space-x-2 md:space-x-4 text-[#1D1D1F]"
                            >
                                <SunDimIcon className="h-5 w-5 md:h-6 md:w-6" />
                                <p className="text-lg">Switch Theme</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
