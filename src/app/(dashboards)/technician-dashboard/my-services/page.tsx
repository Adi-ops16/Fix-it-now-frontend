import React from 'react'
import ServiceCard from '@/app/(public)/services/_components/ServiceCard'
import { getTokenDetails } from '@/service/getToken'
import { getMyServices } from '../_actions/serviceAction'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FolderPlus, Wrench } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MyServicesPage() {
    const result = await getMyServices()
    const { tokenPayload } = await getTokenDetails()

    if (!result?.success || result.data.length === 0) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-4">
                <Card className="w-full max-w-md border-border/60 text-center shadow-lg backdrop-blur-sm">
                    <CardHeader className="flex flex-col items-center gap-2 pb-2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Wrench className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            No Services Found
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                            You haven't listed any services yet. Start offering your expertise today.
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-center pt-4">
                        <Button size="lg" className="font-medium shadow-sm ">
                            <Link className='flex items-center gap-2' href="/technician-dashboard/create-service">
                                <FolderPlus className="h-4 w-4" />
                                Create Your First Service
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 p-5'>
            {
                result?.data.map(service => <ServiceCard
                    key={service.id}
                    service={service}
                    userId={tokenPayload?.tokenData?.user_id}
                />)
            }
        </div>
    )
}
