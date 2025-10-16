import {defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The about us paragraph',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Tags with icons to display in the about us section',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon SVG',
              type: 'text',
              description: 'Paste the SVG code for the icon (e.g., from https://www.svgrepo.com/)',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'text'
            }
          }
        }
      ]
    }
  ]
})

