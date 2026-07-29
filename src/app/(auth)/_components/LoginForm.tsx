"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/shared/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {

    const isLoading = false


    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="mb-8 flex flex-col justify-center items-center">
                    <Logo size="xl" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your Fix-it Now account</p>
                </div>

                {/* Login Card */}
                <Card className="shadow-xl border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form className="space-y-4">
                            {/* Email Field */}
                            <Field orientation="vertical">
                                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                    <Mail className="w-4 h-4 text-primary" />
                                    Email Address
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                    />
                                </FieldContent>
                            </Field>

                            {/* Password Field */}
                            <Field orientation="vertical">
                                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                    <Lock className="w-4 h-4 text-primary" />
                                    Password
                                </FieldLabel>

                                <FieldContent>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </FieldContent>
                            </Field>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-10 mt-2 group"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
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

                        {/* Divider */}
                        <div className="relative my-3">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 bg-card text-muted-foreground">New to Fix-it Now?</span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <Link href="/register" className="block w-full group">
                            <Button type="button" variant="outline" className="w-full cursor-pointer">
                                Create an Account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>By signing in, you agree to our</p>
                    <div className="flex items-center justify-center gap-4 mt-1">
                        <span className="text-primary hover:underline cursor-pointer">
                            Terms of Service
                        </span>
                        <span>•</span>
                        <span className="text-primary hover:underline cursor-pointer">
                            Privacy Policy
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
