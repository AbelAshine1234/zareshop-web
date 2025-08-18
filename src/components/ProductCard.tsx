import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useAppContext } from '@/contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useAppContext();
  const { language } = state;

  const getName = () => {
    switch (language) {
      case 'am': return product.nameAm;
      case 'or': return product.nameOr;
      default: return product.name;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'am': return product.descriptionAm;
      case 'or': return product.descriptionOr;
      default: return product.description;
    }
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const translations = {
    en: { addToCart: 'Add to Cart', outOfStock: 'Out of Stock' },
    am: { addToCart: 'ወደ ጋሪ ጨምር', outOfStock: 'አልቀዋል' },
    or: { addToCart: 'Garii keessa galchi', outOfStock: 'Hin jiru' }
  };

  const t = translations[language];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={getName()}
          className="w-full h-48 object-cover"
        />
        {product.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{getName()}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{getDescription()}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-green-600">
              {product.price.toLocaleString()} ETB
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {product.originalPrice.toLocaleString()} ETB
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? t.addToCart : t.outOfStock}
        </Button>
      </CardContent>
    </Card>
  );
};

export { ProductCard };
export default ProductCard;