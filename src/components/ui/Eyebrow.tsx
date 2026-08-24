import { cn } from '@/lib/utils'

export function Eyebrow({
  children,
  rule = true,
  className,
}: {
  children: React.ReactNode
  rule?: boolean
  className?: string
}) {
  return (
    <p className={cn('eyebrow', rule && 'eyebrow-rule', className)}>{children}</p>
  )
}
