import type { Featured, ImageInterface } from '../../../types'

export const ANNOUNCEMENT_BAR = 'FREE SHIPPING FOR ALL U.S ORDERS OVER $75'

export const PRODUCT_CATEGORIES: Array<{
  title: string
  value: string
  href: string
  image: ImageInterface
  featured: Featured[]
}> = [
  {
    title: 'For Him',
    value: 'for_him' as const,
    href: '#',
    image: {
      imageSrc: '/nav-bar/for-him.webp',
      alt: 'for him',
    },
    featured: [
      {
        title: 'Tanks',
        value: 'tanks',
        href: '#',
      },
      {
        title: 'Shirts',
        value: 'shirts',
        href: '#',
      },
      {
        title: 'Shorts',
        value: 'shorts',
        href: '#',
      },
      {
        title: 'Joggers',
        value: 'joggers',
        href: '#',
      },
    ],
  },
  {
    title: 'For Her',
    value: 'for_her' as const,
    href: '#',
    image: {
      imageSrc: '/nav-bar/for-her.webp',
      alt: 'for her',
    },
    featured: [
      {
        title: 'Bras',
        value: 'bras',
        href: '#',
      },
      {
        title: 'Tops',
        value: 'tops',
        href: '#',
      },
      {
        title: 'Shorts',
        value: 'shorts',
        href: '#',
      },
      {
        title: 'Leggins',
        value: 'leggins',
        href: '#',
      },
    ],
  },
]

export const HOME_CAROUSEL = [
  {
    about: 'Dxter Shark for her',
    href: '#',
    imageSrc: '/home-carousel/hero-2.png',
    buttonDescription: 'Shop Now',
  },
  {
    about: 'Dxter Shark Coming Soon',
    href: '#',
    imageSrc: '/home-carousel/hero-2.png',
    buttonDescription: 'Coming Soon',
  },
  {
    about: 'Restock',
    href: '#',
    imageSrc: '/home-carousel/hero-1.png',
    buttonDescription: 'Shop Now',
  },
]
