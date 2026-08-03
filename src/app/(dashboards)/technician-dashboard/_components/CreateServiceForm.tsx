"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createServiceSchema } from "../_schema";
import { createService } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Category = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    categories: Category[];
};

type FormValues = z.infer<typeof createServiceSchema>;

export default function CreateServiceForm({ categories }: Props) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 1,
            estimated_time: 1,
            category_id: undefined,
            location: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        const result = await createService(data)
        if (!result?.success) {
            toast.error(result?.message)
        } else {
            router.push("/technician-dashboard/my-services")
            toast.success(result.message)
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-xl border bg-background p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Create Service</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input
                        id="title"
                        placeholder="AC Installation"
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        rows={5}
                        placeholder="Describe the service..."
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Price & Estimated Time */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                            id="price"
                            type="number"
                            min={1}
                            {...register("price", { valueAsNumber: true })}
                        />
                        {errors.price && (
                            <p className="text-sm text-destructive">{errors.price.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estimated_time">Estimated Time (minutes)</Label>
                        <Input
                            id="estimated_time"
                            type="number"
                            min={1}
                            {...register("estimated_time", { valueAsNumber: true })}
                        />
                        {errors.estimated_time && (
                            <p className="text-sm text-destructive">
                                {errors.estimated_time.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Category Dropdown (FIXED) */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Controller
                        control={control}
                        name="category_id"
                        render={({ field }) => {
                            const selectedCategory = categories.find(
                                (c) => c.id === Number(field.value)
                            );
                            return (
                                <Select
                                    value={field.value !== undefined && field.value !== null ? String(field.value) : ""}
                                    onValueChange={(val) => field.onChange(Number(val))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" >{selectedCategory?.name}</SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        }}
                    />

                    {errors.category_id && (
                        <p className="text-sm text-destructive">
                            {errors.category_id.message}
                        </p>
                    )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        placeholder="Dhaka"
                        {...register("location")}
                    />
                    {errors.location && (
                        <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
                    {isSubmitting ? "Creating.." : "Create Service"}
                </Button>
            </form>
        </div>
    );
}