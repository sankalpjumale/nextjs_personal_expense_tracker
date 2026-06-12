import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

function TotalSummaryCard({total}: {total: number}) {
  return (
    <Card className='max-w-xs'>
        <CardHeader>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
                This month's spending.
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-3xl font-bold'>Rs.{total.toFixed(2)}</p>
        </CardContent>
    </Card>
  )
}

export default TotalSummaryCard