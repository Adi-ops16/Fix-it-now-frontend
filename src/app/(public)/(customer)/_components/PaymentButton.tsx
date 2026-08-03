"use client"

import { Button } from "@/components/ui/button"
import React, { useTransition } from "react"
import { createPayment } from "../_actions/paymentActions"
import { toast } from "sonner"

export default function PaymentButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handlePayment = () => {
        startTransition(async () => {
            const res = await createPayment(id)
            if (res && !res.success) {
                toast.error(res.message)
            }
        })
    }

    return (
        <Button
            onClick={handlePayment}
            disabled={isPending}
            variant="secondary"
            className="cursor-pointer flex-1"
        >
            {isPending ? "Processing..." : "Pay Now"}
        </Button>
    )
}