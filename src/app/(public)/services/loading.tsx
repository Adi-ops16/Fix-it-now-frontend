import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="container mx-auto px-4 py-10">

            <div className="mb-10 space-y-3 text-center">
                <Skeleton className="mx-auto h-10 w-72" />
                <Skeleton className="mx-auto h-5 w-96 max-w-full" />
            </div>

            <div className="mb-10 rounded-2xl border p-5">
                <div className="grid gap-4 md:grid-cols-3">
                    <Skeleton className="h-11" />
                    <Skeleton className="h-11" />
                    <Skeleton className="h-11" />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-2xl border"
                    >
                        <Skeleton className="h-40 w-full" />

                        <div className="space-y-4 p-5">
                            <Skeleton className="h-6 w-3/4" />

                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />

                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-28" />

                            <div className="flex items-center justify-between pt-4">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}