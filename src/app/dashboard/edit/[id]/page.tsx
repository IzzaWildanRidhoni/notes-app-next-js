'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getNoteById, updateNote } from '@/app/lib/notes'
import { ArrowLeft, Save } from 'lucide-react' // opsional: icon

export default function EditNote() {
  const router = useRouter()
  const params = useParams()
  const noteId = params.id as string

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      const note = await getNoteById(noteId)
      if (!note) {
        alert('Catatan tidak ditemukan')
        router.push('/dashboard')
        return
      }
      setTitle(note.title)
      setContent(note.content)
      setLoading(false)
    }

    fetchNote()
  }, [noteId, router])

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Judul dan isi wajib diisi!')
      return
    }

    await updateNote(noteId, title, content)
    router.push('/dashboard')
  }

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">Loading...</p>
      </div>
    )
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 transition flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Edit Catatan</h1>
          <div className="w-6" /> {/* untuk center balance */}
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit judul catatan..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit isi catatan..."
              rows={6}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 px-4 rounded-xl transition"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}
