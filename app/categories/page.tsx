import { auth } from "@clerk/nextjs/server";
import { createCategory, seedDefaultCategories } from "./action";
import { prisma } from "@/lib/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryForm from "@/components/category-form/CategoryForm";
import CategoryList from "@/components/category-list/CategoryList";


export default async function Categoriespage() {
    const {userId} = await auth()
    if(!userId) return null

    await seedDefaultCategories(userId)

    const categories = await prisma.category.findMany({
        where: {userId},
        include: {_count: {select: {expenses: true}}},
        orderBy: {name: "asc"}
    })

    return (
        <div className="container mx-auto max-w-2xl py-8 space-y-6">
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
                    <CategoryList categories={categories} />
                </CardContent>
            </Card>

        </div>
    )
}

