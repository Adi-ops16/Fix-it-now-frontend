"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteServiceModalProps {
    onConfirm: () => void | Promise<void>;
}

export default function DeleteServiceModal({ onConfirm }: DeleteServiceModalProps) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false)

    const handleConfirm = async () => {
        setDeleting(true)
        await onConfirm();
        setOpen(false);
        setDeleting(false)
    };

    const triggerButton = (
        <Button variant="destructive" size="icon" className="rounded-xl cursor-pointer">
            <Trash2 className="h-4 w-4" />
        </Button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={triggerButton} />

            <DialogContent className="sm:max-w-xs p-6 text-center">
                <p className="text-sm font-medium text-foreground">
                    Are you sure you want to delete this?
                </p>

                <div className="mt-4 flex items-center justify-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setOpen(false)}
                        className="rounded-xl flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={deleting}
                        type="button"
                        variant={deleting ? "ghost" : "destructive"}
                        size="sm"
                        onClick={handleConfirm}
                        className="rounded-xl flex-1 cursor-pointer"
                    >
                        {deleting ? "Deleting.." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}