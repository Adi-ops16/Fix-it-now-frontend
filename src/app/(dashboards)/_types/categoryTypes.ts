export interface ICategory {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export interface ICategoryRes {
    success: boolean;
    message: string;
    data?: ICategory[];
    error?: any
}

export interface IOverview {
    success: boolean,
    message: string,
    data: {
        totalUsers: number,
        workingTechnicians: number,
        totalTechnicians: number,
        nonWorkingTechnicians: number,
        workRate: number,
        totalBookings: number,
        pendingBookings: number,
        cancelledBooking: number,
        cancellationRate: number,
        totalRevenue: number,
        averageRating: number
    }
}