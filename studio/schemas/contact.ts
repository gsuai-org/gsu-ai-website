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
      name: 'orgWebsite',
      title: 'Organization Website URL',
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
      name: 'twitter',
      title: 'Twitter/X Profile URL',
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
