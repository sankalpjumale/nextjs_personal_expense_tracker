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