# 🎬 Chapter 3: React Router & API 연동

> **학습 목표**: React Router로 SPA 라우팅을 구현하고 외부 API와 연동하는 영화 검색 앱 만들기

## 🎯 Week 3 학습 내용

### 📚 라우팅 시스템
- **React Router v7**: 최신 라우팅 라이브러리 활용
- **SPA 라우팅**: 클라이언트 사이드 라우팅 개념
- **중첩 라우팅**: Layout과 Outlet 패턴
- **동적 라우팅**: URL 파라미터와 쿼리 스트링

### 🛠️ API 연동 실습
- **HTTP 클라이언트**: fetch API와 axios 비교
- **비동기 처리**: Promise, async/await 패턴
- **커스텀 Hook**: 데이터 페칭 로직 추상화
- **상태 관리**: 로딩, 성공, 에러 상태 처리

## 🚀 프로젝트 구조

```
ch3/
├── src/
│   ├── components/
│   │   ├── MovieCard.tsx          # 영화 카드 컴포넌트
│   │   ├── Navbar.tsx             # 네비게이션 바
│   │   ├── LoadingSpinner.tsx     # 로딩 스피너
│   │   └── Pagination.tsx         # 페이지네이션
│   ├── hooks/
│   │   ├── useCustomFetch.ts      # 범용 데이터 페칭 Hook
│   │   └── useMovies.ts           # 영화 데이터 전용 Hook
│   ├── pages/
│   │   ├── HomePage.tsx           # 홈페이지
│   │   ├── MoviePage.tsx          # 영화 목록 페이지
│   │   ├── MovieDetailPage.tsx    # 영화 상세 페이지
│   │   ├── LoadingSpinnerPage.tsx # 스피너 테스트 페이지
│   │   └── NotFoundPage.tsx       # 404 에러 페이지
│   ├── types/
│   │   ├── movie.ts               # 영화 타입 정의
│   │   └── movieDetail.ts         # 영화 상세 타입 정의
│   └── App.tsx                    # 라우터 설정
```

## 📋 구현 기능

### 🎬 영화 앱 핵심 기능
- **영화 목록 조회**: 카테고리별 영화 리스트 (인기, 상영중, 평점순)
- **영화 상세 정보**: 개별 영화의 상세 페이지
- **페이지네이션**: 다음/이전 페이지 네비게이션
- **로딩 상태**: 데이터 로딩 중 스피너 표시
- **에러 처리**: API 오류 상황 대응

### 🧭 라우팅 구조
- **홈페이지** (`/`): 메인 랜딩 페이지
- **영화 목록** (`/movie/:category`): 카테고리별 영화 리스트
- **영화 상세** (`/movie/:category/:movieId`): 개별 영화 정보
- **404 페이지**: 존재하지 않는 경로 처리

### 🔧 주요 React 패턴

#### React Router v7 설정
```typescript
// App.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movie/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:category/:movieId',
        element: <MovieDetailPage />,
      }
    ]
  }
]);
```

#### Layout 컴포넌트 패턴
```typescript
// Layout 컴포넌트
const Layout = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* 중첩 라우트가 렌더링되는 위치 */}
    </>
  );
};
```

#### 커스텀 Hook으로 데이터 페칭
```typescript
// useCustomFetch.ts
export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};
```

#### URL 파라미터 활용
```typescript
// MovieDetailPage.tsx
import { useParams } from 'react-router-dom';

const MovieDetailPage = (): React.ReactElement => {
  const { category, movieId } = useParams<{
    category: string;
    movieId: string;
  }>();

  const { data: movie, isLoading, isError } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError || !movie) return <div>영화를 불러올 수 없습니다.</div>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};
```

#### 조건부 렌더링과 상태 관리
```typescript
// MoviePage.tsx
const MoviePage = (): React.ReactElement => {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState<number>(1);

  const { data: movies, isLoading, isError } = useMovies(category!, page);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>영화를 불러오는데 실패했습니다.</div>;

  return (
    <div className="movie-page">
      <div className="movie-grid">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={movies?.total_pages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};
```

## 🎨 스타일링

- **CSS Grid**: 영화 카드 그리드 레이아웃
- **Flexbox**: 네비게이션과 레이아웃
- **반응형 디자인**: 모바일/태블릿/데스크톱 대응
- **CSS Transitions**: 호버 효과와 애니메이션

## 🏃‍♂️ 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 타입 체크
pnpm type-check

# 빌드
pnpm build

# ESLint 검사
pnpm lint
```

## 📖 학습 포인트

### 🧭 React Router 핵심 개념
1. **클라이언트 사이드 라우팅**: SPA에서의 네비게이션
2. **중첩 라우팅**: Layout과 Outlet을 활용한 구조
3. **동적 라우팅**: URL 파라미터와 쿼리 스트링 활용
4. **프로그래밍적 네비게이션**: `useNavigate` Hook 활용

### 🌐 HTTP 통신과 비동기 처리
1. **RESTful API**: HTTP 메서드와 상태 코드 이해
2. **Promise와 async/await**: 비동기 JavaScript 패턴
3. **에러 핸들링**: try-catch와 HTTP 상태 코드 처리
4. **데이터 변환**: JSON 파싱과 타입 변환

### 🪝 커스텀 Hook 설계
1. **관심사 분리**: UI 로직과 비즈니스 로직 분리
2. **재사용성**: 여러 컴포넌트에서 활용 가능한 Hook
3. **타입 안전성**: Generic을 활용한 타입 추론
4. **상태 캡슐화**: 내부 상태를 외부에 노출하지 않기

### 🎨 컴포넌트 설계 패턴
1. **Container/Presentational 패턴**: 로직과 UI 분리
2. **Compound Component**: 복합 컴포넌트 설계
3. **Props Drilling 방지**: Context나 상태 리프팅 활용
4. **Error Boundary**: 컴포넌트 레벨 에러 처리

## 🔧 문제 해결 가이드

### 자주 발생하는 오류

#### 1. CORS 에러
```bash
Access to fetch at 'https://api.themoviedb.org' has been blocked by CORS policy
```
**해결**: API 키 확인 및 프록시 설정
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

#### 2. 라우트 파라미터 타입 오류
```bash
Argument of type 'string | undefined' is not assignable to parameter of type 'string'
```
**해결**: 타입 가드나 기본값 설정
```typescript
const { category, movieId } = useParams<{
  category: string;
  movieId: string;
}>();

// 타입 가드 사용
if (!category || !movieId) {
  return <NotFoundPage />;
}

// 또는 기본값 설정
const safeCategory = category || 'popular';
```

#### 3. 무한 API 호출
```bash
Too many requests to API
```
**해결**: useEffect 의존성 배열 확인
```typescript
// ❌ 잘못된 의존성 배열
useEffect(() => {
  fetchMovies(category, page);
}, []); // category, page 누락

// ✅ 올바른 의존성 배열
useEffect(() => {
  fetchMovies(category, page);
}, [category, page]);
```

#### 4. 메모리 누수 경고
```bash
Warning: Can't perform a React state update on an unmounted component
```
**해결**: 컴포넌트 언마운트 시 요청 취소
```typescript
useEffect(() => {
  const abortController = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      });
      // 데이터 처리
    } catch (error) {
      if (error.name !== 'AbortError') {
        setIsError(true);
      }
    }
  };

  fetchData();

  return () => {
    abortController.abort();
  };
}, [url]);
```

## 🔍 성능 최적화 팁

### 1. 이미지 최적화
```typescript
// 이미지 lazy loading
const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy" // 브라우저 네이티브 lazy loading
        onError={(e) => {
          e.currentTarget.src = '/placeholder-image.jpg';
        }}
      />
    </div>
  );
};
```

### 2. 데이터 캐싱
```typescript
// 간단한 메모리 캐싱
const cache = new Map<string, any>();

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(cache.get(url) || null);
  const [isLoading, setIsLoading] = useState<boolean>(!cache.has(url));

  useEffect(() => {
    if (cache.has(url)) {
      setData(cache.get(url));
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      // API 호출 로직
      const result = await response.json();
      cache.set(url, result); // 캐시에 저장
      setData(result);
    };

    fetchData();
  }, [url]);
};
```

### 3. 라우트 기반 코드 스플리팅
```typescript
// React.lazy를 활용한 동적 import
const MoviePage = lazy(() => import('./pages/MoviePage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));

// Suspense로 감싸서 사용
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/movie/:category" element={<MoviePage />} />
    <Route path="/movie/:category/:movieId" element={<MovieDetailPage />} />
  </Routes>
</Suspense>
```

## 🎯 다음 단계 준비

### Chapter 4로 넘어가기 전 체크리스트
- [ ] React Router 라우팅 시스템 이해
- [ ] HTTP 통신과 비동기 처리 숙련
- [ ] 커스텀 Hook 설계 원칙 습득
- [ ] 에러 처리와 로딩 상태 관리
- [ ] URL 파라미터와 쿼리 스트링 활용

### 🚀 심화 학습 방향
- **상태 관리 라이브러리**: React Query, SWR, Zustand
- **고급 라우팅**: Protected Routes, Route Guards, Lazy Loading
- **성능 최적화**: Virtual Scrolling, Intersection Observer API
- **PWA**: Service Worker, 오프라인 캐싱

## 📚 참고 자료

- [React Router 공식 문서](https://reactrouter.com/)
- [The Movie Database API](https://www.themoviedb.org/documentation/api)
- [Fetch API MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

**🎊 라우팅과 API 연동을 완벽히 마스터했습니다! 이제 더 복잡한 상태 관리를 배워볼까요?**