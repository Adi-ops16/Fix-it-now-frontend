'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
    Mail,
    MapPin,
    ShieldCheck,
    UserRound,
    Briefcase,
    DollarSign,
    Clock,
    Save,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TechnicianProfileFormProps, TechnicianUpdateResponse, UpdateTechnicianPayload } from '../_types'
import { updateTechnician } from '../_actions'

export function TechnicianProfileForm({ user }: TechnicianProfileFormProps) {
    const router = useRouter()
    const tech = user.technician_profile

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, isDirty },
    } = useForm<UpdateTechnicianPayload>({
        values: {
            name: user?.name ?? '',
            photo_url: user?.photo_url ?? '',
            bio: tech?.bio ?? '',
            experience_year: tech?.experience_year ?? 0,
            hourly_rate: tech?.hourly_rate ?? 0,
            location: tech?.location ?? '',
            is_available: tech?.is_available ?? true,
        },
    })

    const isAvailable = watch('is_available')

    const onSubmit = async (data: UpdateTechnicianPayload) => {
        console.log(data)
        const result = await updateTechnician(data)
        if (!result.success) {
            toast.error(result.error?.message || 'Failed to update profile')
            return
        }
        toast.success('Technician profile updated successfully!')
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-5xl flex-col gap-6">
            {/* Header Banner */}
            <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                            <AvatarImage src={watch('photo_url') || ''} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                                <UserRound className="h-7 w-7" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
                            {user.role}
                        </Badge>
                        <Button type="submit" disabled={isSubmitting || !isDirty} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left Column: User & Technician Editable Information */}
                <div className="space-y-6">
                    <Card className="border-border/60 bg-card/80 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" {...register('name', { required: true })} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photo_url">Profile Picture URL</Label>
                                <Input id="photo_url" placeholder="https://example.com/avatar.jpg" {...register('photo_url')} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60 bg-card/80 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Technician Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="experience_year" className="flex items-center gap-1.5">
                                        <Briefcase className="h-4 w-4 text-primary" /> Experience (Years)
                                    </Label>
                                    <Input
                                        id="experience_year"
                                        type="number"
                                        min={0}
                                        {...register('experience_year', { valueAsNumber: true })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hourly_rate" className="flex items-center gap-1.5">
                                        <DollarSign className="h-4 w-4 text-primary" /> Hourly Rate ($)
                                    </Label>
                                    <Input
                                        id="hourly_rate"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        {...register('hourly_rate', { valueAsNumber: true })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-primary" /> Work Location
                                </Label>
                                <Input id="location" placeholder="e.g. New York, NY" {...register('location')} />
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium">Availability Status</Label>
                                    <p className="text-xs text-muted-foreground">Toggle to accept or pause new service requests.</p>
                                </div>
                                <Switch
                                    checked={isAvailable}
                                    onCheckedChange={(checked) => setValue('is_available', checked, { shouldDirty: true })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea
                                    id="bio"
                                    rows={4}
                                    placeholder="Describe your skills and expertise..."
                                    {...register('bio')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Account Status & Overview */}
                <div className="space-y-6">
                    <Card className="border-border/60 bg-card/80 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                                <span>Status: {user.user_status}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                                <Clock className="h-4 w-4 text-primary shrink-0" />
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60 bg-linear-to-br from-primary/10 via-background to-secondary/15 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Role</p>
                                <p className="mt-2 text-base font-medium text-foreground">{user.role}</p>
                            </div>
                            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Account status</p>
                                <p className="mt-2 text-base font-medium text-foreground">{user.user_status}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}