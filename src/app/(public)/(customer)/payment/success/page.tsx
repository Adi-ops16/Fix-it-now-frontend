'use client';

import { useEffect, use } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clearBookingsCache } from "@/service/revalidate";

interface PageProps {
    searchParams: Promise<{ session_id?: string }>;
}

export default function PaymentSuccessPage({ searchParams }: PageProps) {
    // Unwrapping searchParams securely using React's use() hook for Client Components
    const { session_id } = use(searchParams);

    useEffect(() => {
        async function handleRevalidation() {
            if (session_id) {
                try {
                    // Triggers the Server Action safely outside the render cycle
                    await clearBookingsCache();
                } catch (error) {
                    console.error("Failed to clear bookings cache:", error);
                }
            }
        }
        handleRevalidation();
    }, [session_id]);

    return (
        <div className="container flex min-h-[80vh] items-center justify-center py-10">
            <Card className="w-full max-w-xl">
                <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
                    <div className="rounded-full bg-green-500/10 p-5">
                        <CheckCircle2 className="h-14 w-14 text-green-600" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">
                            Payment Successful 🎉
                        </h1>

                        <p className="text-muted-foreground">
                            Thank you! Your payment has been received and your booking is now
                            being processed.
                        </p>

                        {session_id && (
                            <p className="text-sm text-muted-foreground">
                                Transaction ID:{" "}
                                <span className="font-mono">{session_id}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        <Button >
                            <Link href="/bookings">
                                View My Bookings
                            </Link>
                        </Button>

                        <Button variant="outline" >
                            <Link href="/services">
                                Browse Services
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
