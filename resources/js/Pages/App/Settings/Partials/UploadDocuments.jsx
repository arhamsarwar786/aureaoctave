import { useForm, usePage } from "@inertiajs/react";
import { BookUserIcon, FileTextIcon } from "lucide-react";
import { useTheme } from "@/Components/App/ThemeContext";

export default function UploadDocument({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const { theme } = useTheme();
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            address: user.name,
            state: user.name,
            country: user.name,
            city: user.name,
            zip_code: user.name,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    const documents = [
        {
            title: "Government Photo ID",
            description: "eg. Passport, National ID ...",
            proofType: "Identity",
        },
        {
            title: "Proof of Residence",
            description: "eg. Utility bill, phone/internet bill...",
            proofType: "Address",
        },
        {
            title: "Government Photo ID",
            description: "Bank Statement",
            proofType: "Financial",
        },
        {
            title: "Additional Documents",
            description: "Additional Documents",
            proofType: "Optional",
        },
    ];

    const isDark = theme === "dark";
    const panelBgClass = isDark ? "bg-[#000000]" : "bg-[#ffffff]";
    const tileBgClass = isDark ? "bg-[#000000]" : "bg-[#ffffff]";
    const tileHeaderBgClass = isDark ? "bg-[#000000]" : "bg-gray-100";
    const tileFooterBgClass = isDark ? "bg-[#000000cc]" : "bg-gray-50";

    return (
        <section className={`${panelBgClass} rounded-2xl p-6`}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-500 flex items-center gap-2">
                    <FileTextIcon /> Upload Document
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Upload documents to verify your account
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 py-4">
                <div
                    className={`rounded-2xl border border-gray-200 dark:border-slate-700 ${panelBgClass} p-4 sm:p-6`}
                >
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {documents.map((document) => (
                            <div
                                key={`${document.title}-${document.proofType}`}
                                className={`group w-full relative rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 ${tileBgClass} shadow-sm hover:shadow-md transition cursor-pointer`}
                            >
                                <header
                                    className={`p-2.5 text-center text-xs font-medium tracking-wide uppercase ${tileHeaderBgClass} text-gray-700 dark:text-slate-600`}
                                >
                                    {document.title}
                                </header>

                                <main className="py-10 px-4 flex items-center flex-col gap-3">
                                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 group-hover:scale-105 transition">
                                        {document.proofType === "Address" ? (
                                            <BookUserIcon className="h-7 w-7" />
                                        ) : (
                                            <FileTextIcon className="h-7 w-7" />
                                        )}
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-500">
                                        Click to Upload
                                    </h3>
                                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                                        {document.proofType} Proof
                                    </p>
                                </main>

                                <footer
                                    className={`p-2.5 text-xs text-center ${tileFooterBgClass} text-gray-600 dark:text-slate-700`}
                                >
                                    <p>{document.description}</p>
                                </footer>
                            </div>
                        ))}
                    </div>
                </div>

            </form>

                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-500">
                    <p className="leading-relaxed">
                        Make sure the information provided above are correct.
                        Verification may take some days
                    </p>
                    <p className="leading-relaxed">
                        Periodically, we may be required to collect some
                        additional information from you.
                    </p>
                </div>
        </section>
    );
}
