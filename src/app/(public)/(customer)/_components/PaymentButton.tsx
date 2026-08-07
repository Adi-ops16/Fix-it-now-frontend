"use client"

import { Button } from "@/components/ui/button"
import React, { useTransition } from "react"
import { createPayment } from "../_actions/paymentActions"
import { toast } from "sonner"
import { DollarSign } from "lucide-react"

export default function PaymentButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handlePayment = (bookingId: string) => {
        startTransition(async () => {
            const res = await createPayment(bookingId)
            if (res && !res.success) {
                toast.error(res.message)
            }
        })
    }

    return (
        <Button
            onClick={() => handlePayment(id)}
            disabled={isPending}
            variant="secondary"
            className="cursor-pointer flex-1"
        >
            <DollarSign />
            {isPending ? "Processing..." : "Pay Now"}
        </Button>
    )
}