'use server'

import { auth } from "@clerk/nextjs/server"
import {prisma} from "@/lib/generated/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createExpense(formData: FormData) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const amount = parseFloat(formData.get('amount') as string)
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string

    if (!amount || !category || !description || !date) {
        throw new Error('Missing required fields')
    }

    //create a new expense record in the database with the given values
    await prisma.expense.create({
        data:{
            userId,
            amount,
            category,
            description: description || null,
            date: new Date(date)
        }
    })

    //refresh cached /dashboard page so it shows the new data
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function updateExpense(id: string, formData: FormData) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const amount = parseFloat(formData.get('amount') as string)
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string

    //fetch expense by id, then verifies(the authenticated user)
    const expense = await prisma.expense.findUnique({where: { id }})
    if(!expense || expense.userId !== userId) throw new Error('Not found')

    await prisma.expense.update({
        where: ({id}),
        data: {
            amount,
            category,
            description,
            date: new Date(date)
        }
    })

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function deleteExpense(id: string) {
    const {userId} = await auth()
    if(!userId) throw new Error('Unauthorized')

    const expense = await prisma.expense.findUnique({where: {id}})
    if(!expense || expense.userId !== userId) throw new Error('Not found')

    await prisma.expense.delete({where: {id}})

    revalidatePath('/dashboard')
}