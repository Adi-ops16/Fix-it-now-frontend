import { Star } from "lucide-react";

import { getReviewByBookingId } from "../_actions/reviewActions";

const BookingReview = async ({ bookingId }: { bookingId: string }) => {
    const result = await getReviewByBookingId(bookingId);

    if (!result?.data) {
        return (
            <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
                <h3 className="text-lg font-semibold">No Review Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    The customer hasn't left a review for this booking.
                </p>
            </div>
        );
    }

    const { rating, comment } = result.data;

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Customer Review
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Feedback for this completed booking
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1">
                    <Star
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-lg font-bold">
                        {rating}
                    </span>

                    <span className="text-sm text-muted-foreground">
                        /5
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-lg bg-muted/40 p-4">
                <p className="leading-7 text-muted-foreground">
                    {comment || "No written feedback provided."}
                </p>
            </div>
        </div>
    );
};

export default BookingReview;