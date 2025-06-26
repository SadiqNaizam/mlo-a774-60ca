import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';

// shadcn/ui Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Slash } from 'lucide-react';

// Mock Data for demonstration
const MOCK_PRODUCTS = [
    { id: 1, title: 'High-Performance Gaming Laptop', price: 1499.99, imageUrl: 'https://placehold.co/400x400/333/FFF?text=Laptop', rating: 4.7, reviewCount: 120, isBestSeller: true, category: 'Laptops', brand: 'Brand A' },
    { id: 2, title: 'Ultra-Slim Business Ultrabook', price: 1199.00, imageUrl: 'https://placehold.co/400x400/555/FFF?text=Ultrabook', rating: 4.5, reviewCount: 95, category: 'Laptops', brand: 'Brand B' },
    { id: 3, title: '27-inch 4K UHD Monitor', price: 449.50, imageUrl: 'https://placehold.co/400x400/777/FFF?text=Monitor', rating: 4.8, reviewCount: 210, category: 'Monitors', brand: 'Brand C' },
    { id: 4, title: 'Ergonomic Mechanical Keyboard', price: 129.99, imageUrl: 'https://placehold.co/400x400/999/FFF?text=Keyboard', rating: 4.6, reviewCount: 350, category: 'Keyboards', brand: 'Brand D' },
    { id: 5, title: 'Wireless Noise-Cancelling Headphones', price: 299.00, imageUrl: 'https://placehold.co/400x400/AAA/FFF?text=Headphones', rating: 4.9, reviewCount: 880, isBestSeller: true, category: 'Audio', brand: 'Brand A' },
    { id: 6, title: 'Entry-Level Gaming Laptop', price: 899.99, imageUrl: 'https://placehold.co/400x400/CCC/000?text=Laptop', rating: 4.3, reviewCount: 75, category: 'Laptops', brand: 'Brand B' },
    { id: 7, title: 'Curved Ultrawide Monitor', price: 799.00, imageUrl: 'https://placehold.co/400x400/EEE/000?text=Monitor', rating: 4.7, reviewCount: 150, category: 'Monitors', brand: 'Brand C' },
    { id: 8, title: 'Compact 60% Mechanical Keyboard', price: 99.00, imageUrl: 'https://placehold.co/400x400/222/FFF?text=Keyboard', rating: 4.4, reviewCount: 180, category: 'Keyboards', brand: 'Brand D' },
    { id: 9, title: 'Premium Studio Headphones', price: 450.00, imageUrl: 'https://placehold.co/400x400/444/FFF?text=Headphones', rating: 4.8, reviewCount: 420, category: 'Audio', brand: 'Brand A' },
    { id: 10, title: 'All-in-One Desktop PC', price: 1350.00, imageUrl: 'https://placehold.co/400x400/666/FFF?text=PC', rating: 4.5, reviewCount: 65, category: 'Desktops', brand: 'Brand B' },
    { id: 11, title: 'Portable 15-inch Monitor', price: 250.00, imageUrl: 'https://placehold.co/400x400/888/FFF?text=Monitor', rating: 4.2, reviewCount: 90, category: 'Monitors', brand: 'Brand C' },
    { id: 12, title: 'RGB Gaming Mouse', price: 59.99, imageUrl: 'https://placehold.co/400x400/BBB/000?text=Mouse', rating: 4.6, reviewCount: 500, isBestSeller: true, category: 'Accessories', brand: 'Brand D' },
];
const MOCK_CATEGORIES = ['Laptops', 'Monitors', 'Keyboards', 'Audio', 'Desktops', 'Accessories'];
const MOCK_BRANDS = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || 'All Products';

  const [sortOrder, setSortOrder] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const handleFilterChange = (filterType: 'category' | 'brand', value: string) => {
    const setter = filterType === 'category' ? setSelectedCategories : setSelectedBrands;
    const currentValues = filterType === 'category' ? selectedCategories : selectedBrands;

    setter(
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = MOCK_PRODUCTS.filter(p => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      return categoryMatch && brandMatch;
    });

    switch (sortOrder) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      default:
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return products;
  }, [sortOrder, selectedCategories, selectedBrands]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <Accordion type="multiple" defaultValue={['category', 'brand']} className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {MOCK_CATEGORIES.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                         <Checkbox id={`cat-${category}`} onCheckedChange={() => handleFilterChange('category', category)} />
                         <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brand">
                <AccordionTrigger>Brand</AccordionTrigger>
                <AccordionContent>
                   <div className="grid gap-2">
                    {MOCK_BRANDS.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                         <Checkbox id={`brand-${brand}`} onCheckedChange={() => handleFilterChange('brand', brand)} />
                         <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          {/* Product Grid and Controls */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{searchQuery}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} results</p>
              <Select onValueChange={setSortOrder} defaultValue="popularity">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="mb-6"/>

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold">No Products Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                </div>
            )}
            
            {totalPages > 1 && (
                 <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} />
                        </PaginationItem>
                         <PaginationItem>
                            <span className="px-4 py-2 text-sm">Page {currentPage} of {totalPages}</span>
                         </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListingPage;