import Image from 'next/image'
import { atcLogo } from '@/lib/brand'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * The logo is a tall navy plaque that overhangs the header, as in every mockup.
 *
 * NOTE: public/brand/atc-logo.png was recovered from the mockup render and is
 * upscaled — replace it with the original vector/high-res artwork before launch.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ATC Life Builders — home"
      className={cn(
        'relative z-50 block shrink-0 overflow-hidden rounded-b-md shadow-card',
        className,
      )}
    >
      <Image
        src={atcLogo}
        alt="ATC Life Builders — Always Thinking Community"
        priority
        className="h-full w-full object-cover"
      />
    </Link>
  )
}
