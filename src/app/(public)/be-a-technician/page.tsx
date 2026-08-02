'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card'
import { technicianFormSchema, TechnicianFormValues } from '../_schema'
import { createTechnician } from '../_actions/createTechnicianActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const BeATechnicianPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TechnicianFormValues>({
        resolver: zodResolver(technicianFormSchema)
    })

    const onSubmit = async (data: TechnicianFormValues) => {
        const payload = {
            ...data
        }
        const result = await createTechnician(payload)

        if (result.success) {
            toast.success("Technician profile created successfully")
            router.push("/technician-dashboard/my-profile")
        } else {
            toast.error(result.error.message)
        }
    }

    return (
        <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Become a Technician
                    </CardTitle>
                    <CardDescription>
                        Join our expert team. Provide your professional details below to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Experience Year */}
                        <div className="space-y-2">
                            <Label htmlFor="experience_year">Experience (Years)</Label>
                            <Input
                                id="experience_year"
                                type="number"
                                placeholder="e.g. 5"
                                {...register('experience_year', { valueAsNumber: true })}
                            />
                            <p className="text-xs text-muted-foreground">
                                Number of years of professional experience.
                            </p>
                            {errors.experience_year && (
                                <p className="text-sm font-medium text-destructive">
                                    {errors.experience_year.message}
                                </p>
                            )}
                        </div>

                        {/* Hourly Rate */}
                        <div className="space-y-2">
                            <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                            <Input
                                id="hourly_rate"
                                type="number"
                                step="0.01"
                                placeholder="e.g. 45.00"
                                {...register('hourly_rate', { valueAsNumber: true })}
                            />
                            <p className="text-xs text-muted-foreground">
                                Technician's hourly rate in USD.
                            </p>
                            {errors.hourly_rate && (
                                <p className="text-sm font-medium text-destructive">
                                    {errors.hourly_rate.message}
                                </p>
                            )}
                        </div>

                        {/* Service Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Service Location</Label>
                            <Input
                                id="location"
                                type="text"
                                placeholder="e.g. New York, NY"
                                {...register('location')}
                            />
                            <p className="text-xs text-muted-foreground">
                                Technician's primary service location.
                            </p>
                            {errors.location && (
                                <p className="text-sm font-medium text-destructive">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Briefly describe your expertise, certifications, and background..."
                                className="min-h-30 resize-none"
                                {...register('bio')}
                            />
                            <p className="text-xs text-muted-foreground">
                                Brief background summary and qualifications.
                            </p>
                            {errors.bio && (
                                <p className="text-sm font-medium text-destructive">
                                    {errors.bio.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            Submit Application
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default BeATechnicianPage