'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  try {
    const { error } = await supabase.auth.signUp(data)

    if (error) {
      console.error('Signup error:', error.message)
      return { success: false, error: error.message }
    }

    // If signup successful
    revalidatePath('/', 'layout')
  } catch (err) {
    console.error('Unexpected signup error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }

  // Redirect outside of try/catch
  redirect('/login?message=Check your email to confirm your account')
}