import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';

// Shadcn/UI Components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';

// Define the type for a cart item
interface CartItemType {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
}

// Initial placeholder data for the cart
const initialCartItems: CartItemType[] = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/400x400/E2E8F0/4A5568?text=Laptop',
    title: 'High-Performance Gaming Laptop - 15.6" QHD Display, 16GB RAM, 1TB SSD',
    price: 1499.99,
    quantity: 1,
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/400x400/E2E8F0/4A5568?text=Mouse',
    title: 'Ergonomic Wireless Mouse with RGB Lighting',
    price: 79.99,
    quantity: 1,
  },
];

const ShoppingCartPage = () => {
  console.log('ShoppingCartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    setCartItems(currentItems =>
      currentItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemove = (id: string | number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the route defined in App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
              {/* Cart Items List */}
              <section className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="px-6">
                            <CartItem
                            id={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                            />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                   <CardFooter className="flex justify-end pt-6">
                        <p className="text-lg">Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span></p>
                    </CardFooter>
                </Card>
              </section>

              {/* Order Summary */}
              <aside className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="sticky top-24 space-y-4">
                  <OrderSummary subtotal={subtotal} />
                   <Button
                    onClick={handleCheckout}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </aside>
            </div>
          </>
        ) : (
          // Empty Cart View
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300" />
            <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link to="/product-listing">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;