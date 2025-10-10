import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2023-10-01', // use current date (YYYY-MM-DD) to target the latest API version
})

// Set up the image URL builder
const builder = imageUrlBuilder(client)

export const urlForImage = (source: { asset: { _ref: string; _type: string } }) => {
  return builder.image(source)
}
