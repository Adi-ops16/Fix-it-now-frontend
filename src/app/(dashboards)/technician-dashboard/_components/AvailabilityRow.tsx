"use client";

import { Control, Controller, UseFormSetValue, useWatch } from "react-hook-form";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AvailabilityForm } from "./AvailabilityTable";

interface Props {
    index: number;
    control: Control<AvailabilityForm>;
    setValue: UseFormSetValue<AvailabilityForm>;
}

const DEFAULT_START = "09:00";
const DEFAULT_END = "17:00";

export default function AvailabilityRow({
    index,
    control,
    setValue,
}: Props) {

    const day = useWatch({
        control,
        name: `availability.${index}`,
    });

    const isWorking = day.start_time !== null && day.end_time !== null;

    const toggleWorking = (checked: boolean) => {
        if (checked) {
            setValue(`availability.${index}.start_time`,
                day.start_time ?? DEFAULT_START,
                {
                    shouldDirty: true,
                }
            );

            setValue(
                `availability.${index}.end_time`,
                day.end_time ?? DEFAULT_END,
                {
                    shouldDirty: true,
                }
            );

            return;
        }

        setValue(
            `availability.${index}.start_time`,
            null as unknown as string,
            { shouldDirty: true }
        );

        setValue(
            `availability.${index}.end_time`,
            null as unknown as string,
            { shouldDirty: true }
        );
    };

    return (
        <TableRow>

            <TableCell className="font-medium">
                {day.weekday.charAt(0)}
                {day.weekday.slice(1).toLowerCase()}
            </TableCell>

            <TableCell>
                <Switch
                    checked={isWorking}
                    onCheckedChange={toggleWorking}
                />
            </TableCell>

            <TableCell className="w-56">
                <Controller
                    control={control}
                    name={`availability.${index}.start_time`}
                    render={({ field }) => (
                        <Input
                            type="time"
                            disabled={!isWorking}
                            value={field.value ?? ""}
                            onChange={(e) =>
                                field.onChange(e.target.value)
                            }
                        />
                    )}
                />
            </TableCell>

            <TableCell className="w-56">
                <Controller
                    control={control}
                    name={`availability.${index}.end_time`}
                    render={({ field }) => (
                        <Input
                            type="time"
                            disabled={!isWorking}
                            value={field.value ?? ""}
                            onChange={(e) =>
                                field.onChange(e.target.value)
                            }
                        />
                    )}
                />
            </TableCell>

        </TableRow>
    );
}