import { cn } from '@/lib/utils'
import { Icon, type IconName } from './Icon'

/** The filled circular icon chip used throughout the mockups. */
export function IconBadge({
  name,
  size = 'md',
  tone = 'solid',
  className,
}: {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
  tone?: 'solid' | 'soft' | 'onDark'
  className?: string
}) {
  const sizes = {
    sm: 'size-10 rounded-full',
    md: 'size-12 rounded-full',
    lg: 'size-16 rounded-full',
  }
  const icons = { sm: 'size-4', md: 'size-5', lg: 'size-7' }
  const tones = {
    solid: 'bg-indigo-700 text-white',
    soft: 'bg-lavender-200 text-indigo-600',
    onDark: 'bg-white/12 text-gold-400 ring-1 ring-white/20',
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      <Icon name={name} className={icons[size]} />
    </span>
  )
}
