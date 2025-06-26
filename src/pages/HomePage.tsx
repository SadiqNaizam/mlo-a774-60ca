import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Laptop, Smartphone, Headphones, Monitor } from 'lucide-react';

// Placeholder data for the page
const featuredProducts = [
  {
    id: 'prod1',
    title: 'High-Performance Gaming Laptop with RGB Keyboard',
    price: 1499.99,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 1250,
    isBestSeller: true,
  },
  {
    id: 'prod2',
    title: 'Sleek Ultrabook Pro for Business Professionals',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 980,
  },
  {
    id: 'prod3',
    title: 'Noise-Cancelling Over-Ear Wireless Headphones',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 4500,
    isBestSeller: true,
  },
  {
    id: 'prod4',
    title: '27-inch 4K UHD IPS Monitor for Creatives',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1629899014521-4a49c4568c4a?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 750,
  },
];

const categories = [
    { name: 'Laptops', icon: <Laptop className="h-12 w-12 mb-4 text-primary" />, link: '/product-listing?category=laptops' },
    { name: 'Smartphones', icon: <Smartphone className="h-12 w-12 mb-4 text-primary" />, link: '/product-listing?category=smartphones' },
    { name: 'Audio', icon: <Headphones className="h-12 w-12 mb-4 text-primary" />, link: '/product-listing?category=audio' },
    { name: 'Monitors', icon: <Monitor className="h-12 w-12 mb-4 text-primary" />, link: '/product-listing?category=monitors' },
];

const carouselItems = [
    { 
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1920&auto=format&fit=crop',
        title: 'Unleash Your Gaming Potential',
        description: 'Discover the latest in high-performance gaming gear.',
        link: '/product-listing?category=gaming'
    },
    { 
        imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1920&auto=format&fit=crop',
        title: 'Work From Anywhere, Perfectly',
        description: 'Upgrade your productivity with our new range of ultrabooks.',
        link: '/product-listing?category=laptops'
    }
];

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow">
        {/* Hero Carousel Section */}
        <section className="w-full">
          <Carousel className="w-full" opts={{ loop: true, }} plugins={[]}>
            <CarouselContent>
              {carouselItems.map((item, index) => (
                 <CarouselItem key={index}>
                    <div className="relative h-64 md:h-96">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                            <h2 className="text-3xl md:text-5xl font-bold mb-2">{item.title}</h2>
                            <p className="text-lg md:text-xl mb-4">{item.description}</p>
                            <Link to={item.link}>
                                <Button size="lg" className="bg-primary hover:bg-primary/90">Shop Now</Button>
                            </Link>
                        </div>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          </Carousel>
        </section>

        {/* Featured Products Section */}
        <section className="container py-12 md:py-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Shop by Category Section */}
        <section className="container py-12 md:py-16 bg-background">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link to={category.link} key={category.name}>
                        <Card className="text-center hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center items-center p-6">
                            <CardContent className="flex flex-col items-center justify-center p-0">
                                {category.icon}
                                <p className="text-lg font-semibold">{category.name}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;