import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
      <div className="w-14 h-14 md:w-18 md:h-18 mx-auto mb-4 md:mb-6 bg-[#FFFEF0] rounded-full flex items-center justify-center">
        <img
          src={icon}
          alt={title}
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
      </div>
      <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;