import {defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'discord',
      title: 'Discord Server URL',
      type: 'url',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'pinPage',
      title: 'PIN Page URL',
      type: 'url',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'instagram',
      title: 'Instagram Profile URL',
      type: 'url',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https'],
      }),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
        subtitle: 'Social media and website links',
      }
    },
  },
})
