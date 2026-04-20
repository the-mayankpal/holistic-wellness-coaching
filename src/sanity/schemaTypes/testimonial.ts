import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role / Designation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Author Image (Optional)',
      type: 'image',
      description: 'If left blank, the website will use the author initials.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorRole',
      media: 'image',
    },
  },
})
