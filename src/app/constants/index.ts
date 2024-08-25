export const inclusions = [
  {
    title: 'Free Shipping',
    description: 'Free shipping for order above 10K',
    icon: '/assets/icons/shipping.svg',
  },
  {
    title: 'Money Guarantee',
    description: 'Within 30 days for an exchange',
    icon: '/assets/icons/dollar.svg',
  },
  {
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
    icon: '/assets/icons/support.svg',
  },
  {
    title: 'Flexible Payment',
    description: 'Pay with multiple credit cards',
    icon: '/assets/icons/payment.svg',
  },
]

export const profileNavItems = [
  {
    title: 'Personal Information',
    url: '/account',
    icon: '/assets/icons/user.svg',
  },
  {
    title: 'My Purchases',
    url: '/account/purchases',
    icon: '/assets/icons/purchases.svg',
  },
  {
    title: 'My Orders',
    url: '/account/orders',
    icon: '/assets/icons/orders.svg',
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: '/assets/icons/logout.svg',
  },
]

export const noHeaderFooterUrls = ['/create-account', '/login', '/recover-password']
export const demoProductData = {
  title: 'Havic HV G-92 Gamepad',
  price: 192.0,
  OutOfStock: false,
  averageRating: 4.2,
  totalReviews: 150,
  ratingCounts: {
    5: 80,
    4: 40,
    3: 20,
    2: 7,
    1: 3,
  },
  reviews: [
    {
      rating: 5,
      title: 'Great gaming experience!',
      content:
        'This gamepad is fantastic. The build quality is solid, and it feels great in hand. Responsive buttons and smooth analog sticks.',
      author: 'John D.',
      date: '2024-08-15',
      verified: true,
    },
    {
      rating: 4,
      title: 'Good, but could be better',
      content:
        "Overall, it's a good gamepad. The only issue I have is that the D-pad feels a bit stiff. Otherwise, it's a solid choice.",
      author: 'Sarah M.',
      date: '2024-08-10',
      verified: true,
    },
    {
      rating: 3,
      title: 'Decent for the price',
      content:
        "It's okay for casual gaming, but I wouldn't recommend it for competitive play. The triggers could be more responsive.",
      author: 'Mike R.',
      date: '2024-08-05',
      verified: false,
    },
  ],
}

export const homeBanners = [
  'banner.webp',
  'banner.webp',
  'banner.webp',
  'banner.webp',
  'banner.webp',
]
