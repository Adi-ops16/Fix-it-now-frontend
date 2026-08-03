"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays, Clock3, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import BookingStatusBadge from "@/app/(public)/(customer)/_components/BookingStatusBadge"
import { IBooking } from "@/app/(public)/(customer)/_types"
import { updateBookingStatus } from "@/app/(public)/(customer)/_actions/bookingActions"
import { formatDate, formatDateTime } from "@/service/booking"
import { toast } from "sonner"

export default function TechnicianBookingCard({ booking }: { booking: IBooking }) {
    const [isProcessing, setIsProcessing] = useState(false)

    const { timeShape: startTime } = formatDateTime(booking.work_startTime)
    const { timeShape: endTime } = formatDateTime(booking.work_endTime)

    const handleUpdate = async (status: string) => {
        try {
            setIsProcessing(true)
            const res = await updateBookingStatus(booking.id, status)
            if (res?.success) {
                toast.success(res.message || "Booking updated")
            } else {
                toast.error(res?.message || "Failed to update booking")
            }
        } catch (err: any) {
            toast.error(err?.message || "Failed to update booking")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="group h-full">
            <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <div className="px-5 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-background/80">
                            <Wrench className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Booking</p>
                            <p className="text-sm font-semibold">#{booking.service_id}</p>
                        </div>
                    </div>
                    <BookingStatusBadge status={booking.booking_status} />
                </div>

                <CardContent className="flex flex-1 flex-col px-5 pt-4">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <CalendarDays className="size-3.5" />
                            <span>{formatDate(booking.work_date)}</span>
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
                            Total: <span className="text-lg font-bold text-primary">${booking.total_amount}</span>
                        </p>
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <Clock3 className="size-3.5" />
                            <span className="text-xs">Est: {booking.estimated_time} mins</span>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row items-center gap-2 pt-2">
                        <Button
                            className="w-full sm:w-auto cursor-pointer"
                            disabled={isProcessing || booking.booking_status === 'ACCEPTED'}
                            onClick={() => handleUpdate("ACCEPTED")}
                        >
                            Accept
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto cursor-pointer"
                            disabled={isProcessing || booking.booking_status !== 'IN_PROGRESS'}
                            onClick={() => handleUpdate('IN_PROGRESS')}
                        >
                            Start
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto cursor-pointer"
                            disabled={isProcessing}
                            onClick={() => handleUpdate('CANCELLED')}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full sm:w-auto cursor-pointer"
                            disabled={isProcessing || booking.booking_status !== 'COMPLETED'}
                            onClick={() => handleUpdate('COMPLETED')}
                        >
                            Complete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
