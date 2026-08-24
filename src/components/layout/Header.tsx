'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { nav } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled ? 'bg-canvas/85 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="container-page">
        <div className="flex h-20 items-center justify-between gap-6">
          {/*
            Logo plaque hangs DOWN past the header bar, flush with the top of
            the page (hence `self-start`). A negative top margin would push the
            ATC wordmark above the viewport edge, where it gets clipped.
          */}
          <Logo className="h-[6.5rem] w-[4.6rem] self-start md:h-[10rem] md:w-[7.2rem]" />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href)
              const children = 'children' in item ? item.children : undefined

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex items-center gap-1 py-2 font-display text-[0.9375rem] transition-colors',
                      active ? 'text-ink' : 'text-body hover:text-indigo-600',
                    )}
                  >
                    {item.label}
                    {children && (
                      <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gold-500 transition-transform duration-300 ease-out-soft',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>

                  {children && (
                    <div
                      className={cn(
                        'invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0',
                        'transition-all duration-200 ease-out-soft',
                        'group-hover:visible group-hover:opacity-100',
                        'group-focus-within:visible group-focus-within:opacity-100',
                      )}
                    >
                      <div className="overflow-hidden rounded-xl border border-lavender-300 bg-white p-1.5 shadow-card-hover">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3.5 py-2.5 text-sm text-body transition-colors hover:bg-lavender-100 hover:text-indigo-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden items-center gap-1 lg:flex">
              <span className="mx-2 h-6 w-px bg-lavender-300" aria-hidden="true" />
              <IconLink href="/search" label="Search">
                <Search className="size-[1.15rem]" />
              </IconLink>
              <IconLink href="/cart" label="Cart">
                <ShoppingCart className="size-[1.15rem]" />
              </IconLink>
              <IconLink href="/account" label="Account">
                <User className="size-[1.15rem]" />
              </IconLink>
            </div>

            <Button
              href="/book"
              size="md"
              className="hidden bg-navy-900 hover:bg-indigo-700 sm:inline-flex"
            >
              <Calendar className="size-[1.05rem]" />
              <span className="font-display">Book a Free Consultation</span>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-lavender-100 lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-lavender-300 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {nav.map((item) => {
            const children = 'children' in item ? item.children : undefined
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-3 font-display text-base transition-colors',
                    isActive(item.href)
                      ? 'bg-lavender-100 text-indigo-600'
                      : 'text-body hover:bg-lavender-100',
                  )}
                >
                  {item.label}
                </Link>
                {children && (
                  <div className="ml-3 border-l border-lavender-300 pl-3">
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-lavender-100 hover:text-indigo-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className="mt-3 flex flex-col gap-2 border-t border-lavender-300 pt-4">
            <Button href="/book" size="md">
              <Calendar className="size-[1.05rem]" />
              Book a Free Consultation
            </Button>
            <div className="flex gap-1">
              <IconLink href="/search" label="Search">
                <Search className="size-[1.15rem]" />
              </IconLink>
              <IconLink href="/cart" label="Cart">
                <ShoppingCart className="size-[1.15rem]" />
              </IconLink>
              <IconLink href="/account" label="Account">
                <User className="size-[1.15rem]" />
              </IconLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-lavender-100 hover:text-indigo-600"
    >
      {children}
    </Link>
  )
}
