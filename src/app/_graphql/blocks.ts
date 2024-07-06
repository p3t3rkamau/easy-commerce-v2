import { PRODUCT_CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  
}
`
export const CTA_WITH_IMAGE = `
...on CtaWithImage {
  blockType
  invertBackground
  media {
    imagekit {
      url
    }
  }
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`
export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  populateBy
  relationTo
  ${PRODUCT_CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        price
        discount
        discountedPrice
      }
      ...on Post {
        id
        slug
        title
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        price
        ${PRODUCT_CATEGORIES}
        ${META}
      }
      ...on Post {
        id
        slug
        title
        ${PRODUCT_CATEGORIES}
      }
    }
  }
  populatedDocsTotal
}
`
export const CONTENT_MEDIA = `
  ...on ContentMedia{
    blockType
    mediaPosition
    richText
    media {
      imagekit {
        url
      }
    }
  }
`

export const DOUBLE_MEDIA_CONTENT = `
  ... on DoubleMediaContent {
    blockType
    mediaContentFields {
      MoreImages {
        Images {
          type
          TwoImages {
            media {
              imagekit {
                url
              }
            }
            
          }
          TrippleImages {
            media {
              imagekit {
                url
              }
            }
            
          }
          FourImages {
            media {
              imagekit {
                url
              }
            }
            
          }
          
        }
        
      }
    }
  }
`
export const PRODUCTS_SLIDER_BLOCK = `
...on ProductsSlider {
  blockType
  Heading
  BackgroundColor
  TextColor
  NewTag
  selectedDocs {
    id
    slug
    title
    price
    discount
    discountedPrice
    ${META}
   
  }
      
}
`
export const DEALS_ARCHIVE_BLOCK = `
...on DealsArchive {
  blockType
  Heading
  BackgroundColor
  TextColor
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`

export const EVENT_ARCHIVE_BLOCK = `
...on EventArchive {
  blockType
  Heading
  BackgroundColor
  TextColor
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`

export const FLASHSALES_ARCHIVE_BLOCK = `
...on FlashSales {
  blockType
  Heading
  BackgroundColor
  TextColor
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`

export const LAST_VIEWED_ARCHIVE_BLOCK = `
...on LastViewed {
  blockType
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`

export const RECOMMENDED_ARCHIVE_BLOCK = `
...on Recommended {
  blockType
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`

export const GRIDLAYOUT_ARCHIVE_BLOCK = `
...on TopDealsGrid {
  blockType
  Heading
  BackgroundColor
  TextColor
  selectedDocs {
    id
    slug
    title
    price
    ${META}
    discount
    discountedPrice
  }
}
`
export const FLEX_BANNER_BLOCK = `
...on FlexBanner {
  blockType
  FlexBanners {
    HorizontalBanners {
      richText
      links {
        link ${LINK_FIELDS()}
      }
      media {
        imagekit {
          url
        }
      }
    }
  }
 }
`

export const HOLIDAY_BANNER_BLOCK = `
...on HolidayBanner {
    blockType
    HolidayBanners {
      id
      title
      richText 
      image {
        imagekit {
          url
        }
      }
      BackgroundColor
    }
 }
`
export const PROMO_BANNER_BLOCK = `
...on PromoBanner {
  blockType
  discountPercentage
  productTitle
  productDescription
  originalPrice
  discountedPrice
  productImage {
    imagekit {
      url
    }
  }
 }
`

