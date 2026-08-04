import React from 'react'
import CreateCategoryForm from '../../_components/CreateCategoryForm'

export default function CreateCategoryPage() {
    return (
        <div className='py-5 lg:py-10'>
            <h1 className='text-3xl font-bold text-primary text-center mb-5 lg:mb-14'>Create Category</h1>
            <div className='flex justify-center items-center'>
                <CreateCategoryForm />
            </div>
        </div>
    )
}
