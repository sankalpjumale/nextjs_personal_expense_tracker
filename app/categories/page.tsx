import { auth } from "@clerk/nextjs/server";
import { createCategory, seedDefaultCategories } from "./action";
import { prisma } from "@/lib/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryList } from "@/components/category-list/CategoryList";
import { CategoryForm } from "@/components/category-form/CategoryForm";


export default async function Categoriespage() {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    await seedDefaultCategories(userId)

    const categories = await prisma.category.findMany({
        where: {userId},
        include: {_count: {select: {expenses: true}}},
        orderBy: {name: "asc"}
    })

    return (
        <div className="container mx-auto max-w-3xl py-8 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add category</CardTitle>
                </CardHeader>

                <CardContent>
                    <CategoryForm action={createCategory}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your categories</CardTitle>
                </CardHeader>

                <CardContent>
                    <CategoryForm categories={categories}/>
                </CardContent>
            </Card>

        </div>
    )
}