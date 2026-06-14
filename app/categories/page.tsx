import { auth } from "@clerk/nextjs/server";
import { seedDefaultCategories } from "./action";
import { prisma } from "@/lib/generated/prisma";




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
        <div>
            Card
        </div>
    )
}