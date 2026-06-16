'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Category} from '@/types/category'
import { Expense } from '@/types/expense'

type Props = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Partial<Expense>
  categories: Category[]
}

export function ExpenseForm({ action, defaultValues, categories }: Props) {
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
          defaultValue={defaultValues?.amount as any}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={defaultValues?.categoryId ?? ''}
          className="border rounded-md h-9 px-3 text-sm bg-background"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
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


