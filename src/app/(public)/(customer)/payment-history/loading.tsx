import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <section className="container max-w-7xl mx-auto px-4 py-10">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-2 text-center sm:text-left">
                <Skeleton className="h-9 w-56 mx-auto sm:mx-0" />
                <Skeleton className="h-5 w-80 mx-auto sm:mx-0" />
            </div>

            {/* Card Grid Skeleton */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-9 w-9 rounded-xl" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="flex justify-between items-baseline">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                        <Skeleton className="h-9 w-full rounded-md" />
                    </div>
                ))}
            </div>
        </section>
    );
}