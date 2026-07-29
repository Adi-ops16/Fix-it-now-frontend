"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { User, Mail, Lock, UserCheck, MapPin, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/shared/Logo";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

type UserRole = "CUSTOMER" | "TECHNICIAN";

// interface RegisterFormErrors {
//     name?: string;
//     email?: string;
//     password?: string;
//     role?: string;
//     photoUrl?: string;
//     bio?: string;
//     location?: string;
//     hourlyRate?: string;
//     experienceYear?: string;
// }

export default function RegisterForm() {
    const role = false
    const isTechnician: UserRole = role ? "TECHNICIAN" : "CUSTOMER"
    const isLoading = false


    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex flex-col justify-center items-center">
                    <Logo size="xl" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Join Fix-it Now and start connecting with services</p>
                </div>

                {/* Register Card */}
                <Card className="shadow-xl border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
                        <CardDescription>Fill in your details to create your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form>
                            {/* Basic Information */}
                            <div className={`bg-muted/20 p-4 rounded-lg border border-border/30 ${isTechnician === "TECHNICIAN" ? "mb-6" : "mb-2"}`}>
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
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                            />
                                        </FieldContent>
                                    </Field>

                                    {/* Email Field */}
                                    <Field orientation="vertical">
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <Mail className="w-4 h-4 text-primary" />
                                            Email Address
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                            />
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
                                                type="text"
                                                name="photo"
                                                placeholder="https://you.png"
                                            />
                                        </FieldContent>
                                    </Field>

                                    {/* Password Field */}
                                    <Field>
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <Lock className="w-4 h-4 text-primary" />
                                            Password
                                        </FieldLabel>
                                        <FieldContent>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="••••••••"
                                            />
                                        </FieldContent>
                                    </Field>

                                    {/* Role Selection */}
                                    <Field orientation="vertical">
                                        <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                            <UserCheck className="w-4 h-4 text-primary" />
                                            Account Type
                                        </FieldLabel>
                                        <FieldContent>
                                            <Select name="role" defaultValue={"Customer"}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent alignItemWithTrigger className="bg-background border border-input rounded-lg shadow-lg overflow-hidden">
                                                    <SelectItem value="Customer">
                                                        Customer
                                                    </SelectItem>
                                                    <SelectItem value="Technician">
                                                        Technician
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FieldContent>
                                    </Field>
                                </div>
                            </div>

                            {/* Technician Specific Fields */}

                            {isTechnician === "TECHNICIAN" && (
                                <div className="bg-muted/20 p-4 rounded-lg border border-border/30">
                                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-primary" />
                                        Professional Profile
                                    </h3>

                                    <div className="space-y-5">
                                        {/* Bio */}
                                        <Field orientation="vertical">
                                            <FieldLabel className="text-sm font-medium">Bio</FieldLabel>
                                            <FieldContent>
                                                <Textarea
                                                    name="bio"
                                                    placeholder="Tell us about yourself and your experience..."
                                                    rows={3}
                                                />
                                            </FieldContent>
                                        </Field>

                                        {/* Location */}
                                        <Field orientation="vertical">
                                            <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                Location
                                            </FieldLabel>
                                            <FieldContent>
                                                <Input
                                                    type="text"
                                                    name="location"
                                                    placeholder="City, State"
                                                />
                                            </FieldContent>
                                        </Field>
                                    </div>

                                    <div className="mt-5 flex justify-center items-center gap-2">
                                        {/* Hourly Rate */}
                                        <Field>
                                            <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                Hourly Rate ($)
                                            </FieldLabel>
                                            <FieldContent>
                                                <Input
                                                    type="number"
                                                    name="hourlyRate"
                                                    placeholder="50"
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </FieldContent>
                                        </Field>

                                        {/* Experience */}
                                        <Field orientation="vertical">
                                            <FieldLabel className="text-sm font-medium">Years of Experience</FieldLabel>
                                            <FieldContent>
                                                <Input
                                                    type="number"
                                                    name="experienceYear"
                                                    placeholder="5"
                                                    min="0"
                                                />
                                            </FieldContent>
                                        </Field>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-10 mt-4 group"
                            >
                                {isLoading ? (
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

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <Link href="/login" className="block w-full group">
                            <Button type="button" variant="outline" className="w-full cursor-pointer">
                                Sign In Instead
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>By creating an account, you agree to our</p>
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
            </div >
        </div >
    );
}
