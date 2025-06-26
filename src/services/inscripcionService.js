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
    const { data, error } = await supabase
    .from('inscripciones')
    .select(`
      id,
      fecha_inscripcion,
      usuario_id,
      turno_id,
      usuarios (id, nombre, email),
      turnos (id, fecha, hora, profesor)
    `)

  if (error) throw error
  return data
}
