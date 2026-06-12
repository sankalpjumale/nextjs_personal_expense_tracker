import { ExpenseForm } from '@/components/expense-form/ExpenseForm'
import { createExpense } from '../action'

function NewExpensePage() {
  return (
    <div>
        <h1 className='text-2xl font-bold mb-6'>Add Expense</h1>
        <ExpenseForm action={createExpense}/>
    </div>
  )
}

export default NewExpensePage