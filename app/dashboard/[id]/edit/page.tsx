import { prisma } from "@/lib/generated/prisma"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { updateExpense } from "../../action"
import { ExpenseForm } from "@/components/expense-form/ExpenseForm"


async function EditExpensePage({params}: {params: Promise<{id: string}>}) {

    const {id} = await params
    const { userId } = await auth()

    const expense = await prisma.expense.findUnique({where: {id}})
    if(!expense || expense.userId !== userId) notFound()

    const updateWithId = updateExpense.bind(null, id)

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Edit Expense</h1>
        <ExpenseForm 
            action={updateWithId}
            defaultValues={{
                amount: Number(expense.amount),
                category: expense.category,
                description: expense.description,
                date: expense.date
            }}
        />
    </div>
  )
}

export default EditExpensePage