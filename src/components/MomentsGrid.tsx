import Image from 'next/image';
import React from 'react';

interface MomentsGridProps {
  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

export const MomentsGrid: React.FC<MomentsGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => {
        // 计算宽高比
        const aspectRatio = image.width / image.height;
        
        return (
          <div 
            key={index} 
            className="relative w-full rounded-lg overflow-hidden"
            style={{
              // 根据原始图片比例设置容器高度
              paddingBottom: `${(1 / aspectRatio) * 100}%`
            }}
          >
            <Image
              src={image.url}
              alt={`美好瞬间 ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        );
      })}
    </div>
  );
}; 