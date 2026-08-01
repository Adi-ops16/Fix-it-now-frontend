"use client"
import { motion } from "framer-motion";
import { Clock3, MapPin, Wrench } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ServiceDetailsButton from "./ServiceDetailsButton";
import { IService } from "../_types/serviceTypes";

interface Props {
    service: IService;
}

export default function ServiceCard({ service }: Props) {
    const { category, technician, location, estimated_time, price, title, description } = service
    const { name: categoryName } = category || {}
    const { experience_year, name, location: technicianLocation } = technician || {}

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="group h-full"
        >
            <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/20 via-background to-secondary/30 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">

                <div className="px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background/80 shadow-sm">
                            <Wrench className="size-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                            {categoryName}
                        </Badge>
                    </div>
                </div>

                <CardContent className="flex flex-1 flex-col px-5">
                    <div>
                        <h2 className="line-clamp-1 text-lg font-semibold text-foreground">
                            {title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3 text-sm">
                        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Technician details
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground">
                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                    {name}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                                    {experience_year} yrs experience
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5">
                            <MapPin className="size-3.5" />
                            <span>{location || technicianLocation}</span>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="mb-3 flex items-end justify-between">
                        <p className="text-md font-semibold uppercase tracking-wide text-muted-foreground">
                            Price: <span className="font-bold text-lg text-primary">${price}</span>
                        </p>
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3">
                            <Clock3 className="size-3.5" />
                            <span>Estimated Time: {estimated_time} mins</span>
                        </div>
                    </div>
                    <ServiceDetailsButton id={service.id} />
                </CardContent>
            </Card>
        </motion.div>
    );
}