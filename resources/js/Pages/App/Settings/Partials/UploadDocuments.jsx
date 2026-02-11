import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Avatar } from "@radix-ui/themes";
import { BookUserIcon, FileTextIcon } from "lucide-react";

export default function UploadDocument({
    mustVerifyEmail,
    status,
    className = "",
}) {
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

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#1D1D1F] flex items-center gap-2">
                    <FileTextIcon /> Upload Document
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Upload documents to verify your account
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6  py-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="bg-[#F5F5F5] w-full relative rounded-lg overflow-hidden">
                        <header className="p-2 text-center text-sm bg-[#3B4FE426]">
                            Government Photo ID
                        </header>
                        <main className="py-12 px-4 flex items-center flex-col ">
                            <div>
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M45 7.5H15C9.475 7.5 5 11.95 5 17.425V42.575C5 48.05 9.475 52.5 15 52.5H45C50.525 52.5 55 48.05 55 42.575V17.425C55 11.95 50.525 7.5 45 7.5ZM21.25 17.925C24.425 17.925 27.025 20.525 27.025 23.7C27.025 26.875 24.425 29.475 21.25 29.475C18.075 29.475 15.475 26.875 15.475 23.7C15.475 20.525 18.075 17.925 21.25 17.925ZM30.925 41.65C30.7 41.9 30.35 42.05 30 42.05H12.5C12.15 42.05 11.8 41.9 11.575 41.65C11.35 41.4 11.225 41.05 11.25 40.7C11.675 36.5 15.025 33.175 19.225 32.775C20.55 32.65 21.925 32.65 23.25 32.775C27.45 33.175 30.825 36.5 31.225 40.7C31.275 41.05 31.15 41.4 30.925 41.65ZM47.5 41.875H42.5C41.475 41.875 40.625 41.025 40.625 40C40.625 38.975 41.475 38.125 42.5 38.125H47.5C48.525 38.125 49.375 38.975 49.375 40C49.375 41.025 48.525 41.875 47.5 41.875ZM47.5 31.875H37.5C36.475 31.875 35.625 31.025 35.625 30C35.625 28.975 36.475 28.125 37.5 28.125H47.5C48.525 28.125 49.375 28.975 49.375 30C49.375 31.025 48.525 31.875 47.5 31.875ZM47.5 21.875H35C33.975 21.875 33.125 21.025 33.125 20C33.125 18.975 33.975 18.125 35 18.125H47.5C48.525 18.125 49.375 18.975 49.375 20C49.375 21.025 48.525 21.875 47.5 21.875Z"
                                        fill="#3B4FE4"
                                    />
                                </svg>
                            </div>
                            <h2>Click to Upload</h2>
                        </main>
                        <footer className="p-2 text-xs bg-[#3B4FE426]">
                            <p>eg. Passport, National ID ...</p>
                        </footer>
                    </div>
                    <div className="bg-[#F5F5F5] w-full relative rounded-lg overflow-hidden">
                        <header className="p-2 text-center text-sm bg-[#3B4FE426]">
                            Proof of Residence
                        </header>
                        <main className="py-12 px-4 flex items-center flex-col ">
                            <div>
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M35.8754 5H24.1254C21.5254 5 19.4004 7.1 19.4004 9.7V12.05C19.4004 14.65 21.5004 16.75 24.1004 16.75H35.8754C38.4754 16.75 40.5754 14.65 40.5754 12.05V9.7C40.6004 7.1 38.4754 5 35.8754 5Z"
                                        fill="#3B4FE4"
                                    />
                                    <path
                                        d="M43.1006 12.0497C43.1006 16.0247 39.8506 19.2747 35.8756 19.2747H24.1256C20.1506 19.2747 16.9006 16.0247 16.9006 12.0497C16.9006 10.6497 15.4006 9.77471 14.1506 10.4247C10.6256 12.2997 8.22559 16.0247 8.22559 20.2997V43.8247C8.22559 49.9747 13.2506 54.9997 19.4006 54.9997H40.6006C46.7506 54.9997 51.7756 49.9747 51.7756 43.8247V20.2997C51.7756 16.0247 49.3756 12.2997 45.8506 10.4247C44.6006 9.77471 43.1006 10.6497 43.1006 12.0497ZM30.9506 42.3747H20.0006C18.9756 42.3747 18.1256 41.5247 18.1256 40.4997C18.1256 39.4747 18.9756 38.6247 20.0006 38.6247H30.9506C31.9756 38.6247 32.8256 39.4747 32.8256 40.4997C32.8256 41.5247 31.9756 42.3747 30.9506 42.3747ZM37.5006 32.3747H20.0006C18.9756 32.3747 18.1256 31.5247 18.1256 30.4997C18.1256 29.4747 18.9756 28.6247 20.0006 28.6247H37.5006C38.5256 28.6247 39.3756 29.4747 39.3756 30.4997C39.3756 31.5247 38.5256 32.3747 37.5006 32.3747Z"
                                        fill="#3B4FE4"
                                    />
                                </svg>
                            </div>
                            <h2>Click to Upload</h2>
                        </main>
                        <footer className="p-2 text-xs bg-[#3B4FE426]">
                            <p>eg. Utility bill, phone/internet bill...</p>
                        </footer>
                    </div>
                    <div className="bg-[#F5F5F5] w-full relative rounded-lg overflow-hidden">
                        <header className="p-2 text-center text-sm bg-[#3B4FE426]">
                            Government Photo ID
                        </header>
                        <main className="py-12 px-4 flex items-center flex-col ">
                            <div>
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M45 7.5H15C9.475 7.5 5 11.95 5 17.425V42.575C5 48.05 9.475 52.5 15 52.5H45C50.525 52.5 55 48.05 55 42.575V17.425C55 11.95 50.525 7.5 45 7.5ZM21.25 17.925C24.425 17.925 27.025 20.525 27.025 23.7C27.025 26.875 24.425 29.475 21.25 29.475C18.075 29.475 15.475 26.875 15.475 23.7C15.475 20.525 18.075 17.925 21.25 17.925ZM30.925 41.65C30.7 41.9 30.35 42.05 30 42.05H12.5C12.15 42.05 11.8 41.9 11.575 41.65C11.35 41.4 11.225 41.05 11.25 40.7C11.675 36.5 15.025 33.175 19.225 32.775C20.55 32.65 21.925 32.65 23.25 32.775C27.45 33.175 30.825 36.5 31.225 40.7C31.275 41.05 31.15 41.4 30.925 41.65ZM47.5 41.875H42.5C41.475 41.875 40.625 41.025 40.625 40C40.625 38.975 41.475 38.125 42.5 38.125H47.5C48.525 38.125 49.375 38.975 49.375 40C49.375 41.025 48.525 41.875 47.5 41.875ZM47.5 31.875H37.5C36.475 31.875 35.625 31.025 35.625 30C35.625 28.975 36.475 28.125 37.5 28.125H47.5C48.525 28.125 49.375 28.975 49.375 30C49.375 31.025 48.525 31.875 47.5 31.875ZM47.5 21.875H35C33.975 21.875 33.125 21.025 33.125 20C33.125 18.975 33.975 18.125 35 18.125H47.5C48.525 18.125 49.375 18.975 49.375 20C49.375 21.025 48.525 21.875 47.5 21.875Z"
                                        fill="#3B4FE4"
                                    />
                                </svg>
                            </div>
                            <h2>Click to Upload</h2>
                        </main>
                        <footer className="p-2 text-xs text-center bg-[#3B4FE426]">
                            <p>Bank Statment</p>
                        </footer>
                    </div>
                    <div className="bg-[#F5F5F5] w-full relative rounded-lg overflow-hidden">
                        <header className="p-2 text-center text-sm bg-[#3B4FE426]">
                            Additional Documents
                        </header>
                        <main className="py-12 px-4 flex items-center flex-col ">
                            <div>
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M45 7.5H15C9.475 7.5 5 11.95 5 17.425V42.575C5 48.05 9.475 52.5 15 52.5H45C50.525 52.5 55 48.05 55 42.575V17.425C55 11.95 50.525 7.5 45 7.5ZM21.25 17.925C24.425 17.925 27.025 20.525 27.025 23.7C27.025 26.875 24.425 29.475 21.25 29.475C18.075 29.475 15.475 26.875 15.475 23.7C15.475 20.525 18.075 17.925 21.25 17.925ZM30.925 41.65C30.7 41.9 30.35 42.05 30 42.05H12.5C12.15 42.05 11.8 41.9 11.575 41.65C11.35 41.4 11.225 41.05 11.25 40.7C11.675 36.5 15.025 33.175 19.225 32.775C20.55 32.65 21.925 32.65 23.25 32.775C27.45 33.175 30.825 36.5 31.225 40.7C31.275 41.05 31.15 41.4 30.925 41.65ZM47.5 41.875H42.5C41.475 41.875 40.625 41.025 40.625 40C40.625 38.975 41.475 38.125 42.5 38.125H47.5C48.525 38.125 49.375 38.975 49.375 40C49.375 41.025 48.525 41.875 47.5 41.875ZM47.5 31.875H37.5C36.475 31.875 35.625 31.025 35.625 30C35.625 28.975 36.475 28.125 37.5 28.125H47.5C48.525 28.125 49.375 28.975 49.375 30C49.375 31.025 48.525 31.875 47.5 31.875ZM47.5 21.875H35C33.975 21.875 33.125 21.025 33.125 20C33.125 18.975 33.975 18.125 35 18.125H47.5C48.525 18.125 49.375 18.975 49.375 20C49.375 21.025 48.525 21.875 47.5 21.875Z"
                                        fill="#3B4FE4"
                                    />
                                </svg>
                            </div>
                            <h2>Click to Upload</h2>
                        </main>
                        <footer className="p-2 text-xs text-center bg-[#3B4FE426]">
                            <p>Additional Documents</p>
                        </footer>
                    </div>
                </div>
                <div className="space-y-1 text-sm">
                    <p>
                        Make sure the information provided above are correct.
                        Verification may take some days
                    </p>
                    <p>
                        Periodically, we may be required to collect some
                        additional information from you.
                    </p>
                </div>
            </form>
        </section>
    );
}
