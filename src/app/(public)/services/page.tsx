import { getServices } from "./_actions/service";
import ServiceFilters from "./_components/ServiceFilter";
import ServicePagination from "./_components/ServicePagination";
import ServiceCard from "./_components/ServiceCard";
import { IService, IServiceQueryProps } from "./_types/serviceTypes";

export default async function ServicesPage({ searchParams }: IServiceQueryProps) {
  const params = await searchParams;

  const query = {
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 9),
    searchTerms: params.searchTerms,
    location: params.location,
    sortOrder: params.sortOrder ?? "desc",
  };

  const services = await getServices(query);

  return (
    <section className="container max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">
          Browse Services
        </h1>

        <p className="mt-3 text-muted-foreground">
          Find trusted professionals for every home service.
        </p>
      </div>

      {/* Filters */}
      <ServiceFilters />

      {/* Grid */}
      <div className="mt-4 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {services?.data.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <ServicePagination
          currentPage={(services?.meta!).page}
          totalPages={(services?.meta!).totalPages}
        />

      </div>
    </section>
  );
}