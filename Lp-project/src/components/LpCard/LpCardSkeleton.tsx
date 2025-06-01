const LpCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg animate-pulse ">
      <div className={"bg-gray-800 w-full h-48"} />
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-2">
        <div className="bg-gray-800 h-4 w-3/4 rounded sm" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;
