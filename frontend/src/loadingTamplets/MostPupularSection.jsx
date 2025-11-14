import React from 'react';

const MostPopularSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background pattern */}
        {/* <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] g-size-[250px_250px] animate-[shimmer_3s_linear_infinite]"></div>
        </div> */}
        
        <div className="relative w-[80%] z-10  mx-auto px-6 text-white">
          {/* Label skeleton */}
          <div className="mb-6">
            <div className="h-10 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="mb-6 space-y-4">
            <div className="h-16 w-full bg-white/30 rounded animate-pulse"></div>
            <div className="h-16 w-5/6 bg-white/30 rounded animate-pulse"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="mb-6 space-y-3">
            <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-11/12 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          {/* Date skeleton */}
          <div className="h-3 w-40 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Articles Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="group">
              {/* Category label */}
              <div className="mb-4">
                <div className="h-3 w-32 bg-gray-600 rounded animate-pulse"></div>
              </div>
              
              {/* Article card */}
              <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm">
                {/* Image skeleton */}
                <div className="relative aspect-video bg-gray-700 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-[shimmer_2s_linear_infinite]"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Title skeleton */}
                  <div className="space-y-3 mb-4">
                    <div className="h-5 w-full bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-5 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-5 w-4/6 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Date skeleton */}
                  <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -250px 0;
          }
          100% {
            background-position: 250px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MostPopularSection;