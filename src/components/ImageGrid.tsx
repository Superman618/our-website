import Image from 'next/image';
import React from 'react';

interface ImageGridProps {
  images: string[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const getGridClass = (length: number) => {
    switch (length) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 md:grid-cols-3';
      case 4:
        return 'grid-cols-2 md:grid-cols-4';
      default:
        return 'grid-cols-2 md:grid-cols-3';
    }
  };

  return (
    <div className={`grid gap-2 ${getGridClass(images.length)}`}>
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative aspect-square w-full overflow-hidden rounded-lg"
        >
          <Image
            src={image}
            alt={`图片 ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}; 