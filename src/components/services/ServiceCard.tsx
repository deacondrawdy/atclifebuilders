import Image, { type StaticImageData } from 'next/image'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconBadge } from '@/components/ui/IconBadge'
import type { IconName } from '@/components/ui/Icon'

export type Service = {
  slug: string
  icon: IconName
  image: StaticImageData
  title: string
  category: string
  body: string
  duration: string
  price: string
  cta: string
}

/**
 * Shared service card, used by both the homepage grid and the services
 * listing.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1.5 hover:shadow-card-hover">
      <div className="relative h-44 overflow-hidden bg-lavender-200">
        {/*
          Decorative: the card title directly below already names the service.
          `object-[50%_30%]` keeps faces in frame when a wide card crops the
          top and bottom of the photo.
        */}
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[50%_30%] transition-transform duration-500 ease-out-soft group-hover:scale-105"
        />
        <IconBadge
          name={service.icon}
          size="md"
          className="absolute -bottom-6 left-5 ring-4 ring-white"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-9">
        <h3 className="font-display text-xl text-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.body}</p>

        <dl className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gold-200 pt-4 text-sm">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Duration</dt>
            <Clock className="size-4 text-violet-400" strokeWidth={1.75} />
            <dd className="text-body">{service.duration}</dd>
          </div>
          <span aria-hidden="true" className="h-4 w-px bg-lavender-300" />
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Price</dt>
            <Tag className="size-4 text-violet-400" strokeWidth={1.75} />
            <dd className="font-medium text-ink">{service.price}</dd>
          </div>
        </dl>

        <Button href={`/services/${service.slug}`} size="md" className="mt-5 w-full">
          {service.cta}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </article>
  )
}
