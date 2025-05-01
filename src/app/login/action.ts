'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.error('Login error:', error.message)
      // You might want to redirect to a login page with an error parameter
      return { success: false, error: error.message }
    }

    // If login successful
    revalidatePath('/', 'layout')
  } catch (err) {
    console.error('Unexpected login error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }

  // Redirect outside of try/catch
  redirect('/')
} 