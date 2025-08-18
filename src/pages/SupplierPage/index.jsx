import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './SupplierPage.module.scss'
import TopBar from '../../components/TopBar'
import TopPromotionBar from '../../components/TopPromotionBar'
import Footer from '../../components/Footer'
import { MOCK_SUPPLIER, SUPPLIER_PRODUCTS } from '../../data'
import { 
  SupplierProfile, 
  SupplierProducts, 
  SupplierHeader, 
  SupplierReviews, 
  SupplierInformation,
  ProductsHeader 
} from '../../components/SupplierPage'

export default function SupplierPage() {
  const { supplierId } = useParams()
  const [supplier, setSupplier] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')



  useEffect(() => {
    // Simulate API call
    const loadSupplierData = async () => {
      setLoading(true)
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setSupplier(MOCK_SUPPLIER)
      setProducts(SUPPLIER_PRODUCTS)
      setLoading(false)
    }

    loadSupplierData()
  }, [supplierId])

  const handleSearch = (query) => {
    setSearchQuery(query)
    // In real app, this would trigger API call with search params
  }

  const handleSort = (sortType) => {
    setSortBy(sortType)
    // In real app, this would trigger API call with sort params
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <TopPromotionBar />
        <TopBar />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading supplier information...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!supplier) {
    return (
      <div className={styles.page}>
        <TopPromotionBar />
        <TopBar />
        <div className={styles.error}>
          <h2>Supplier not found</h2>
          <p>The supplier you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <TopPromotionBar />
      <TopBar />
      
      <SupplierHeader 
        supplier={supplier}
      />

      <div className={styles.mainContent}>
        <SupplierProfile supplier={supplier} />
        
        <div className={styles.rightContent}>
          <ProductsHeader 
            productsCount={products.length}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
          
          <SupplierProducts 
            products={products}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
          
          <SupplierInformation supplier={supplier} />
          
          <SupplierReviews supplier={supplier} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
