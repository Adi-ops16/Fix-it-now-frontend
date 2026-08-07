// _components/ServicesSkeleton.tsx
export default function ServicesSkeleton() {
    return (
        <div className="mt-4 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="h-72 w-full animate-pulse rounded-xl bg-muted"
                />
            ))}
        </div>
    );
}