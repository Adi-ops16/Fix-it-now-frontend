"use client";

import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    onCreate?: () => void;
}

export default function EmptyAvailability({ onCreate }: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
                <CalendarClock className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-xl font-semibold">
                No Availability Schedule
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You haven't configured your weekly availability yet.
                Customers won't be able to book your services until you
                create a schedule.
            </p>

            <Button
                className="mt-8 cursor-pointer"
                onClick={onCreate}
            >
                Create Schedule
            </Button>
        </div>
    );
}