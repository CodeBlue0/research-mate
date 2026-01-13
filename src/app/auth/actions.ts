'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Type-casting here for simplicity, but in a real app you might want to validate
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/onboarding')
}

export async function signInWithGoogle() {
    const supabase = await createClient()

    const getUrl = () => {
        let url = process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            process.env.VERCEL_URL ?? // System env var on Vercel
            'http://localhost:3000/'

        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing slash
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${getUrl()}auth/callback`,
        },
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const name = formData.get('name') as string
    const school_level = formData.get('school_level') as string
    const grade = parseInt(formData.get('grade') as string)
    const career_interest = formData.get('career_interest') as string

    // Validate inputs
    if (!name || !school_level || !grade || !career_interest) {
        return { error: 'All fields are required' }
    }

    // Check constraint for school level
    if (!['elementary', 'middle', 'high'].includes(school_level)) {
        return { error: 'Invalid school level' }
    }

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            name,
            school_level,
            grade,
            career_interest,
            updated_at: new Date().toISOString(),
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
