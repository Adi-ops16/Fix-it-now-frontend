"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "../_types/categoryTypes"; import { TUpdateCategoryPayload, updateCategorySchema } from "../schema/categorySchema";
import { updateCategory } from "../_actions/categoriesAction";
import { toast } from "sonner";

type Props = {
    category: ICategory | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function UpdateCategoryDialog({
    category,
    open,
    onOpenChange,
}: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
            isSubmitting,
        },
    } = useForm<TUpdateCategoryPayload>({
        resolver: zodResolver(updateCategorySchema),
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                description: category.description,
            });
        }
    }, [category, reset]);

    const onSubmit = async (data: TUpdateCategoryPayload) => {
        const result = await updateCategory(data, category?.id!);

        if (result?.success) {
            toast.success(result.message);
            onOpenChange(false);
        } else {
            toast.error(result?.message || "Failed to update category");
            reset(data)
        }

    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Update Category
                    </DialogTitle>

                    <DialogDescription>
                        Edit the category details.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Description
                        </Label>

                        <Textarea
                            rows={5}
                            {...register(
                                "description"
                            )}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {
                                    errors.description
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className={"cursor-pointer"}
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className={"cursor-pointer"}
                            disabled={
                                !isDirty ||
                                isSubmitting
                            }
                        >
                            {isSubmitting ? "Update..." : "Update Category"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}