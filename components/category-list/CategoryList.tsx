
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/app/categories/action";
import Link from "next/link";

interface CategoryListProps {
    categories: {
        id: string
        name: string
        icon: string
        color: string
        _count: {expenses: number}
    }[]
}

function CategoryList({categories}: CategoryListProps) {

    if(categories.length === 0) {
        return <p className="text-muted-foreground">No categories yet.</p>
    }

  return (
    <div className="space-y-2">
         {categories.map((category) => {
        const IconComp = (Icons as any)[category.icon] ?? Icons.Tag;
        return (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: category.color + "20" }}
              >
                <IconComp className="h-5 w-5" style={{ color: category.color }} />
              </div>
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category._count.expenses} expense
                  {category._count.expenses !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/categories/${category.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <form action={deleteCategory.bind(null, category.id)}>
                <Button
                  variant="destructive"
                  size="sm"
                  type="submit"
                  disabled={category._count.expenses > 0}
                >
                  Delete
                </Button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default CategoryList