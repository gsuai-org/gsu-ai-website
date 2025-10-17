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
      name: 'position',
      title: 'Position/Role',
      type: 'string',
      options: {
        list: [
          {title: 'President', value: 'president'},
          {title: 'Vice President', value: 'vice-president'},
          {title: 'Secretary', value: 'secretary'},
          {title: 'Treasurer', value: 'treasurer'},
          {title: 'Technical Lead', value: 'technical-lead'},
          {title: 'Events Coordinator', value: 'events-coordinator'},
          {title: 'Marketing Director', value: 'marketing-director'},
          {title: 'Outreach Coordinator', value: 'outreach-coordinator'},
          {title: 'Board Member', value: 'board-member'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'A short biography or description of the board member',
      validation: (rule) => rule.max(300),
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Areas of interest or expertise (e.g., Machine Learning, Web Development, etc.)',
      validation: (rule) => rule.max(6),
    },
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      year: 'year',
      major: 'major',
    },
    prepare(selection) {
      const {name, position, year, major} = selection
      return {
        title: name,
        subtitle: `${position} • ${year} • ${major}`,
      }
    },
  },
})
