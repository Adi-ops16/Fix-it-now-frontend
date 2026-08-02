import { getServiceDetails } from '../_actions/service'
import ServiceDetails from '../_components/ServiceDetails'

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const result = await getServiceDetails(Number(id))

    if (!result.data) {
        return (
            <div className='flex justify-center items-center text-primary-foreground text-4xl font-bold '>
                No details found
            </div>
        )
    }
    return <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
        <ServiceDetails service={result.data} />
    </div>
}
