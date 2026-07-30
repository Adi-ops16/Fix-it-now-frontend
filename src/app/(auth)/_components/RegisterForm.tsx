"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPayload, RegisterSchema } from "../_schema/authSchema";
import AuthHeader from "./AuthHeader";
import AuthFooterInfo from "./AuthFooterInfo";
import AuthActionLink from "./AuthActionLink";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerAction } from "../_actions/authActions";
import { RegisterResponse } from "@/lib/types";
import { toast } from "sonner";

export default function RegisterForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange"
    })

    const handleRegister = async (data: RegisterPayload) => {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo_url: data.photo_url
        }

        const result: RegisterResponse = await registerAction(payload)

        if (result.success) {
            toast.success(`${result.message}, please login`)
            router.replace("/login")
        } else {
            toast.error(result.message)
        }

    }

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <AuthHeader
                    title="Create Account"
                    subtitle="Join Fix-it Now and start connecting with services"
                />

                <Card className="shadow-xl border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
                        <CardDescription>Fill in your details to create your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            {/* Basic Information */}
                            <div className={`bg-muted/20 p-4 rounded-lg border border-border/30 mb-2`}>
                                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Basic Information
                                </h3>

                                <div className="space-y-5">
                                    {/* Name Field */}
                                    <Field orientation="vertical">
                                        <FieldLabel className="text-sm font-medium">Full Name</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("name")}
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                            />
                                        </FieldContent>
                                        {errors.name && <FieldError className="text-red-500 text-xs mt-1">{errors.name.message}</FieldError>}
                                    </Field>

                                    {/* Email Field */}
                                    <Field orientation="vertical">
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <Mail className="w-4 h-4 text-primary" />
                                            Email Address
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("email")}
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && <FieldError className="text-red-500 text-xs mt-1">{errors.email.message}</FieldError>}
                                        </FieldContent>
                                    </Field>

                                    {/* Photo URL */}
                                    <Field orientation={"responsive"}>
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <Mail className="w-4 h-4 text-primary" />
                                            Photo
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("photo_url")}
                                                type="text"
                                                name="photo_url"
                                                placeholder="https://you.png"
                                            />
                                        </FieldContent>
                                        {errors.photo_url && <FieldError className="text-red-500 text-xs mt-1">{errors.photo_url.message}</FieldError>}
                                    </Field>

                                    {/* Password Field */}
                                    <Field>
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <Lock className="w-4 h-4 text-primary" />
                                            Password
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("password")}
                                                type="password"
                                                name="password"
                                                placeholder="••••••••"
                                            />
                                        </FieldContent>
                                        {errors.password && <FieldError className="text-red-500 text-xs mt-1">{errors.password.message}</FieldError>}
                                    </Field>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full h-10 mt-4 group cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner />
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create Account
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <AuthActionLink
                            prompt="Already have an account?"
                            buttonLabel="Sign In Instead"
                            href="/login"
                        />
                    </CardContent>
                </Card>

                <AuthFooterInfo description="By creating an account, you agree to our" />
            </div >
        </div >
    );
}
