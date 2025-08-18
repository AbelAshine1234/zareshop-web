import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import type { Language } from '@/contexts/AppContext';

const LanguageSelector: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { language } = state;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
    { code: 'or', name: 'Afaan Oromo', flag: '🇪🇹' }
  ];

  const handleLanguageChange = (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm mb-6">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className={`${
            language === lang.code 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'hover:bg-green-50'
          }`}
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;