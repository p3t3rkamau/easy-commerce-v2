import React from 'react'

const StaticHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Easy Bake Supplies</h1>
        <p className="text-lg mb-4">
          We’re glad to have you here! If you’re seeing this message, it means we're working on
          something exciting. Stay tuned for updates.
        </p>
        <p className="text-lg mb-4">
          In the meantime, you can find more information or contribute to our open-source project{' '}
          <a
            href="https://github.com/payloadcms/payload/tree/main/templates/ecommerce"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <div className="mt-6">
          <h4 className="text-2xl font-semibold mb-2">Explore More</h4>
          <p className="mb-4">Check out our latest offerings and updates to stay informed.</p>
          <a
            href="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Products
          </a>
        </div>
      </div>
    </div>
  )
}

export default StaticHome
