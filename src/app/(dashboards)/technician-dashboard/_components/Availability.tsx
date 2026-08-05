"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import AvailabilityTable from './AvailabilityTable';
import EmptyAvailability from './EmptyAvailability';
import { IAvailability, IAvailabilityPayload } from '../_types';

const defaultAvailability: IAvailabilityPayload[] = [
    {
        weekday: "MONDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "TUESDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "WEDNESDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "THURSDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "FRIDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "SATURDAY",
        start_time: null,
        end_time: null,
    },
    {
        weekday: "SUNDAY",
        start_time: null,
        end_time: null,
    },
];

const Availability = ({ data }: { data: IAvailability[] }) => {
    const hasSchedule = data && data.length > 0
    const schedule = hasSchedule ? data : defaultAvailability;
    const [creating, setCreating] = useState(false)

    return <Card className='mx-5 lg:mx-10 my-4 lg:my-8'>
        <CardHeader>
            <CardTitle>Weekly Work Schedule</CardTitle>
            <CardDescription>
                Configure your working hours for each day.
            </CardDescription>
        </CardHeader>

        <CardContent>
            {hasSchedule || creating ? (
                <AvailabilityTable data={schedule} hasSchedule={hasSchedule} />
            ) : (
                <EmptyAvailability onCreate={() => setCreating(true)} />
            )}
        </CardContent>
    </Card>;
};

export default Availability;