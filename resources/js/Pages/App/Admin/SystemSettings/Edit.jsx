import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BookOpenIcon, CopyIcon, FileIcon, PenSquareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";
import Form from "./Partials/Form";

export default function EditSystemSettings({ auth, systemSetting }) {
    const formData = {
        key: systemSetting.key,
        value: systemSetting.value,
        _method: "PUT",
    };
    const endpoint = route("system-settings.update", systemSetting.id);

    return (
        <AuthenticatedLayout user={auth.user} title="Transaction Details">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        System settings
                    </h1>
                </header>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56 ">
                    <div className="p-6 space-y-4 max-w-2xl">
                        <Form formData={formData} endpoint={endpoint} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
