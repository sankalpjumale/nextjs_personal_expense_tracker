import { prisma } from "@/lib/generated/prisma"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { updateExpense } from "../../action"
import { ExpenseForm } from "@/components/expense-form/ExpenseForm"


async function EditExpensePage({params}: {params: Promise<{id: string}>}) {

    const {id} = await params
    const { userId } = await auth()
    if(!userId) return null

    const expense = await prisma.expense.findUnique({
        where: {id},
        include: {category: true}})
    if(!expense || expense.userId !== userId) notFound()

    const categories = await prisma.category.findMany({
        where: {userId},
        orderBy: {name: 'asc'}
    })

    const updateWithId = updateExpense.bind(null, id)

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Edit Expense</h1>
        <ExpenseForm 
            action={updateWithId}
            categories={categories}
            defaultValues={{
                amount: Number(expense.amount),
                categoryId: expense.categoryId,
                description: expense.description,
                date: expense.date
            }}
        />
    </div>
  )
}

export default EditExpensePage