import { getMyProfile } from "@/service/getMyProfile"
import Navbar from "@/components/shared/Navbar"
import Footer from "./_components/Footer"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const result = await getMyProfile()
    const user = result.data ?? null

    return <div className="flex flex-col justify-between min-h-screen">
        <Navbar user={user} />
        <div className="pt-16 flex-1">
            {children}
        </div >
        <Footer />
    </div >
}

export default DashboardLayout