import React from 'react'

function Loading() {
  return (
    <div className='flex flex-col gap-6 animate-pulse'>
        <div className='h-8 w-48 bg-muted rounded'/>
        <div className='h-24 w-64 bg-muted rounded'/>
        <div className='h-64 w-full bg-muted rounded'/>
    </div>
  )
}

export default Loading