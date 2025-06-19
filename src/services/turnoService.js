import { supabase } from '../supabase'

export const getTurnos = async () => {
  const { data, error } = await supabase.from('turnos').select('*')
  if (error) throw error
  return data
}