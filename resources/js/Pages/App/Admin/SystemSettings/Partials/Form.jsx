import InputError from "@/Components/App/InputError";
import InputLabel from "@/Components/App/InputLabel";
import PrimaryButton from "@/Components/App/PrimaryButton";
import TextInput from "@/Components/App/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const Form = ({ formData, endpoint }) => {
    const { data, setData, errors, post, processing } = useForm({
        key: "",
        value: "",
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
                    value={formData.key.replace("_", " ")}
                />

                <TextInput
                    id="value"
                    value={data.value}
                    onChange={(e) => setData("value", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    required
                />

                <InputError message={errors.value} className="mt-2" />
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
