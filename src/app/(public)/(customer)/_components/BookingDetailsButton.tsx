import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BookingDetailsButton({ id, classname }: { id: string; classname?: string }) {
    return (
        <Link href={`/bookings/${id}`} className={classname}>
            <Button className="flex w-full cursor-pointer items-center gap-1">
                Booking Details
                <ArrowRight className="size-4" />
            </Button>
        </Link>
    )
}
