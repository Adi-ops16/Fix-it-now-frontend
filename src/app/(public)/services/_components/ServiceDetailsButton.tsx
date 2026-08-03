import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ServiceDetailsButton = ({ id, classname }: { id: number, classname?: string }) => {
    return <Link href={`/services/${id}`} className={classname}>
        <Button className={"cursor-pointer flex gap-1 items-center w-full"}>
            Service Details
            <ArrowRight className="size-4" />
        </Button>
    </Link>
};

export default ServiceDetailsButton;
