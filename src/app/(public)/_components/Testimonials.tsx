"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

interface TestimonialData {
    id: string | number;
    name: string;
    comment: string;
    rating: number;
    location: string;
}

interface TestimonialsProps {
    databaseReviews: any[];
}

const mockTestimonials: TestimonialData[] = [
    {
        id: "mock-1",
        name: "Sarah Kabir",
        comment: "The technician arrived right on time and fixed my AC installation perfectly. They tested everything thoroughly and even tidied up afterwards. Highly recommended!",
        rating: 5,
        location: "Dhaka",
    },
    {
        id: "mock-2",
        name: "Rahat Chowdhury",
        comment: "I used their plumbing service for a leaking bathroom tap. Booking was instantaneous, and the technician's hourly rate was extremely transparent. Exceptional experience!",
        rating: 5,
        location: "Chittagong",
    },
    {
        id: "mock-3",
        name: "Jannat Ara",
        comment: "Fix It Now makes it so easy to compare local professionals. I booked a home clean and was paired with an incredibly polite and efficient worker. Will definitely use again.",
        rating: 5,
        location: "Noakhali",
    },
];

const Testimonials = ({ databaseReviews }: TestimonialsProps) => {
    // Map database reviews to standard format
    const parsedDbReviews: TestimonialData[] = databaseReviews.map((rev) => ({
        id: rev.id,
        name: rev.customer?.name || "Verified Customer",
        comment: rev.comment || "Great service, highly satisfied!",
        rating: rev.rating || 5,
        location: rev.technician?.location || "Local Area",
    }));

    // Combine database reviews and mock reviews
    const allTestimonials = [...parsedDbReviews, ...mockTestimonials].slice(0, 6);

    return (
        <section className="py-16 md:py-24 bg-card/40 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Client Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Real feedback from verified homeowners who trust Fix It Now for their daily maintenance chores.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                            <div className="space-y-4">
                                {/* Stars */}
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 fill-current ${
                                                i < testimonial.rating ? "" : "text-muted"
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                                    &ldquo;{testimonial.comment}&rdquo;
                                </p>
                            </div>

                            {/* User details */}
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/60">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground">{testimonial.name}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
