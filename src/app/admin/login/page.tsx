'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input, Button, Card, CardBody, CardHeader } from '@heroui/react'
import { createClient } from '@/lib/supabase-client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center pt-8 pb-2">
          <Image src="/logo-name.svg" alt="TiWave" width={140} height={40} className="mb-2" />
          <p className="text-sm text-gray-400">Administration</p>
        </CardHeader>
        <CardBody className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onValueChange={setEmail}
              isRequired
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onValueChange={setPassword}
              isRequired
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
