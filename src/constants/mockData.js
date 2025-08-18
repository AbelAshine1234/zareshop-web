// Mock data for products
export const mockProducts = [
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
    price: 599000,
    currency: 'ETB',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=608&h=456&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=608&h=456&fit=crop'
    ],
    thumbnails: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=75&h=56&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=75&h=56&fit=crop'
    ],
    description: 'BMW K 1200 LT 2006, luxury touring motorcycle in excellent condition.',
    specifications: {
      brand: 'BMW',
      model: 'K 1200 LT',
      country: 'Germany',
      year: 2006,
      mileage: '45,000 km',
      type: 'Luxury Touring',
      engineType: 'Gasoline',
      power: '152 hp',
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
    datePosted: 'September 18, 6:03 PM'
  }
];

export const otherProducts = [
  {
    id: 'bmw-k1200-lt-2006',
    title: 'BMW K 1200 LT 2006',
    price: 599000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:03 PM'
  },
  {
    id: 'bmw-r1200-gs-2014',
    title: 'BMW R 1200 GS 2014',
    price: 939000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:02 PM'
  },
  {
    id: 'bmw-r1100-rs-1998',
    title: 'BMW R 1100 RS 1998',
    price: 249000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:04 PM'
  },
  {
    id: 'bmw-r1200-gs-2016',
    title: 'BMW R 1200 GS 2016',
    price: 999000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:03 PM'
  },
  {
    id: 'bmw-f850-gs-2018',
    title: 'BMW F 850 GS 2018',
    price: 999000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 24, 5:10 AM'
  },
  {
    id: 'bmw-f750-gs-2023',
    title: 'BMW F 750 GS 2023',
    price: 969000,
    currency: 'ETB',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=200&h=150&fit=crop',
    location: 'Moscow, sh. Entuziastov, 100k1, Novogireevo',
    datePosted: 'September 18, 6:03 PM'
  }
];

// Utility function to format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};
