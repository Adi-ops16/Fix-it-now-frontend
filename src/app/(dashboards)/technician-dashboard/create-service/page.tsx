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
            <CreateServiceForm categories={categoryList} />
        </section>
    );
}