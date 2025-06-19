import { supabase } from '../supabase'

export const inscribirUsuario = async (usuarioId, turnoId) => {
  const { error } = await supabase.from('inscripciones').insert([
    {
      usuario_id: usuarioId,
      turno_id: turnoId,
      fecha_inscripcion: new Date().toISOString()
    }
  ])
  return !error
}

export const getInscripciones = async () => {
  const { data, error } = await supabase.from('inscripciones').select('*')
  return error ? [] : data
}
