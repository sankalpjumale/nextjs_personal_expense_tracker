export type Expense = {
    id: string
    userId: string
    amount: number
    category: string
    description: string | null
    date: Date
    createdAt: Date
    updatedAt: Date
}

export const CATEGORIES = [
    'Food',
    'Groceries',
    'Transport',
    'Housing',
    'Utilities',
    'Entertainment',
    'Health',
    'Shopping',
    'Other'
] as const