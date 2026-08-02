import { NextResponse, type NextRequest } from 'next/server'
import { getTokenDetails } from './service/getToken'

const PUBLIC_ROUTES = ['/', '/about']
const PUBLIC_PREFIXES = ['/services/']
const AUTH_ROUTES = ['/login', '/register']
const CUSTOMER_ROUTES = ["/bookings", "/profile", "/payment", "/payment-successful", "/payment-cancelled", "/be-a-technician"]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const { token, tokenPayload } = await getTokenDetails()
    const role = tokenPayload?.tokenData?.role

    // Helpers to evaluate routes
    const isPublicRoute =
        PUBLIC_ROUTES.includes(pathname) ||
        PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))

    const isAuthRoute = AUTH_ROUTES.includes(pathname)
    const isCustomerRoute = CUSTOMER_ROUTES.some((route) => pathname.startsWith(route))
    const isAdminPath = pathname.startsWith('/admin-dashboard')
    const isTechnicianPath = pathname.startsWith('/technician-dashboard')

    // 1. Unauthenticated users handling
    if (!token) {
        if (isPublicRoute || isAuthRoute) {
            return NextResponse.next()
        }
        return NextResponse.rewrite(new URL('/not-found', request.url))
    }

    // 2. Redirect logged-in users away from auth pages 
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 3. ADMIN role restrictions & dashboard route normalization
    if (role === 'ADMIN') {
        if (isTechnicianPath || isCustomerRoute) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }

        if (pathname === '/admin-dashboard' || pathname === '/admin-dashboard/') {
            return NextResponse.redirect(new URL('/admin-dashboard/my-profile', request.url))
        }

        return NextResponse.next()
    }

    // 4. TECHNICIAN role restrictions & dashboard route normalization
    if (role === 'TECHNICIAN') {
        if (isAdminPath || isCustomerRoute) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }

        if (pathname === '/technician-dashboard' || pathname === '/technician-dashboard/') {
            return NextResponse.redirect(new URL('/technician-dashboard/my-profile', request.url))
        }

        return NextResponse.next()
    }

    // 5. CUSTOMER / STANDARD USER role
    if (role === 'CUSTOMER') {
        if (isAdminPath || isTechnicianPath) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }

        // Allow if customer route or public route
        if (isCustomerRoute || isPublicRoute) {
            return NextResponse.next()
        }

        return NextResponse.rewrite(new URL('/not-found', request.url))
    }

    // 6. Fallback for public routes
    if (isPublicRoute) {
        return NextResponse.next()
    }

    return NextResponse.rewrite(new URL('/not-found', request.url))
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|map)$).*)',
    ],
}