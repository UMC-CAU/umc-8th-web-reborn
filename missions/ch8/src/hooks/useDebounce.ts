import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // value, delay가 변경될 때마다 실행
  useEffect(() => {
    // delay (ms) 만큼 딜레이 후 실행
    // delay 시간 후에 value를 debouncedValue에 할당
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // cleanup
    // value가 변경되면, 기존 타이머를 지워서 업데이트를 취소합니다.
    // 값이 계속 바뀔 때마다 타이머를 초기화하여 마지막 값만 사용됩니다.
    return () => clearTimeout(handler);
  }, [value, delay]);

  // debouncedValue를 반환
  return debouncedValue;
}

export default useDebounce;
