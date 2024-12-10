import { MomentsGrid } from './MomentsGrid';

export const Moments = () => {
  const moments = [
    {
      url: '/path/to/image1.jpg',
      width: 1200,  // 原始图片宽度
      height: 800,  // 原始图片高度
    },
    // ... 其他图片
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">美好瞬间</h2>
      <MomentsGrid images={moments} />
    </div>
  );
}; 