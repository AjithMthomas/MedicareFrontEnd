import React from 'react';

const PageLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="loader-container">
        <img
          src={require('../../images/homeLoader.gif')}
          alt="Loading..."
          className="w-36 h-48"
        />
      </div>
      <p className="mt-2 text-gray-600 text-lg from-neutral-400"> Am on my way. . .</p>
    </div>
  );
};

export default PageLoader;
