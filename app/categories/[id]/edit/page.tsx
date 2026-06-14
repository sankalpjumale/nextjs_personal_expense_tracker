import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { updateCategory } from '../../action'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CategoryForm from '@/components/category-form/CategoryForm'
import { prisma } from '@/lib/generated/prisma'

async function EditCategoryPage({
    params
}: {params: Promise<{id: string}>}) {

    const {id} = await params
    const {userId} = await auth()
    if(!userId) return null

    const category = await prisma.category.findUnique({where: {id}})
    if(!category || category.userId !== userId) notFound()

    const updateWithId = updateCategory.bind(null, id)

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Edit Category</CardTitle>
            </CardHeader>
            <CardContent>
                <CategoryForm action={updateWithId} defaultValues={category}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default EditCategoryPage