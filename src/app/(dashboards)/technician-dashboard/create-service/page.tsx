import { getCategories } from "../../_actions/categoriesAction";
import CreateServiceForm from "../_components/CreateServiceForm";

export default async function CreateServicePage() {
    const categories = await getCategories()
    const categoryList = categories?.data ?? []

    if (!categoryList.length) {
        return <div>No categories found</div>
    }
    return (
        <section className="container py-10">
            <h1 className="mb-8 text-3xl font-bold">Create Service</h1>

            <CreateServiceForm categories={categoryList} />
        </section>
    );
}