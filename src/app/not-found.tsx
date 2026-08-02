"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ShieldAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,250,252,1))] px-4 py-16 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_45%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,1))] flex justify-center items-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border/70 bg-background/80 p-8 text-center shadow-2xl shadow-primary/10 backdrop-blur sm:p-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <ShieldAlert className="h-8 w-8" />
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Route not Found</p>

                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    The route you tried to open is invalid. Please go back or return to home.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/" className=''>
                        <Button size="lg" className='flex gap-2 items-center cursor-pointer'>
                            <Home className="h-4 w-4" />
                            Return home
                        </Button>
                    </Link>
                    <Button onClick={() => router.back()} variant="outline" size="lg">
                        Go to Back
                    </Button>
                </div>
            </div>
        </div>
    )
}
