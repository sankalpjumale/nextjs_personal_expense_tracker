'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CATEGORIES, type Expense } from '@/types/expense'

type Props = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Partial<Expense>
}

export function ExpenseForm({ action, defaultValues }: Props) {
  const defaultDate = defaultValues?.date
    ? new Date(defaultValues.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  return (
    <form action={action} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={defaultValues?.amount}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          required
          defaultValue={defaultValues?.category ?? ''}
          className="border rounded-md h-9 px-3 text-sm bg-background"
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description (optional)</Label>
        <Input
          id="description"
          name="description"
          type="text"
          defaultValue={defaultValues?.description ?? ''}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={defaultDate}
        />
      </div>

      <Button type="submit">
        {defaultValues ? 'Update Expense' : 'Add Expense'}
      </Button>
    </form>
  )
}