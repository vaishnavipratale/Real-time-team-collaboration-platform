import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-6 md:mb-8 ${alignClasses[align]} ${className}`}>
      {subtitle && (
        <p className="text-[#4ADE80] font-medium text-sm md:text-base mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;