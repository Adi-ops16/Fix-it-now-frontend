"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createReview } from '../_actions/reviewActions';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const ReviewButton = ({ booking_id }: { booking_id: string }) => {
    const [isPending, setIsPending] = useState(false)
    const [open, setOpen] = useState(false)

    const handleReview = async (booking_id: string, event: React.SubmitEvent) => {
        event.preventDefault()
        setIsPending(true)
        const payload = {
            rating: 5,
            message: "The work is nicely done.",
            booking_id
        }
        const result = await createReview(payload)

        if (result.success) {
            toast.success(result.message || "Result created successfully")
            setIsPending(false)
        } else {
            toast.error(result.message || "Error creating review")
            setIsPending(false)
        }
    }

    const triggerButton = <Button
        disabled={isPending}
        variant="secondary"
        className="cursor-pointer flex-1"
    >
        <Star />
        {isPending ? "posting.." : "Review"}
    </Button>

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={triggerButton} />
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Review</DialogTitle>
                    <DialogDescription>
                        Give a review to the technician for his work
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(event) => handleReview(booking_id, event)} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="work_date">Rating</Label>
                        <Input
                            id="rating"
                            type="number"
                            max={5}
                            min={1}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="work_time">Booking time</Label>
                        <Textarea
                            id='comment'
                            required
                            minLength={20}
                            rows={3}
                        />
                    </div>

                    <DialogFooter className="pt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <Button className={"cursor-pointer"} variant="secondary" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button className={"cursor-pointer"} type="submit" disabled={isPending}>
                            {isPending ? 'Booking...' : 'Confirm booking'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewButton;