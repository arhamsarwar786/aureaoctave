import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Avatar } from "@radix-ui/themes";
import { UserRoundIcon, CameraIcon } from "lucide-react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            address: user.address || "",
            state: user.state || "",
            country: user.country || "",
            city: user.city || "",
            zip_code: user.zip_code || "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={` ${className}`}>
            <div className="max-w-4xl mx-auto bg-[#111827] rounded-2xl shadow-xl p-8 space-y-8">
                {/* Header */}
                <header className="flex items-center gap-3 text-white mb-6">
                    <UserRoundIcon className="w-6 h-6 text-[#3AF5C4]" />
                    <h2 className="text-2xl font-semibold">Account Details</h2>
                </header>

                <form onSubmit={submit} className="space-y-8 text-white">
                    <div className="grid sm:grid-cols-2 gap-8 divide-x-2 divide-gray-700">
                        {/* General Information */}
                        <div className="space-y-6 pr-5">
                            <h3 className="text-xl font-semibold text-[#3AF5C4]">
                                General Information
                            </h3>

                            {/* Avatar */}
                            <div className="relative w-24 h-24">
                                <Avatar
                                    size="24"
                                    src={user.avatar || ""}
                                    fallback={user.name?.[0] || "A"}
                                    radius="full"
                                    className="border-2 border-[#3AF5C4]"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 bg-[#3AF5C4] p-1 rounded-full shadow hover:bg-[#2dd9b0] transition"
                                >
                                    <CameraIcon className="w-4 h-4 text-black" />
                                </button>
                            </div>

                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full bg-[#1F2937] border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AF5C4] focus:border-transparent"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />
                                <InputError
                                    className="mt-2 text-red-400"
                                    message={errors.name}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full bg-[#1F2937] border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AF5C4] focus:border-transparent"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    autoComplete="username"
                                />
                                <InputError
                                    className="mt-2 text-red-400"
                                    message={errors.email}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <InputLabel
                                    htmlFor="phone_number"
                                    value="Phone Number"
                                />
                                <TextInput
                                    id="phone_number"
                                    type="tel"
                                    className="mt-1 block w-full bg-[#1F2937] border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AF5C4] focus:border-transparent"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    className="mt-2 text-red-400"
                                    message={errors.phone_number}
                                />
                            </div>

                            {/* Email verification notice */}
                            {mustVerifyEmail && !user.email_verified_at && (
                                <div className="bg-yellow-500 text-black p-3 rounded-lg text-sm">
                                    Your email is unverified.{" "}
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="underline font-semibold"
                                    >
                                        Resend verification email
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Address Information */}
                        <div className="space-y-6 pl-5">
                            <h3 className="text-xl font-semibold text-[#3AF5C4]">
                                Address Information
                            </h3>

                            {[
                                { id: "address", label: "Address" },
                                { id: "state", label: "State / Province" },
                                { id: "country", label: "Country" },
                                { id: "city", label: "City" },
                                { id: "zip_code", label: "Zip Code" },
                            ].map((field) => (
                                <div key={field.id}>
                                    <InputLabel
                                        htmlFor={field.id}
                                        value={field.label}
                                    />
                                    <TextInput
                                        id={field.id}
                                        type="text"
                                        className="mt-1 block w-full bg-[#1F2937] border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3AF5C4] focus:border-transparent"
                                        value={data[field.id]}
                                        onChange={(e) =>
                                            setData(field.id, e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2 text-red-400"
                                        message={errors[field.id]}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                        <PrimaryButton
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-[#3AF5C4] to-[#1D9D8E] hover:from-[#32eab0] hover:to-[#1b9c88] text-black font-bold rounded-xl py-3 transition"
                        >
                            Update
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in-out duration-300"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-400 text-center">
                                Profile updated successfully!
                            </p>
                        </Transition>

                        <Link
                            href={route("settings")}
                            className="inline-block w-full text-center py-3 rounded-xl border-2 border-[#3AF5C4] text-[#3AF5C4] font-semibold uppercase hover:bg-[#1F2937] transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}