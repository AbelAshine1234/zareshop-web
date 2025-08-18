// Centralized Data File - All static data for the application
// Import this file in components instead of hardcoding data

// ===== CATEGORIES DATA =====
export const CATEGORIES = [
  { title: 'Auto', img: 'https://picsum.photos/seed/auto/320/200', id: 'auto' },
  { title: 'Real estate', img: 'https://picsum.photos/seed/realestate/320/200', id: 'real-estate' },
  { title: 'Job', img: 'https://picsum.photos/seed/job/320/200', id: 'job' },
  { title: 'Clothing, footwear,\naccessories', img: 'https://picsum.photos/seed/clothes/320/200', id: 'clothing' },
  { title: 'Hobbies and\nrecreation', img: 'https://picsum.photos/seed/hobbies/320/200', id: 'hobbies' },
  { title: 'Animals', img: 'https://picsum.photos/seed/animals/320/200', id: 'animals' },
  { title: 'Ready-made business\nand equipment', img: 'https://picsum.photos/seed/business/320/200', id: 'business' },
  { title: 'Services', img: 'https://picsum.photos/seed/services/320/200', id: 'services' },
  { title: 'Electronics', img: 'https://picsum.photos/seed/electronics/320/200', id: 'electronics' },
  { title: 'For home and garden', img: 'https://picsum.photos/seed/home/320/200', id: 'home-garden' },
  { title: 'Spare parts', img: 'https://picsum.photos/seed/spares/320/200', id: 'spare-parts' },
  { title: 'Products for children', img: 'https://picsum.photos/seed/children/320/200', id: 'children' },
  { title: 'Accommodation for travel', img: 'https://picsum.photos/seed/travel/320/200', id: 'travel' },
  { title: 'Beauty and health', img: 'https://picsum.photos/seed/beauty/320/200', id: 'beauty-health' },
]

// ===== CATEGORY IMAGES FOR POPUP =====
export const CATEGORY_IMAGES = {
  'transport': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center',
  'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center',
  'job': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
  'services': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
  'personal-belongings': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center',
  'home-garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center',
  'spare-parts': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
  'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop&crop=center',
  'hobbies-recreation': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
  'animals': 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=center',
  'business-equipment': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
  'children': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop&crop=center',
  'travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop&crop=center',
  'beauty-health': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center'
}

// ===== DETAILED CATEGORIES DATA FOR POPUP =====
export const CATEGORIES_DATA = [
  {
    id: 'transport',
    name: 'Transport',
    image: CATEGORY_IMAGES.transport,
    subcategories: [
      { name: 'Cars', items: [{ name: 'Passenger cars' }, { name: 'Commercial vehicles' }, { name: 'Classic cars' }] },
      { name: 'Motorcycles and Motor Vehicles', items: [{ name: 'ATVs' }, { name: 'Scooters' }, { name: 'Motorcycles' }] },
      { name: 'Trucks and special equipment', items: [{ name: 'Trucks' }, { name: 'Trailers' }] }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real estate',
    image: CATEGORY_IMAGES['real-estate'],
    subcategories: [
      { name: 'Apartments', items: [{ name: '1-room' }, { name: '2-room' }, { name: '3-room' }] },
      { name: 'Houses', items: [{ name: 'Private houses' }, { name: 'Cottages' }] }
    ]
  },
  {
    id: 'job',
    name: 'Job',
    image: CATEGORY_IMAGES.job,
    subcategories: [
      { name: 'IT and Internet', items: [{ name: 'Software development' }, { name: 'UI/UX design' }] },
      { name: 'Sales and Marketing', items: [{ name: 'Sales manager' }, { name: 'Marketing manager' }] }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    image: CATEGORY_IMAGES.services,
    subcategories: [
      { name: 'Home and Garden', items: [{ name: 'Cleaning services' }, { name: 'Plumbing' }] },
      { name: 'Beauty and Health', items: [{ name: 'Hair salon' }, { name: 'Spa services' }] }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    image: CATEGORY_IMAGES.electronics,
    subcategories: [
      { name: 'Phones and Tablets', items: [{ name: 'Smartphones' }, { name: 'Tablets' }] },
      { name: 'Computers and Laptops', items: [{ name: 'Laptops' }, { name: 'Desktops' }] }
    ]
  },
]

// ===== MOCK PRODUCTS DATA =====
export const MOCK_PRODUCTS = [
  {
    id: 'bmw-f650-gs-2001',
    title: 'BMW F 650 GS 2001',
    price: 199000,
    currency: 'ETB',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=608&h=456&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=608&h=456&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=608&h=456&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=608&h=456&fit=crop'
    ],
    thumbnails: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=75&h=56&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=75&h=56&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=75&h=56&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=75&h=56&fit=crop'
    ],
    description: 'BMW F 650 GS 2001, touring-enduro motorcycle in excellent condition. Single owner, well maintained.',
    specifications: {
      brand: 'BMW',
      model: 'F 650 GS',
      country: 'Germany',
      year: 2001,
      mileage: '79,903 km',
      type: 'Touring-enduro',
      engineType: 'Gasoline',
      power: '50 hp',
      engineCapacity: '650 cm³',
      driveType: 'Chain',
      condition: 'Used',
      owners: 1,
      vin: 'WB10*************',
      availability: 'In stock'
    },
    seller: {
      name: 'Motorcycle salon "HOTMOT"',
      rating: 4.6,
      reviews: 242,
      type: 'Company',
      contactPerson: 'manager',
      icon: '🏍️'
    },
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:03 PM'
  },
  {
    id: 'bmw-k1200-lt-2006',
    title: 'BMW K 1200 LT 2006',
    price: 450000,
    currency: 'ETB',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=608&h=456&fit=crop'
    ],
    thumbnails: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=75&h=56&fit=crop'
    ],
    description: 'BMW K 1200 LT 2006, luxury touring motorcycle in excellent condition.',
    specifications: {
      brand: 'BMW',
      model: 'K 1200 LT',
      country: 'Germany',
      year: 2006,
      mileage: '45,000 km',
      type: 'Touring',
      engineType: 'Gasoline',
      power: '116 hp',
      engineCapacity: '1171 cm³',
      driveType: 'Shaft',
      condition: 'Used',
      owners: 2,
      vin: 'WB10*************',
      availability: 'In stock'
    },
    seller: {
      name: 'Motorcycle salon "HOTMOT"',
      rating: 4.6,
      reviews: 242,
      type: 'Company',
      contactPerson: 'manager',
      icon: '🏍️'
    },
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 15, 2:30 PM'
  }
]

// ===== CATEGORY PAGE PRODUCTS =====
export const CATEGORY_PAGE_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 16 Pro Max, 256 GB",
    price: 104990,
    location: "Ryazan",
    condition: "New",
    screenSize: "6.7\"",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    hasMultipleImages: true,
    imageCount: 5,
    views: 1247,
    postedDate: "2 hours ago",
    description: "iPhone 16 Pro Max with 256GB storage. Latest model with advanced camera system and A18 Pro chip.",
    seller: {
      name: "Apple Store",
      rating: 5.0,
      reviews: 961,
      verified: true,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop"
    },
    priceTag: "Delivery only",
    delivery: "Delivery from 1 day",
    isHighlighted: true
  },
  {
    id: 9,
    title: "iPhone 16 Pro Max, 256 GB",
    price: 94950,
    location: "Yaroslavl",
    condition: "New",
    screenSize: "6.7\"",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    hasMultipleImages: true,
    imageCount: 3,
    views: 892,
    postedDate: "5 hours ago",
    description: "iPhone 16 Pro Max with 256GB storage. Market price.",
    seller: {
      name: "Tech Store",
      rating: 4.9,
      reviews: 1765,
      verified: true,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop"
    },
    priceTag: "Market price",
    isHighlighted: false
  },
  {
    id: 10,
    title: "iPhone 15, 128 GB",
    price: 49990,
    location: "Moscow",
    condition: "New",
    screenSize: "6.1\"",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    hasMultipleImages: true,
    imageCount: 4,
    views: 567,
    postedDate: "1 day ago",
    description: "iPhone 15 with 128GB storage. Previous generation at great price.",
    seller: {
      name: "Mobile World",
      rating: 4.7,
      reviews: 523,
      verified: true,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop"
    },
    priceTag: "Below market",
    isHighlighted: false
  }
]

// ===== SUPPLIER DATA =====
export const MOCK_SUPPLIER = {
  id: "comet-stor",
  name: "CometStor",
  description: "Official seller of electronics and gadgets. We offer the latest technology at competitive prices with warranty and professional service.",
  rating: 4.8,
  reviews: 109,
  verified: true,
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop",
  banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop",
  // Fields used by SupplierProfile and SupplierInformation
  subscribers: 89,
  following: 18,
  joinDate: "April 2019",
  responseTime: "30 minutes",
  location: "Rostov-on-Don, Rostov Oblast, Russia",
  specialties: ["iPhone", "Samsung", "Electronics", "Accessories"],
  delivery: "Free delivery",
  returnPolicy: "14 days return",
  badges: [
    { icon: "✓", text: "Reliable seller", color: "#E3F2FD" },
    { icon: "🛒", text: "6 purchases with Avito Delivery", color: "#E3F2FD" },
    { icon: "🚚", text: "2 sales with Avito Delivery", color: "#E3F2FD" }
  ],
  stats: {
    products: 156,
    followers: 1247,
    yearsInBusiness: 5
  },
  contact: "+7 (495) 123-45-67",
  website: "cometstor.ru"
}

// ===== SUPPLIER PRODUCTS =====
export const SUPPLIER_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 17 Pro Max, 512 GB",
    price: 157990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "3 days ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    priceTag: "The price is below market",
    condition: "New",
    views: 1247,
    hasMultipleImages: true,
    imageCount: 5
  },
  {
    id: 2,
    title: "Samsung Galaxy S25 Ultra, 12/512 GB",
    price: 82990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "15 hours ago",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 892,
    hasMultipleImages: true,
    imageCount: 3
  },
  {
    id: 3,
    title: "iPhone 17 Pro Max, 512 GB",
    price: 184990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "1 week ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 1567,
    hasMultipleImages: true,
    imageCount: 4
  },
  {
    id: 4,
    title: "Samsung Galaxy S25 Ultra, 12/256 GB",
    price: 73990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "May 15, 12:55",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 2341,
    hasMultipleImages: true,
    imageCount: 6
  },
  {
    id: 5,
    title: "Samsung Galaxy Buds 3 Pro Wireless",
    price: 15990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "2 days ago",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 445,
    hasMultipleImages: true,
    imageCount: 3
  },
  {
    id: 6,
    title: "Samsung Galaxy S25, 12/256 GB",
    price: 69990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "4 hours ago",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 567,
    hasMultipleImages: true,
    imageCount: 4
  },
  {
    id: 7,
    title: "Samsung Galaxy S25, 12/512 GB",
    price: 79990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "1 day ago",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    priceTag: "Market price",
    condition: "New",
    views: 789,
    hasMultipleImages: true,
    imageCount: 5
  },
  {
    id: 8,
    title: "iPhone 16 Pro, 256 GB",
    price: 97990,
    location: "Rostov region, Rostov-on-Don",
    postedDate: "6 hours ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    priceTag: "The price is below market",
    condition: "New",
    views: 1234,
    hasMultipleImages: true,
    imageCount: 4
  }
]

// ===== REVIEWS DATA =====
export const MOCK_REVIEWS = [
  {
    id: 1,
    user: "Alexey K.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent service! Fast delivery and the product was exactly as described. Highly recommend this seller.",
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    user: "Maria S.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop",
    rating: 5,
    date: "1 week ago",
    comment: "Great communication and fast response. Product quality exceeded my expectations. Will definitely buy again!",
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    user: "Dmitry V.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    rating: 4,
    date: "2 weeks ago",
    comment: "Good seller, fast delivery. Product was as described. Minor issue with packaging but overall satisfied.",
    helpful: 5,
    verified: false
  },
  {
    id: 4,
    user: "Elena M.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    rating: 5,
    date: "3 weeks ago",
    comment: "Perfect! Everything was exactly as promised. Professional service and great prices. Thank you!",
    helpful: 15,
    verified: true
  },
  {
    id: 5,
    user: "Sergey P.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    rating: 5,
    date: "1 month ago",
    comment: "Outstanding seller! Fast shipping, excellent packaging, and the product is perfect. Highly recommended!",
    helpful: 20,
    verified: true
  }
]

// ===== RATING DISTRIBUTION =====
export const RATING_DISTRIBUTION = {
  5: 105,
  4: 1,
  3: 0,
  2: 0,
  1: 3
}

// ===== RECOMMENDATIONS DATA =====
export const MOCK_RECOMMENDATIONS = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 85000,
    images: [{ image_url: 'https://picsum.photos/seed/iphone/200/150' }],
    category: { name: 'Electronics' }
  },
  {
    id: '2', 
    name: 'Samsung Galaxy S24',
    price: 75000,
    images: [{ image_url: 'https://picsum.photos/seed/samsung/200/150' }],
    category: { name: 'Electronics' }
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    price: 120000,
    images: [{ image_url: 'https://picsum.photos/seed/macbook/200/150' }],
    category: { name: 'Computers' }
  },
  {
    id: '4',
    name: 'AirPods Pro',
    price: 25000,
    images: [{ image_url: 'https://picsum.photos/seed/airpods/200/150' }],
    category: { name: 'Audio' }
  },
  {
    id: '5',
    name: 'Nike Air Max',
    price: 8500,
    images: [{ image_url: 'https://picsum.photos/seed/shoes/200/150' }],
    category: { name: 'Fashion' }
  },
  {
    id: '6',
    name: 'Coffee Machine',
    price: 15000,
    images: [{ image_url: 'https://picsum.photos/seed/coffee/200/150' }],
    category: { name: 'Home & Kitchen' }
  },
  {
    id: '7',
    name: 'Gaming Chair',
    price: 12000,
    images: [{ image_url: 'https://picsum.photos/seed/chair/200/150' }],
    category: { name: 'Furniture' }
  },
  {
    id: '8',
    name: 'Wireless Earbuds',
    price: 3500,
    images: [{ image_url: 'https://picsum.photos/seed/earbuds/200/150' }],
    category: { name: 'Audio' }
  }
]

// ===== SUPPLIERS DATA =====
export const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "TechWorld Store",
    description: "Premium electronics retailer with 5+ years experience",
    rating: 4.8,
    reviews: 245,
    verified: true,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
    location: "Moscow, Russia",
    products: 156,
    followers: 1247
  },
  {
    id: 2,
    name: "Mobile Expert",
    description: "Specialized in smartphones and mobile accessories",
    rating: 4.9,
    reviews: 189,
    verified: true,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
    location: "St. Petersburg, Russia",
    products: 89,
    followers: 892
  }
]
