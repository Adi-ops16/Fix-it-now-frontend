"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IService, ServiceUpdateFormValues } from "@/app/(public)/services/_types/serviceTypes";
import { Edit3 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceUpdateSchema } from "../_schema";
import { updateService } from "../_actions";
import { toast } from "sonner";

interface ServiceEditModalProps {
    service: IService;
    trigger?: React.ReactNode;
}

export default function ServiceEditModal({ service, trigger }: ServiceEditModalProps) {
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<ServiceUpdateFormValues>({
        resolver: zodResolver(serviceUpdateSchema),
        defaultValues: {
            title: service.title ?? "",
            description: service.description ?? "",
            estimated_time: service.estimated_time ?? 0,
            price: service.price ?? 0,
            location: service.location ?? "",
        },
    });

    const onSubmit = async (values: ServiceUpdateFormValues, id: number) => {
        const result = await updateService(values, id)
        if (!result?.success) {
            toast.error(result?.message)
        } else {
            toast.success("Service updated successfully")
            reset(values)
            setOpen(false)
        }
    };

    const defaultTrigger = (
        <Button variant="secondary" className="flex-1 w-full rounded-xl cursor-pointer">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit
        </Button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={defaultTrigger} className="flex-1 w-full">
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit service</DialogTitle>
                    <DialogDescription>Update the details for this service below.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit((data) => onSubmit(data, Number(service.id)))} className="space-y-4 py-2">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" {...register("title", { required: true })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" step="0.01" {...register("price", { required: true, valueAsNumber: true })} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={4} {...register("description", { required: true })} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="estimated_time">Estimated time (minutes)</Label>
                            <Input id="estimated_time" type="number" {...register("estimated_time", { required: true, valueAsNumber: true })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" {...register("location", { required: true })} />
                        </div>
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            variant={isSubmitting ? "ghost" : "default"}
                            disabled={isSubmitting}
                            type="submit">
                            {isSubmitting ? "Updating.." : "Update service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}