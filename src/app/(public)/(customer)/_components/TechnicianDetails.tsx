import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CheckCircle2, DollarSign, MapPin, User, XCircle } from 'lucide-react';
import { IBooking } from '../_types';
import { IServiceDetails } from '../../services/_types/serviceTypes';

const TechnicianDetails = ({
    booking,
    service,
}: {
    booking: IBooking
    service?: IServiceDetails
}) => {
    const technician = service?.technician
    return (
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
                            <span className="font-semibold">#{service?.id}</span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TechnicianDetails;