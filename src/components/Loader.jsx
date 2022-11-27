import React from "react";

const LoaderComponent = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-screen">
      <div
        className="spinner-border animate-spin m-auto inline-block w-12 h-12 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoaderComponent;
