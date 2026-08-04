'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IUser } from '@/lib/types'
import { updateCustomer } from '../_actions/profileActions'

interface CustomerProfileFormProps {
    user: IUser
}

export interface UpdateFormValues {
    name: string
    photo_url: string
}

export function CustomerProfileForm({ user }: CustomerProfileFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, isDirty },
    } = useForm<UpdateFormValues>({
        defaultValues: {
            name: user.name ?? '',
            photo_url: user.photo_url ?? '',
        },
    })

    const onSubmit = async (data: UpdateFormValues) => {
        if (user) {
            const result = await updateCustomer(data, user.id)
            if (result.success) {
                toast.success('Profile updated successfully!')
                reset(data)
            } else {
                toast.error(result.message)
            }
        }
    }

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader className="flex flex-col items-center space-y-3 text-center">
                    {/* Avatar Header */}
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                        <AvatarImage src={user.photo_url || ''} alt={user.name} />
                        <AvatarFallback className="text-xl font-bold">
                            {user.name?.slice(0, 2).toUpperCase() || 'CU'}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </div>

                    <div className="flex gap-2 pt-1">
                        <Badge variant="outline">
                            Role:
                            <span className='text-primary'> {user.role.toLowerCase()}</span>
                        </Badge>
                        <Badge variant={user.user_status === 'ACTIVE' ? 'default' : 'secondary'}>
                            Status:
                            <span className='text-primary-foreground'>{user.user_status}</span>
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Editable Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register('name', { required: 'Name is required' })}
                            />
                        </div>

                        {/* Read-only Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={user.email}
                                disabled
                                className="bg-muted cursor-not-allowed text-muted-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                                Email address cannot be changed.
                            </p>
                        </div>

                        {/* Editable Photo URL */}
                        <div className="space-y-2">
                            <Label htmlFor="photo_url">Profile Picture URL</Label>
                            <Input
                                id="photo_url"
                                type="text"
                                placeholder="https://example.com/avatar.jpg"
                                {...register('photo_url')}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={isSubmitting || !isDirty}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}