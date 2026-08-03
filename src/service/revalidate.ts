'use server';

import { revalidateTag } from "next/cache";

export async function clearBookingsCache() {
    // This executes outside the rendering timeline
    revalidateTag("my-bookings", { expire: 0 });
    return { success: true };
}
