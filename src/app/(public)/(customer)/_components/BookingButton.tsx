'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookCheck } from 'lucide-react'
import { createBooking } from '../_actions/bookingActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const BookingButton = ({ id }: { id: number }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [workDate, setWorkDate] = useState(() => new Date().toISOString().split('T')[0])
    const [workTime, setWorkTime] = useState(() => new Date().toTimeString().slice(0, 5))
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleBooking = async (service_id: number, event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const payload = {
            service_id,
            work_date: workDate,
            work_startTime: workTime,
        }

        const result = await createBooking(payload)
        if (!result?.success) {
            setIsSubmitting(false)
            toast.error(result?.message)
        } else {
            setIsSubmitting(false)
            setOpen(false)
            toast.success(result.message)
            router.push("/bookings")
        }
    }

    const triggerButton = (
        <Button size="lg" className="w-full sm:w-auto gap-2 cursor-pointer">
            <BookCheck className="h-5 w-5" />
            Book Service Now
        </Button>
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={triggerButton} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Choose your booking time</DialogTitle>
                    <DialogDescription>
                        Select the date and time you want the technician to arrive.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(event) => handleBooking(id, event)} className="space-y-4 py-2">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="work_date">Booking date</Label>
                            <Input
                                id="work_date"
                                type="date"
                                value={workDate}
                                onChange={(event) => setWorkDate(event.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="work_time">Booking time</Label>
                            <Input
                                id="work_time"
                                type="time"
                                value={workTime}
                                onChange={(event) => setWorkTime(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <Button className={"cursor-pointer"} variant="secondary" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button className={"cursor-pointer"} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Confirm booking'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BookingButton;
