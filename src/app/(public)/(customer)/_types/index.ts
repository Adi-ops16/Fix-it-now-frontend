import { ITechnician, IUser } from "@/lib/types";

export type BookingStatus = "REQUESTED" | "ACCEPTED" | "PAID" | "COMPLETED" | "IN_PROGRESS" | "CANCELLED";

export interface IBooking {
    id: string;
    customer_id: string;
    technician_id: string;
    service_id: number;
    work_date: string;
    work_startTime: string;
    work_endTime: string;
    estimated_time: number;
    total_amount: number;
    booking_status: BookingStatus;
    cancellation_reason: string | null;
    created_at: Date;
    updated_at: Date;
    service: {
        title: string;
        category: {
            name: string
        }
    };
}

export interface IBookingCancelPayload {
    status: "CANCELLED";
    booking_id: string;
    cancellationReason: string;
}

export interface ICreateReviewPayload {
    rating: number;
    comment: string;
    booking_id: string
}

export interface IReview {
    id: number;
    booking_id: string;
    technician_id: string;
    customer_id: string;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    customer: Omit<IUser, "technician_profile">;
    technician: ITechnician
}

export interface IPayment {
    id: string;
    booking_id: string,
    amount: number,
    currency: string,
    payment_status: string,
    customer_id: string,
    technician_id: string,
    stripe_session_id: string,
    stripe_intent_id: string,
    created_at: Date,
    updated_at: Date
}