import Image from 'next/image'
import { atcLogo } from '@/lib/brand'
import Link from 'next/link'
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { site } from '@/lib/site'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book a Consultation', href: '/book' },
]

const serviceLinks = [
  { label: 'Life Coaching', href: '/services/holistic-life-coaching' },
  { label: 'Leadership Development', href: '/services/leadership-development' },
  { label: 'Holistic Coaching', href: '/services/holistic-life-coaching' },
  { label: 'Community Impact', href: '/community' },
  { label: 'Workshops & Events', href: '/events' },
  { label: 'Corporate Solutions', href: '/services/business-consulting' },
]

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
  { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
  { label: 'YouTube', href: site.social.youtube, Icon: Youtube },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="aurora relative overflow-hidden text-white/80">
      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <Image
              src={atcLogo}
              alt="ATC Life Builders"
              className="h-24 w-auto rounded-md"
            />
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              {site.name} empowers individuals, families, organizations, and communities
              to break through limits, lead with purpose, and create lasting change
              through coaching and leadership development.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white/85 transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white/10 hover:text-gold-400"
                  >
                    <Icon className="size-[1.05rem]" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Our Services" links={serviceLinks} />

          {/* Contact column */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={1.75} />
                <span className="text-white/75">{site.contact.location}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={1.75} />
                <a
                  href={site.contact.phoneHref}
                  className="text-white/75 transition-colors hover:text-gold-400"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={1.75} />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all text-white/75 transition-colors hover:text-gold-400"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={1.75} />
                <span className="text-white/75">www.atclifebuilders.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All Rights Reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold-400">
              Terms and Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative pb-3 font-display text-lg text-white">
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-9 bg-gold-500"
      />
    </h3>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/70 transition-colors duration-200 hover:text-gold-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
