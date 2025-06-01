import React from "react";

/**
 * @component Skeleton
 * @description 데이터 로딩 중 표시할 스켈레톤 UI 컴포넌트
 * @example
 * // 기본 사용법
 * <Skeleton width="100%" height="1rem" />
 *
 * // 다양한 설정
 * <Skeleton
 *   width="200px"
 *   height="2rem"
 *   borderRadius="4px"
 *   className="mb-2"
 * />
 */
interface SkeletonProps {
  /** 스켈레톤 요소의 너비 */
  width?: string;

  /** 스켈레톤 요소의 높이 */
  height?: string;

  /** 테두리 반경 설정 */
  borderRadius?: string;

  /** 추가 CSS 클래스명 */
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  className = "bg-gray-700",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-700 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
