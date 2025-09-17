import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Categories.module.scss'
import {
  fetchCategories,
  fetchSubcategories,
  selectCategory,
  selectSubcategory,
  clearSelection,
  clearError,
} from '../features/categories/categoriesSlice'

export default function Categories() {
  const dispatch = useDispatch()
  const {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    loading,
    error,
    subcategoriesLoading,
    subcategoriesError,
  } = useSelector((state) => state.categories)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category))
    dispatch(fetchSubcategories(category.id))
  }

  const handleSubcategoryClick = (subcategory) => {
    dispatch(selectSubcategory(subcategory))
  }

  const handleBackToCategories = () => {
    dispatch(clearSelection())
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentSubcategories = selectedCategory
    ? subcategories[selectedCategory.id] || []
    : []

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {selectedCategory ? `${selectedCategory.name} Subcategories` : 'Choose Category'}
        </h1>
        {selectedCategory && (
          <button
            className={styles.backButton}
            onClick={handleBackToCategories}
          >
            ← Back to Categories
          </button>
        )}
      </div>

      {/* Search Bar */}
      {!selectedCategory && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={handleClearError}>×</button>
        </div>
      )}

      {subcategoriesError && (
        <div className={styles.error}>
          <p>{subcategoriesError}</p>
          <button onClick={handleClearError}>×</button>
        </div>
      )}

      {/* Categories Grid */}
      {!selectedCategory && (
        <div className={styles.grid}>
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category)}
            >
              {category.images && category.images.length > 0 && (
                <div className={styles.imageContainer}>
                  <img
                    src={category.images[0].image_url}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                </div>
              )}
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                <div className={styles.categoryMeta}>
                  <span className={styles.status}>
                    {category.status ? 'Active' : 'Inactive'}
                  </span>
                  <span className={styles.date}>
                    {new Date(category.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subcategories Grid */}
      {selectedCategory && (
        <div className={styles.subcategoriesContainer}>
          {subcategoriesLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading subcategories...</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {currentSubcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className={`${styles.subcategoryCard} ${
                    selectedSubcategory?.id === subcategory.id ? styles.selected : ''
                  }`}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {subcategory.images && subcategory.images.length > 0 && (
                    <div className={styles.imageContainer}>
                      <img
                        src={subcategory.images[0].image_url}
                        alt={subcategory.name}
                        className={styles.subcategoryImage}
                      />
                    </div>
                  )}
                  <div className={styles.subcategoryInfo}>
                    <h4 className={styles.subcategoryName}>{subcategory.name}</h4>
                    <div className={styles.subcategoryMeta}>
                      <span className={styles.status}>
                        {subcategory.status ? 'Active' : 'Inactive'}
                      </span>
                      <span className={styles.date}>
                        {new Date(subcategory.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {subcategory.products && (
                      <span className={styles.productCount}>
                        {subcategory.products.length} products
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selection Summary */}
      {selectedSubcategory && (
        <div className={styles.selectionSummary}>
          <h3>Selected:</h3>
          <p>
            <strong>Category:</strong> {selectedCategory.name}
          </p>
          <p>
            <strong>Subcategory:</strong> {selectedSubcategory.name}
          </p>
          <p>
            <strong>ID:</strong> {selectedSubcategory.id}
          </p>
        </div>
      )}

      {filteredCategories.length === 0 && !loading && (
        <div className={styles.empty}>
          <p>No categories found matching your search.</p>
        </div>
      )}
    </div>
  )
}
