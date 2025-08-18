import React from 'react';
import Header from '@/components/Header';
import LanguageSelector from '@/components/LanguageSelector';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import { useAppContext } from '@/contexts/AppContext';

const AppLayout: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <LanguageSelector />
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default AppLayout;
