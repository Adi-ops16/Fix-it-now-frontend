import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
    return (
        <div className='flex justify-center items-center'>
            <div className="container max-w-5xl py-10 space-y-8">
                {/* Back button skeleton */}
                <Skeleton className="h-9 w-32" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader className="space-y-3">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Specs Grid Skeleton */}
                                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <Separator />

                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-36" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>

                                {/* CTA Skeleton */}
                                <Skeleton className="h-20 w-full rounded-xl" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Technician Skeleton */}
                    <div>
                        <Card>
                            <CardHeader className="text-center">
                                <Skeleton className="h-4 w-32 mx-auto" />
                            </CardHeader>
                            <CardContent className="space-y-5 flex flex-col items-center">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <Skeleton className="h-6 w-36" />
                                <Skeleton className="h-4 w-44" />
                                <Skeleton className="h-6 w-28" />

                                <Separator className="w-full" />

                                <div className="w-full space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}