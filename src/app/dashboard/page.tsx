'use client'

import { useEffect, useState } from 'react'
import { fetchNotes, deleteNote } from '@/app/lib/notes'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [notes, setNotes] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [modal, setModal] = useState<{ open: boolean; id: string; title: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true) // 👈 Tambahkan ini
  const router = useRouter()

  const loadNotes = async () => {
    setIsLoading(true) // 👈 Loading mulai
    const data = await fetchNotes()
    setNotes(data)
    setIsLoading(false) // 👈 Loading selesai
  }

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/login')
      else loadNotes()
    }
    check()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    try {
      await deleteNote(id)
      loadNotes()
    } catch (err) {
      alert('Failed to delete note')
    } finally {
      setLoadingId(null)
      setModal(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-4 rounded-xl shadow mb-6 gap-3">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 rounded-lg border bg-gray-50 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
        <div className="flex gap-2">
          <a
            href="/dashboard/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            + Add
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Your Notes</h2>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-600">
          <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium animate-pulse">Sedang memuat catatan...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-5 rounded-2xl shadow-md transition hover:shadow-lg flex flex-col justify-between"
            >
              {note.category && (
                <span className={`mb-2 self-start px-3 py-1 text-sm font-semibold rounded-full text-white
                  ${note.category === 'Home' ? 'bg-green-400' :
                    note.category === 'Personal' ? 'bg-orange-400' :
                    note.category === 'Business' ? 'bg-purple-500' : 'bg-gray-400'}
                `}>
                  {note.category}
                </span>
              )}
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{note.title}</h3>
              <p className="text-gray-600 mt-1 text-sm line-clamp-3">{note.content}</p>
              <p className="text-sm text-gray-400 mt-3">
                {note.created_at ? new Date(note.created_at).toLocaleDateString() : ''}
              </p>
              <div className="flex justify-end gap-4 mt-4 text-gray-500">
                <a href={`/dashboard/edit/${note.id}`} className="hover:text-blue-600">✏️</a>
                <button
                  onClick={() => setModal({ open: true, id: note.id, title: note.title })}
                  className="hover:text-red-600"
                >
                  {loadingId === note.id ? '⏳' : '🗑️'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal?.open && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center transition-all duration-300 transform scale-95 opacity-0 animate-modal">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Delete note "{modal.title}"?
            </h3>
            <p className="text-gray-600 mb-6 text-sm">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition hover:text-gray-800 text-gray-800"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleDelete(modal.id)}
              >
                {loadingId === modal.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
