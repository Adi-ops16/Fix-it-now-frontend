import { getMyBookings } from '@/app/(public)/(customer)/_actions/bookingActions'
import { IBooking } from '@/app/(public)/(customer)/_types'
import TechnicianBookingCard from '../_components/TechnicianBookingCard'

export default async function MyBookingsPage() {
    const res = await getMyBookings()
    const bookings = res?.data ?? [] as IBooking[]

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
