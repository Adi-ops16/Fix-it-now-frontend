import Link from 'next/link'
import { ArrowLeft, Briefcase, CalendarDays, CheckCircle2, Clock, DollarSign, Eye, MapPin, Star, Tag, User, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { IBooking } from '../_types'
import { IServiceDetails } from '../../services/_types/serviceTypes'
import BookingStatusBadge from './BookingStatusBadge'
import { formatDateTime } from '@/service/booking'
import ReviewButton from './ReviewButton'
import TechnicianDetails from './TechnicianDetails'
import BookingReview from './BookingReview'

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
    const { booking_status, work_date, work_startTime, work_endTime, estimated_time, total_amount, cancellation_reason, created_at, updated_at, service_id, id } = booking

    const { timeShape: updateTimeShape } = formatDateTime(updated_at.toString())
    const { dateShape: workDate } = formatDateTime(work_date.toString())
    const { dateShape: createDate } = formatDateTime(created_at.toString())

    const categoryName = service?.category?.name
    const serviceTitle = service?.title ?? `Service #${service_id}`
    const serviceDescription = service?.description
    const location = service?.location

    return (
        <div className="container max-w-6xl py-10 space-y-8">
            <div>
                <Link className='cursor-pointer' href="/bookings">
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

                            {/* work date */}
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

                            {/* estimated duration & last update */}
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

                            {/* location */}
                            <Separator />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{location}</span>
                            </div>

                            {/* description */}
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Service Description</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                    {serviceDescription}
                                </p>
                            </div>

                            {/* cancellation reason */}
                            {cancellation_reason &&
                                <>
                                    <Separator />
                                    <div className="space-y-2 rounded-xl border border-cancelled/30 bg-cancelled/5 p-4">
                                        <h3 className="font-semibold text-base text-cancelled">Cancellation Reason</h3>
                                        <p className="text-sm text-muted-foreground">{cancellation_reason}</p>
                                    </div>
                                </>
                            }

                            {service && (
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
                                    <div>
                                        <h4 className="font-semibold text-base">View full service details</h4>
                                        <p className="text-xs text-muted-foreground">
                                            See pricing, location, and more about this service.
                                        </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {booking_status === 'ACCEPTED' && (
                                            <Link href={`/payment?booking_id=${booking.id}`}>
                                                <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                                                    Pay
                                                </Button>
                                            </Link>
                                        )}
                                        {booking_status === 'COMPLETED' && (
                                            <ReviewButton booking_id={id} />
                                        )}
                                        <Link href={`/services/${service_id}`}>
                                            <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                                                <Eye />
                                                View Service
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="shrink-0">
                        <TechnicianDetails booking={booking} service={service} />
                    </div>

                    <div className="w-full grow">
                        <BookingReview bookingId={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
