"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IAvailability, IAvailabilityPayload } from "../_types";
import BulkAvailabilityActions from "./BulkAvailabilityAction";
import AvailabilityRow from "./AvailabilityRow";
import { createOrUpdateAvailability } from "../_actions/availabilityAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type AvailabilityForm = {
    bulkStart: string;
    bulkEnd: string;
    skipOffDays: boolean;
    availability: IAvailability[] | IAvailabilityPayload[];
};

interface Props {
    data: IAvailability[] | IAvailabilityPayload[];
    hasSchedule: boolean
}

export default function AvailabilityTable({ data, hasSchedule }: Props) {
    const router = useRouter()
    const defaultValues: AvailabilityForm = {
        availability: data,
        bulkStart: "",
        bulkEnd: "",
        skipOffDays: false
    }

    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { isSubmitting }
    } = useForm<AvailabilityForm>({
        defaultValues
    });

    const [bulkStart, setBulkStart] = useState("9:00");
    const [bulkEnd, setBulkEnd] = useState("17:00");
    const [skipOffDays, setSkipOffDays] = useState(true);

    const availability = watch("availability")

    const applyToAllDays = () => {
        availability.forEach((day, index) => {
            const isWorking = day.start_time !== null;

            if (skipOffDays && !isWorking) return;

            setValue(`availability.${index}.start_time`, bulkStart);

            setValue(`availability.${index}.end_time`, bulkEnd);
        });
    };

    const onSubmit = async (values: AvailabilityForm) => {
        let payload: IAvailabilityPayload[]
        if (hasSchedule) {
            const enrichedValues = values.availability.map(value => {
                const { end_time, start_time, weekday } = value
                return {
                    weekday,
                    end_time,
                    start_time
                }
            })
            payload = enrichedValues
        }
        payload = values.availability
        const result = await createOrUpdateAvailability(payload)
        if (result?.success && result.data.count === 7) {
            toast.success(result.message)
            router.refresh()
        } else {
            toast.error(result?.message || (hasSchedule ? "Couldn't update work schedule" : "Couldn't create work schedule"))
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <BulkAvailabilityActions
                bulkStart={bulkStart}
                bulkEnd={bulkEnd}
                skipOffDays={skipOffDays}
                setBulkStart={setBulkStart}
                setBulkEnd={setBulkEnd}
                setSkipOffDays={setSkipOffDays}
                applyToAllDays={applyToAllDays}
                reset={() => reset(defaultValues)}
            />

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-48">
                                Day
                            </TableHead>

                            <TableHead>
                                Working
                            </TableHead>

                            <TableHead>
                                Start Time
                            </TableHead>

                            <TableHead>
                                End Time
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {availability.map((_, index) => (
                            <AvailabilityRow
                                key={watch(`availability.${index}.weekday`)}
                                index={index}
                                control={control}
                                setValue={setValue}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end">
                <Button
                    className={"cursor-pointer"}
                    variant={isSubmitting ? "ghost" : "default"}
                    disabled={isSubmitting}
                    type="submit">
                    {isSubmitting ? "Saving.." : "Save Changes"}
                </Button>
            </div>

        </form>
    );
}