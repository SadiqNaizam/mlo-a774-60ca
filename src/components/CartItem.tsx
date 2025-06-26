import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string | number;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string | number, newQuantity: number) => void;
  onRemove: (id: string | number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}) => {
  console.log(`CartItem loaded for: ${title}`);

  const handleDecrease = () => {
    // If quantity is 1, the next decrease should remove the item.
    // Otherwise, just decrease the quantity.
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      onRemove(id);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to="/product-detail">
          <img
            src={imageUrl || 'https://via.placeholder.com/100'}
            alt={title}
            className="w-24 h-24 object-contain rounded-md border"
          />
        </Link>
        <div className="flex-grow sm:hidden">
          <Link to="/product-detail" className="font-semibold hover:text-blue-600 line-clamp-2">
            {title}
          </Link>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="hidden sm:block flex-grow">
        <Link to="/product-detail" className="font-semibold hover:text-blue-600 line-clamp-2">
          {title}
        </Link>
        <p className="text-sm text-gray-500">Unit Price: ${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrease}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center text-lg font-medium">{quantity}</span>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrease}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-24 text-center font-bold text-lg">
        ${(price * quantity).toFixed(2)}
      </div>

      <Button variant="ghost" size="icon" onClick={() => onRemove(id)} aria-label="Remove item">
        <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
      </Button>
    </div>
  );
};

export default CartItem;