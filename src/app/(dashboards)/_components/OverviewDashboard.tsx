
"use client";

import React from "react";
import {
    Activity,
    CalendarDays,
    CheckCircle2,
    DollarSign,
    Star,
    TrendingUp,
    UserCheck,
    Users,
    UserX,
    Wrench,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { IOverview } from "../_types/categoryTypes";

export default function OverviewDashboard({
    result,
}: {
    result: IOverview;
}) {
    const {
        totalUsers,
        workingTechnicians,
        totalTechnicians,
        nonWorkingTechnicians,
        workRate,
        totalBookings,
        pendingBookings,
        cancelledBooking,
        cancellationRate,
        totalRevenue,
        averageRating,
    } = result.data;

    /*
     * ------------------------------------------------------------
     * Derived values
     * ------------------------------------------------------------
     */

    const bookingCompletionRate =
        totalBookings > 0
            ? ((pendingBookings / totalBookings) * 100)
            : 0;

    const cancellationPercentage =
        totalBookings > 0
            ? ((cancelledBooking / totalBookings) * 100)
            : 0;

    /*
     * ------------------------------------------------------------
     * Helpers
     * ------------------------------------------------------------
     */

    const formatNumber = (value: number) =>
        value.toLocaleString();

    const formatPercentage = (value: number) =>
        Number.isInteger(value)
            ? `${value}% `
            : `${value.toFixed(2)}% `;

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Activity className="h-5 w-5" />
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Dashboard Overview
                            </h1>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Monitor FixItNow&apos;s platform activity and
                            performance.
                        </p>
                    </div>

                    {/* System status */}
                    <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                        </span>

                        <span className="text-xs font-semibold text-primary">
                            System Live
                        </span>
                    </div>
                </div>

                {/* ==================================================
                    PRIMARY KPI CARDS
                ================================================== */}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Revenue */}
                    <Card className="border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </CardTitle>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold tracking-tight">
                                ${formatNumber(totalRevenue)}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                                <span>Platform lifetime earnings</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bookings */}
                    <Card className="border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Bookings
                            </CardTitle>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold tracking-tight">
                                {formatNumber(totalBookings)}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <span className="font-medium text-primary">
                                    {formatPercentage(bookingCompletionRate)}
                                </span>
                                <span>active / pending</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customers */}
                    <Card className="border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Customers
                            </CardTitle>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold tracking-tight">
                                {formatNumber(totalUsers)}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <UserCheck className="h-3.5 w-3.5 text-primary" />
                                <span>Registered accounts</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rating */}
                    <Card className="border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Average Rating
                            </CardTitle>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                                <Star className="h-5 w-5 fill-current" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-baseline gap-1.5">
                                <p className="text-2xl font-bold tracking-tight">
                                    {averageRating}
                                </p>

                                <span className="text-sm text-muted-foreground">
                                    / 5
                                </span>
                            </div>

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                <span>Overall platform rating</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    <Card className="border-border/60 shadow-sm">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Wrench className="h-4 w-4 text-primary" />
                                        Technician Workforce
                                    </CardTitle>

                                    <CardDescription className="mt-1">
                                        Current technician availability across
                                        the platform.
                                    </CardDescription>
                                </div>

                                <div className="rounded-lg bg-primary/10 px-2.5 py-1">
                                    <span className="text-xs font-bold text-primary">
                                        {formatPercentage(workRate)}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">
                                        Workforce availability
                                    </span>

                                    <span className="font-semibold text-primary">
                                        {workingTechnicians} of{" "}
                                        {totalTechnicians}
                                    </span>
                                </div>

                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{
                                            width: `${Math.min(
                                                Math.max(workRate, 0),
                                                100
                                            )
                                                }% `,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Technician statistics */}
                            <div className="grid grid-cols-3 gap-3">

                                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Users className="h-3.5 w-3.5" />
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold">
                                        {totalTechnicians}
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        Total
                                    </p>
                                </div>

                                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <UserCheck className="h-3.5 w-3.5" />
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold text-primary">
                                        {workingTechnicians}
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        Working
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                            <UserX className="h-3.5 w-3.5" />
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold text-muted-foreground">
                                        {nonWorkingTechnicians}
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        Offline
                                    </p>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60 shadow-sm">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-primary" />
                                        Booking Overview
                                    </CardTitle>

                                    <CardDescription className="mt-1">
                                        Current booking activity and
                                        cancellation status.
                                    </CardDescription>
                                </div>

                                <div className="rounded-lg bg-primary/10 px-2.5 py-1">
                                    <span className="text-xs font-bold text-primary">
                                        {totalBookings} total
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            {/* Active bookings */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />

                                        <span className="text-sm font-medium">
                                            Pending / Active
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold">
                                        {pendingBookings}
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{
                                            width: `${Math.min(
                                                Math.max(
                                                    bookingCompletionRate,
                                                    0
                                                ),
                                                100
                                            )
                                                }% `,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Cancelled bookings */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <XCircle className="h-4 w-4 text-destructive" />

                                        <span className="text-sm font-medium">
                                            Cancelled
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold">
                                        {cancelledBooking}
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-destructive transition-all"
                                        style={{
                                            width: `${Math.min(
                                                Math.max(
                                                    cancellationPercentage,
                                                    0
                                                ),
                                                100
                                            )
                                                }% `,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Booking summary */}
                            <div className="grid grid-cols-2 gap-3">

                                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Active Rate
                                        </p>

                                        <Activity className="h-4 w-4 text-primary" />
                                    </div>

                                    <p className="mt-2 text-xl font-bold text-primary">
                                        {formatPercentage(
                                            bookingCompletionRate
                                        )}
                                    </p>
                                </div>

                                <div
                                    className={
                                        cancellationRate > 10
                                            ? "rounded-xl border border-destructive/20 bg-destructive/5 p-4"
                                            : "rounded-xl border border-border/60 bg-muted/30 p-4"
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Cancellation Rate
                                        </p>

                                        <XCircle
                                            className={
                                                cancellationRate > 10
                                                    ? "h-4 w-4 text-destructive"
                                                    : "h-4 w-4 text-muted-foreground"
                                            }
                                        />
                                    </div>

                                    <p
                                        className={
                                            cancellationRate > 10
                                                ? "mt-2 text-xl font-bold text-destructive"
                                                : "mt-2 text-xl font-bold"
                                        }
                                    >
                                        {formatPercentage(cancellationRate)}
                                    </p>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle>Platform Health</CardTitle>

                        <CardDescription>
                            A quick summary of the most important FixItNow
                            performance indicators.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-3">

                            {/* Workforce health */}
                            <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Wrench className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                        Workforce
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {workingTechnicians} of{" "}
                                        {totalTechnicians} technicians working
                                    </p>
                                </div>

                                <div className="ml-auto text-sm font-bold text-primary">
                                    {formatPercentage(workRate)}
                                </div>
                            </div>

                            {/* Booking health */}
                            <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <CalendarDays className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                        Bookings
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {pendingBookings} active out of{" "}
                                        {totalBookings}
                                    </p>
                                </div>

                                <div className="ml-auto text-sm font-bold text-primary">
                                    {formatPercentage(bookingCompletionRate)}
                                </div>
                            </div>

                            {/* Quality */}
                            <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                                    <Star className="h-5 w-5 fill-current" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                        Service Quality
                                    </p>

                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        Average customer rating
                                    </p>
                                </div>

                                <div className="ml-auto text-sm font-bold text-amber-500">
                                    {averageRating}/5
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

