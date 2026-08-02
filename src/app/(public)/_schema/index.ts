import { z } from 'zod'

export const technicianFormSchema = z.object({
    experience_year: z
        .number('Experience must be a number')
        .min(0, 'Years of experience cannot be negative')
        .max(50, 'Please enter a valid experience year')
    ,
    hourly_rate: z
        .number('Hourly rate must be a number')
        .positive('Hourly rate must be greater than 0'),

    location: z
        .string()
        .min(2, 'Location must be at least 2 characters long')
        .max(100, 'Location is too long'),

    bio: z
        .string()
        .min(10, 'Bio must be at least 10 characters long')
        .max(500, 'Bio cannot exceed 500 characters'),
})

export type TechnicianFormValues = z.infer<typeof technicianFormSchema>