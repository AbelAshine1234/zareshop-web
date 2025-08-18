import React, { useState } from 'react';
import CartSidebar from '@/components/CartSidebar';
import { SellerModal } from '@/components/SellerModal';
import { UserModal } from '@/components/UserModal';
import { Search, ShoppingCart, Menu, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { state, dispatch, toggleSidebar } = useAppContext();
  const { cart, searchQuery, language } = state;

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const translations = {
    en: { search: 'Search products...', cart: 'Cart' },
    am: { search: 'ምርቶችን ይፈልጉ...', cart: 'ጋሪ' },
    or: { search: 'Oomishaalee barbaadi...', cart: 'Gaarii' }
  };

  const t = translations[language];

  return (
    <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-white hover:bg-green-700 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">ZareShop</h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 bg-white text-gray-900 border-0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSellerModalOpen(true)}
              className="text-white hover:bg-green-700 hidden sm:flex"
            >
              <Store className="h-4 w-4 mr-1" />
              Sell
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCartOpen(true)}
              className="text-white hover:bg-green-700 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserModalOpen(true)}
              className="text-white hover:bg-green-700"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SellerModal isOpen={sellerModalOpen} onClose={() => setSellerModalOpen(false)} />
      <UserModal isOpen={userModalOpen} onClose={() => setUserModalOpen(false)} />
    </header>
  );
};

export default Header;