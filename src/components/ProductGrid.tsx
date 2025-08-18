import React from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useAppContext } from '@/contexts/AppContext';

const ProductGrid: React.FC = () => {
  const { state } = useAppContext();
  const { searchQuery, selectedCategory, language } = state;

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAm.includes(searchQuery) ||
      product.nameOr.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const translations = {
    en: { 
      noProducts: 'No products found',
      tryDifferent: 'Try adjusting your search or filters'
    },
    am: { 
      noProducts: 'ምንም ምርት አልተገኘም',
      tryDifferent: 'የእርስዎን ፍለጋ ወይም ማጣሪያዎች ማስተካከል ይሞክሩ'
    },
    or: { 
      noProducts: 'Oomishaan tokkollee hin argamne',
      tryDifferent: 'Barbaacha fi gingilchaa keessan sirreessuu yaali'
    }
  };

  const t = translations[language];

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-2 text-lg">{t.noProducts}</div>
        <div className="text-gray-400 text-sm">{t.tryDifferent}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;