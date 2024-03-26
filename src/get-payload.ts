// import dotenv from 'dotenv'
// import nodemailer from 'nodemailer'
// import path from 'path'
// import type { Payload } from 'payload'
// import payload from 'payload'
// import type { InitOptions } from 'payload/config'

// dotenv.config({
//   // dirname get the current directory
//   path: path.resolve(__dirname, '../.env'),
// })

// const transporter = nodemailer.createTransport({
//   host: 'smtp.resend.com',
//   secure: true,
//   port: 465,
//   auth: {
//     user: 'resend',
//     pass: process.env.RESEND_API_KEY,
//   },
// })

// let cached = (global as any).payload

// if (!cached) {
//   cached = (global as any).payload = {
//     client: null,
//     promise: null,
//   }
// }

// interface Args {
//   initOptions?: Partial<InitOptions>
// }

// export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
//   if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is missing')

//   if (cached.client) return cached.client

//   if (!cached.promise) {
//     cached.promise = payload.init({
//       email: {
//         transport: transporter,
//         // fromAddress: 'migue012002@hotmail.com',
//         fromAddress: 'petercubolt@gmail.com',
//         fromName: 'Easy Bake Supplies',
//       },
//       secret: process.env.PAYLOAD_SECRET,
//       local: initOptions?.express ? false : true,
//       ...(initOptions || {}),
//     })
//   }

//   try {
//     cached.client = await cached.promise
//   } catch (error: unknown) {
//     cached.client = null
//     throw error
//   }

//   return cached.client
// }
