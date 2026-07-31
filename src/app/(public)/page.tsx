import React from "react";
import Hero from "./_components/Hero";
import StatsSection from "./_components/StatsSection";
import CategoriesShowcase from "./_components/CategoriesShowcase";
import FeaturedServices from "./_components/FeaturedServices";
import HowItWorks from "./_components/HowItWorks";
import TopTechnicians from "./_components/TopTechnicians";
import Testimonials from "./_components/Testimonials";
import TechnicianCTA from "./_components/TechnicianCTA";
import Footer from "./_components/Footer";
import { getHomeCategories, getHomeServices, getHomeTechnicians } from "@/service/homeService";

export const revalidate = 600; // revalidate page every 10 minutes

export default async function Home() {
    // Parallel server-side fetching for speed and SEO optimization
    const [categories, services, technicians] = await Promise.all([
        getHomeCategories(),
        getHomeServices(4),
        getHomeTechnicians(4)
    ]);

    return (
        <main className="min-h-screen flex flex-col bg-background text-foreground">
            {/* 1. Hero Header & Quick Services Search */}
            <Hero />

            {/* 2. Brand Trust & Value Stats */}
            <StatsSection />

            {/* 3. Core Service Categories */}
            <CategoriesShowcase categories={categories} />

            {/* 4. Popular Services Listing */}
            <FeaturedServices services={services} />

            {/* 5. Process Walkthrough - How It Works */}
            <HowItWorks />

            {/* 6. Experienced Personnel Showcase */}
            <TopTechnicians technicians={technicians} />

            {/* 7. Client Reviews and Feedback */}
            <Testimonials databaseReviews={[]} />

            {/* 8. Partner Acquisition banner */}
            <TechnicianCTA />

            {/* Footer */}
            <Footer />
        </main>
    );
}
