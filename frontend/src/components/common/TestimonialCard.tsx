import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  rating,
  text,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      {/* Rating Stars */}
      <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
           className={`w-4 h-4 sm:w-5 sm:h-5 ${index < rating ? 'fill-[#4ADE80]' : 'fill-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-6">
        {text}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover bg-gray-100"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6zm9 11a1 1 0 01-2 0v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2a1 1 0 01-2 0v-2a5 5 0 015-5h8a5 5 0 015 5v2z"/></svg>';
            }}
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">
            {name}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;