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
}

export interface IBookingWithService extends IBooking {
    serviceTitle?: string;
    categoryName?: string;
}