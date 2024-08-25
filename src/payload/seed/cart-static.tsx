import React from 'react'

const StaticCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-lg mb-4">
          Your cart saves to local storage, so you can continue shopping later. Once you
          authenticate, your cart will sync to your user profile, allowing you to continue shopping
          from any device.
        </p>
        <p className="text-lg mb-4">
          Explore more products and continue your shopping experience. If you encounter any issues
          or need help, feel free to reach out to our support team.
        </p>
        <div className="mt-6">
          <h4 className="text-2xl font-semibold mb-2">Explore Our Collection</h4>
          <p className="mb-4">Discover more products and special offers in our store.</p>
          <a
            href="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default StaticCart
