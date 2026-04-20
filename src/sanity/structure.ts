import type {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Blogs'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('program').title('Programs (Pricing)'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'service', 'program', 'faq', 'testimonial'].includes(listItem.getId()!)
      ),
    ])
