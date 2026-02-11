import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const Form = ({ formData, endpoint }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            ...formData,
        });

    const onSubmit = (e) => {
        e.preventDefault();
        post(endpoint);
    };
    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6 flex-1">
            <div>
                <InputLabel
                    htmlFor="value"
                    className="capitalize"
                    value="Name"
                />

                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="value"
                    className="capitalize"
                    value="Email"
                />

                <TextInput
                    id="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    required
                />

                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    disabled={processing}
                    className="w-full !bg-[#3B4FE4] !rounded"
                >
                    {formData ? "Update" : "Add"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default Form;
