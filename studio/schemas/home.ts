import {defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle,
        media: selection.media,
      }
    },
  },
})
