'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cancelBooking, updateBookingStatus } from '../_actions/bookingActions';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CustomerCancelButton = ({ bookingId }: { bookingId: string }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [open, setOpen] = useState(false)

    const handleCancel = async (event: React.SubmitEvent) => {
        event.preventDefault()
        const reason = event.target.cancel_reason.value
        const payload = {
            booking_id: bookingId,
            status: "CANCELLED" as "CANCELLED",
            cancellationReason: reason as string
        }

        setIsProcessing(true)
        const res = await cancelBooking(payload)
        if (res?.success) {
            toast.success(res.message || "Booking Cancelled")
            setOpen(false)
        } else {
            toast.error(res?.message || "Failed to cancel booking")
            setOpen(false)
        }
        setIsProcessing(false)
    }

    const triggerButton = (
        <Button
            variant="destructive"
            disabled={isProcessing}
            className="w-full sm:w-auto cursor-pointer"
        >
            Cancel
        </Button>
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={triggerButton} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Cancel your booking </DialogTitle>
                    <DialogDescription>
                        Give a reason for the cancellation and proceed with the process.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(event) => handleCancel(event)} className="space-y-4 py-2">
                    <div className='space-y-2'>
                        <Label htmlFor="cancel-reason">Cancellation Reason</Label>
                        <Textarea
                            id="cancel_reason"
                            required
                            rows={3}
                            minLength={5}
                        />
                    </div>

                    <DialogFooter className="pt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <Button className={"cursor-pointer"} variant="secondary" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className={"cursor-pointer"}
                            variant={isProcessing ? "ghost" : "destructive"}
                            type="submit"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Cancelling...' : 'Cancel booking'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default CustomerCancelButton;