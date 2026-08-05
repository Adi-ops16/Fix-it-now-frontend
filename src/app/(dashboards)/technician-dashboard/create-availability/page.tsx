import React from 'react'
import { getAvailability } from '../_actions/availabilityAction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Availability from '../_components/Availability';

export default async function AvailabilityPage() {
    const result = await getAvailability()

    return <Availability data={result?.data ?? []} />
}
