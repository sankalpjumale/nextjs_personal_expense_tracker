import { Category } from "@prisma/client"

export type Expense = {
    id: string
    userId: string
    amount: number |string
    categoryId: string
    category: Category
    description: string | null
    date: Date | string
    createdAt: Date
    updatedAt: Date
}

// export const CATEGORIES = [
//     'Food',
//     'Groceries',
//     'Transport',
//     'Housing',
//     'Utilities',
//     'Entertainment',
//     'Health',
//     'Shopping',
//     'Other'
// ] as const