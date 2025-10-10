import {defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    },
    {
      name: 'location',
      title: 'Event Location',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    },
    {
      name: 'description',
      title: 'Event Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    },
    {
      name: 'bannerImage',
      title: 'Event Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date (Oldest First)', 
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'bannerImage',
    },
    prepare(selection) {
      const {title, date, location} = selection
      const eventDate = new Date(date).toLocaleDateString()
      return {
        title,
        subtitle: `${eventDate} • ${location}`,
        media: selection.media,
      }
    },
  },
})
