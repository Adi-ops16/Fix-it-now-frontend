import { getBookingDetails } from '../../_actions/bookingActions'
import { getServiceDetails } from '../../../services/_actions/service'
import BookingDetails from '../../_components/BookingDetails'

export default async function BookingDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const result = await getBookingDetails(id)

    if (!result?.data) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-4xl font-bold text-muted-foreground">
                No booking found
            </div>
        )
    }

    const serviceResult = await getServiceDetails(result.data.service_id)

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <BookingDetails booking={result.data} service={serviceResult.data} />
        </div>
    )
}
