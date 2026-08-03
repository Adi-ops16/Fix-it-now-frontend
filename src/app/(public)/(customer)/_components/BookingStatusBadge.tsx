import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { BookingStatus } from '../_types'

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
    REQUESTED: {
        label: 'Requested',
        className: 'bg-pending text-pending-foreground',
    },
    ACCEPTED: {
        label: 'Accepted',
        className: 'bg-accepted text-accepted-foreground',
    },
    IN_PROGRESS: {
        label: 'In Progress',
        className: 'bg-in-progress text-in-progress-foreground',
    },
    COMPLETED: {
        label: 'Completed',
        className: 'bg-completed text-completed-foreground',
    },
    CANCELLED: {
        label: 'Cancelled',
        className: 'bg-cancelled text-cancelled-foreground',
    },
    PAID: {
        label: 'Paid',
        className: 'bg-completed text-completed-foreground',
    },
}

export default function BookingStatusBadge({ status }: { status: BookingStatus }) {
    const config = statusConfig[status]

    return (
        <Badge className={cn('rounded-full px-3 py-1 text-xs font-medium', config.className)}>
            {config.label}
        </Badge>
    )
}
