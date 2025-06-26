import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductImageGallery from '@/components/ProductImageGallery';

// shadcn/ui Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// lucide-react Icons
import { ShoppingCart, Star } from 'lucide-react';

// Placeholder Data for the component
const productImages = [
  { src: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop', alt: 'Front view of a gaming laptop' },
  { src: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop', alt: 'Angled view of the gaming laptop keyboard' },
  { src: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1974&auto=format&fit=crop', alt: 'Close-up of the glowing keyboard' },
  { src: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop', alt: 'Laptop open on a desk with a mouse' },
];

const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast({
      title: "Success!",
      description: `Added ${quantity} item(s) to your cart.`,
    });
    console.log(`Added ${quantity} item(s) to cart.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/product-listing">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gaming Laptop XG-Pro</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ProductImageGallery images={productImages} />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Gaming Laptop XG-Pro</h1>
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">121 Reviews</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-3xl text-gray-900 font-semibold">$1,499.99</p>
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
              <Select defaultValue="1" onValueChange={(value) => setQuantity(parseInt(value))}>
                <SelectTrigger id="quantity" className="w-24">
                  <SelectValue placeholder="Qty" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(5)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Separator />
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                <p className="text-gray-600">
                  Unleash your gaming potential with the XG-Pro. Featuring the latest generation processor, top-tier graphics card, and a high-refresh-rate display, this laptop is engineered for victory. A sleek, durable chassis and customizable RGB keyboard complete the package.
                </p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li><strong>CPU:</strong> 14th Gen Intel Core i9</li>
                    <li><strong>GPU:</strong> NVIDIA GeForce RTX 4080</li>
                    <li><strong>RAM:</strong> 32GB DDR5</li>
                    <li><strong>Storage:</strong> 2TB NVMe SSD</li>
                    <li><strong>Display:</strong> 16-inch QHD+ 240Hz</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;