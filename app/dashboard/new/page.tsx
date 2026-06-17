import { ExpenseForm } from '@/components/expense-form/ExpenseForm'
import { createExpense } from '../action'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/generated/prisma'

async function NewExpensePage() {

  const {userId} = await auth()
  if(!userId) return null

  const categories = await prisma.category.findMany({
    where: {userId},
    orderBy: {name: 'asc'}
  })

  return (
    <div>
        <h1 className='text-2xl font-bold mb-6'>Add Expense</h1>
        <ExpenseForm action={createExpense} categories={categories}/>
    </div>
  )
}

export default NewExpensePage