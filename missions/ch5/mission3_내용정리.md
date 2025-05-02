# Google OAuth 구현 정리

## 1. 초기 설정

### 1.1 필요한 패키지 설치
```bash
npm install @react-oauth/google jwt-decode js-cookie
```

### 1.2 환경 변수 설정 (.env)
```plaintext
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
VITE_GOOGLE_SCOPE=email profile
```

## 2. 구현 코드

### 2.1 Google OAuth Provider 설정 (src/App.tsx)
```typescript
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        {/* ... 기존 코드 ... */}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
```

### 2.2 Google 로그인 컴포넌트 (src/components/GoogleLogin.tsx)
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
    <button 
      onClick={() => login()}
      className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      Google로 로그인
    </button>
  );
};
```

### 2.3 Google 로그인 API (src/apis/auth.ts)
```typescript
export const postGoogleLogin = async (accessToken: string): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post<ResponseLoginDto>(
    '/api/auth/google',
    { accessToken }
  );
  return data;
};
```

### 2.4 Auth Hook 확장 (src/hooks/useAuth.ts)
```typescript
const loginWithGoogle = async (googleAccessToken: string) => {
  try {
    const response = await postGoogleLogin(googleAccessToken);
    const { accessToken: newAccessToken, refreshToken } = response.data;
    
    setAccessToken(newAccessToken);
    Cookies.set('refreshToken', refreshToken, {
      expires: 14,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    
    setIsAuthenticated(true);
    navigate('/home');
  } catch (error) {
    console.error('Google login failed:', error);
  }
};
```

## 3. 구현 체크리스트

### 3.1 Google API Console 설정
- [x] 프로젝트 생성
- [x] OAuth 2.0 클라이언트 ID 발급
- [x] 승인된 리디렉션 URI 설정
- [x] 필요한 API 활성화

### 3.2 프론트엔드 구현
- [x] Google OAuth Provider 설정
- [x] 로그인 컴포넌트 구현
- [x] API 연동
- [x] 토큰 관리

### 3.3 보안
- [x] 환경 변수 사용
- [x] httpOnly 쿠키 적용
- [x] HTTPS 통신
- [x] 적절한 스코프 설정

## 4. 테스트 시나리오

1. 로그인 플로우
   - Google 로그인 버튼 클릭
   - Google 계정 선택
   - 권한 승인
   - 토큰 발급 확인
   - 리다이렉트 동작

2. 토큰 관리
   - Access Token 저장
   - Refresh Token 저장
   - 토큰 갱신
   - 로그아웃 처리

3. 에러 처리
   - 로그인 실패
   - 토큰 만료
   - 권한 거부
   - 네트워크 오류

## 5. 문제 해결 가이드

### 5.1 CORS 이슈
- 백엔드 서버의 CORS 설정 확인
- 허용된 오리진 목록에 프론트엔드 도메인 추가

### 5.2 리디렉션 URI 불일치
- Google Cloud Console 설정 확인
- 환경별 URI 설정 관리

### 5.3 토큰 관련 이슈
- 토큰 만료 시간 확인
- 토큰 갱신 로직 점검
- 보안 설정 검증 