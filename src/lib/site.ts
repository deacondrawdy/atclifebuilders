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

/* ==========================================================================
   ABOUT PAGE (ATC6) + LEADERSHIP BACKGROUND (ATC 1)
   ========================================================================== */

export const about = {
  mission:
    'The mission of ATC (Always Thinking Community) Life Builders, Inc. is to enrich and empower youths, families, organizations and communities in the journey of life; to help them discover, develop and optimize their abilities and resources.',
  vision:
    'Provide community members with access to learning experiences that can enable them to grow as leaders and improve the quality of life for themselves and those around them.',
  founderQuote: {
    quote:
      'We believe that when people grow, communities thrive, and legacies are built.',
    author: 'Mr. Oviedo, Founder & CEO',
  },
} as const

/** "What We Do" cards on the About page. */
export const whatWeDo = [
  {
    icon: 'users',
    title: 'Leadership & Management Development',
    body: 'We cultivate confident, capable leaders through personal growth, leadership clarity, and effective management practices.',
  },
  {
    icon: 'heart-handshake',
    title: 'Community Empowerment',
    body: 'We equip families and community members with tools, mindset, and strategies to create lasting, positive change.',
  },
  {
    icon: 'flower',
    title: 'Holistic Life Coaching',
    body: 'We provide coaching that strengthens clarity, confidence, and purpose for every season of life.',
  },
  {
    icon: 'headset',
    title: 'Professional Technical Support',
    body: 'We deliver high-quality technical support services locally, regionally, and nationally to organizations that need expertise they can rely on.',
  },
  {
    icon: 'globe',
    title: 'Regional & National Impact',
    body: 'Based in Southern Arizona, we serve clients across the region and nation, delivering measurable results and real impact.',
  },
] as const

/**
 * Founder biography (ATC 1).
 *
 * NOTE: ATC7 renders this same first-person biography signed "Danielle R.",
 * who is a client testimonial everywhere else in the mockups. Attribution is
 * unconfirmed — see README.
 */
export const leadership = {
  bio: "Mr. Oviedo's unique leadership background sets a tone for the organization and its values, which fuels its success. Among many other accomplishments, Mr. Oviedo has served as a Federal Law Enforcement Agent, as a U.S. Army Special Forces soldier, as the Founder and President of several successful business enterprises yielding profitable earnings in international leadership and management development consulting firms, as the National Latino Outreach Director at Enfoque a la Familia where he hosted a nationally syndicated radio show and provided products and services to enrich and empower families nationwide, as the West Region Director of Jobs for Life, as a Spiritual Leader, and as a Counselor and Advisor to various leaders including 3 U.S. Presidents and leaders on Capitol Hill.",
  quote: 'Empowering people to lead with purpose and build stronger communities.',
  credentials: [
    {
      icon: 'user-check',
      stat: '30+',
      title: 'Years of Leadership',
      body: 'Decades of experience across federal service, business, community, and spiritual leadership.',
    },
    {
      icon: 'globe',
      title: 'National & Community Impact',
      body: 'From national outreach and radio ministry to workforce development and family empowerment.',
    },
    {
      icon: 'award',
      title: 'Coaching + Development Expertise',
      body: 'Counselor, advisor, and leadership developer to executives, public officials, and changemakers.',
    },
  ],
} as const

/**
 * Dark stats band (ATC6).
 *
 * NOTE: "5.0+ Years of Impact & Service" in the mockup conflicts with the
 * "30+ years" claimed on ATC 1 and ATC7. It reads like the 5.0 star rating
 * leaked into a tenure stat. Left as-is pending client confirmation.
 */
export const impactStats = [
  { icon: 'users', stat: '5.0+', title: 'Years of Impact & Service' },
  { icon: 'shield-check', title: 'Certified & Trusted Coach' },
  { icon: 'sparkle', title: 'Faith-Forward Approach' },
  { icon: 'users', title: 'Proven Impact, Real Results' },
  { icon: 'heart', title: 'Transforming Lives & Leaders' },
] as const

/* ==========================================================================
   SERVICES PAGE (ATC3)
   ========================================================================== */

/** Badges under the services hero. */
export const serviceBadges = [
  { icon: 'user-check', title: 'Purpose-Driven', subtitle: 'Solutions' },
  { icon: 'shield-check', title: 'Trusted Coaching', subtitle: '& Consulting' },
  { icon: 'sparkle', title: 'Real Impact.', subtitle: 'Lasting Change.' },
] as const

/** Filter tabs on the services listing. Must match `services[].category`. */
export const serviceCategories = [
  'All Services',
  'Coaching',
  'Speaking',
  'Events',
  'Consulting',
] as const

/** Reassurance strip beneath the service cards. */
export const whyChooseUs = [
  {
    icon: 'users',
    title: 'Individualized Approach',
    body: 'Solutions tailored to your unique goals and challenges.',
  },
  {
    icon: 'shield-check',
    title: 'Proven Results',
    body: 'Strategies that deliver clarity, confidence, and measurable impact.',
  },
  {
    icon: 'heart-handshake',
    title: 'Built on Purpose',
    body: 'Every service is rooted in purpose, empowerment, and transformation.',
  },
  {
    icon: 'star',
    title: 'Trusted & Certified',
    body: 'Certified coach and leadership consultant you can count on.',
  },
] as const
