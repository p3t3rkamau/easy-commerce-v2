/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export type CartItems =
  | {
      product?: (string | null) | Product;
      quantity?: number | null;
      id?: string | null;
    }[]
  | null;
export type SubCategory =
  | {
      Name: string;
      url?: string | null;
      SubcategoryImage: string | Media;
      Attribute?: Attribute;
      id?: string | null;
    }[]
  | null;
export type Attribute =
  | {
      Name: string;
      url?: string | null;
      id?: string | null;
    }[]
  | null;

export interface Config {
  collections: {
    pages: Page;
    products: Product;
    orders: Order;
    media: Media;
    videos: Video;
    categories: Category;
    users: User;
    Reviews: Review;
    SiteMedia: SiteMedia;
    comments: Comment;
    posts: Post;
    alerts: Alert;
    headercategories: Headercategory;
    attributesCollection: AttributesCollection;
    deliveryLocations: DeliveryLocation;
    'live-chats': LiveChat;
    EmailBulkySms: EmailBulkySm;
    coupons: Coupon;
    searchTerms: SearchTerm;
    search: Search;
    redirects: Redirect;
    forms: Form;
    'form-submissions': FormSubmission;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    settings: Settings;
    header: Header;
    footer: Footer;
  };
}
export interface Page {
  id: string;
  title: string;
  publishedOn?: string | null;
  Categories?: (string | Category)[] | null;
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'customHero';
    richText: {
      [k: string]: unknown;
    }[];
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            label: string;
            icon?: string | Media | null;
            appearance?: ('default' | 'primary' | 'secondary') | null;
          };
          id?: string | null;
        }[]
      | null;
    media?: string | Media | null;
  };
  heroImage: {
    SliderHero: {
      richText: {
        [k: string]: unknown;
      }[];
      links?:
        | {
            link: {
              type?: ('reference' | 'custom') | null;
              newTab?: boolean | null;
              reference?: {
                relationTo: 'pages';
                value: string | Page;
              } | null;
              url?: string | null;
              label: string;
              icon?: string | Media | null;
              appearance?: ('default' | 'primary' | 'secondary') | null;
            };
            id?: string | null;
          }[]
        | null;
      SliderImages?:
        | {
            media: string | Media;
            id?: string | null;
          }[]
        | null;
    };
    PotraitImage: {
      media: string | Media;
    };
    SideImages?: {
      Images?:
        | {
            richText: {
              [k: string]: unknown;
            }[];
            media: string | Media;
            id?: string | null;
          }[]
        | null;
    };
  };
  layout: (
    | {
        invertBackground?: boolean | null;
        richText: {
          [k: string]: unknown;
        }[];
        links?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'cta';
      }
    | {
        invertBackground?: boolean | null;
        columns?:
          | {
              size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
              RichText?:
                | {
                    [k: string]: unknown;
                  }[]
                | null;
              enableLink?: boolean | null;
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('default' | 'primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }
    | {
        invertBackground?: boolean | null;
        position?: ('mediaUp' | 'mediaDown') | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        populateBy?: ('collection' | 'selection') | null;
        relationTo?: ('products' | 'posts') | null;
        categories?: (string | Category)[] | null;
        limit?: number | null;
        selectedDocs?:
          | (
              | {
                  relationTo: 'products';
                  value: string | Product;
                }
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }
            )[]
          | null;
        populatedDocs?:
          | (
              | {
                  relationTo: 'products';
                  value: string | Product;
                }
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }
            )[]
          | null;
        populatedDocsTotal?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'archive';
      }
    | {
        invertBackground?: boolean | null;
        mediaPosition?: ('left' | 'right') | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'contentMedia';
      }
    | {
        invertBackground?: boolean | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        links?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'CtaWithImage';
      }
    | {
        mediaContentFields?: {
          MoreImages?:
            | {
                Images?: {
                  type?: ('TwoImages' | 'ThreeImages' | 'FourImages') | null;
                  TwoImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                  TrippleImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                  FourImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                };
                id?: string | null;
              }[]
            | null;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'DoubleMediaContent';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        NewTag?: boolean | null;
        CustomTag?: string | null;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'products-slider';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'recommended';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'last-viewed';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        CustomReschedule?: boolean | null;
        StartTime?: string | null;
        EndTime?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'flash-sales';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Event-Archive';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Deals-archive';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'TopDealsGrid';
      }
    | {
        FlexBanners?: {
          HorizontalBanners?:
            | {
                richText: {
                  [k: string]: unknown;
                }[];
                links?:
                  | {
                      link: {
                        type?: ('reference' | 'custom') | null;
                        newTab?: boolean | null;
                        reference?: {
                          relationTo: 'pages';
                          value: string | Page;
                        } | null;
                        url?: string | null;
                        label: string;
                        icon?: string | Media | null;
                        appearance?: ('default' | 'primary' | 'secondary') | null;
                      };
                      id?: string | null;
                    }[]
                  | null;
                media: string | Media;
                id?: string | null;
              }[]
            | null;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'FlexBanner';
      }
    | {
        HolidayBanners?:
          | {
              title: string;
              richText: {
                [k: string]: unknown;
              }[];
              image: string | Media;
              BackgroundColor: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'holiday-banners';
      }
    | {
        discountPercentage: number;
        productTitle: string;
        productDescription: string;
        originalPrice: number;
        discountedPrice: number;
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
          label: string;
          icon?: string | Media | null;
          appearance?: ('default' | 'primary' | 'secondary') | null;
        };
        productImage: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'promo-banners';
      }
  )[];
  Accordion?:
    | {
        Heading: string;
        Description: {
          [k: string]: unknown;
        }[];
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Category {
  id: string;
  title: string;
  media?: string | Media | null;
  reference?: {
    relationTo: 'products';
    value: string | Product;
  } | null;
  CustomUrl?: string | null;
  subCategories?: (string | Category)[] | null;
  parent?: (string | null) | Category;
  breadcrumbs?:
    | {
        doc?: (string | null) | Category;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt?: string | null;
  imagekit?: {
    fileId?: string | null;
    thumbnailUrl?: string | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Product {
  id: string;
  title: string;
  publishedOn?: string | null;
  layout?:
    | (
        | {
            invertBackground?: boolean | null;
            richText: {
              [k: string]: unknown;
            }[];
            links?:
              | {
                  link: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?: {
                      relationTo: 'pages';
                      value: string | Page;
                    } | null;
                    url?: string | null;
                    label: string;
                    icon?: string | Media | null;
                    appearance?: ('primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            invertBackground?: boolean | null;
            columns?:
              | {
                  size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
                  RichText?:
                    | {
                        [k: string]: unknown;
                      }[]
                    | null;
                  enableLink?: boolean | null;
                  link?: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?: {
                      relationTo: 'pages';
                      value: string | Page;
                    } | null;
                    url?: string | null;
                    label: string;
                    icon?: string | Media | null;
                    appearance?: ('default' | 'primary' | 'secondary') | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            invertBackground?: boolean | null;
            position?: ('mediaUp' | 'mediaDown') | null;
            richText: {
              [k: string]: unknown;
            }[];
            media: string | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            populateBy?: ('collection' | 'selection') | null;
            relationTo?: ('products' | 'posts') | null;
            categories?: (string | Category)[] | null;
            limit?: number | null;
            selectedDocs?:
              | (
                  | {
                      relationTo: 'products';
                      value: string | Product;
                    }
                  | {
                      relationTo: 'posts';
                      value: string | Post;
                    }
                )[]
              | null;
            populatedDocs?:
              | (
                  | {
                      relationTo: 'products';
                      value: string | Product;
                    }
                  | {
                      relationTo: 'posts';
                      value: string | Post;
                    }
                )[]
              | null;
            populatedDocsTotal?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'archive';
          }
      )[]
    | null;
  price: number;
  discount?: number | null;
  discountedPrice?: number | null;
  FlashSalesItems?: number | null;
  ProductsAttributes?: (string | AttributesCollection)[] | null;
  categories?: (string | Category)[] | null;
  relatedProducts: (string | Product)[];
  slug?: string | null;
  OtherImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  OutOfStock?: boolean | null;
  skipSync?: boolean | null;
  brands?:
    | (
        | 'Americolor'
        | 'BakeKing'
        | 'Bakeland'
        | 'Bakels'
        | "Baker's Delight"
        | 'Bakeware'
        | 'Blossoms'
        | 'Candy'
        | 'Caroline Cupcakes'
        | 'Clovers'
        | 'Collata'
        | 'Dairyland'
        | 'Dr Gusto'
        | 'Easy Bake Supplies Limited'
        | "Elly's"
        | 'Essence'
        | 'Eurocas'
        | 'Europea'
        | 'Flour'
        | 'Hamilworth'
        | 'Kenafric Industries'
        | 'KSL'
        | 'Lato'
        | 'Lyons'
        | 'Maimun'
        | 'Nestle'
        | 'Pradip'
        | 'Pristine'
        | 'Puratos'
        | 'Rainbow dust'
        | 'Strawberries'
        | 'Sugarflair'
        | 'Top Lure'
        | 'Tri Clover'
        | 'Ustam'
        | 'Wilton'
        | 'Zeelandia'
        | 'Zesta'
      )
    | null;
  Reviews?: (string | Review)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Post {
  id: string;
  title: string;
  categories?: (string | Category)[] | null;
  publishedOn?: string | null;
  authors: (string | User)[];
  populatedAuthors?:
    | {
        id?: string | null;
        name?: string | null;
      }[]
    | null;
  hero: {
    type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'customHero';
    richText: {
      [k: string]: unknown;
    }[];
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            label: string;
            icon?: string | Media | null;
            appearance?: ('default' | 'primary' | 'secondary') | null;
          };
          id?: string | null;
        }[]
      | null;
    media?: string | Media | null;
  };
  layout: (
    | {
        invertBackground?: boolean | null;
        richText: {
          [k: string]: unknown;
        }[];
        links?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'cta';
      }
    | {
        invertBackground?: boolean | null;
        columns?:
          | {
              size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
              RichText?:
                | {
                    [k: string]: unknown;
                  }[]
                | null;
              enableLink?: boolean | null;
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('default' | 'primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }
    | {
        invertBackground?: boolean | null;
        position?: ('mediaUp' | 'mediaDown') | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'mediaBlock';
      }
    | {
        populateBy?: ('collection' | 'selection') | null;
        relationTo?: ('products' | 'posts') | null;
        categories?: (string | Category)[] | null;
        limit?: number | null;
        selectedDocs?:
          | (
              | {
                  relationTo: 'products';
                  value: string | Product;
                }
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }
            )[]
          | null;
        populatedDocs?:
          | (
              | {
                  relationTo: 'products';
                  value: string | Product;
                }
              | {
                  relationTo: 'posts';
                  value: string | Post;
                }
            )[]
          | null;
        populatedDocsTotal?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'archive';
      }
    | {
        invertBackground?: boolean | null;
        mediaPosition?: ('left' | 'right') | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'contentMedia';
      }
    | {
        invertBackground?: boolean | null;
        richText: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        links?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
                icon?: string | Media | null;
                appearance?: ('primary' | 'secondary') | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'CtaWithImage';
      }
    | {
        mediaContentFields?: {
          MoreImages?:
            | {
                Images?: {
                  type?: ('TwoImages' | 'ThreeImages' | 'FourImages') | null;
                  TwoImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                  TrippleImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                  FourImages?:
                    | {
                        media: string | Media;
                        id?: string | null;
                      }[]
                    | null;
                };
                id?: string | null;
              }[]
            | null;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'DoubleMediaContent';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        NewTag?: boolean | null;
        CustomTag?: string | null;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'products-slider';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'recommended';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'last-viewed';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        CustomReschedule?: boolean | null;
        StartTime?: string | null;
        EndTime?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'flash-sales';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Event-Archive';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Deals-archive';
      }
    | {
        Heading: string;
        BackgroundColor: string;
        TextColor: string;
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'TopDealsGrid';
      }
  )[];
  relatedPosts?: (string | Post)[] | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface User {
  id: string;
  title?: string | null;
  name?: string | null;
  photo?: string | Media | null;
  roles?: ('admin' | 'customer' | 'editor' | 'manager')[] | null;
  purchases?: (string | Product)[] | null;
  recentlyViewed?: (string | Product)[] | null;
  DeliveryLocation?: (string | DeliveryLocation)[] | null;
  cart?: {
    items?: CartItems;
    createdOn?: string | null;
    lastModified?: string | null;
  };
  skipSync?: boolean | null;
  role?: ('customer' | 'editor' | 'manager' | 'admin') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface DeliveryLocation {
  id: string;
  title?: string | null;
  address: string;
  AdditionalInformation: string;
  region: string;
  googlepin?: string | null;
  price?: number | null;
  updatedAt: string;
  createdAt: string;
}
export interface AttributesCollection {
  id: string;
  title?: string | null;
  Attribute_Name: string;
  Attribute_Property?:
    | {
        label: string;
        type?: ('text' | 'color' | 'number' | 'brand') | null;
        Value?: string | null;
        colourValue?: string | null;
        NumberValue?: number | null;
        media?: string | Media | null;
        price?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Review {
  id: string;
  title?: string | null;
  user?: (string | null) | User;
  name?: string | null;
  message?: string | null;
  rating: '0' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '4.5' | '5';
  updatedAt: string;
  createdAt: string;
}
export interface Order {
  id: string;
  orderedBy?: (string | null) | User;
  refId?: string | null;
  GenerateReceiptButton?: string | null;
  total: number;
  deliveryCost: number;
  items?:
    | {
        product: string | Product;
        price?: number | null;
        quantity?: number | null;
        selectedAttributes?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  phoneNumber?: string | null;
  orderNotes?: string | null;
  deliveryType?: string | null;
  location?: string | null;
  deliveryNote?: string | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  customLocation?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
export interface Video {
  id: string;
  updatedAt: string;
  createdAt: string;
}
export interface SiteMedia {
  id: string;
  title: string;
  media?: string | Media | null;
  HeroSmallImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  FlipingImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  FaqImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  ForInquiriesImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  SelfDriveImages?:
    | {
        media: string | Media;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Comment {
  id: string;
  user?: (string | null) | User;
  populatedUser?: {
    id?: string | null;
    name?: string | null;
  };
  doc?: (string | null) | Post;
  comment?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Alert {
  id: string;
  name?: string | null;
  placement: 'global' | 'documents';
  documents?:
    | {
        relationTo: 'pages';
        value: string | Page;
      }[]
    | null;
  backgroundColor?: ('matchTheme' | 'green' | 'blue' | 'red' | 'purple') | null;
  content: {
    [k: string]: unknown;
  }[];
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
          label: string;
          icon?: string | Media | null;
          appearance?: ('default' | 'primary' | 'secondary') | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Headercategory {
  id: string;
  Category: string;
  Subcategory?: SubCategory;
  updatedAt: string;
  createdAt: string;
}
export interface LiveChat {
  id: string;
  Customer?: string | null;
  Agent?: string | null;
  Aiagent?: string | null;
  EmailCustomer?: string | null;
  EmailAgent?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface EmailBulkySm {
  id: string;
  CustomerEmail?: string | null;
  AgentEmail?: string | null;
  AiAgentEmail?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  applicableTo: 'products' | 'deliveryRider' | 'deliveryMatatu' | 'allProducts';
  relatedProducts?: (string | null) | Product;
  expiryDate?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface SearchTerm {
  id: string;
  term: string;
  count?: number | null;
  lastSearched?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc: {
    relationTo: 'products';
    value: string | Product;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Redirect {
  id: string;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: string | Page;
        } | null)
      | ({
          relationTo: 'products';
          value: string | Product;
        } | null);
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Form {
  id: string;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'state';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  redirect?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string | null;
  };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface FormSubmission {
  id: string;
  form: string | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
export interface Settings {
  id: string;
  productsPage?: (string | null) | Page;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Header {
  id: string;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
          label: string;
          icon?: string | Media | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Footer {
  id: string;
  copyright?: string | null;
  Categories: (string | Category)[];
  topbrands: (string | Category)[];
  information: (string | Category)[];
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
          label: string;
          icon?: string | Media | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}