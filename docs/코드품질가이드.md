# 📋 UMC Web 코드 품질 가이드라인

> "좋은 코드는 예술이다 - 읽기 쉽고, 이해하기 쉽고, 유지보수하기 쉬운 코드를 작성하자"

## 🎯 코드 품질이 중요한 이유

### 💡 왜 코드 품질에 신경써야 할까요?

1. **가독성** 📖: 6개월 후의 나도 이해할 수 있는 코드
2. **유지보수성** 🔧: 기능 추가/수정이 쉬운 구조
3. **협업 효율성** 🤝: 팀원들과 원활한 소통
4. **버그 예방** 🐛: 명확한 코드는 버그를 줄임
5. **성능** ⚡: 효율적인 구조는 성능 향상으로 이어짐

## 🏗️ 프로젝트 구조 가이드라인

### 📁 디렉토리 구조

#### ✅ 권장 구조 (Feature-based)
```
src/
├── components/          # 재사용 가능한 공통 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트 (Button, Input 등)
│   ├── layout/         # 레이아웃 컴포넌트
│   └── common/         # 공통 컴포넌트
├── features/           # 기능별 모듈
│   ├── auth/          # 인증 관련
│   │   ├── components/ # 인증 전용 컴포넌트
│   │   ├── hooks/     # 인증 관련 커스텀 훅
│   │   ├── api/       # 인증 API 함수
│   │   └── types/     # 인증 관련 타입
│   ├── profile/       # 프로필 관련
│   └── dashboard/     # 대시보드 관련
├── hooks/             # 전역 커스텀 훅
├── utils/             # 유틸리티 함수
├── types/             # 전역 타입 정의
├── constants/         # 상수
├── store/             # 상태 관리 (Zustand 등)
└── styles/            # 전역 스타일
```

#### ❌ 피해야 할 구조 (Type-based)
```
src/
├── components/        # 모든 컴포넌트를 한 곳에
├── hooks/            # 모든 훅을 한 곳에
├── api/              # 모든 API를 한 곳에
└── types/            # 모든 타입을 한 곳에
```

### 📝 파일 명명 규칙

```typescript
// ✅ 컴포넌트: PascalCase
UserProfile.tsx
LoginForm.tsx
ProductCard.tsx

// ✅ 훅: camelCase + use 접두사
useAuth.ts
useLocalStorage.ts
useDebounce.ts

// ✅ 유틸리티: camelCase
formatDate.ts
validateEmail.ts
api.ts

// ✅ 타입/인터페이스: PascalCase
User.ts
ApiResponse.ts
FormData.ts

// ✅ 상수: UPPER_SNAKE_CASE
API_ENDPOINTS.ts
ERROR_MESSAGES.ts
```

## ⚛️ React 컴포넌트 작성 가이드

### 🎯 컴포넌트 설계 원칙

#### 1. 단일 책임 원칙 (SRP)
```typescript
// ❌ 너무 많은 책임을 가진 컴포넌트
const UserDashboard = () => {
  // 사용자 정보 관리
  // 주문 내역 관리
  // 결제 정보 관리
  // 알림 관리
  // UI 렌더링
  return <div>...</div>;
};

// ✅ 책임을 분리한 컴포넌트
const UserDashboard = () => {
  return (
    <div>
      <UserProfile />
      <OrderHistory />
      <PaymentInfo />
      <NotificationCenter />
    </div>
  );
};
```

#### 2. Props 인터페이스 정의
```typescript
// ✅ 명확한 Props 타입 정의
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### 3. 커스텀 훅 활용
```typescript
// ✅ 비즈니스 로직을 커스텀 훅으로 분리
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginData) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, loading, login, logout };
};

// 컴포넌트에서 사용
const LoginForm = () => {
  const { login, loading } = useAuth();
  // 컴포넌트는 UI에만 집중
};
```

### 🎨 컴포넌트 작성 패턴

#### 컴포넌트 템플릿
```typescript
import React from 'react';
import { cn } from '@/utils/className'; // 클래스명 유틸리티

// 1. Props 인터페이스 정의
interface ComponentNameProps {
  // props 정의
}

// 2. 컴포넌트 구현
const ComponentName: React.FC<ComponentNameProps> = ({
  // props 구조분해
}) => {
  // 3. 상태 및 훅
  const [state, setState] = useState();

  // 4. 이벤트 핸들러
  const handleClick = () => {
    // 이벤트 처리
  };

  // 5. 조건부 렌더링 로직
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // 6. JSX 반환
  return (
    <div className={cn('component-base-class', className)}>
      {/* 컴포넌트 내용 */}
    </div>
  );
};

export default ComponentName;
```

## 🎯 TypeScript 모범 사례

### 📝 타입 정의 가이드라인

#### 1. 인터페이스 vs 타입
```typescript
// ✅ 객체 구조 정의 시 Interface 사용
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 유니온, 교집합 등 복잡한 타입은 Type 사용
type Status = 'pending' | 'approved' | 'rejected';
type UserWithStatus = User & { status: Status };
```

#### 2. 제네릭 활용
```typescript
// ✅ 재사용 가능한 API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 사용 예시
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// ✅ 제네릭 훅
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API 로직...

  return { data, loading, error };
};
```

#### 3. 타입 가드 활용
```typescript
// ✅ 타입 가드로 안전한 타입 체크
const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
};

// 사용
const handleUserData = (data: unknown) => {
  if (isUser(data)) {
    // 이 블록에서는 data가 User 타입으로 인식됨
    console.log(data.name);
  }
};
```

### 🚫 타입 사용 시 피해야 할 것들

```typescript
// ❌ any 타입 남용
const processData = (data: any) => {
  return data.someProperty; // 타입 안전성 상실
};

// ✅ 구체적인 타입 정의
interface ProcessData {
  someProperty: string;
}
const processData = (data: ProcessData) => {
  return data.someProperty; // 타입 안전성 확보
};

// ❌ 불필요한 타입 단언
const userElement = document.getElementById('user') as HTMLDivElement;

// ✅ 안전한 타입 체크
const userElement = document.getElementById('user');
if (userElement instanceof HTMLDivElement) {
  // 안전한 사용
}
```

## 🎨 스타일링 가이드라인

### 🎯 Tailwind CSS 활용법

#### 1. 클래스명 구성 순서
```tsx
// ✅ 권장 순서: 레이아웃 → 크기 → 스페이싱 → 색상 → 기타
<div className="
  flex flex-col          // 레이아웃
  w-full h-screen       // 크기
  p-4 mx-auto          // 스페이싱
  bg-white text-gray-900 // 색상
  rounded-lg shadow-md  // 기타
">
```

#### 2. 조건부 스타일링
```tsx
import { cn } from '@/utils/className';

const Button = ({ variant, size, disabled }) => {
  return (
    <button
      className={cn(
        // 기본 스타일
        'px-4 py-2 rounded font-medium transition-colors',
        // 조건부 스타일
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-700 hover:bg-gray-300': variant === 'secondary',
          'px-2 py-1 text-sm': size === 'sm',
          'px-6 py-3 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
    >
      Button
    </button>
  );
};
```

#### 3. 반응형 디자인
```tsx
// ✅ Mobile-first 접근법
<div className="
  w-full           // 모바일: 전체 너비
  md:w-1/2        // 태블릿: 절반 너비
  lg:w-1/3        // 데스크톱: 1/3 너비
  xl:w-1/4        // 대형 화면: 1/4 너비
">
```

## 🔧 상태 관리 가이드라인

### 🎯 Zustand 활용 패턴

#### 1. 스토어 구조 설계
```typescript
// ✅ 도메인별 스토어 분리
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // 액션들
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,

  login: async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  },

  updateProfile: async (data) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = await userAPI.updateProfile(user.id, data);
    set({ user: updatedUser });
  },
}));
```

#### 2. 선택적 구독 패턴
```typescript
// ✅ 필요한 상태만 구독하여 불필요한 리렌더링 방지
const LoginForm = () => {
  // 전체 스토어가 아닌 필요한 것만 선택
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 컴포넌트 로직...
};
```

### 🔄 React Query 활용 패턴

#### 1. 서버 상태 관리
```typescript
// ✅ 커스텀 훅으로 API 로직 캡슐화
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userAPI.getUsers(),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userAPI.getUser(id),
    enabled: !!id, // id가 있을 때만 실행
  });
};

// 뮤테이션 훅
const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

## 🔍 함수 작성 가이드라인

### 📝 함수 설계 원칙

#### 1. 순수 함수 지향
```typescript
// ✅ 순수 함수: 동일한 입력에 대해 항상 동일한 출력
const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// ❌ 부수 효과가 있는 함수
let tax = 0.1;
const calculateTotalWithTax = (items: CartItem[]) => {
  tax = getCurrentTaxRate(); // 외부 상태 변경
  return items.reduce((total, item) => total + item.price * item.quantity, 0) * (1 + tax);
};
```

#### 2. 단일 책임 원칙
```typescript
// ❌ 여러 일을 하는 함수
const processUserData = (userData: RawUserData) => {
  // 검증
  if (!userData.email || !userData.name) {
    throw new Error('Invalid data');
  }

  // 변환
  const user = {
    id: generateId(),
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    createdAt: new Date(),
  };

  // 저장
  saveToDatabase(user);

  // 이메일 발송
  sendWelcomeEmail(user.email);

  return user;
};

// ✅ 책임을 분리한 함수들
const validateUserData = (userData: RawUserData): void => {
  if (!userData.email || !userData.name) {
    throw new Error('Invalid data');
  }
};

const transformUserData = (userData: RawUserData): User => {
  return {
    id: generateId(),
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    createdAt: new Date(),
  };
};

const createUser = async (userData: RawUserData): Promise<User> => {
  validateUserData(userData);
  const user = transformUserData(userData);

  await saveToDatabase(user);
  await sendWelcomeEmail(user.email);

  return user;
};
```

#### 3. 명확한 함수명
```typescript
// ❌ 모호한 함수명
const doStuff = (data: any) => { ... };
const handle = (item: any) => { ... };
const process = (input: any) => { ... };

// ✅ 명확한 함수명
const calculateDiscountPrice = (originalPrice: number, discountRate: number) => { ... };
const handleUserLogin = (credentials: LoginCredentials) => { ... };
const formatUserDisplayName = (firstName: string, lastName: string) => { ... };
```

### 🎯 유틸리티 함수 패턴

```typescript
// ✅ 재사용 가능한 유틸리티 함수들
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
```

## 🚨 에러 처리 가이드라인

### 🎯 포괄적인 에러 처리

#### 1. API 에러 처리
```typescript
// ✅ 체계적인 에러 처리
class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답 에러
      throw new ApiError(
        error.response.status,
        error.response.data.code || 'UNKNOWN_ERROR',
        error.response.data.message || 'An error occurred'
      );
    } else if (error.request) {
      // 네트워크 에러
      throw new ApiError(0, 'NETWORK_ERROR', 'Network connection failed');
    } else {
      // 기타 에러
      throw new ApiError(0, 'UNKNOWN_ERROR', error.message);
    }
  }
);
```

#### 2. 컴포넌트 에러 바운더리
```typescript
// ✅ 에러 바운더리 컴포넌트
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 에러 로깅 서비스에 전송
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-800 text-lg font-semibold">
            Something went wrong
          </h2>
          <p className="text-red-600 mt-2">
            We're sorry, but something unexpected happened.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### 3. 사용자 친화적 에러 메시지
```typescript
// ✅ 에러 메시지 매핑
const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: '인터넷 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 정보를 다시 확인해주세요.',
  SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

const getErrorMessage = (error: ApiError): string => {
  return ERROR_MESSAGES[error.code] || error.message || '알 수 없는 오류가 발생했습니다.';
};
```

## 📊 성능 최적화 가이드라인

### ⚡ React 성능 최적화

#### 1. 메모이제이션 활용
```typescript
// ✅ React.memo로 불필요한 리렌더링 방지
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

const UserCard = React.memo<UserCardProps>(({ user, onEdit }) => {
  const handleEdit = useCallback(() => {
    onEdit(user.id);
  }, [user.id, onEdit]);

  return (
    <div className="p-4 border rounded">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
});

// ✅ useMemo로 비용이 큰 계산 캐싱
const ExpensiveComponent = ({ items }: { items: Item[] }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => {
      // 복잡한 계산...
      return acc + complexCalculation(item);
    }, 0);
  }, [items]);

  return <div>Result: {expensiveValue}</div>;
};
```

#### 2. 코드 분할 (Code Splitting)
```typescript
// ✅ 동적 임포트로 번들 크기 최적화
const LazyDashboard = React.lazy(() => import('../pages/Dashboard'));
const LazyProfile = React.lazy(() => import('../pages/Profile'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<LazyDashboard />} />
          <Route path="/profile" element={<LazyProfile />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

## 🧪 테스트 가이드라인

### 🎯 테스트 작성 원칙

#### 1. 컴포넌트 테스트
```typescript
// ✅ 사용자 중심의 테스트
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('사용자가 유효한 정보로 로그인할 수 있다', async () => {
    const mockLogin = jest.fn();

    render(<LoginForm onLogin={mockLogin} />);

    // 사용자 행동 시뮬레이션
    fireEvent.change(screen.getByLabelText(/이메일/i), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/비밀번호/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    // 결과 검증
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123'
    });
  });

  it('필수 정보가 없으면 에러 메시지를 보여준다', () => {
    render(<LoginForm onLogin={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    expect(screen.getByText(/이메일을 입력해주세요/i)).toBeInTheDocument();
  });
});
```

#### 2. 커스텀 훅 테스트
```typescript
// ✅ 커스텀 훅 테스트
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('초기값으로 카운터를 설정한다', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it('카운터를 증가시킨다', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## 📚 문서화 가이드라인

### 📖 코드 문서화

#### 1. JSDoc 주석
```typescript
/**
 * 사용자 데이터를 기반으로 표시용 이름을 생성합니다.
 *
 * @param user - 사용자 객체
 * @param options - 표시 옵션
 * @returns 포맷된 사용자 이름
 *
 * @example
 * ```typescript
 * const displayName = formatUserName(
 *   { firstName: 'John', lastName: 'Doe' },
 *   { includeTitle: true, title: 'Dr.' }
 * );
 * // Returns: "Dr. John Doe"
 * ```
 */
const formatUserName = (
  user: { firstName: string; lastName: string },
  options: { includeTitle?: boolean; title?: string } = {}
): string => {
  const { includeTitle = false, title = '' } = options;
  const fullName = `${user.firstName} ${user.lastName}`;

  return includeTitle && title ? `${title} ${fullName}` : fullName;
};
```

#### 2. README 문서 구조
```markdown
# 컴포넌트/모듈 이름

## 개요
간단한 설명

## 사용법
\`\`\`typescript
// 기본 사용 예시
\`\`\`

## Props/Parameters
| 이름 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|

## 예시
실제 사용 예시들

## 주의사항
알아야 할 중요한 내용들
```

## 🎯 코드 리뷰 체크리스트

### ✅ 리뷰 시 확인할 항목들

#### 기능성
- [ ] 요구사항을 정확히 구현했는가?
- [ ] 엣지 케이스를 고려했는가?
- [ ] 에러 처리가 적절한가?

#### 코드 품질
- [ ] 코드가 읽기 쉽고 이해하기 쉬운가?
- [ ] 함수/컴포넌트가 단일 책임을 갖는가?
- [ ] 중복 코드가 없는가?
- [ ] 네이밍이 명확하고 일관성이 있는가?

#### 성능
- [ ] 불필요한 리렌더링이 없는가?
- [ ] 메모이제이션이 적절히 사용되었는가?
- [ ] 번들 크기에 영향을 주는 불필요한 의존성이 없는가?

#### 보안
- [ ] 사용자 입력에 대한 검증이 있는가?
- [ ] 민감한 정보가 노출되지 않는가?
- [ ] XSS, CSRF 등 보안 취약점이 없는가?

#### 테스트
- [ ] 주요 기능에 대한 테스트가 있는가?
- [ ] 테스트가 의미있는 시나리오를 다루는가?
- [ ] 테스트가 실패할 수 있는 상황을 고려했는가?

## 🚀 마무리

### 📈 지속적인 개선

코드 품질은 하루아침에 완성되는 것이 아닙니다. 다음과 같은 방법으로 지속적으로 개선해나가세요:

1. **정기적인 코드 리뷰**: 동료와 함께 코드를 검토하며 학습
2. **리팩토링 습관**: 작동하는 코드를 더 좋은 코드로 개선
3. **새로운 패턴 학습**: 업계 모범 사례와 새로운 패턴 적용
4. **도구 활용**: ESLint, Prettier, TypeScript 등의 도구 적극 활용

### 💡 기억할 점

> "완벽한 코드는 없다. 하지만 더 나은 코드는 항상 있다."

- **가독성이 우선**: 6개월 후의 자신이 이해할 수 있는 코드 작성
- **일관성 유지**: 팀의 컨벤션을 따르고 일관된 스타일 유지
- **점진적 개선**: 작은 개선이라도 꾸준히 적용
- **협업 중시**: 혼자가 아닌 팀과 함께 만드는 코드

**좋은 코드는 예술입니다. 함께 아름다운 코드를 만들어나가요! 🎨**