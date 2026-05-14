import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Avatar } from "@radix-ui/themes";
import {
    FileTextIcon,
    LockIcon,
    MoonIcon,
    SunIcon,
    UserRoundIcon,
} from "lucide-react";
import { useTheme } from "@/Components/App/ThemeContext";

export default function Settings({ auth }) {
    const { user } = auth;
    const { theme, toggleTheme } = useTheme();
    const pageBg = theme === "dark" ? "bg-[#0F141B]" : "";
    const headingClass = theme === "dark" ? "text-white" : "text-slate-900";
    const mutedTextClass = theme === "dark" ? "text-white/65" : "text-slate-600";
    const panelClass = theme === "dark" ? "bg-[#111820] border-white/10" : "bg-white border-slate-200";

    return (
        <AuthenticatedLayout user={user} title={"Account Settings"}>
            <div className={`py-12 ${pageBg}`}>
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center">
                        <h1 className={`font-bold text-2xl ${headingClass}`}>Account Settings</h1>
                        <p className={mutedTextClass}>Update your account information</p>
                    </div>

                    <div className={`p-4 sm:p-8 shadow rounded-lg space-y-5 border ${panelClass}`}>
                        <div className="flex items-center gap-5">
                            <Avatar
                                size="5"
                                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                                fallback="A"
                                radius="full"
                            />
                            <div>
                                <h1 className={`capitalize font-bold text-xl ${headingClass}`}>
                                    {user.name}
                                </h1>
                                <p className={mutedTextClass}>{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Link
                                href={route("settings.account-details")}
                                className={`relative flex items-center space-x-2 md:space-x-4 ${headingClass}`}
                            >
                                <UserRoundIcon className={`h-5 w-5 md:h-6 md:w-6 ${theme === "dark" ? "text-white" : "text-slate-700"}`} />
                                <p className="text-lg">Account Details</p>
                            </Link>
                            <Link
                                href={route("settings.upload-document")}
                                className={`relative flex items-center space-x-2 md:space-x-4 ${headingClass}`}
                            >
                                <FileTextIcon className={`h-5 w-5 md:h-6 md:w-6 ${theme === "dark" ? "text-white" : "text-slate-700"}`} />
                                <p className="text-lg">KYC</p>
                            </Link>
                            <Link
                                href={route("settings.change-password")}
                                className={`relative flex items-center space-x-2 md:space-x-4 ${headingClass}`}
                            >
                                <LockIcon className={`h-5 w-5 md:h-6 md:w-6 ${theme === "dark" ? "text-white" : "text-slate-700"}`} />
                                <p className="text-lg">Change Password</p>
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className={`relative flex items-center space-x-2 md:space-x-4 w-full text-left ${headingClass}`}
                            >
                                {theme === "dark" ? (
                                    <SunIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-300" />
                                ) : (
                                    <MoonIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-400" />
                                )}
                                <p className="text-lg">
                                    {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
