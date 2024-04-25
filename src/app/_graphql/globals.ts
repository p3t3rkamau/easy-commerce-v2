import { LINK_FIELDS } from './link'

export const HEADER = `
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`

export const FOOTER = `
  Footer {
    copyright
    Categories{
      title
    }
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`

export const SETTINGS = `
  Settings {
    productsPage {
      slug
    }
  }
`

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`

export const GLOBALS = `
  query {
    MainMenu {
      tabs {
        label
        enableDirectLink
        enableDropdown
        link ${LINK_FIELDS({ disableAppearance: true, disableLabel: true })}
        description
        descriptionLinks {
          link ${LINK_FIELDS({ disableAppearance: true })}
        }
        navItems {
          style
          listLinks {
            tag
            links {
              link ${LINK_FIELDS({ disableAppearance: true })}
            }
          }
          defaultLink {
            description
            link ${LINK_FIELDS({ disableAppearance: true })}
          }
          featuredLink {
            tag
            label
            links {
              link ${LINK_FIELDS({ disableAppearance: true })}
            }
          }
        }
      }
    }
  }
`
