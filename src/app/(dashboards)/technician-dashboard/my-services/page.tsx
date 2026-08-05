import React from 'react'
import ServiceCard from '@/app/(public)/services/_components/ServiceCard'
import { getTokenDetails } from '@/service/getToken'
import { getMyServices } from '../_actions/serviceAction'

export const dynamic = 'force-dynamic'

export default async function MyServicesPage() {
    const result = await getMyServices()
    const { tokenPayload } = await getTokenDetails()
    if (!result?.success || result.data.length === 0) {
        <div className='flex justify-center items-center text-2xl font-bold text-foreground'>
            No Services Found
        </div>
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
