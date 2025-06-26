import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

// Define the structure for an image object
interface Image {
  src: string;
  alt: string;
}

// Define the props for the component
interface ProductImageGalleryProps {
  images: Image[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  console.log('ProductImageGallery loaded');

  // Handle the case where no images are provided, showing a placeholder.
  if (!images || images.length === 0) {
    const placeholderImages = [
      { src: 'https://via.placeholder.com/500x500.png?text=Product+Image', alt: 'Product image placeholder' }
    ];
    return <ProductImageGallery images={placeholderImages} />;
  }

  // State to track the currently selected image. Defaults to the first image.
  const [selectedImage, setSelectedImage] = useState<Image>(images[0]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Display with Zoom-on-Hover Effect */}
      <Card className="overflow-hidden">
        <AspectRatio ratio={1}>
          <img
            key={selectedImage.src} // Using key to re-trigger animations on change
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </AspectRatio>
      </Card>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'overflow-hidden rounded-md border-2 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                selectedImage.src === image.src
                  ? 'border-primary' // Highlight the active thumbnail
                  : 'border-transparent hover:border-muted-foreground/50'
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <AspectRatio ratio={1}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;