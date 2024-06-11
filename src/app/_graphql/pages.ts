import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  MEDIA_BLOCK,
  PRODUCTS_SLIDER_BLOCK,
} from './blocks'
// import { FORM_FIELDS } from './form'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PAGES = `
  query Pages {
    Pages(limit: 300, where: { slug: { not_equals: "cart" } })  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
      docs {
        id
        title
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${PRODUCTS_SLIDER_BLOCK}
        }
        ${META}
        Accordion{
          Heading
          Description

        }
      }
    }
  }
`
