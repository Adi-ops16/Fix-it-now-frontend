import { Suspense } from "react";
import ServiceFilters from "./_components/ServiceFilter";
import { IServiceQueryProps } from "./_types/serviceTypes";
import ServicesSkeleton from "./_components/ServiceSkeleton";
import ServicesGrid from "./_components/ServiceGrid";

export default async function ServicesPage({ searchParams }: IServiceQueryProps) {
  const params = await searchParams;

  const query = {
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 9),
    searchTerms: params.searchTerms,
    location: params.location,
    sortOrder: params.sortOrder ?? "desc"
  };

  const suspenseKey = JSON.stringify(query);

  return (
    <section className="container max-w-7xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Browse Services</h1>
        <p className="mt-3 text-muted-foreground">
          Find trusted professionals for every home service.
        </p>
      </div>

      <ServiceFilters />

      <Suspense key={suspenseKey} fallback={<ServicesSkeleton />}>
        <ServicesGrid query={query} />
      </Suspense>
    </section>
  );
}