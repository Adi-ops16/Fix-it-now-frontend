import { getMyProfile } from "@/service/getMyProfile"
import Navbar from "@/shared/Navbar"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const result = await getMyProfile()
    const user = result.data ?? null

    return <div>
        <Navbar user={user} />
        {children}
    </div>
}

export default DashboardLayout