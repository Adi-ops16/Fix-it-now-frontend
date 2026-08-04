"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import { ICategory } from "../_types/categoryTypes";
import { deleteCategory } from "../_actions/categoriesAction";
import { toast } from "sonner";

export default function CategoriesTable({
    categories,
}: {
    categories: ICategory[];
}) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteCategory = async (categoryId: number) => {
        setIsDeleting(true);
        const result = await deleteCategory(categoryId);
        if (result.success) {
            toast.success(result.message || "Category deleted successfully");
            setIsDeleting(false);
        } else {
            toast.error(result.message || "Failed to delete category");
        }
    }

    return (
        <>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>

                            <TableHead>
                                Description
                            </TableHead>

                            <TableHead className="w-40 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">
                                    {category.name}
                                </TableCell>

                                <TableCell className="max-w-lg truncate">
                                    {category.description}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            className={"cursor-pointer"}
                                            variant="outline"
                                            onClick={() =>
                                                setSelectedCategory(
                                                    category
                                                )
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            className={"cursor-pointer"}
                                            variant={isDeleting ? "ghost" : "destructive"}
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >

            <UpdateCategoryDialog
                category={selectedCategory}
                open={!!selectedCategory}
                onOpenChange={(open: boolean) => {
                    if (!open) {
                        setSelectedCategory(null);
                    }
                }}
            />
        </>
    );
}