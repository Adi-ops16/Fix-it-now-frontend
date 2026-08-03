import z from "zod";

export const serviceUpdateSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be under 100 characters")
        .optional()
    ,
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .optional()
    ,
    estimated_time: z
        .number("Estimated time must be a number")
        .min(1, "Estimated time must be at least 1 minute")
        .optional()
    ,
    price: z
        .number("Price must be a number")
        .min(0, "Price cannot be negative")
        .optional()
    ,
    location: z
        .string()
        .min(1, "Location is required")
        .optional()
});

// Infer TypeScript type from Zod schema
export type ServiceFormValues = z.infer<typeof serviceUpdateSchema>;