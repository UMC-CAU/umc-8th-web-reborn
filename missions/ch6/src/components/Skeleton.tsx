import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '100%',
  borderRadius = '0.375rem',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export default Skeleton; 