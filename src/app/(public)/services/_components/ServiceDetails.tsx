import Link from 'next/link'
import {
    Clock,
    MapPin,
    DollarSign,
    Tag,
    Calendar,
    CheckCircle2,
    XCircle,
    Briefcase,
    User,
    ArrowLeft,
    BookCheck,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { IServiceDetails } from '../_types/serviceTypes'

export default function ServiceDetails({ service }: { service: IServiceDetails }) {
    const { category, category_id, description: serviceDescription, estimated_time, location, price, technician, technician_id, title, created_at, updated_at } = service
    const { description: categoryDescription, name: categoryName } = category
    const { bio, email, experience_year, hourly_rate, is_available, location: technicianLocation, name: technicianName, photo_url, role, user_status } = technician

    return (
        <div className="container max-w-5xl py-10 space-y-8">
            {/* Back Button */}
            <div>
                <Link href="/services">
                    <Button variant="link" size="sm" className="gap-2 flex items-center">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Services
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Left Section: Service Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-md border-border/60">
                        <CardHeader className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="gap-1 px-3 py-1 text-xs">
                                    <Tag className="h-3.5 w-3.5" />
                                    {categoryName}
                                </Badge>
                            </div>

                            <CardTitle className="text-3xl font-extrabold tracking-tight">
                                {title}
                            </CardTitle>

                            {categoryDescription && (
                                <CardDescription className="text-sm">
                                    {categoryDescription}
                                </CardDescription>
                            )}
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Service Price</p>
                                        <p className="font-semibold text-base">${price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Estimated Time</p>
                                        <p className="font-semibold text-base">{estimated_time} mins</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:col-span-1 col-span-2">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Location</p>
                                        <p className="font-semibold text-base truncate max-w-30" title={location || ""}>
                                            {location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Service Description */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">About This Service</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                    {serviceDescription}
                                </p>
                            </div>

                            {/* Book Now Action Card */}
                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
                                <div>
                                    <h4 className="font-semibold text-base">Ready to book this service?</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Get an expert technician assigned immediately.
                                    </p>
                                </div>
                                <Button size="lg" className="w-full sm:w-auto gap-2">
                                    <BookCheck className="h-5 w-5" />
                                    Book Service Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Right Section: Assigned Technician Info */}
                <div className="space-y-6">
                    <Card className="shadow-md border-border/60">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Technician Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* Technician Avatar & Name */}
                            <div className="flex flex-col items-center text-center space-y-2">
                                <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-sm">
                                    <AvatarImage src={photo_url || ''} alt={technicianName} />
                                    <AvatarFallback className="text-xl font-bold bg-muted">
                                        {technicianName?.slice(0, 2).toUpperCase() || <User />}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <h4 className="font-bold text-lg">{technicianName}</h4>
                                    <p className="text-xs text-muted-foreground">{email}</p>
                                </div>

                                <Badge
                                    variant={is_available ? 'default' : 'secondary'}
                                    className="gap-1 mt-1"
                                >
                                    {is_available ? (
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

                            {/* Technician Stats */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" /> Experience
                                    </span>
                                    <span className="font-semibold">{experience_year} Years</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" /> Hourly Rate
                                    </span>
                                    <span className="font-semibold">${hourly_rate}/hr</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Base Location
                                    </span>
                                    <span className="font-semibold text-right truncate max-w-35" title={technicianLocation}>
                                        {technicianLocation}
                                    </span>
                                </div>
                            </div>

                            {bio && (
                                <>
                                    <Separator />
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">Bio</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            "{bio}"
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
