"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BookingDetailsButton from "./BookingDetailsButton";
import BookingStatusBadge from "./BookingStatusBadge";
import { formatDate, formatDateTime } from "@/service/booking";
import PaymentButton from "./PaymentButton";
import ReviewButton from "./ReviewButton";
import CustomerCancelButton from "./CustomerCancelButton";
import { IBooking } from "../_types";

export default function BookingCard({ booking }: { booking: IBooking }) {
    const { id, work_date, work_startTime, work_endTime, estimated_time, total_amount, booking_status, service } = booking;

    const { timeShape: startTime } = formatDateTime(work_startTime)
    const { timeShape: endTime } = formatDateTime(work_endTime)

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="group h-full"
        >
            <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/20 via-background to-secondary/30 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <div className="px-5 pt-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background/80 shadow-sm">
                            <Wrench className="size-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-1">
                            <BookingStatusBadge status={booking_status} />
                            {/* cancel button */}
                            {!["IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(booking_status) && <CustomerCancelButton bookingId={id} />}
                        </div>
                    </div>
                </div>

                <CardContent className="flex flex-1 flex-col px-5 pt-4">
                    <div>
                        {service?.category.name && (
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                {service?.category.name}
                            </p>
                        )}
                        <h2 className="line-clamp-1 text-lg font-semibold text-foreground">
                            {service?.title ?? `Service #${service?.title}`}
                        </h2>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <CalendarDays className="size-3.5" />
                            <span>{formatDate(work_date)}</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <Clock3 className="size-3.5" />
                            <span>
                                {startTime} – {endTime}
                            </span>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="mb-3 flex items-end justify-between">
                        <p className="text-md font-semibold uppercase tracking-wide text-muted-foreground">
                            Total:{" "}
                            <span className="text-lg font-bold text-primary">${total_amount}</span>
                        </p>
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <Clock3 className="size-3.5" />
                            <span className="text-xs">Est: {estimated_time} mins</span>
                        </div>
                    </div>

                    <div className="mt-auto flex w-full items-center gap-2 pt-2">
                        <BookingDetailsButton classname="flex-1 w-full" id={id} />
                        {booking_status === 'ACCEPTED' && (
                            <PaymentButton id={booking.id} />
                        )}
                        {booking_status === 'COMPLETED' && (
                            <ReviewButton booking_id={id} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
