import {
  Award,
  BarChart3,
  Briefcase,
  Calendar,
  Flower2,
  Globe,
  Headset,
  Heart,
  HeartHandshake,
  Mic,
  MonitorPlay,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkle,
  Star,
  Target,
  User,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

/**
 * Maps the icon names used in `src/lib/site.ts` to Lucide components, so the
 * content model stays free of React imports and can move into the CMS as
 * plain strings.
 */
const registry = {
  target: Target,
  users: Users,
  'user-check': UserCheck,
  globe: Globe,
  headset: Headset,
  heart: Heart,
  award: Award,
  star: Star,
  flower: Flower2,
  'heart-handshake': HeartHandshake,
  'shield-check': ShieldCheck,
  sparkle: Sparkle,
  'bar-chart': BarChart3,
  mic: Mic,
  'monitor-play': MonitorPlay,
  briefcase: Briefcase,
  calendar: Calendar,
  search: Search,
  cart: ShoppingCart,
  user: User,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof registry

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) {
  const Cmp = registry[name]
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
