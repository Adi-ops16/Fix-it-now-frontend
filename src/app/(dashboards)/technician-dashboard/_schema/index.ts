import z from "zod";

export const createServiceSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters"),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters"),

    price: z
        .number({
            error: "Price is required",
        })
        .min(1, "Price must be greater than 0"),

    estimated_time: z
        .number({
            error: "Estimated time is required",
        })
        .min(1, "Estimated time must be greater than 0"),

    category_id: z
        .number({
            error: "Please select a category",
        })
        .min(1, "Please select a category"),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters"),
});


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
export type CreateServiceType = z.infer<typeof createServiceSchema>;
export type ServiceFormValues = z.infer<typeof serviceUpdateSchema>;