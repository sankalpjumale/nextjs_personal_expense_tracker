import { deleteExpense } from '@/app/dashboard/action'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import type { Expense } from '@/types/expense'

function ExpenseItem({expense}: {expense: Expense}) {

    const deleteWithId = deleteExpense.bind(null, expense.id)

  return (
    <TableRow>
        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>

        <TableCell>{expense.category}</TableCell>

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