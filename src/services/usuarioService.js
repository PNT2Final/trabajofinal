import { supabase } from '../supabase'

export const getUsuarios = async () => {
  const { data, error } = await supabase.from('usuarios').select('*')
  if (error) throw error
  return data
}

