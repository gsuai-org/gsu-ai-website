import {defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    },
    {
      name: 'datePosted',
      title: 'Date & Time Posted',
      type: 'datetime',
      validation: (rule) => rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Machine Learning', value: 'machine-learning'},
          {title: 'Deep Learning', value: 'deep-learning'},
          {title: 'Natural Language Processing', value: 'nlp'},
          {title: 'Computer Vision', value: 'computer-vision'},
          {title: 'Data Science', value: 'data-science'},
          {title: 'Gen AI', value: 'gen-ai'},
          {title: 'Research', value: 'research'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'News', value: 'news'},
          {title: 'Events', value: 'events'},
          {title: 'Career', value: 'career'},
          {title: 'Technology', value: 'technology'},
          {title: 'Freebies', value: 'freebies'},
          {title: 'Other', value: 'other'},
          {title: 'General', value: 'general'},
          {title: 'Updates', value: 'updates'},
        ], 
      },
      validation: (rule) => rule.required().min(1).max(5),
    },
    {
      name: 'body',
      title: 'Blog Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for the blog card (optional - will use first part of content if not provided)',
      validation: (rule) => rule.max(200),
    },
  ],
  orderings: [
    {
      title: 'Date Posted (Newest First)',
      name: 'datePostedDesc',
      by: [{field: 'datePosted', direction: 'desc'}],
    },
    {
      title: 'Date Posted (Oldest First)', 
      name: 'datePostedAsc',
      by: [{field: 'datePosted', direction: 'asc'}],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Title (Z-A)',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      datePosted: 'datePosted',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, author, datePosted} = selection
      const postDate = new Date(datePosted).toLocaleDateString()
      return {
        title,
        subtitle: `By ${author} • ${postDate}`,
        media: selection.media,
      }
    },
  },
})
