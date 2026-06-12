import { Button } from '@/components/ui/button'
import React from 'react'

function Error({
    error,
    reset
}: {
    error: Error & {digest?: string} 
    reset: () => void
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-16'>
        <h2 className='text-xl font-semibold '>Something went wrong</h2>
        <p className='text-muted-foreground text-sm'>{error.message}</p>
        <Button onClick={reset}>Try again</Button>
    </div>
  )
}

export default Error