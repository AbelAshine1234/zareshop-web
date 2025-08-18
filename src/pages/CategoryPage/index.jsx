import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './CategoryPage.module.scss'
import TopBar from '../../components/TopBar'
import TopPromotionBar from '../../components/TopPromotionBar'
import Footer from '../../components/Footer'
import { CATEGORY_PAGE_PRODUCTS, MOCK_SUPPLIERS } from '../../data'
import { 
  Breadcrumbs, 
  PageHeader, 
  FiltersSidebar, 
  ProductControls, 
  ProductList, 
  SupplierList 
} from '../../components/CategoryPage'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [activeTab, setActiveTab] = useState('announcements')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [filters, setFilters] = useState({
    state: 'any',
    sale: false,
    priceFrom: '',
    priceTo: '',
    sellers: 'all',
    rating: false,
    searchText: ''
  })

  const categoryName = "Smartphones and mobile phones"
  const totalItems = "906,784"


  const subcategories = {
    "iPhone": [
      "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
      "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
      "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
      "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 mini", "iPhone 13",
      "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 mini", "iPhone 12",
      "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone SE"
    ],
    "Samsung": [
      "Galaxy S25 Ultra", "Galaxy S25+", "Galaxy S25", "Galaxy S24 Ultra",
      "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+",
      "Galaxy S23", "Galaxy A55", "Galaxy A35", "Galaxy A25",
      "Galaxy A15", "Galaxy Z Fold 6", "Galaxy Z Flip 6", "Galaxy Z Fold 5",
      "Galaxy Z Flip 5", "Galaxy Note 20", "Galaxy Note 10"
    ],
    "Xiaomi": [
      "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi Note 12",
      "Redmi 13 Pro", "Redmi 13", "Redmi 12", "Redmi 11", "Redmi 10",
      "Mi 14 Ultra", "Mi 14 Pro", "Mi 14", "Mi 13", "Mi 12",
      "POCO X6 Pro", "POCO X6", "POCO M6 Pro", "POCO M6", "POCO F6",
      "POCO C65", "POCO C55", "Black Shark 6", "Black Shark 5"
    ],
    "OnePlus": [
      "OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus 10 Pro",
      "OnePlus 10T", "OnePlus 9 Pro", "OnePlus 9", "OnePlus 8 Pro",
      "OnePlus 8T", "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord 2T",
      "OnePlus Nord CE 3", "OnePlus Nord CE 2", "OnePlus Ace 3", "OnePlus Ace 2"
    ],
    "Google Pixel": [
      "Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel 7 Pro", "Pixel 7",
      "Pixel 6a", "Pixel 6 Pro", "Pixel 6", "Pixel 5a", "Pixel 5",
      "Pixel 4a", "Pixel 4", "Pixel 3a", "Pixel 3", "Pixel 2"
    ],
    "Huawei": [
      "P60 Pro", "P60", "P50 Pro", "P50", "P40 Pro", "P40",
      "Mate 60 Pro", "Mate 50 Pro", "Mate 50", "Mate 40 Pro",
      "Mate 40", "Nova 11 Pro", "Nova 11", "Nova 10", "Nova 9",
      "P50 Lite", "P40 Lite", "P30 Lite", "Mate 30 Pro", "Mate 30"
    ],
    "Honor": [
      "Magic 6 Pro", "Magic 6", "Magic 5 Pro", "Magic 5", "Magic 4 Pro",
      "90 Pro", "90", "80 Pro", "80", "70 Pro", "70", "70 Lite",
      "X50 Pro", "X50", "X40", "X30", "Play 8T", "Play 7T"
    ],
    "Realme": [
      "GT 6", "GT 5 Pro", "GT 5", "GT Neo 6", "GT Neo 5", "GT Neo 3",
      "12 Pro+", "12 Pro", "12", "11 Pro+", "11 Pro", "11", "10 Pro+",
      "10 Pro", "10", "C65", "C55", "C53", "C35", "C25", "C15"
    ],
    "Oppo": [
      "Find X7 Ultra", "Find X7 Pro", "Find X7", "Find X6 Pro", "Find X6",
      "Find X5 Pro", "Find X5", "Find X3 Pro", "Find X3", "Reno 11 Pro",
      "Reno 11", "Reno 10 Pro", "Reno 10", "Reno 9 Pro", "Reno 9",
      "A98", "A78", "A58", "A38", "A18", "A17"
    ],
    "Vivo": [
      "X100 Pro", "X100", "X90 Pro", "X90", "X80 Pro", "X80",
      "V30 Pro", "V30", "V29", "V27", "V25", "V23", "Y100",
      "Y78", "Y56", "Y36", "Y27", "Y17", "Y02"
    ]
  }

  const memoryOptions = [
    "Up to 4 GB",
    "4 GB",
    "8 GB", 
    "16 GB",
    "32 GB"
  ]

  const ramOptions = [
    "Up to 0.5 GB",
    "0.5 GB",
    "1 GB",
    "1.5 GB", 
    "2 GB"
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }


  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  return (
    <div className={styles.page}>
      <TopPromotionBar />
      <TopBar />
      
      <div className="container">
        <Breadcrumbs />

        <PageHeader 
          categoryName={categoryName}
          totalItems={totalItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className={styles.mainContent}>
          <FiltersSidebar 
            expandedCategories={expandedCategories}
            onToggleCategory={toggleCategory}
            filters={filters}
            onFilterChange={handleFilterChange}
            subcategories={subcategories}
          />

          <main className={styles.productResults}>
            {activeTab === 'announcements' && (
              <ProductControls 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            )}

            {activeTab === 'suppliers' ? (
              <SupplierList suppliers={MOCK_SUPPLIERS} />
            ) : (
              <ProductList products={CATEGORY_PAGE_PRODUCTS} viewMode={viewMode} />
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}