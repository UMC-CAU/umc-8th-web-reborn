# Google OAuth 구현 체크리스트

## 1. Google API Console 설정

- [ ] Google Cloud Console에서 프로젝트 생성
- [ ] OAuth 2.0 클라이언트 ID 생성
- [ ] 승인된 리디렉션 URI 설정
  - `http://localhost:5173/auth/google/callback`
- [ ] 필요한 API 활성화
  - Google+ API
  - Google OAuth2 API

## 2. 환경 변수 설정 (.env)

```plaintext
# .env 파일에 추가해야 할 내용
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
VITE_GOOGLE_SCOPE=email profile
```

## 3. 필요한 패키지 설치

```bash
npm install @react-oauth/google jwt-decode
```

## 4. 구현해야 할 파일 목록

### 4.1 Google OAuth 컴포넌트 (src/components/GoogleLogin.tsx)

```typescript
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';

export const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      await loginWithGoogle(response.access_token);
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    }
  });

  return (
    <button onClick={() => login()}>
      Google로 로그인
    </button>
  );
};
```

### 4.2 Auth API 추가 (src/apis/auth.ts)

```typescript
export const postGoogleLogin = async (
  accessToken: string,
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post<ResponseLoginDto>(
    "/api/auth/google",
    { accessToken },
  );
  return data;
};
```

### 4.3 useAuth 훅 수정 (src/hooks/useAuth.ts)

```typescript
const loginWithGoogle = async (googleAccessToken: string) => {
  try {
    const response = await postGoogleLogin(googleAccessToken);
    setAccessToken(response.data.accessToken);
    setIsAuthenticated(true);
    navigate("/home");
  } catch (error) {
    console.error("Google login failed:", error);
  }
};
```

## 5. 테스트 항목

- [ ] Google 로그인 버튼 클릭 시 Google 로그인 팝업 표시
- [ ] Google 계정 선택 후 성공적으로 로그인
- [ ] 필요한 사용자 정보 정상적으로 받아오기
- [ ] 로그인 후 홈 페이지로 리다이렉트
- [ ] 토큰 저장 및 인증 상태 유지

## 6. 보안 체크리스트

- [ ] Client ID와 Secret이 .env 파일에 안전하게 저장
- [ ] .gitignore에 .env 파일 포함
- [ ] HTTPS 사용 (프로덕션 환경)
- [ ] 적절한 스코프 설정
- [ ] 토큰 안전하게 저장

## 7. 문제 해결

1. CORS 이슈 발생 시:

   - 백엔드 서버의 CORS 설정 확인
   - 허용된 오리진 목록에 프론트엔드 도메인 추가

2. 리디렉션 URI 불일치:

   - Google Cloud Console의 설정과 .env 파일의 URI 일치 확인
   - 개발/프로덕션 환경별 URI 설정

3. 토큰 관련 이슈:
   - 토큰 만료 시간 확인
   - 토큰 갱신 로직 구현
   - 적절한 에러 처리
