"use server"

import { prisma } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createCategory(formData: FormData) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const name = formData.get("name") as string | null
    const icon = formData.get("icon") as string | null
    const color = formData.get("color") as string | null
 
    if(!name?.trim()) throw new Error('Category name is required')

    await prisma.category.create({
        data: {
            userId, 
            name: name.trim(), 
            icon: icon ?? undefined, //default value
            color: color ?? undefined //default value
        }
    })

    revalidatePath('/categories')
    redirect('/categories')
}

export async function updateCategory(id: string, formData: FormData) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const category = await prisma.category.findUnique({where: {id}})
    if(!category || category.userId !== userId) {
        throw new Error('Not found')
    }

    const name = formData.get("name") as string
    const icon = formData.get("icon") as string
    const color = formData.get("color") as string

    await prisma.category.update({
        where: {id},
        data: {name: name.trim(), icon, color}
    })

    revalidatePath('/categories')
    redirect('/categories')
}

export async function deleteCategory(id: string) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const category = await prisma.category.findUnique({
        where: {id},
        include: {_count: {select: {expenses: true}}}
    })

    if(!category || category.userId !== userId) {
        throw new Error('Not found')
    }

    if(category._count.expenses > 0) {
        throw new Error("Cannot delete category with existing expenses. Reassign or delete those expenses first.")
    }

    await prisma.category.delete({where: {id}})
    revalidatePath('/categories')
}

export async function seedDefaultCategories(userId: string) {
    const existing = await prisma.category.count({where: {userId}})
    if(existing > 0) return

    const defaults = [
        {name: "Food", icon: "Utensils", color: "#f97316"},
        {name: "Transport", icon: "Car", color: "#3b82f6"},
        {name: "Shopping", icon: "ShoppingBag", color: "#ec4899"},
        {name: "Bills", icon: "Receipt", color: "#eab308"},
        {name: "Entertainment", icon: "Film", color: "#8b5cf6"},
        {name: "Health", icon: "HeartPulse", color: "#10b981"},
        {name: "Other", icon: "Tag", color: "#6b7280"}
    ]

    await prisma.category.createMany({
        data: defaults.map((c) => ({...c, userId}))
    })
}