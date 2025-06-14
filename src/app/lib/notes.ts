import { supabase } from './supabase'

export const fetchNotes = async () => {
  const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const createNote = async (title: string, content: string) => {
  const user = (await supabase.auth.getUser()).data.user
  const { error } = await supabase.from('notes').insert([{ title, content, user_id: user?.id }])
  if (error) throw error
}

export const updateNote = async (id: string, title: string, content: string) => {
  const { error } = await supabase.from('notes').update({ title, content }).eq('id', id)
  if (error) throw error
}

export const deleteNote = async (id: string) => {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
}

export const getNoteById = async (id: string) => {
  const { data, error } = await supabase.from('notes').select('*').eq('id', id).single()
  if (error) throw error
  return data
}



