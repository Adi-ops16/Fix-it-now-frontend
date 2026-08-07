import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getMyPayments } from '../_actions/paymentAction';
import { IPayment } from '../_types';

export default async function PaymentPage() {
    const result = await getMyPayments();
    const payments: IPayment[] = result?.data ?? [];

    const getStatusBadge = (status: string) => {
        const normalized = status?.toLowerCase();
        switch (normalized) {
            case 'successful':
                return (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3.5" /> Paid
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 flex items-center gap-1 font-medium">
                        <Clock className="size-3.5" /> Pending
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 flex items-center gap-1 font-medium">
                        <AlertCircle className="size-3.5" /> {status}
                    </Badge>
                );
        }
    };

    return (
        <section className="container max-w-7xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Payment History</h1>
                <p className="mt-2 text-muted-foreground">
                    View and manage all your past transaction records and payment statuses.
                </p>
            </div>

            {payments.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {payments.map((payment) => (
                        <Card key={payment.id} className="overflow-hidden border border-border/60 transition-all duration-200 hover:shadow-md">
                            <CardHeader className="flex items-center justify-between py-3 space-y-0 bg-muted/30">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                                        <CreditCard className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                            Booking ID
                                        </p>
                                        <p className="text-sm font-medium font-mono">
                                            #{payment.booking_id.slice(0, 8)}
                                        </p>
                                    </div>
                                </div>
                                {getStatusBadge(payment.payment_status)}
                            </CardHeader>

                            <CardContent className="pt-4 space-y-4">
                                <div className="flex items-baseline justify-between border-b pb-3">
                                    <span className="text-sm text-muted-foreground">Amount Paid</span>
                                    <span className="text-2xl font-bold tracking-tight">
                                        {payment.currency.toUpperCase() === 'USD' ? '$' : `${payment.currency.toUpperCase()} `}
                                        {payment.amount.toFixed(2)}
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Transaction Date</span>
                                        <span className="font-medium text-foreground">
                                            {new Date(payment.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Payment ID</span>
                                        <span className="font-mono text-foreground">{payment.id.slice(0, 12)}...</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Link href={`/bookings/${payment.booking_id}`}>
                                        <Button variant="outline" size="sm" className="w-full justify-between cursor-pointer">
                                            View Booking Details
                                            <ArrowRight className="size-3.5" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <CreditCard className="size-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">No payment history yet</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        You haven&apos;t made any payments for booked services. Once you schedule and complete a booking, your transaction receipts will appear here.
                    </p>
                    <Button size="lg" className="mt-6" >
                        <Link href="/services">Browse Available Services</Link>
                    </Button>
                </div>
            )}
        </section>
    );
}