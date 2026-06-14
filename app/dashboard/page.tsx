import ExpenseList from "@/components/expense-list/ExpenseList"
import TotalSummaryCard from "@/components/total-summary-card/TotalSummaryCard"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/generated/prisma"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default async function DashboardPage() {

    const {userId} = await auth()
    if(!userId) return null

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

    const expenses = await prisma.expense.findMany({
        where: {userId},
        orderBy: {date: 'desc'}
    })

    const monthlyTotal = expenses
        .filter((e) => e.date >= startOfMonth && e.date <=endOfMonth)
        .reduce((sum: number, e) => sum + Number(e.amount), 0)

    const formattedExpenses = expenses.map((e) => ({
        ...e,
        amount: Number(e.amount),
    }))

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Button asChild>
                    <Link href="/dashboard/new">Add Expense</Link>
                </Button>
            </div>

            <TotalSummaryCard total={monthlyTotal}/>

            <div>
                <h2 className="text-lg font-semibold mb-3">All Expenses</h2>
                <ExpenseList expenses={formattedExpenses} />
            </div>
        </div>
    )
}