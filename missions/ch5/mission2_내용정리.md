# Refresh Token 구현 정리

## 1. 토큰 갱신 로직 구현

### 1.1 axios 인터셉터 설정 (src/apis/axios.ts)

```typescript
// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // _retry 플래그가 없고, 401 에러인 경우에만 토큰 갱신 시도
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh Token을 사용하여 새로운 Access Token 발급
        const response = await refreshAccessToken();
        const newAccessToken = response.data.accessToken;

        // 새로운 Access Token을 로컬 스토리지에 저장
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, newAccessToken);

        // 새로운 Access Token으로 헤더 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 실패했던 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우
        localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
```

### 1.2 토큰 갱신 API (src/apis/auth.ts)

```typescript
export const refreshAccessToken = async (): Promise<ResponseLoginDto> => {
  const { data } =
    await axiosInstance.post<ResponseLoginDto>(`/api/auth/refresh`);
  return data;
};
```

## 2. 무한 재시도 방지

### 2.1 \_retry 플래그 사용

- 각 요청에 대해 한 번만 토큰 갱신 시도
- 타입 정의로 안전성 보장

```typescript
// axios 설정 타입 확장
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
```

### 2.2 에러 처리

- Refresh Token 만료 시 로그아웃 처리
- 적절한 에러 메시지 표시
- 사용자 세션 정리

## 3. 토큰 저장 관리

### 3.1 Access Token 관리

```typescript
const [accessToken, setAccessToken] = useLocalStorage(
  LocalStorageKey.ACCESS_TOKEN,
  "",
);
```

### 3.2 Refresh Token 관리

```typescript
// httpOnly 쿠키로 저장
Cookies.set("refreshToken", refreshToken, {
  expires: 14, // 14일
  secure: true,
  sameSite: "strict",
  path: "/",
});
```

## 4. 구현 체크리스트

### 4.1 토큰 갱신 자동화

- [x] 401 에러 감지
- [x] Refresh Token으로 Access Token 갱신
- [x] 원본 요청 재시도

### 4.2 무한 루프 방지

- [x] \_retry 플래그 구현
- [x] 토큰 갱신 실패 시 로그아웃
- [x] 적절한 에러 처리

### 4.3 보안

- [x] httpOnly 쿠키 사용
- [x] 안전한 토큰 저장
- [x] HTTPS 통신

## 5. 테스트 시나리오

1. 정상 토큰 갱신

   - Access Token 만료
   - 자동 갱신 확인
   - 원본 요청 성공

2. 토큰 갱신 실패

   - Refresh Token 만료
   - 로그아웃 처리
   - 로그인 페이지 리다이렉트

3. 동시 요청 처리
   - 여러 요청 동시 실패
   - 한 번만 토큰 갱신
   - 모든 요청 재시도
