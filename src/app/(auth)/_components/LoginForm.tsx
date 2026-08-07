"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LoginPayload, LoginSchema } from "../_schema/authSchema";
import AuthHeader from "./AuthHeader";
import AuthFooterInfo from "./AuthFooterInfo";
import AuthActionLink from "./AuthActionLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function LoginForm() {
    const router = useRouter()
    const { refreshUser } = useUser()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onChange"
    })

    const handleLogin = async (data: LoginPayload) => {
        const result = await loginAction(data)
        if (result.success) {
            toast.success(result.message, { position: "top-right" })
            refreshUser()
            router.replace("/")
        } else {
            toast.error(result.message, { position: "top-right" })
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30 flex items-center justify-center mx-4">
            <div className="w-full max-w-md">
                <AuthHeader
                    title="Welcome Back"
                    subtitle="Sign in to your Fix-it Now account"
                />

                <Card className="shadow-xl border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                            <Field orientation="vertical">
                                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                    <Mail className="w-4 h-4 text-primary" />
                                    Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                    />
                                </FieldContent>
                                {errors.email && <FieldError className="text-red-500 text-xs mt-1">{errors.email.message}</FieldError>}
                            </Field>

                            <Field orientation="vertical">
                                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                    <Lock className="w-4 h-4 text-primary" />
                                    Password
                                </FieldLabel>

                                <FieldContent>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </FieldContent>
                                {errors.password && <FieldError className="text-red-500 text-xs mt-1">{errors.password.message}</FieldError>}
                            </Field>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-10 mt-2 group"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner />
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        {/* action link */}
                        <AuthActionLink
                            prompt="New to Fix-it Now?"
                            buttonLabel="Create an Account"
                            href="/register"
                        />
                    </CardContent>
                </Card>
                {/* Footer */}
                <AuthFooterInfo description="By signing in, you agree to our" />
            </div>
        </div>
    );
}
