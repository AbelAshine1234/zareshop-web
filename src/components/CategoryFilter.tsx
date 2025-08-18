import React from 'react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';
import { useAppContext } from '@/contexts/AppContext';

const CategoryFilter: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { selectedCategory, language } = state;

  const getCategoryName = (category: any) => {
    switch (language) {
      case 'am': return category.nameAm;
      case 'or': return category.nameOr;
      default: return category.name;
    }
  };

  const translations = {
    en: { all: 'All Categories' },
    am: { all: 'ሁሉም ምድቦች' },
    or: { all: 'Gosoota Hunda' }
  };

  const t = translations[language];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => dispatch({ type: 'SET_CATEGORY', payload: '' })}
          className={selectedCategory === '' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {t.all}
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category.id })}
            className={selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {getCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;