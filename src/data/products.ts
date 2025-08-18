export interface Product {
  id: string;
  name: string;
  nameAm: string;
  nameOr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  descriptionAm: string;
  descriptionOr: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Traditional Ethiopian Dress',
    nameAm: 'ባህላዊ የኢትዮጵያ ልብስ',
    nameOr: 'Uffata Aadaa Itoophiyaa',
    price: 2500,
    originalPrice: 3000,
    image: 'https://d64gsuwffb70l.cloudfront.net/68a34e89a94c0d31f6ce50f5_1755532945250_2f168305.webp',
    category: 'fashion',
    description: 'Beautiful traditional Ethiopian dress with golden embroidery',
    descriptionAm: 'በወርቅ ጌጥ የተሸለመ ውብ ባህላዊ የኢትዮጵያ ልብስ',
    descriptionOr: 'Uffata bareedaa aadaa Itoophiyaa warqeedhaan miidhagfame',
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    id: '2',
    name: 'Microwave Oven',
    nameAm: 'ማይክሮዌቭ ምድጃ',
    nameOr: 'Ibiddaa Maaykirooweevii',
    price: 8500,
    originalPrice: 9500,
    image: 'https://d64gsuwffb70l.cloudfront.net/68a34e89a94c0d31f6ce50f5_1755532969676_bcd90605.jpg',
    category: 'electronics',
    description: 'Modern microwave oven with digital display',
    descriptionAm: 'ዲጂታል ማሳያ ያለው ዘመናዊ ማይክሮዌቭ ምድጃ',
    descriptionOr: 'Ibiddaa maaykirooweevii ammayyaa agarsiisaa dijitaalaa qabu',
    rating: 4.5,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Baby Stroller',
    nameAm: 'የሕፃን ጋሪ',
    nameOr: 'Gaarii Daaʼimaa',
    price: 12000,
    image: 'https://d64gsuwffb70l.cloudfront.net/68a34e89a94c0d31f6ce50f5_1755533011123_03c9b1ae.webp',
    category: 'baby',
    description: 'Premium baby stroller with safety features',
    descriptionAm: 'የደህንነት ባህሪያት ያለው ፕሪሚየም የሕፃን ጋሪ',
    descriptionOr: 'Gaarii daaʼimaa sadarkaa olaanaa nageenyaa qabu',
    rating: 4.7,
    reviews: 156,
    inStock: true
  }
];

export const categories = [
  { id: 'fashion', name: 'Fashion', nameAm: 'ፋሽን', nameOr: 'Faashiniif' },
  { id: 'electronics', name: 'Electronics', nameAm: 'ኤሌክትሮኒክስ', nameOr: 'Elektirooniksii' },
  { id: 'baby', name: 'Baby & Kids', nameAm: 'ሕፃናት', nameOr: 'Ijoollee' },
  { id: 'home', name: 'Home & Garden', nameAm: 'ቤትና የአትክልት ስፍራ', nameOr: 'Mana fi Iddoo Biqiltuu' }
];