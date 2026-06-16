'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { useState } from "react";

const ICON_OPTION = [
    "Tag", "Utensils", "Car", "ShoppingBag", "Receipt", "Film", "HeartPulse", "Home", "Plane", "Gift", "Coffee", "Book", "Briefcase", "Smartphone", "Fuel",
]

interface CategoryFormProps {
    action: (formData: FormData) => Promise<void>
    defaultValues?: {name?: string; icon?: string; color?: string}
}

function CategoryForm({action, defaultValues}: CategoryFormProps) {

    const [icon, setIcon] = useState(defaultValues?.icon ?? "Tag")
    const [color, setColor] = useState(defaultValues?.color ?? "#6366f1")

  return (
    <form action={action} className="flex flex=col gap-4 max-w-md">
        <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input 
                id="name"
                name="name"
                type="text"
                required
                defaultValue={defaultValues?.name}
                placeholder="e.g. Groceries"
            />
        </div>

        <div className="flex flex-col gap-1.5">
            <Label>Icon</Label>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                {ICON_OPTION.map((iconName) => {
                    const IconComp = (Icons as any)[iconName] ?? Icons.Tag
                    return (
                        <button
                            type="button"
                            key={iconName}
                            onClick={() => setIcon(iconName)}
                            className={`flex items-center justify-center rounded-md border p-2 transition-colors ${
                                icon === iconName
                                    ? 'border-primary bg-primary/10'
                                    : 'border-input hover:bg-accent'
                            }`}
                        >
                            <IconComp className="h-5 w-5" />
                        </button>
                    )
                })}
            </div>
            <input type="hidden" name="icon" value={icon} />
        </div>

        <div className="flex flex-col gap-1.5">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-3">
                <input 
                    id="color"
                    type="color"
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-16 rounded border border-input cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">{color}</span>
            </div>
            <input type="hidden" name="color" value={color} />
        </div>

        <Button type="submit">{defaultValues ? 'Update Category' : 'Add Category'}</Button>
    </form>
  )
}

export default CategoryForm
