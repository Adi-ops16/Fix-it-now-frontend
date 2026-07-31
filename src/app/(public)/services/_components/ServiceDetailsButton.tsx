import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ServiceDetailsButton = ({ id }: { id: number }) => {
    return <Button className={"cursor-pointer"}>
        <Link href={`/services/${id}`} className='flex gap-1 items-center'>
            Service Details
            <ArrowRight className="size-4" />
        </Link>
    </Button>;
};

export default ServiceDetailsButton;
