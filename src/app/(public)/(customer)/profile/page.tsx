import { getMyProfile } from '@/service/getMyProfile'
import { CustomerProfileForm } from '../_components/CustomerProfileForm'

export default async function ProfilePage() {
    const result = await getMyProfile()
    const user = result?.data

    if (!user) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
                Failed to load customer profile.
            </div>
        )
    }

    return <div className='flex justify-center items-center'>
        <CustomerProfileForm user={user} />
    </div>
}