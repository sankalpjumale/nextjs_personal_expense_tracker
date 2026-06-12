import type { Expense } from '@/types/expense'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import ExpenseItem from '../expense-items/ExpenseItem'

function ExpenseList({expenses}: {expenses: Expense[]}) {

    if(expenses.length === 0) {
        return (
            <p className='text-muted-foreground text-center py-8'>No expenses yet. Add your first one!</p>
        )
    }

  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense ={expense}/>
            ))}
        </TableBody>
    </Table>
  )
}

export default ExpenseList