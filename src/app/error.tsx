'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Unhandled app error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-border/70 bg-popover p-8 shadow-xl shadow-black/5">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <span className="text-3xl">⚠️</span>
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            The app encountered an error while rendering the page. You can try again or return home.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-muted/80 p-4 text-left text-sm text-foreground/80">
          <p className="font-medium">Error message:</p>
          <pre className="mt-2 max-h-40 overflow-auto text-xs leading-relaxed">{error.message}</pre>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto" onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full">
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
