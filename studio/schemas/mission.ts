import {defineType} from 'sanity'

export default defineType({
  name: 'mission',
  title: 'Mission Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'heading1',
      title: 'First Heading',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'heading2',
      title: 'Second Heading',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'memberCount',
      title: 'Member Count',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    },
    {
      name: 'projectCount',
      title: 'Project Count',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    },
    {
      name: 'description',
      title: 'Mission Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(1000),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle,
      }
    },
  },
})
