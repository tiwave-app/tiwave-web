'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Button,
} from '@heroui/react'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'fixed top-0 bg-[#020c1b]/80 backdrop-blur-xl border-b border-white/[0.06] z-50',
        wrapper: 'max-w-7xl px-8 sm:px-12 py-3',
      }}
      maxWidth="2xl"
      isBlurred={false}
    >
      {/* Mobile toggle + brand */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="sm:hidden text-white/50 hover:text-white"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="TiWave"
              width={34}
              height={34}
              className="rounded-full"
            />
            <span className="font-bold text-xl tracking-tight">
              <span className="text-[#0093d0]">T</span><span className="text-white">iWave</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop links */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <a
            href="#how-it-works"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Comment ça marche
          </a>
        </NavbarItem>
        <NavbarItem>
          <a
            href="#why-tiwave"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Pourquoi TiWave
          </a>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/blog"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* CTA */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as="a"
            href="#newsletter"
            size="sm"
            className="bg-[#2ed6b0] text-[#020c1b] font-semibold rounded-full px-5 text-sm shadow-[0_0_20px_rgba(46,214,176,0.25)]"
          >
            Rejoindre la liste
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-[#020c1b]/95 backdrop-blur-xl pt-8 gap-2">
        {[
          { href: '#how-it-works', label: 'Comment ça marche' },
          { href: '#why-tiwave', label: 'Pourquoi TiWave' },
        ].map((item) => (
          <NavbarMenuItem key={item.href}>
            <a
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-3 text-white/70 text-lg hover:text-white transition-colors border-b border-white/5"
            >
              {item.label}
            </a>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            href="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full py-3 text-white/70 text-lg hover:text-white transition-colors border-b border-white/5"
          >
            Blog
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-4">
          <Button
            as="a"
            href="#newsletter"
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#2ed6b0] text-[#020c1b] font-semibold rounded-full w-full"
            size="lg"
          >
            Rejoindre la liste d&apos;attente
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
