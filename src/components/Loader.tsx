import React, { memo } from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen" role="status" aria-label="Loading">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default memo(Loader);
