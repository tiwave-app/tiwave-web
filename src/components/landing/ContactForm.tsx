'use client'

import { useState } from 'react'
import { Input, Button, Textarea, Select, SelectItem } from '@heroui/react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const SUBJECTS = [
  'Partenariat institutionnel',
  'Intégration de données environnementales',
  'Affichage en mairie / office de tourisme',
  'Projet de recherche ou académique',
  'API et accès données',
  'Autre',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-white/60 text-xs font-medium mb-1.5">{children}</p>
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    type: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.type) {
      setStatus('error')
      setErrorMsg('Veuillez sélectionner votre profil.')
      return
    }
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMsg(data.error ?? 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#2ed6b0]/10 border border-[#2ed6b0]/25 rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#2ed6b0]/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={26} className="text-[#2ed6b0]" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Demande envoyée !</h3>
        <p className="text-white/60 text-sm">
          Nous avons bien reçu votre message. Notre équipe reviendra vers vous sous 48h ouvrées.
          Un email de confirmation vous a été envoyé.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Nom complet</FieldLabel>
          <Input
            placeholder="Marie Dupont"
            value={form.name}
            onValueChange={update('name')}
            isRequired
            variant="bordered"
            classNames={inputClasses}
          />
        </div>
        <div>
          <FieldLabel>Email professionnel</FieldLabel>
          <Input
            type="email"
            placeholder="marie@mairie.mq"
            value={form.email}
            onValueChange={update('email')}
            isRequired
            variant="bordered"
            classNames={inputClasses}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Organisation</FieldLabel>
          <Input
            placeholder="Mairie de Fort-de-France"
            value={form.organisation}
            onValueChange={update('organisation')}
            isRequired
            variant="bordered"
            classNames={inputClasses}
          />
        </div>
        <div>
          <FieldLabel>Profil</FieldLabel>
          <Select
            placeholder="Sélectionner…"
            selectedKeys={form.type ? new Set([form.type]) : new Set()}
            onSelectionChange={(keys) => update('type')(Array.from(keys)[0] as string ?? '')}
            isRequired
            variant="bordered"
            classNames={selectClasses}
          >
            <SelectItem key="professionnel" className="text-white data-[hover=true]:bg-white/10">
              Professionnel
            </SelectItem>
            <SelectItem key="collectivite" className="text-white data-[hover=true]:bg-white/10">
              Collectivité / Institution
            </SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <FieldLabel>Sujet</FieldLabel>
        <Select
          placeholder="Sélectionner un sujet…"
          selectedKeys={form.subject ? new Set([form.subject]) : new Set()}
          onSelectionChange={(keys) => update('subject')(Array.from(keys)[0] as string ?? '')}
          isRequired
          variant="bordered"
          classNames={selectClasses}
        >
          {SUBJECTS.map((s) => (
            <SelectItem key={s} className="text-white data-[hover=true]:bg-white/10">
              {s}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <FieldLabel>Message</FieldLabel>
        <Textarea
          placeholder="Décrivez votre projet ou votre besoin…"
          value={form.message}
          onValueChange={update('message')}
          isRequired
          minRows={4}
          variant="bordered"
          classNames={{
            inputWrapper: 'bg-white/[0.06] border-white/15 hover:border-white/25 focus-within:border-[#2ed6b0]/50 rounded-xl',
            input: 'text-white placeholder:text-white/25',
          }}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <Button
        type="submit"
        isLoading={status === 'loading'}
        endContent={status !== 'loading' ? <ArrowRight size={16} /> : undefined}
        className="w-full text-[#020c1b] font-semibold rounded-xl h-12 shadow-[0_0_30px_rgba(46,214,176,0.25)]"
        style={{ background: 'linear-gradient(135deg, #2ed6b0 0%, #17c4a4 100%)' }}
      >
        Envoyer la demande
      </Button>
    </form>
  )
}

const inputClasses = {
  inputWrapper: 'bg-white/[0.06] border-white/15 hover:border-white/25 focus-within:border-[#2ed6b0]/50 rounded-xl h-12',
  input: 'text-white placeholder:text-white/25',
}

const selectClasses = {
  trigger: 'bg-white/[0.06] border-white/15 hover:border-white/25 rounded-xl h-12',
  value: 'text-white',
  selectorIcon: 'text-white/50',
  popoverContent: 'bg-[#013a63] border border-white/10',
}
