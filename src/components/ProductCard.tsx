import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  rating,
  reviewCount,
  isBestSeller = false,
}) => {
  const { toast } = useToast();
  console.log('ProductCard loaded for:', title);

  const handleAddToCart = () => {
    toast({
      title: "Item Added to Cart",
      description: `${title} has been successfully added to your cart.`,
    });
    console.log(`Product ${id} added to cart.`);
  };
  
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    }
    // Note: shadcn/ui doesn't have a half-star icon by default. This is a simplification.
    if (halfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-500" />); // Placeholder for half star
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg group border">
      <CardHeader className="p-0 border-b relative">
        {isBestSeller && (
          <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">Best Seller</Badge>
        )}
        <Link to="/product-detail" state={{ productId: id }}>
          <AspectRatio ratio={1}>
            <img
              src={imageUrl || 'https://via.placeholder.com/300x300'}
              alt={title}
              className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-base font-medium text-gray-800 flex-grow">
          <Link to="/product-detail" state={{ productId: id }} className="hover:text-blue-600 line-clamp-2">
            {title}
          </Link>
        </h3>
        <div className="flex items-center mt-2">
          {renderStars()}
          <span className="ml-2 text-sm text-gray-500">{reviewCount.toLocaleString()}</span>
        </div>
        <p className="text-xl font-semibold text-gray-900 mt-2">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;