import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  CTA_WITH_IMAGE,
  DEALS_ARCHIVE_BLOCK,
  EVENT_ARCHIVE_BLOCK,
  FLASHSALES_ARCHIVE_BLOCK,
  FLEX_BANNER_BLOCK,
  GRIDLAYOUT_ARCHIVE_BLOCK,
  HOLIDAY_BANNER_BLOCK,
  LAST_VIEWED_ARCHIVE_BLOCK,
  MEDIA_BLOCK,
  PRODUCTS_SLIDER_BLOCK,
  PROMO_BANNER_BLOCK,
  RECOMMENDED_ARCHIVE_BLOCK,
} from './blocks'
import { HEADER_CATEGORIES } from './globals'
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
          ${DEALS_ARCHIVE_BLOCK}
          ${EVENT_ARCHIVE_BLOCK}
          ${FLASHSALES_ARCHIVE_BLOCK}
          ${LAST_VIEWED_ARCHIVE_BLOCK}
          ${RECOMMENDED_ARCHIVE_BLOCK}
          ${GRIDLAYOUT_ARCHIVE_BLOCK}
          ${FLEX_BANNER_BLOCK}
          ${CTA_WITH_IMAGE}
         
          
        }
        ${META}
        Accordion{
          Heading
          Description

        }
        Categories{
          id
          title
          media {
            imagekit {
              url
            }
          }
        }
        heroImage {
          SliderHero {
            richText
            links {
              link ${LINK_FIELDS()}
            }
            SliderImages {
              media {
                imagekit {
                  url
                }
              }
            } 
          }
          PotraitImage{
            media {
              imagekit {
                url
              }
            }
          }
          SideImages {
            Images{
              richText
              media {
                imagekit {
                  url
                }
              }
            }
          } 
        }
        HeaderCategories{
          Category
          Subcategory {
            id
            Name
            SubcategoryImage {
              imagekit {
                url
              }
            }
            Attribute {
              id
              Name
            }
          }
        }
        
      }
    }
  }
`
