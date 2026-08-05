"use client";

import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props {
    bulkStart: string;
    bulkEnd: string;
    skipOffDays: boolean;
    setBulkStart: Dispatch<SetStateAction<string>>;
    setBulkEnd: Dispatch<SetStateAction<string>>;
    setSkipOffDays: Dispatch<SetStateAction<boolean>>;
    applyToAllDays: () => void;
    reset: () => void;
}

export default function BulkAvailabilityActions({
    bulkStart,
    bulkEnd,
    skipOffDays,
    setBulkStart,
    setBulkEnd,
    setSkipOffDays,
    applyToAllDays,
    reset,
}: Props) {
    return (
        <div className="rounded-lg border bg-muted/30 p-5">
            <div className="mb-5">
                <h3 className="text-lg font-semibold">
                    Apply Working Hours
                </h3>

                <p className="text-sm text-muted-foreground">
                    Quickly apply the same working hours to multiple days.
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">

                <div className="space-y-2">
                    <Label htmlFor="bulk-start">
                        Start Time
                    </Label>

                    <Input
                        id="bulk-start"
                        type="time"
                        value={bulkStart}
                        onChange={(e) => setBulkStart(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bulk-end">
                        End Time
                    </Label>

                    <Input
                        id="bulk-end"
                        type="time"
                        value={bulkEnd}
                        onChange={(e) => setBulkEnd(e.target.value)}
                    />
                </div>

                <div className="flex items-end">
                    <div className="flex items-center gap-3 rounded-md border px-4 py-2">
                        <Switch
                            checked={skipOffDays}
                            onCheckedChange={setSkipOffDays}
                        />

                        <Label className="cursor-pointer">
                            Skip Off Days
                        </Label>
                    </div>
                </div>

                <div className="flex items-end justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={reset}
                    >
                        Reset
                    </Button>

                    <Button
                        type="button"
                        onClick={applyToAllDays}
                        disabled={!bulkStart || !bulkEnd}
                    >
                        Apply to All Days
                    </Button>
                </div>
            </div>
        </div>
    );
}