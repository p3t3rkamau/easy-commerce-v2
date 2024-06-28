import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(request: NextRequest): Promise<Response> {
  const productId = request.nextUrl.searchParams.get('id')
  const secret = request.nextUrl.searchParams.get('secret')

  if (
    !secret ||
    secret !== process.env.NEXT_PRIVATE_REVALIDATION_KEY ||
    typeof productId !== 'string'
  ) {
    return new Response('Invalid request', { status: 400 })
  }

  try {
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
    })

    if (!product) {
      return new Response('Product not found', { status: 404 })
    }

    const { title, meta, price } = product
    return NextResponse.json({ title, meta: meta?.title || '', price })
  } catch (error: unknown) {
    console.error('Error fetching product details:', error)
    return new Response('Error fetching product details', { status: 500 })
  }
}
