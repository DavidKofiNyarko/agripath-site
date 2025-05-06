import { supabase } from './api';

export const signIn = async () => {
//   const { user, error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) throw error;
//   return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
