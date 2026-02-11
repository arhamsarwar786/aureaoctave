import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Avatar } from "@radix-ui/themes";
import { UserRoundIcon } from "lucide-react";

export default function UpdateProfileInformation({
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
                    <UserRoundIcon /> Account Details
                </h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid sm:grid-cols-2 divide-x-2">
                    <div className="space-y-4 pr-5 py-5">
                        <h2 className="text-lg">General Information</h2>
                        <div className="relative mt-5">
                            <Avatar
                                size="5"
                                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                                fallback="A"
                                radius="full"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 font-medium text-sm text-green-600">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div>
                            <InputLabel
                                htmlFor="phone_number"
                                value="Phone Number"
                            />
                            <TextInput
                                id="phone_number"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone_number}
                            />
                        </div>
                    </div>
                    <div className="space-y-4 pl-5 py-5">
                        <h2 className="text-lg">Address Information</h2>
                        <div>
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="state"
                                value="State / Province"
                            />
                            <TextInput
                                id="state"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.state}
                                onChange={(e) =>
                                    setData("state", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.state}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="country" value="Country" />
                            <TextInput
                                id="country"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.country}
                                onChange={(e) =>
                                    setData("country", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.country}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.city}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="zip_code" value="Zip Code" />
                            <TextInput
                                id="zip_code"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.zip_code}
                                onChange={(e) =>
                                    setData("zip_code", e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.zip_code}
                            />
                        </div>
                    </div>
                </div>
                <div className="">
                    <PrimaryButton
                        disabled={processing}
                        className="w-full !bg-[#3B4FE4] !rounded"
                    >
                        Update
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Updated.</p>
                    </Transition>
                </div>
                <div className="">
                    <Link
                        href={route("settings")}
                        className="inline-block w-full items-center px-5 py-4 bg-white rounded font-semibold text-xs text-[#3B4FE4] uppercase text-center tracking-widest transition ease-in-out duration-150 border-2 border-[#3B4FE4]"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}
