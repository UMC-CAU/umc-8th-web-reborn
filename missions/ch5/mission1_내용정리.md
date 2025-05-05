# Access Token & Refresh Token 개념 정리

## 1. Access Token과 Refresh Token의 개념

### Access Token

- **정의**: 사용자의 인증 상태를 증명하는 단기 토큰
- **특징**:
  - 짧은 유효 기간 (보통 30분~2시간)
  - API 요청시 헤더에 포함되어 전송
  - 탈취 위험이 있어 짧은 유효기간 설정
- **사용**:
  ```typescript
  // API 요청시 헤더에 포함
  headers: {
    Authorization: `Bearer ${accessToken}`;
  }
  ```

### Refresh Token

- **정의**: Access Token을 재발급받기 위한 장기 토큰
- **특징**:
  - 긴 유효 기간 (보통 2주~1달)
  - 서버에 저장되어 관리
  - httpOnly 쿠키로 저장하여 보안 강화
- **사용**:
  ```typescript
  // Access Token 만료시 Refresh Token으로 재발급
  const response = await axios.post("/api/auth/refresh");
  const newAccessToken = response.data.accessToken;
  ```

## 2. 주요 구현 코드

### 2.1 토큰 저장 (hooks/useAuth.ts)

```typescript
const [accessToken, setAccessToken] = useLocalStorage(
  LocalStorageKey.ACCESS_TOKEN,
  "",
);
const [refreshToken, setRefreshToken] = useLocalStorage(
  LocalStorageKey.REFRESH_TOKEN,
  "",
);

// 로그인 성공시
const login = async (loginData: RequestLoginDto) => {
  const response = await postSignin(loginData);
  setAccessToken(response.data.accessToken);
  setRefreshToken(response.data.refreshToken);
};
```

### 2.2 토큰 갱신 API (apis/auth.ts)

```typescript
export const refreshAccessToken = async (): Promise<ResponseLoginDto> => {
  const { data } =
    await axiosInstance.post<ResponseLoginDto>(`/api/auth/refresh`);
  return data;
};
```

### 2.3 자동 토큰 갱신 (apis/axios.ts)

```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const response = await refreshAccessToken();
        const newAccessToken = response.data.accessToken;
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
```

## 3. 보안 고려사항

### 3.1 토큰 저장

- Access Token: localStorage 또는 메모리
- Refresh Token: httpOnly 쿠키 (XSS 방지)

### 3.2 토큰 전송

- Authorization 헤더 사용
- Bearer 스키마 적용

### 3.3 에러 처리

- 401 에러: 토큰 만료
- 403 에러: 권한 없음
- Refresh Token 만료: 로그아웃 처리

## 4. 구현시 주의사항

1. **무한 재시도 방지**

   - \_retry 플래그로 재시도 횟수 제한
   - 재시도 실패시 로그아웃 처리

2. **토큰 저장소 선택**

   - Access Token: localStorage (편의성)
   - Refresh Token: httpOnly 쿠키 (보안성)

3. **에러 처리**

   - 적절한 에러 메시지 표시
   - 사용자 친화적인 처리 방식

4. **보안**
   - HTTPS 사용 필수
   - CSRF 토큰 적용
   - XSS 방지

## 5. 테스트 항목

1. **토큰 갱신 플로우**

   - Access Token 만료시 자동 갱신
   - 갱신 실패시 로그아웃

2. **보안 테스트**

   - XSS 취약점 테스트
   - CSRF 방어 테스트

3. **에러 처리**
   - 네트워크 오류 처리
   - 서버 오류 처리
