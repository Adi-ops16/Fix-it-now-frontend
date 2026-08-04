"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PenLineIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategorySchema, TCreateCategoryPayload } from "../schema/categorySchema";
import { createCategory } from "../_actions/categoriesAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCategoryForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TCreateCategoryPayload>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (data: TCreateCategoryPayload) => {
        const result = await createCategory(data)
        if (result?.success) {
            toast.success(result.message)
            router.push("/admin-dashboard/all-categories")
        } else {
            toast.error(result?.message)
            reset()
        }
    };

    return (
        <Card className="w-lg">
            <CardHeader className="text-lg">
                Category Form
            </CardHeader>

            <CardDescription className="px-6">
                Give a name and description to create a service category.
            </CardDescription>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Category Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Enter category name"
                            disabled={isSubmitting}
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Category Description
                        </Label>

                        <Textarea
                            id="description"
                            rows={5}
                            placeholder="Describe this category..."
                            disabled={isSubmitting}
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-32 items-center gap-2 cursor-pointer"
                        >
                            <PenLineIcon className="h-4 w-4" />
                            {isSubmitting ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}