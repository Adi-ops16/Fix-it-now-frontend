import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getMyBookings } from '../_actions/bookingActions'
import { getServiceDetails } from '../../services/_actions/service'
import BookingCard from '../_components/BookingCard'
import { IBookingWithService } from '../_types'

async function enrichBookingsWithService(bookings: IBookingWithService[]) {
    const serviceIds = [...new Set(bookings.map((booking) => booking.service_id))]

    const serviceResults = await Promise.all(
        serviceIds.map(async (serviceId) => {
            const result = await getServiceDetails(serviceId)
            return { serviceId, service: result.data }
        })
    )

    const serviceMap = new Map(
        serviceResults.map(({ serviceId, service }) => [serviceId, service])
    )

    return bookings.map((booking) => {
        const service = serviceMap.get(booking.service_id)
        return {
            ...booking,
            serviceTitle: service?.title,
            categoryName: service?.category?.name,
        }
    })
}

export default async function BookingsPage() {
    const result = await getMyBookings()
    const bookings = result?.data ?? []

    const enrichedBookings = bookings.length
        ? await enrichBookingsWithService(bookings)
        : []

    return (
        <section className="container max-w-7xl mx-auto px-4 py-10">
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold">My Bookings</h1>
                <p className="mt-3 text-muted-foreground">
                    Track and manage all your scheduled home service appointments.
                </p>
            </div>

            {enrichedBookings.length > 0 ? (
                <div className="mt-4 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {enrichedBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <CalendarDays className="size-7 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">No bookings yet</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        You haven&apos;t booked any services. Browse available professionals and schedule your first appointment.
                    </p>
                    <Link href="/services" className="mt-6 cursor-pointer">
                        <Button size="lg">Browse Services</Button>
                    </Link>
                </div>
            )}
        </section>
    )
}
