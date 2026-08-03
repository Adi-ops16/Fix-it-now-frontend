import Link from "next/link";
import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelledPage() {
    return (
        <div className="container flex min-h-[80vh] items-center justify-center py-10">
            <Card className="w-full max-w-xl">
                <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
                    <div className="rounded-full bg-red-500/10 p-5">
                        <CircleX className="h-14 w-14 text-red-600" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">
                            Payment Cancelled
                        </h1>

                        <p className="text-muted-foreground">
                            Your payment was cancelled. No money has been charged and your
                            booking remains unpaid.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/bookings">
                            <Button >
                                Try Again
                            </Button>
                        </Link>

                        <Link href="/">
                            <Button variant="outline" >
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}