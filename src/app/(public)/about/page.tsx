import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Wrench, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AboutPageButton from "../_components/AboutPageButton";
import { getMyProfile } from "@/service/getMyProfile";

export const metadata = {
    title: "About Us - Fix-It Now",
    description: "Learn how Fix-It Now connects trusted professionals with customers who need fast, reliable help.",
};

const values = [
    {
        title: "Trusted professionals",
        description: "Every technician is carefully reviewed so customers can book with confidence.",
        icon: ShieldCheck,
    },
    {
        title: "Fast and simple",
        description: "Find services, compare availability, and book quickly without the usual hassle.",
        icon: Sparkles,
    },
    {
        title: "Built for local communities",
        description: "We support homeowners and service providers with a platform made for real-world needs.",
        icon: Users,
    },
];

const steps = [
    "Browse available services by category, location, and expertise.",
    "Review technician profiles, experience, and availability before booking.",
    "Get the help you need with transparent pricing and reliable communication.",
];

export default async function AboutPage() {
    const { data: user } = await getMyProfile()
    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-br from-primary/10 via-background to-secondary/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)]" />

                <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-28">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-sm font-medium text-primary backdrop-blur">
                            <Wrench className="h-4 w-4" />
                            About Fix-It Now
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Connecting people with dependable local service experts.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                                Fix-It Now makes it easy for customers to discover trusted professionals and for technicians to grow their business with a modern, transparent platform.
                            </p>
                        </div>
                        <div className="flex gap-3 max-w-40">
                            <Link href="/services" className="">
                                <Button className="rounded-full px-6 cursor-pointer flex items-center gap-1">
                                    Explore services
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <AboutPageButton
                                user={user!}
                                variant="outline"
                                hasArrow={false}>
                                Join as a Customer
                            </AboutPageButton>
                        </div>
                    </div>

                    <Card className="max-w-2xl border-border/60 bg-background/80 shadow-lg backdrop-blur">
                        <CardContent className="space-y-4 p-6 sm:p-8">
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                <BadgeCheck className="h-4 w-4" />
                                Why people use Fix-It Now
                            </div>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                                    Reliable booking experience with vetted local professionals.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                                    Clear service details, pricing, and availability.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                                    A growing platform that supports both customers and technicians.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-6 md:grid-cols-3">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <Card key={value.title} className="border-border/60 bg-card/80 shadow-sm">
                                <CardContent className="space-y-3 p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                                    <p className="text-sm leading-7 text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-border/60 bg-linear-to-br from-primary/10 via-background to-secondary/15 shadow-sm">
                        <CardContent className="p-8 sm:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
                            <h2 className="mt-3 text-3xl font-semibold text-foreground">A smoother way to book and manage home services.</h2>
                            <div className="mt-6 space-y-4">
                                {steps.map((step, index) => (
                                    <div key={step} className="flex gap-3 rounded-2xl border border-border/60 bg-background/70 p-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                            {index + 1}
                                        </div>
                                        <p className="text-sm leading-7 text-muted-foreground">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/60 bg-card/80 shadow-sm">
                        <CardContent className="space-y-6 p-8 sm:p-10">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our promise</p>
                                <h3 className="mt-2 text-2xl font-semibold text-foreground">Simple, transparent, and dependable.</h3>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-3xl font-bold text-foreground">24/7</p>
                                    <p className="mt-1 text-sm text-muted-foreground">Support for booking questions and service updates.</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-3xl font-bold text-foreground">100%</p>
                                    <p className="mt-1 text-sm text-muted-foreground">Transparent service details before you commit.</p>
                                </div>
                            </div>
                            <AboutPageButton
                                user={user!}>
                                Create an Account
                            </AboutPageButton>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}
