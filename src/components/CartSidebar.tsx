import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckoutModal } from '@/components/CheckoutModal';
import { useAppContext } from '@/contexts/AppContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const { cart, language } = state;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const translations = {
    en: { 
      cart: 'Shopping Cart', 
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Checkout'
    },
    am: { 
      cart: 'የግዢ ጋሪ', 
      empty: 'የእርስዎ ጋሪ ባዶ ነው',
      total: 'ድምር',
      checkout: 'ክፍያ'
    },
    or: { 
      cart: 'Gaarii Bittaa', 
      empty: 'Gaarii keessan duwwaa dha',
      total: 'Walii galaa',
      checkout: 'Kaffaltii'
    }
  };

  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t.cart}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              {t.empty}
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-green-600 font-semibold">{item.price.toLocaleString()} ETB</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary">{item.quantity}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">{t.total}:</span>
              <span className="font-bold text-lg text-green-600">
                {total.toLocaleString()} ETB
              </span>
            </div>
            <Button onClick={() => setCheckoutOpen(true)} className="w-full bg-green-600 hover:bg-green-700">
              {t.checkout}
            </Button>
          </div>
        )}
        <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
    </div>
  );
};

export default CartSidebar;