import {defineType} from 'sanity'

export default defineType({
  name: 'boardMember',
  title: 'Board Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'year',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          {title: 'Freshman', value: 'freshman'},
          {title: 'Sophomore', value: 'sophomore'},
          {title: 'Junior', value: 'junior'},
          {title: 'Senior', value: 'senior'},
          {title: 'Graduate Student', value: 'graduate'},
          {title: 'Alumni', value: 'alumni'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'major',
      title: 'Major/Field of Study',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'email',
      validation: (rule) => rule.required().email(),
    },
    {
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      year: 'year',
      major: 'major',
      media: 'profileImage',
    },
    prepare(selection) {
      const {name, year, major} = selection
      return {
        title: name,
        subtitle: `${year} • ${major}`,
        media: selection.media,
      }
    },
  },
})
