import Link from 'next/link'
import {
    ArrowLeft,
    Briefcase,
    CalendarDays,
    CheckCircle2,
    Clock,
    DollarSign,
    MapPin,
    Tag,
    User,
    XCircle,
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { IBooking } from '../_types'
import { IServiceDetails } from '../../services/_types/serviceTypes'
import BookingStatusBadge from './BookingStatusBadge'
import { formatDateTime } from '@/service/booking'

function formatTime(timeStrISO: string) {
    const timeStr = timeStrISO.split('T')[1].slice(0, 5)
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(Number(hours), Number(minutes))
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function BookingDetails({
    booking,
    service,
}: {
    booking: IBooking
    service?: IServiceDetails
}) {
    const {
        booking_status,
        work_date,
        work_startTime,
        work_endTime,
        estimated_time,
        total_amount,
        cancellation_reason,
        created_at,
        updated_at,
        service_id,
    } = booking

    const { timeShape: updateTimeShape } = formatDateTime(updated_at.toString())
    const { dateShape: workDate } = formatDateTime(work_date.toString())
    const { dateShape: createDate } = formatDateTime(created_at.toString())


    const categoryName = service?.category?.name
    const serviceTitle = service?.title ?? `Service #${service_id}`
    const serviceDescription = service?.description
    const location = service?.location
    const technician = service?.technician

    return (
        <div className="container max-w-5xl py-10 space-y-8">
            <div>
                <Link href="/bookings">
                    <Button variant="link" size="sm" className="gap-2 flex items-center">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Bookings
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-md border-border/60">
                        <CardHeader className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                {categoryName && (
                                    <Badge variant="secondary" className="gap-1 px-3 py-1 text-xs">
                                        <Tag className="h-3.5 w-3.5" />
                                        {categoryName}
                                    </Badge>
                                )}
                                <BookingStatusBadge status={booking_status} />
                            </div>

                            <CardTitle className="text-3xl font-extrabold tracking-tight">
                                {serviceTitle}
                            </CardTitle>

                            <CardDescription className="text-sm">
                                Booked on {createDate}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Work Date</p>
                                        <p className="font-semibold text-base">{workDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Time Slot</p>
                                        <p className="font-semibold text-base">
                                            {formatTime(work_startTime)} – {formatTime(work_endTime)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:col-span-1 col-span-2">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total Amount</p>
                                        <p className="font-semibold text-base">${total_amount}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Estimated Duration
                                    </p>
                                    <p className="mt-1 font-semibold text-base">{estimated_time} mins</p>
                                </div>
                                <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Last Updated
                                    </p>
                                    <p className="mt-1 font-semibold text-base">{updateTimeShape}</p>
                                </div>
                            </div>

                            {location && (
                                <>
                                    <Separator />
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{location}</span>
                                    </div>
                                </>
                            )}

                            {serviceDescription && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">Service Description</h3>
                                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                            {serviceDescription}
                                        </p>
                                    </div>
                                </>
                            )}

                            {booking_status === 'CANCELLED' && cancellation_reason && (
                                <>
                                    <Separator />
                                    <div className="space-y-2 rounded-xl border border-cancelled/30 bg-cancelled/5 p-4">
                                        <h3 className="font-semibold text-base text-cancelled">Cancellation Reason</h3>
                                        <p className="text-sm text-muted-foreground">{cancellation_reason}</p>
                                    </div>
                                </>
                            )}

                            {service && (
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
                                    <div>
                                        <h4 className="font-semibold text-base">View full service details</h4>
                                        <p className="text-xs text-muted-foreground">
                                            See pricing, location, and more about this service.
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {booking_status === 'ACCEPTED' && (
                                            <Link href={`/payment?booking_id=${booking.id}`}>
                                                <Button size="lg" className="w-full sm:w-auto">
                                                    Pay
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href={`/services/${service_id}`}>
                                            <Button size="lg" className="w-full sm:w-auto">
                                                View Service
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {technician ? (
                        <Card className="shadow-md border-border/60">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    Assigned Technician
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-sm">
                                        <AvatarImage src={technician.photo_url || ''} alt={technician.name} />
                                        <AvatarFallback className="text-xl font-bold bg-muted">
                                            {technician.name?.slice(0, 2).toUpperCase() || <User />}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <h4 className="font-bold text-lg">{technician.name}</h4>
                                        <p className="text-xs text-muted-foreground">{technician.email}</p>
                                    </div>

                                    <Badge
                                        variant={technician.is_available ? 'default' : 'secondary'}
                                        className="gap-1 mt-1"
                                    >
                                        {technician.is_available ? (
                                            <>
                                                <CheckCircle2 className="h-3 w-3" /> Available Now
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-3 w-3" /> Unavailable
                                            </>
                                        )}
                                    </Badge>
                                </div>

                                <Separator />

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" /> Experience
                                        </span>
                                        <span className="font-semibold">{technician.experience_year} Years</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" /> Hourly Rate
                                        </span>
                                        <span className="font-semibold">${technician.hourly_rate}/hr</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <MapPin className="h-4 w-4" /> Base Location
                                        </span>
                                        <span
                                            className="font-semibold text-right truncate max-w-35"
                                            title={technician.location}
                                        >
                                            {technician.location}
                                        </span>
                                    </div>
                                </div>

                                {technician.bio && (
                                    <>
                                        <Separator />
                                        <div className="space-y-1">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Bio</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                                                &ldquo;{technician.bio}&rdquo;
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="shadow-md border-border/60">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    Booking Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Booking ID</span>
                                    <span className="font-semibold truncate max-w-40" title={booking.id}>
                                        {booking.id.slice(0, 8)}...
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Service ID</span>
                                    <span className="font-semibold">#{service_id}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
