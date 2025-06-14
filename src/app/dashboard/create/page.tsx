'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createNote } from '@/app/lib/notes'
import { ArrowLeft, Save } from 'lucide-react' // opsional: icon lucide (install jika belum)

export default function CreateNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Judul dan isi wajib diisi!')
      return
    }
    await createNote(title, content)
    router.push('/dashboard')
  }

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
          <h1 className="text-xl font-semibold text-gray-800">Buat Catatan</h1>
          <div className="w-6" /> {/* placeholder biar center */}
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Ide bisnis, to-do harian..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis isi catatan kamu di sini..."
              rows={6}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-xl transition"
          >
            <Save size={18} />
            Simpan Catatan
          </button>
        </div>
      </div>
    </div>
  )
}
