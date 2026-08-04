import { getCategories } from "../../_actions/categoriesAction";
import CategoriesTable from "../../_components/CategoriesTable";

export default async function AllCategories() {
    const result = await getCategories()

    if (!result?.success || result.data?.length === 0) {
        return (
            <div className="px-10 py-8">
                <h1 className="text-3xl font-bold">
                    Categories
                </h1>
                <p className="text-muted-foreground">
                    Failed to fetch categories. Please try again later.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6 py-5 lg:py-12 px-4 lg:px-12">
            <div>
                <h1 className="text-3xl font-bold">
                    Categories
                </h1>

                <p className="text-muted-foreground">
                    Manage all service categories.
                </p>
            </div>

            <CategoriesTable
                categories={result.data!}
            />
        </div>
    );
}