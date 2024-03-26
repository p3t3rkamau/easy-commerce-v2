import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import search from '@payloadcms/plugin-search'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
// import stripePlugin from '@payloadcms/plugin-stripe' // editor-import
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
// import warding, { convention } from 'payload-warding'
import imagekitPlugin from 'payloadcms-plugin-imagekit'

// import { ReusableContent } from './blocks/ReusableContent'
import { Alerts } from './collections/Alerts'
// import { CaseStudies } from './collections/CaseStudies'
import Categories from './collections/Categories'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import Products from './collections/Products'
import { Projects } from './collections/Projects'
import Promotion from './collections/Promotions'
// import { QuestionSets } from './collections/QuestionSets'
import Reviews from './collections/Reviews/Reviews'
import Users from './collections/Users'
import Videos from './collections/Videos'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
// import payloadMux from './plugins/payload-mux/plugin'
// import payloadVercel from './plugins/payload-vercel/plugin'
// import { priceUpdated } from './stripe/webhooks/priceUpdated'
// import { productUpdated } from './stripe/webhooks/productUpdated'
const generateTitle: GenerateTitle = () => {
  return 'Easy Bake Supplies'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(), // bundler-config
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [BeforeDashboard],
    },
    webpack: config => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/seed')]: mockModulePath,
            // [path.resolve(__dirname, 'plugins/payload-mux/endpoints')]: mockModulePath,
            // [path.resolve(__dirname, 'plugins/payload-mux/hooks')]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
          },
        },
      }
    },
  },
  editor: slateEditor({}), // editor-config
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Pages,
    Products,
    Orders,
    Media,
    Videos,
    Categories,
    Users,
    Reviews,
    Promotion,
    Comments,
    Projects,
    Posts,
    Alerts,
    // CaseStudies,
    // QuestionSets,
    // ReusableContent,
  ],
  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  // GraphQL is included by default at /api/graphql

  // if not using graphQL it should be disabled for security and performance reasons
  // graphQL: false
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: false,
    disable: false,
  },
  cors: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  // rateLimits provide basic API DDOS (Denial-of-service) protection and can limit accidental server load from scripts
  rateLimit: {
    trustProxy: true,
    max: 4000,
  },
  // optional customization of routes
  routes: {
    api: '/api',
    admin: '/admin',
    graphQL: '/graphql',
    graphQLPlayground: '/graphql-playground',
  },

  localization: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de'],
  },

  // endpoints: [
  //   {
  //     method: 'get',
  //     path: '/payload-version',
  //     handler: readPayloadVersion,
  //   },
  // ],

  endpoints: [
    // {
    //   path: '/create-payment-intent',
    //   method: 'post',
    //   handler: createPaymentIntent,
    // },
    // {
    //   path: '/stripe/customers',
    //   method: 'get',
    //   handler: customersProxy,
    // },
    // {
    //   path: '/stripe/products',
    //   method: 'get',
    //   handler: productsProxy,
    // },
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    // {
    //   path: '/seed',
    //   method: 'get',
    //   handler: seed,
    // },
  ],
  plugins: [
    // formBuilder({}),
    // stripePlugin({
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    //   isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
    //   stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
    //   rest: false,
    //   webhooks: {
    //     'product.created': productUpdated,
    //     'product.updated': productUpdated,
    //     'price.updated': priceUpdated,
    //   },
    // }),
    search({
      collections: ['products'],
      defaultPriorities: {
        Products: 10,
      },
    }),
    // payloadMux({
    //   enabled: true,
    //   collection: 'videos',
    //   debug: true,
    // }),
    // payloadVercel({
    //   enabled: false,
    //   revalidationUrls: [`http://localhost:3000/api/revalidate`],
    //   debug: true,
    //   config: {
    //     home: {
    //       paths: ['/'],
    //     },
    //     projects: {
    //       paths: ['/', '/work/[slug]'],
    //       tags: ['projects'],
    //     },
    //   },
    //   deployHooks: [
    //     {
    //       label: 'Publish Preview',
    //       // Deploy Hook URL created in Vercel dashboard
    //       url: 'https://www.google.com',
    //       useBuildCache: false,
    //     },
    //   ],
    // }),
    redirects({
      collections: ['pages', 'products'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'products', 'case-studies'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    // warding(
    //   convention.opts({
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     root: { email: process.env.YOUR_ROOT_EMAIL!, password: process.env.YOUR_ROOT_PASSWORD! },
    //   }),
    // ),
    formBuilder({
      formOverrides: {
        admin: {
          group: 'Content',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Admin',
        },
      },
      redirectRelationships: ['pages'],
    }),
    imagekitPlugin({
      config: {
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        endpoint: process.env.IK_ENDPOINT,
      },
      collections: {
        media: {
          uploadOption: {
            folder: 'All_Products',
          },
          savedProperties: ['url'],
        },
      },
    }),
  ],
})
