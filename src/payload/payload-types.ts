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
    LiveChats: LiveChat;
    EmailBulkySms: EmailBulkySm;
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
    'main-menu': MainMenu;
  };
}
export interface Page {
  id: string;
  title: string;
  publishedOn?: string | null;
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
              richText: {
                [k: string]: unknown;
              }[];
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
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'flash-sales';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Event-Archive';
      }
    | {
        selectedDocs?: (string | Product)[] | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'Deals-archive';
      }
  )[];
  SlidingImages?:
    | {
        media: string | Media;
        Heading: string;
        Description: string;
        id?: string | null;
      }[]
    | null;
  Accordion?:
    | {
        Heading: string;
        Description: string;
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
export interface Category {
  id: string;
  title: string;
  media?: string | Media | null;
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
                  richText: {
                    [k: string]: unknown;
                  }[];
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
  colors?:
    | (
        | 'rgb(255, 0, 0)'
        | 'rgb(0, 0, 255)'
        | 'rgb(255, 165, 0)'
        | 'rgb(255, 215, 0)'
        | 'rgb(255, 255, 255)'
        | 'rgb(0, 0, 0)'
        | 'rgb(0, 128, 0)'
        | 'rgb(255, 255, 0)'
        | 'rgb(128, 0, 128)'
        | 'rgb(255, 192, 203)'
        | 'rgb(0, 255, 255)'
        | 'rgb(255, 0, 255)'
        | 'rgb(0, 255, 0)'
        | 'rgb(0, 128, 128)'
        | 'rgb(165, 42, 42)'
        | 'rgb(0, 0, 128)'
        | 'rgb(64, 224, 208)'
        | 'rgb(250, 128, 114)'
        | 'rgb(75, 0, 130)'
        | 'rgb(112, 128, 144)'
        | 'rgb(128, 128, 0)'
        | 'rgb(70, 130, 180)'
        | 'rgb(205, 133, 63)'
        | 'rgb(255, 99, 71)'
        | 'rgb(85, 107, 47)'
        | 'rgb(135, 206, 235)'
        | 'rgb(210, 105, 30)'
        | 'rgb(160, 82, 45)'
        | 'rgb(47, 79, 79)'
        | 'rgb(0, 139, 139)'
        | 'rgb(128, 0, 0)'
        | 'rgb(255, 140, 0)'
        | 'rgb(65, 105, 225)'
        | 'rgb(219, 112, 147)'
        | 'rgb(230, 230, 250)'
        | 'rgb(0, 250, 154)'
        | 'rgb(184, 134, 11)'
        | 'rgb(147, 112, 219)'
        | 'rgb(205, 92, 92)'
        | 'rgb(0, 206, 209)'
        | 'rgb(183, 110, 121)'
        | 'rgb(50, 205, 50)'
        | 'rgb(255, 105, 180)'
        | 'rgb(128, 128, 128)'
        | 'rgb(192, 192, 192)'
        | 'rgb(255, 255, 240)'
        | 'rgb(255, 253, 208)'
        | 'rgb(64, 224, 208)'
        | 'rgb(0, 0, 255)'
        | 'rgb(255, 182, 193)'
        | 'rgb(255, 0, 255)'
        | 'rgb(255, 255, 255)'
        | 'rgb(255, 192, 203)'
        | 'rgb(255, 0, 0)'
        | 'rgb(255, 255, 255)'
        | 'rgb(255, 0, 0)'
        | 'rgb(255, 255, 0)'
        | 'rgb(0, 0, 0)'
        | 'rgb(0, 128, 0)'
        | 'rgb(255, 165, 0)'
        | 'rgb(255, 192, 203)'
      )[]
    | null;
  size?:
    | (
        | '25cm'
        | '30cm'
        | '50mm'
        | '100mm'
        | '150mm'
        | '200mm'
        | '250mm'
        | '300mm'
        | '350mm'
        | '400mm'
        | '450mm'
        | '500mm'
        | '550mm'
        | '600mm'
        | '650mm'
        | '700mm'
        | '750mm'
        | '800mm'
        | '850mm'
        | '900mm'
        | '950mm'
        | '1000mm'
        | '850mm'
        | '900mm'
        | '950mm'
        | '1000mm'
        | 'small'
        | 'medium'
        | 'large'
        | 'Forever_Leaves_10'
        | 'Forever_Leaves_A'
        | 'Forever_Leaves_FID_5687'
        | 'ST_5687'
        | 'ST_5685'
        | 'ST_5691'
        | 'Bohemian_Pattern_06'
        | 'Harvest_1'
        | 'No_8'
        | 'No_5'
        | 'No_7'
        | 'No_17'
        | 'No_18'
        | '50pcs'
        | '100pcs'
        | '500pcs'
        | '1000 pcs'
        | '4_Hole_Plastic_Cupcake_Containers'
        | '12_Hole_Plastic_Cupcake_Containers'
        | '6_Hole_Plastic_Cupcake_Containers'
        | '24_Hole_Plastic_Cupcake_Containers'
        | '10x15'
        | '12x20'
        | '14x20'
        | '17x24'
        | '18x26'
        | '20x30'
        | '0.1 Inch'
        | '1 Inch'
        | '4 Inch'
        | '5 Inch'
        | '6 Inch'
        | '8 Inch'
        | '10 Inch'
        | '12 Inch'
        | '14 Inch'
        | '16 Inch'
        | '18 Inch'
        | '20 Inch'
        | 'White_10_Inch'
        | 'Peach_10_Inch'
        | 'Turquoise_10_Inch'
        | 'Black_10_Inch'
        | 'White_12_Inch'
        | 'Turquoise_12_Inch'
        | '8x4'
        | '10x4'
        | '10x5'
        | '12x4'
        | '12x5'
        | '4.5x4.5x2'
        | '4.5x4.5x3'
        | '5x5x4'
        | '6x6x4'
        | '8x8x4'
        | '10x10x4'
        | '10x10x5'
        | '11x11x4'
        | '12x12x4'
        | '12x12x5'
        | '14x14x4'
        | '14x14x5'
        | '16x16x4_Fold_2'
        | '16x16x5_Fold_1'
        | '10x10'
        | '12x12'
        | '14x14'
        | '16x16'
        | '18x18'
        | '20x20'
        | '10x10x10_Window'
        | '10x10x10_Plain'
        | '12x12x12_Window'
        | '12x12x12_Plain'
        | '10x10x12_1kg'
        | '12x12x12_2kg'
        | '14x14x14_3kg'
        | '12x12x5_Blue'
        | '12x12x5_Pink'
        | '12x12x5_Green'
        | '10x10x5_Polka_Green'
        | '10x10x5_Polka_Blue'
        | '10x10x5_Polka_Pink'
        | '10.5x10.5x10'
        | '12.5x12.5x12'
        | '14x14x16'
        | '15x15x16'
        | '18x18x18'
        | '10x10x5'
        | '12x12x5'
        | '14x14x5'
        | '16x16x5'
        | '18x18x5'
        | '4x4x4'
        | '6x4x4'
        | '8x4x4'
        | '10x4x4'
        | '12x4x4'
        | '14x4x4'
        | '16x4x4'
      )[]
    | null;
  volumeAndWeight?:
    | (
        | '50ml'
        | '100ml'
        | '150ml'
        | '200ml'
        | '250ml'
        | '300ml'
        | '350ml'
        | '400ml'
        | '450ml'
        | '500ml'
        | '550ml'
        | '600ml'
        | '650ml'
        | '700ml'
        | '750ml'
        | '800ml'
        | '850ml'
        | '900ml'
        | '950ml'
        | '1000ml'
        | '100g'
        | '120g'
        | '15g'
        | '1kg'
        | '2.5kg'
        | '250g'
        | '38g'
        | '40g'
        | '45g'
        | '5kg'
        | '500g'
        | '80g'
        | '90g'
        | '1kg'
        | '2kg'
        | '3kg'
        | '4kg'
        | '5kg'
        | '10kg'
        | '15kg'
        | '20kg'
        | 'Orange Emulsion (50 ml)'
        | 'Orange Emulsion (240 ml)'
        | 'Red Velvet (50 ml)'
        | 'Red Velvet (240 ml)'
        | 'Blueberry (240 ml)'
        | 'Hot Pink (50 ml)'
        | 'Royal Blue (50 ml)'
        | 'Fondant Black (50 ml)'
        | 'Orange Liquid Food Color (50 ml)'
      )[]
    | null;
  rating?: number | null;
  number_reviews?: number | null;
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
              richText: {
                [k: string]: unknown;
              }[];
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
  )[];
  relatedPosts?: (string | Post)[] | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface User {
  id: string;
  name?: string | null;
  photo?: string | Media | null;
  roles?: ('admin' | 'customer')[] | null;
  purchases?: (string | Product)[] | null;
  stripeCustomerID?: string | null;
  cart?: {
    items?: CartItems;
    createdOn?: string | null;
    lastModified?: string | null;
  };
  skipSync?: boolean | null;
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
export interface AttributesCollection {
  id: string;
  Attribute_Name: string;
  Attribute_Property?:
    | {
        label: string | null;
        type?: ('text' | 'color' | 'number') | null;
        colour?: string | null;
        Number?: number | null;
        price?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Review {
  id: string;
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
  stripePaymentIntentID?: string | null;
  DeliveryLocation?: (string | null) | Form;
  mpesaTransactionRef?: string | null;
  total: number;
  items?:
    | {
        product: string | Product;
        price?: number | null;
        quantity?: number | null;
        colorId: string;
        size: string;
        volumeOrHeight: string;
        id?: string | null;
      }[]
    | null;
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
export interface DeliveryLocation {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  updatedAt: string;
  createdAt: string;
}
export interface LiveChat {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface EmailBulkySm {
  id: string;
  alt?: string | null;
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
export interface MainMenu {
  id: string;
  tabs?:
    | {
        label: string;
        enableDirectLink?: boolean | null;
        enableDropdown?: boolean | null;
        link?: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
        };
        description?: string | null;
        descriptionLinks?:
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
        navItems?:
          | {
              style?: ('default' | 'featured' | 'list') | null;
              defaultLink?: {
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
                description?: string | null;
              };
              featuredLink?: {
                tag?: string | null;
                label?:
                  | {
                      [k: string]: unknown;
                    }[]
                  | null;
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
                      };
                      id?: string | null;
                    }[]
                  | null;
              };
              listLinks?: {
                tag?: string | null;
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
                      };
                      id?: string | null;
                    }[]
                  | null;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}