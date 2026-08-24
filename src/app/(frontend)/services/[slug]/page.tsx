import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Placeholder } from '@/components/layout/Placeholder'
import { services } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  return service ? { title: service.title, description: service.body } : {}
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) notFound()

  return (
    <Placeholder
      eyebrow={service.category}
      title={service.title}
      body={`${service.body} — ${service.duration}, ${service.price}.`}
    />
  )
}
