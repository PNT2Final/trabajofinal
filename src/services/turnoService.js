import { supabase } from '../supabase'

 const getTurnos = async () => {
  const { data, error } = await supabase.from('turnos').select('*')
  if (error) throw error
  return data
}

async function eliminarTurno(id) {
 const { data, error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", id)
    .select(); 

  if(error) throw new Error("Error intentando eliminar un turno")
  return data;
}

async function create(turno) {
  const { data, error } = await supabase
    .from('turnos')
    .insert([turno])
    .select()
  if(error) throw error

  return data;
}

async function getById(id) {
  const { turnos, error } = await supabase.from('turnos').select("*").eq('id', id);
  if(error) throw error;
  return turnos
}

async function updateById(id, datosNuevos) {
   const{data, error} = await supabase
            .from('turnos')
            .update(datosNuevos)
            .eq('id',id)
            .select();
    if(error) throw error

    return data;

}

export {getTurnos, eliminarTurno, getById, create, updateById}