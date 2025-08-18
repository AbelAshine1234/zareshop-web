import { useParams } from 'react-router-dom';
import { FaHeart, FaStickyNote } from 'react-icons/fa';
import AllHeader from '../../components/AllHeader';
import Footer from '../../components/Footer';
import ProductImageGallery from '../../components/ProductDetail/ProductImageGallery';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import Specifications from '../../components/ProductDetail/Specifications';
import OtherProducts from '../../components/ProductDetail/OtherProducts';
import { mockProducts, otherProducts } from '../../constants/mockData';
import styles from './ProductDetailPage.module.scss';

export default function ProductDetailPage() {
  const { id } = useParams();

  // Get product by ID from mock data (in real app, this would come from API)
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const seller = product.seller;

  return (
    <div className={styles.productDetailPage}>
      <AllHeader />
      
      <div className={styles.mainLayout}>
        <div className={styles.breadcrumbs}>
          <span>Home</span> › <span>Transport</span> › <span>Motorcycles</span> › <span>BMW</span>
        </div>
        
        <div className={styles.productTitle}>
          <h1>Samsung Galaxy S24 Ultra 256GB Titanium Black</h1>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.favoriteButton}>
            <FaHeart />
            Add to favorites
          </button>
          <button className={styles.noteButton}>
            <FaStickyNote />
            Add a note
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <ProductImageGallery 
              images={product.images} 
              thumbnails={product.thumbnails} 
            />
          </div>

          <ProductInfo product={product} seller={seller} />
        </div>

        <Specifications specifications={product.specifications} />

        <OtherProducts products={otherProducts} />
      </div>
      
      <Footer />
    </div>
  );
}