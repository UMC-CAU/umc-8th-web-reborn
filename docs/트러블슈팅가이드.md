# 🔧 UMC Web 개발 트러블슈팅 가이드

> "문제 해결 능력이 진짜 개발자를 만든다"

## 📋 목차
- [개발 환경 문제](#개발-환경-문제)
- [React 관련 문제](#react-관련-문제)
- [TypeScript 오류](#typescript-오류)
- [API 연동 문제](#api-연동-문제)
- [인증 시스템 문제](#인증-시스템-문제)
- [상태 관리 문제](#상태-관리-문제)
- [스타일링 문제](#스타일링-문제)
- [빌드 및 배포 문제](#빌드-및-배포-문제)
- [성능 문제](#성능-문제)
- [디버깅 전략](#디버깅-전략)

## 🚀 개발 환경 문제

### 1. 서버가 시작되지 않는 경우

#### 🔴 포트 이미 사용 중
```bash
Error: listen EADDRINUSE: address already in use :::5173
```

**해결 방법:**
```bash
# 1. 포트 사용 프로세스 확인
netstat -ano | findstr :5173

# 2. 프로세스 종료 (Windows)
taskkill /PID [프로세스번호] /F

# 3. 다른 포트 사용
pnpm dev --port 3000
```

#### 🔴 Node.js 버전 호환성 문제
```bash
Error: Unsupported engine
```

**해결 방법:**
```bash
# Node.js 버전 확인
node --version

# 권장 버전: 18.x 이상
# nvm 사용시
nvm use 18
nvm install 18.17.0
```

#### 🔴 의존성 설치 문제
```bash
Error: Cannot resolve dependency
```

**해결 방법:**
```bash
# 1. node_modules 및 lock 파일 삭제
rm -rf node_modules pnpm-lock.yaml

# 2. 캐시 정리
pnpm store prune

# 3. 재설치
pnpm install

# 4. 레거시 호환성 문제시
pnpm install --legacy-peer-deps
```

### 2. 개발 도구 문제

#### 🔴 ESLint 설정 충돌
```bash
Error: Failed to load config "@eslint/config" to extend from
```

**해결 방법:**
```json
// .eslintrc.json 설정 확인
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

#### 🔴 TypeScript 설정 문제
```bash
Error: Cannot find module or its corresponding type declarations
```

**해결 방법:**
```json
// tsconfig.json 확인
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "types": ["vite/client"]
  },
  "include": ["src/**/*", "*.d.ts"]
}
```

## ⚛️ React 관련 문제

### 1. 컴포넌트 렌더링 문제

#### 🔴 무한 루프 렌더링
```javascript
// ❌ 잘못된 코드
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // 의존성 배열 누락으로 무한 루프
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }); // 의존성 배열 없음

  return <div>{user?.name}</div>;
}
```

**해결 방법:**
```javascript
// ✅ 올바른 코드
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // 의존성 배열 추가

  return <div>{user?.name}</div>;
}
```

#### 🔴 State 업데이트가 반영되지 않음
```javascript
// ❌ 잘못된 상태 업데이트
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // 같은 값으로 두 번 실행
  };

  return <button onClick={increment}>{count}</button>;
}
```

**해결 방법:**
```javascript
// ✅ 함수형 업데이트 사용
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // 정상 동작
  };

  return <button onClick={increment}>{count}</button>;
}
```

### 2. Hook 사용 문제

#### 🔴 조건부 Hook 사용
```javascript
// ❌ Hook을 조건부로 사용
function UserComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // 오류!
  }

  return <div>User Component</div>;
}
```

**해결 방법:**
```javascript
// ✅ Hook을 최상위에서 사용
function UserComponent({ isLoggedIn }) {
  const [user, setUser] = useState(null);

  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }

  return <div>{user?.name}</div>;
}
```

#### 🔴 커스텀 Hook 의존성 문제
```javascript
// ❌ 의존성 누락
function useUserData(userId) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(() => {
    api.getUser(userId).then(setUser);
  }, []); // userId 의존성 누락

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user;
}
```

**해결 방법:**
```javascript
// ✅ 의존성 정확히 명시
function useUserData(userId) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(() => {
    api.getUser(userId).then(setUser);
  }, [userId]); // userId 의존성 추가

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user;
}
```

## 📝 TypeScript 오류

### 1. 타입 정의 문제

#### 🔴 속성이 존재하지 않음 오류
```typescript
// ❌ 타입 정의 누락
interface User {
  id: number;
  name: string;
}

function UserCard({ user }: { user: User }) {
  return <div>{user.email}</div>; // 오류: User에 email 속성 없음
}
```

**해결 방법:**
```typescript
// ✅ 타입 정의 완성
interface User {
  id: number;
  name: string;
  email: string; // 누락된 속성 추가
}

// 또는 옵셔널 체이닝 사용
function UserCard({ user }: { user: User }) {
  return <div>{user.email || 'No email'}</div>;
}
```

#### 🔴 API 응답 타입 불일치
```typescript
// ❌ 백엔드 응답과 타입 불일치
interface ApiResponse {
  success: boolean;
  data: User[];
}

// 실제 응답: { status: "success", result: [...] }
```

**해결 방법:**
```typescript
// ✅ 실제 API 응답에 맞는 타입 정의
interface ApiResponse {
  status: string;
  result: User[];
}

// 또는 타입 가드 사용
function isValidResponse(response: any): response is ApiResponse {
  return response && typeof response.status === 'string';
}
```

### 2. 제네릭 및 고급 타입

#### 🔴 제네릭 타입 추론 실패
```typescript
// ❌ 제네릭 타입 명시 부족
function createApiHook<T>(endpoint: string) {
  return useQuery([endpoint], () => api.get(endpoint));
}

const { data } = createApiHook('/users'); // data 타입이 any
```

**해결 방법:**
```typescript
// ✅ 제네릭 타입 명시적 사용
function createApiHook<T>(endpoint: string) {
  return useQuery<T>([endpoint], () => api.get<T>(endpoint));
}

const { data } = createApiHook<User[]>('/users'); // data 타입이 User[]
```

## 🌐 API 연동 문제

### 1. 네트워크 요청 오류

#### 🔴 CORS 에러
```bash
Access to fetch at 'https://api.example.com' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**해결 방법:**
```javascript
// vite.config.ts에 프록시 설정
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://umc-8th-be.log8.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

#### 🔴 토큰 만료 처리
```javascript
// ❌ 토큰 만료시 처리 누락
axios.get('/api/protected-route')
  .then(response => setData(response.data))
  .catch(error => {
    console.log('Error:', error); // 401 무시
  });
```

**해결 방법:**
```javascript
// ✅ 인터셉터로 토큰 갱신 처리
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshToken();
        return axios.request(error.config);
      } catch (refreshError) {
        authStore.logout();
        navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);
```

### 2. React Query 문제

#### 🔴 캐시 무효화 안됨
```javascript
// ❌ 데이터 변경 후 캐시 업데이트 안됨
const updateUser = useMutation(api.updateUser, {
  onSuccess: () => {
    console.log('User updated'); // 캐시 무효화 없음
  }
});
```

**해결 방법:**
```javascript
// ✅ 캐시 무효화로 최신 데이터 반영
const queryClient = useQueryClient();

const updateUser = useMutation(api.updateUser, {
  onSuccess: () => {
    queryClient.invalidateQueries(['users']);
    queryClient.invalidateQueries(['user', userId]);
  }
});
```

#### 🔴 에러 상태 처리 누락
```javascript
// ❌ 에러 상태 무시
function UserList() {
  const { data } = useQuery(['users'], api.getUsers);

  return (
    <div>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

**해결 방법:**
```javascript
// ✅ 로딩 및 에러 상태 처리
function UserList() {
  const { data, isLoading, error } = useQuery(['users'], api.getUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

## 🔐 인증 시스템 문제

### 1. 토큰 관리 문제

#### 🔴 로컬스토리지 보안 이슈
```javascript
// ❌ 민감한 토큰을 로컬스토리지에 저장
localStorage.setItem('refreshToken', token); // 보안 위험
```

**해결 방법:**
```javascript
// ✅ Access Token만 로컬스토리지, Refresh Token은 HttpOnly 쿠키
// Access Token (단기)
localStorage.setItem('accessToken', accessToken);

// Refresh Token은 서버에서 HttpOnly 쿠키로 설정
// Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict
```

#### 🔴 토큰 자동 갱신 실패
```javascript
// ❌ 토큰 갱신 로직 누락
function useAuthToken() {
  const token = localStorage.getItem('accessToken');
  return token; // 만료 체크 없음
}
```

**해결 방법:**
```javascript
// ✅ 토큰 만료 체크 및 자동 갱신
function useAuthToken() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const checkToken = async () => {
      if (token && isTokenExpired(token)) {
        try {
          const newToken = await refreshAccessToken();
          setToken(newToken);
          localStorage.setItem('accessToken', newToken);
        } catch (error) {
          authStore.logout();
        }
      }
    };

    checkToken();
  }, [token]);

  return token;
}
```

### 2. 라우트 보호 문제

#### 🔴 보호 라우트 우회 가능
```javascript
// ❌ 클라이언트만으로 라우트 보호
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children; // 토큰 검증 없음
}
```

**해결 방법:**
```javascript
// ✅ 토큰 유효성 검증 추가
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// useAuth 훅에서 실제 토큰 검증
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          await api.verifyToken(token);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  return { isAuthenticated, isLoading };
}
```

## 🗂️ 상태 관리 문제

### 1. Zustand 상태 문제

#### 🔴 상태 변경이 반영되지 않음
```javascript
// ❌ 상태 직접 변경
const useStore = create((set) => ({
  user: { name: 'John', age: 30 },
  updateUser: (newData) => {
    // 직접 변경 - 반응성 없음
    useStore.getState().user.name = newData.name;
  }
}));
```

**해결 방법:**
```javascript
// ✅ 불변성을 지키며 상태 업데이트
const useStore = create((set) => ({
  user: { name: 'John', age: 30 },
  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData }
    }))
}));
```

#### 🔴 상태 구독 최적화 문제
```javascript
// ❌ 불필요한 리렌더링
function UserProfile() {
  const store = useStore(); // 전체 상태 구독

  return <div>{store.user.name}</div>;
}
```

**해결 방법:**
```javascript
// ✅ 필요한 상태만 구독
function UserProfile() {
  const userName = useStore((state) => state.user.name);

  return <div>{userName}</div>;
}

// 또는 shallow 비교 사용
import { shallow } from 'zustand/shallow';

function UserProfile() {
  const { name, age } = useStore(
    (state) => ({ name: state.user.name, age: state.user.age }),
    shallow
  );

  return <div>{name} ({age})</div>;
}
```

### 2. React Query 캐시 문제

#### 🔴 stale 데이터 표시
```javascript
// ❌ 오래된 데이터가 계속 표시됨
const { data } = useQuery(['posts'], api.getPosts, {
  staleTime: Infinity // 무한 캐시
});
```

**해결 방법:**
```javascript
// ✅ 적절한 캐시 전략 설정
const { data } = useQuery(['posts'], api.getPosts, {
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 10 * 60 * 1000, // 10분
  refetchOnWindowFocus: true,
  refetchInterval: 30000 // 30초마다 백그라운드 갱신
});
```

## 🎨 스타일링 문제

### 1. Tailwind CSS 문제

#### 🔴 스타일이 적용되지 않음
```html
<!-- ❌ 동적 클래스명 - Tailwind에서 감지 못함 -->
<div className={`text-${color}-500`}>Dynamic Color</div>
```

**해결 방법:**
```html
<!-- ✅ 완전한 클래스명 사용 -->
<div className={color === 'red' ? 'text-red-500' : 'text-blue-500'}>
  Dynamic Color
</div>

<!-- 또는 safelist에 추가 -->
```

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-red-500',
    'text-blue-500',
    'text-green-500'
  ]
};
```

#### 🔴 CSS 우선순위 충돌
```css
/* ❌ 외부 CSS가 Tailwind를 덮어씀 */
.my-button {
  background-color: red !important; /* Tailwind 무시 */
}
```

**해결 방법:**
```javascript
// ✅ Tailwind arbitrary values 사용
<button className="bg-[#ff0000] hover:bg-[#cc0000]">
  Custom Button
</button>

// 또는 CSS-in-JS 라이브러리 활용
const StyledButton = styled.button.attrs({
  className: 'px-4 py-2 rounded'
})`
  background-color: ${props => props.color};
`;
```

### 2. 반응형 디자인 문제

#### 🔴 모바일에서 레이아웃 깨짐
```html
<!-- ❌ 반응형 고려 안함 -->
<div className="flex w-96">
  <div className="w-1/2">Left</div>
  <div className="w-1/2">Right</div>
</div>
```

**해결 방법:**
```html
<!-- ✅ 모바일 우선 반응형 설계 -->
<div className="flex flex-col sm:flex-row w-full max-w-md sm:max-w-lg lg:max-w-4xl">
  <div className="w-full sm:w-1/2 mb-4 sm:mb-0">Left</div>
  <div className="w-full sm:w-1/2">Right</div>
</div>
```

## 🔨 빌드 및 배포 문제

### 1. 빌드 실패

#### 🔴 TypeScript 컴파일 오류
```bash
Error: Type error: Property 'xyz' does not exist on type 'ABC'
```

**해결 방법:**
```bash
# 1. 타입 검사 확인
npx tsc --noEmit

# 2. 타입 정의 파일 확인
# src/types/ 폴더의 타입 정의 점검

# 3. 임시 우회 (권장하지 않음)
// @ts-ignore 또는 any 타입 사용
```

#### 🔴 메모리 부족 에러
```bash
Error: JavaScript heap out of memory
```

**해결 방법:**
```bash
# Node.js 메모리 증가
export NODE_OPTIONS="--max_old_space_size=4096"
pnpm build

# 또는 package.json에 추가
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
  }
}
```

### 2. 배포 문제

#### 🔴 환경 변수 누락
```bash
Error: VITE_SERVER_API_URL is not defined
```

**해결 방법:**
```bash
# .env.production 파일 생성
VITE_SERVER_API_URL=https://umc-8th-be.log8.kr

# Vercel/Netlify 등에서 환경 변수 설정
# Dashboard → Environment Variables 추가
```

#### 🔴 라우팅 404 에러 (SPA)
```bash
# /dashboard 직접 접근시 404 에러
```

**해결 방법:**
```javascript
// Vercel: vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

// Netlify: _redirects
/*    /index.html   200

// Nginx
try_files $uri $uri/ /index.html;
```

## 🚀 성능 문제

### 1. 렌더링 성능

#### 🔴 불필요한 리렌더링
```javascript
// ❌ 매번 새로운 객체 생성
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          style={{ marginBottom: '10px' }} // 매번 새 객체
        />
      ))}
    </div>
  );
}
```

**해결 방법:**
```javascript
// ✅ 메모이제이션과 상수 사용
const cardStyle = { marginBottom: '10px' }; // 컴포넌트 외부

const UserCard = memo(({ user, style }) => (
  <div style={style}>{user.name}</div>
));

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          style={cardStyle}
        />
      ))}
    </div>
  );
}
```

#### 🔴 큰 리스트 성능 저하
```javascript
// ❌ 수천 개 아이템을 한번에 렌더링
function BigList({ items }) {
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

**해결 방법:**
```javascript
// ✅ 가상화 라이브러리 사용
import { FixedSizeList as List } from 'react-window';

function BigList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemCard item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={100}
    >
      {Row}
    </List>
  );
}
```

### 2. 번들 크기 최적화

#### 🔴 큰 번들 사이즈
```bash
# 번들 분석
pnpm build
pnpm dlx vite-bundle-analyzer
```

**해결 방법:**
```javascript
// ✅ 코드 스플리팅
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

// 라이브러리 트리 쉐이킹
import { debounce } from 'lodash-es'; // ✅
import _ from 'lodash'; // ❌
```

## 🔍 디버깅 전략

### 1. React Developer Tools

#### 컴포넌트 상태 확인
```javascript
// React DevTools에서 확인할 항목
// 1. Component tree에서 상태 확인
// 2. Props drilling 경로 추적
// 3. Re-render 원인 파악 (Profiler 탭)
```

#### 성능 프로파일링
```javascript
// Profiler API 사용
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id);
  console.log('Phase:', phase);
  console.log('Duration:', actualDuration);
}

<Profiler id="UserList" onRender={onRenderCallback}>
  <UserList />
</Profiler>
```

### 2. 네트워크 디버깅

#### API 요청 추적
```javascript
// axios 인터셉터로 요청/응답 로깅
axios.interceptors.request.use(request => {
  console.log('API Request:', request);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);
```

#### React Query 디버깅
```javascript
// React Query DevTools 사용
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

### 3. 브라우저 디버깅 기법

#### Console 활용
```javascript
// 조건부 로깅
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message, data) {
  if (DEBUG) {
    console.group(message);
    console.log(data);
    console.trace(); // 호출 스택 추적
    console.groupEnd();
  }
}

// 성능 측정
console.time('component-render');
// ... 렌더링 로직
console.timeEnd('component-render');
```

#### 브레이크포인트 설정
```javascript
// 코드에서 브레이크포인트
function problematicFunction(data) {
  debugger; // 브라우저 디버거 실행

  // 또는 조건부 브레이크포인트
  if (data.id === 'target-id') {
    debugger;
  }

  return processData(data);
}
```

### 4. 시스템적 디버깅 접근법

#### 1단계: 문제 재현
```markdown
✅ 정확한 재현 단계 기록
✅ 브라우저/환경 정보 수집
✅ 에러 메시지 전체 복사
✅ 최소 재현 코드 작성
```

#### 2단계: 격리 및 분석
```markdown
✅ 관련 없는 코드 제거
✅ 의존성 하나씩 제거해보기
✅ 이전 버전과 비교 (git bisect)
✅ 유사한 이슈 검색
```

#### 3단계: 가설 검증
```markdown
✅ 원인 가설 세우기
✅ 작은 단위로 테스트
✅ 로그/디버거 활용
✅ 문서/예제 참고
```

#### 4단계: 해결 및 검증
```markdown
✅ 수정 사항 테스트
✅ 엣지 케이스 고려
✅ 리그레션 테스트
✅ 팀 공유 및 문서화
```

## 🎯 마무리

### 핵심 원칙
1. **차근차근 접근**: 급하게 해결하려 하지 말고 단계별로 분석
2. **문서화 습관**: 해결 과정을 기록하여 팀과 공유
3. **근본 원인 파악**: 증상만 고치지 말고 원인을 해결
4. **예방적 사고**: 같은 문제가 재발하지 않도록 시스템 개선

### 도움 요청하기
1. **정확한 정보 제공**: 에러 메시지, 환경 정보, 재현 단계
2. **시도한 것들 공유**: 어떤 해결책을 시도했는지 설명
3. **코드 공유**: 최소 재현 가능한 코드 예제 제공
4. **구체적 질문**: "안 돼요"가 아닌 구체적인 문제점 설명

**함께 성장하는 개발자가 되기 위해 문제 해결 능력을 키워나가세요!** 🚀