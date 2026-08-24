/**
 * Single source of truth for site-wide content that isn't yet in the CMS.
 * Everything here is shaped so it can be lifted into Payload collections
 * later without touching the components that consume it.
 *
 * NOTE: values marked TODO are unresolved in the mockups — the designs
 * disagree on location and contact details. Confirm with the client.
 */

export const site = {
  name: 'ATC Life Builders',
  legalName: 'ATC (Always Thinking Community) Life Builders, Inc.',
  tagline: 'Always Thinking Community',
  description:
    'ATC Life Builders empowers individuals, families, organizations, and communities to break through limits, lead with purpose, and create lasting change through certified coaching and leadership development.',

  contact: {
    // Contact page (ATC9) is the most specific/most recent source.
    email: 'atclifebuilders@gmail.com',
    phone: '+1.520.245.7895',
    phoneHref: 'tel:+15202457895',
    location: 'Tucson, Arizona, USA',
    // TODO: mockups conflict — ATC3 footer says "Orlando, Florida",
    // ATC5 footer says "123 Purpose Way, Inspiration, CA 90210" (placeholder).
    // Contact page + About page both point to Tucson / Southern Arizona.
    contactPerson: {
      name: 'John Henning',
      title: 'Chief Communication Officer',
    },
    hours: [
      { day: 'Monday', open: '09:00 am', close: '05:00 pm' },
      { day: 'Tuesday', open: '09:00 am', close: '05:00 pm' },
      { day: 'Wednesday', open: '09:00 am', close: '05:00 pm' },
      { day: 'Thursday', open: '09:00 am', close: '05:00 pm' },
      { day: 'Friday', open: '09:00 am', close: '05:00 pm' },
      { day: 'Saturday', closed: true },
      { day: 'Sunday', closed: true },
    ],
  },

  social: {
    facebook: 'https://facebook.com/atclifebuilders',
    instagram: 'https://instagram.com/atclifebuilders',
    instagramHandle: '@atclifebuilders',
    linkedin: 'https://linkedin.com/company/atclifebuilders',
    youtube: 'https://youtube.com/@atclifebuilders',
  },
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Holistic Life Coaching', href: '/services/holistic-life-coaching' },
      { label: 'Guest Speaking', href: '/services/guest-speaking' },
      { label: 'Webinars', href: '/services/webinars' },
      { label: 'Business Consulting', href: '/services/business-consulting' },
    ],
  },
  { label: 'Contact', href: '/contact' },
] as const

/** Right-rail pillars on the hero (ATC HERO PAGE.png). */
export const pillars = [
  {
    icon: 'target',
    title: 'Mission & Vision',
    body: 'Enrich lives and strengthen communities through purpose-driven leadership.',
  },
  {
    icon: 'users',
    title: 'Leadership Development',
    body: 'Equip leaders with tools, mindset, and strategies to create lasting impact.',
  },
  {
    icon: 'flower',
    title: 'Holistic Life Coaching',
    body: 'Clarity, confidence, and purpose for every season of life.',
  },
  {
    icon: 'heart-handshake',
    title: 'Community Impact',
    body: 'Stronger families, empowered youth, and thriving communities.',
  },
] as const

/** Trust strip beneath the hero CTAs. */
export const trustBadges = [
  { icon: 'shield-check', title: 'Certified &', subtitle: 'Trusted Coach' },
  { icon: 'sparkle', title: 'Faith-Forward', subtitle: 'Approach' },
  { icon: 'users', title: 'Proven Impact,', subtitle: 'Real Results' },
  { icon: 'bar-chart', title: 'Transforming', subtitle: 'Lives & Leaders' },
] as const

/**
 * Programs & services (ATC3 / ATC8).
 * Pricing differs between the two mockups for Business Consulting
 * ("Contact for pricing" on ATC3, "$250" on ATC8) — using the explicit price.
 */
export const services = [
  {
    slug: 'holistic-life-coaching',
    icon: 'flower',
    title: 'Holistic Life Coaching',
    category: 'Coaching',
    body: 'Personalized 1:1 coaching to help you clarify your purpose, build confidence, and create a life of balance, fulfillment, and impact.',
    duration: '1 hr',
    price: '$150',
    cta: 'Book Now',
  },
  {
    slug: 'guest-speaking',
    icon: 'mic',
    title: 'Guest Speaker',
    category: 'Speaking',
    body: 'Inspiring and engaging talks that motivate audiences to lead with purpose, overcome challenges, and create meaningful change.',
    duration: '1 hr',
    price: 'Contact for pricing',
    cta: 'Learn More',
  },
  {
    slug: 'webinars',
    icon: 'monitor-play',
    title: 'Webinars',
    category: 'Events',
    body: 'Interactive, high-impact sessions designed to educate, inspire, and equip your audience with practical strategies for growth.',
    duration: '1 hr 30 mins',
    price: 'Contact for pricing',
    cta: 'Learn More',
  },
  {
    slug: 'business-consulting',
    icon: 'briefcase',
    title: 'Business Consulting',
    category: 'Consulting',
    body: 'Strategic consulting to help organizations strengthen leadership, improve performance, and drive sustainable growth.',
    duration: '1 hr',
    price: '$250',
    cta: 'Learn More',
  },
] as const

/**
 * Testimonials. The mockups show "Reviews coming soon!" placeholders in three
 * places, with one sample quote repeated. Treat this as seed data only.
 */
export const testimonials = [
  {
    quote:
      'Working with ATC Life Builders was a turning point. I gained clarity, rebuilt my confidence, and stepped fully into my purpose.',
    author: 'Danielle R.',
    role: 'Executive Manager',
  },
] as const
