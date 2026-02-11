import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Partials/Form";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";

export default function EditSystemSettings({ auth, user }) {
    const { ...userData } = user.data;
    const formData = {
        name: userData.name,
        email: userData.email,
        _method: "PUT",
    };
    const endpoint = route("admin.users.update", userData.id);

    return (
        <AuthenticatedLayout user={auth.user} title="Transaction Details">
            <div className="mb-8 space-y-2">
                <header className="w-full">
                    <h1 className="text-xl font-bold text-black">
                        Edit User Details({userData.name})
                    </h1>
                </header>
                <main className="space-y-5">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg min-h-56 ">
                        <div className="p-6  sm:p-8  max-w-xl">
                            <Form formData={formData} endpoint={endpoint} />
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm
                            user={userData}
                            className="max-w-xl"
                        />
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
