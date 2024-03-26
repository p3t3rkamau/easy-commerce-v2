import type { Category } from '../../../../payload/payload-types'

export function generateSlides(categories: Category[]): Array<{ src: string; alt: string }> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return categories.map((category, _index) => ({
    src: category.imageSrc, // Adjust this based on your category structure
    alt: category.name, // Adjust this based on your category structure
  }))
}
