import { getAllUsers, toggleCustomerStatusAction } from "../../_actions/manageUserActions";
import ManageUsersTable from "../../_components/ManageUsersTable";


export default async function ManageUsersPage() {
    const users = await getAllUsers();

    if (!users?.data || !users.success) {
        return (
            <div className="px-10 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>
                <p className="text-muted-foreground">
                    Failed to fetch users. Please try again later.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-6 py-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>

                <p className="text-muted-foreground">
                    View, filter and manage registered users.
                </p>
            </div>

            <ManageUsersTable
                users={users.data}
                toggleAction={toggleCustomerStatusAction}
            />
        </div>
    );
}