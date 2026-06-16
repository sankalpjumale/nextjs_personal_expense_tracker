import { deleteExpense } from '@/app/dashboard/action'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import type { Expense } from '@/types/expense'
import * as Icons from 'lucide-react'

function ExpenseItem({expense}: {expense: Expense}) {

    const deleteWithId = deleteExpense.bind(null, expense.id)
    const IconComp = (Icons as any)[expense.category.icon] ?? Icons.Tag

  return (
    <TableRow>
        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>

        <TableCell>
            <span
                className='inline-flex items-center gap-1.5 rounded-full px.2.5 py-1 text-xs font-medium'
                style={{
                    backgroundColor: expense.category.color + '20',
                    color: expense.category.color
                }}
            >
                <IconComp className="h-3.5 w-3.5"/>
                {expense.category.name}
            </span>
        </TableCell>

        <TableCell>{expense.description || '-'}</TableCell>

        <TableCell className='text-right font-medium'>${Number(expense.amount).toFixed(2)}</TableCell>

        <TableCell className='text-right space-x-2'>
            <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/${expense.id}/edit`}>Edit</Link>
            </Button>
            <form action={deleteWithId} className="inline">
                <Button type='submit' variant="destructive" size="sm">Delete</Button>
            </form>
        </TableCell>
    </TableRow>
  )
}

export default ExpenseItem