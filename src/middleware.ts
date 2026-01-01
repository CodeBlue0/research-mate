import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    // 1. Run the standard Supabase session refresh
    // We need to capture the response to potentially modify it or return it
    let response = await updateSession(request)

    // 2. Custom Route Protection Logic
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // Public paths that don't need protection
    // /auth/callback is essential for the OAuth flow
    const isPublicPath =
        path === '/login' ||
        path.startsWith('/auth') ||
        path === '/' ||
        path.startsWith('/_next') ||
        path.startsWith('/static') ||
        path.includes('.') // images, etc.

    // If user is NOT logged in and trying to access protected route
    if (!user && !isPublicPath) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // If user IS logged in
    if (user) {
        // If trying to access login page, redirect to dashboard
        if (path === '/login') {
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }

        // Check for onboarding (only for navigation to main pages, skip assets/api)
        // Avoid checking on every single request if possible, but for now we enforce it.
        // Skip checking if we are already on onboarding
        if (!path.startsWith('/onboarding') && !path.startsWith('/api') && !path.startsWith('/_next') && !path.includes('.')) {
            // We need to check if the user has a profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            // If no profile, they must go to onboarding
            if (!profile) {
                const url = request.nextUrl.clone()
                url.pathname = '/onboarding'
                return NextResponse.redirect(url)
            }
        }

        // If user is trying to access onboarding but HAS a profile, redirect to dashboard
        if (path.startsWith('/onboarding')) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (profile) {
                const url = request.nextUrl.clone()
                url.pathname = '/dashboard'
                return NextResponse.redirect(url)
            }
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
