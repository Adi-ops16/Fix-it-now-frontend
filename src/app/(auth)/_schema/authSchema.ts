import z from "zod";

export const LoginSchema = z.object({
    email: z.email({
        error: "Invalid email format"
    }),
    password: z.string().min(6, {
        error: "Password must be more than 6 characters"
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(3, "Name must be more than 3 characters"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be more than 6 characters"),
    photo_url: z.string().optional(),
});

export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>