'use client'

import { useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) router.push('/dashboard')
      else router.push('/login')
    }
    check()
  }, [])

  return <p>Redirecting...</p>
}
