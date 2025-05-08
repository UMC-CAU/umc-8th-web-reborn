
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton = ({ width = '100%', height = '1rem', className = '' }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton; 