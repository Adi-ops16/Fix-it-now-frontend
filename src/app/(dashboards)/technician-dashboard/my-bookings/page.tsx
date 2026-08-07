import { getMyBookings } from '@/app/(public)/(customer)/_actions/bookingActions'
import { IBooking } from '@/app/(public)/(customer)/_types'
import TechnicianBookingCard from '../_components/TechnicianBookingCard'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderPlus, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function MyBookingsPage() {
    const result = await getMyBookings()
    const bookings = result?.data ?? [] as IBooking[]

    if (!result?.success || result.data.length === 0) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-4">
                <Card className="w-full max-w-md border-border/60 text-center shadow-lg backdrop-blur-sm">
                    <CardHeader className="flex flex-col items-center gap-2 pb-2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Wrench className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            No Bookings Found
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                            You didn't have any bookings yet. Create more services fot better luck.
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-center pt-4">
                        <Button size="lg" className="font-medium shadow-sm ">
                            <Link className='flex items-center gap-2' href="/technician-dashboard/create-service">
                                <FolderPlus className="h-4 w-4" />
                                Create Service
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="px-10 py-8">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((b) => (
                    <TechnicianBookingCard key={b?.id} booking={b} />
                ))}
            </div>
        </div>
    )
}
