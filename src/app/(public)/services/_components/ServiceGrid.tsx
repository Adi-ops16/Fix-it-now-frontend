import { getServices } from "../_actions/service";
import ServiceCard from "./ServiceCard";
import ServicePagination from "./ServicePagination";
import { IService, IServiceQueryParams } from "../_types/serviceTypes";

export default async function ServicesGrid({ query }: { query: IServiceQueryParams }) {
    const services = await getServices(query);

    if (!services?.data?.length) {
        return (
            <div className="mt-12 text-center text-muted-foreground">
                No services found matching your criteria.
            </div>
        );
    }

    return (
        <>
            <div className="mt-4 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {services.data.map((service: IService) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            <div className="mt-12">
                <ServicePagination
                    currentPage={services.meta.page}
                    totalPages={services.meta.totalPages}
                />
            </div>
        </>
    );
}