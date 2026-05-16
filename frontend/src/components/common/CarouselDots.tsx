import React from 'react';

interface CarouselDotsProps {
  total: number;
  active: number;
  onChange?: (index: number) => void;
  className?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  total,
  active,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === active
              ? 'w-8 bg-[#4ADE80]'
              : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;