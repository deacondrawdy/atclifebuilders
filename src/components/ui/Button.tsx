import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'onDark'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  // Deep indigo fill — the dominant CTA in every mockup.
  primary:
    'bg-indigo-700 text-white shadow-cta hover:bg-navy-800 active:bg-navy-900 border border-transparent',
  // White card with hairline border — the "Explore Programs" pairing.
  secondary:
    'bg-white text-ink border border-lavender-300 hover:border-violet-300 hover:bg-lavender-100 shadow-card',
  // Gold fill — newsletter subscribe.
  gold: 'bg-gold-500 text-ink font-semibold hover:bg-gold-600 hover:text-white border border-transparent',
  ghost: 'bg-transparent text-indigo-600 hover:bg-lavender-100 border border-transparent',
  // Sits on dark aurora bands.
  onDark:
    'bg-white text-indigo-700 hover:bg-lavender-100 border border-transparent shadow-card',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-2 rounded-lg',
  md: 'h-12 px-6 text-[0.9375rem] gap-2.5 rounded-xl',
  lg: 'h-14 px-8 text-base gap-3 rounded-xl',
}

const base =
  'inline-flex items-center justify-center font-medium whitespace-nowrap ' +
  'transition-all duration-200 ease-out-soft ' +
  'hover:-translate-y-0.5 active:translate-y-0 ' +
  'disabled:pointer-events-none disabled:opacity-50'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    const external = href.startsWith('http')
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
