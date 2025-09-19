# ⚛️ Chapter 2: React 기초 & Context API

> **학습 목표**: React의 핵심 개념을 학습하고 Context API로 상태 관리하는 Todo 앱 구현하기

## 🎯 Week 2 학습 내용

### 📚 React 기초 개념
- **컴포넌트와 JSX**: 선언적 UI 작성법
- **Props와 State**: 데이터 흐름과 상태 관리
- **Hook 시스템**: useState, useEffect, useContext
- **이벤트 핸들링**: React의 합성 이벤트 시스템

### 🛠️ 상태 관리 실습
- **Context API**: 전역 상태 관리 패턴
- **Provider 패턴**: 상태 공급자와 소비자 구조
- **커스텀 Hook**: 로직 재사용과 추상화
- **테마 시스템**: 다크/라이트 모드 구현

## 🚀 프로젝트 구조

```
ch2/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx         # 네비게이션 바
│   │   ├── theme/
│   │   │   ├── ThemeToggleButton.tsx  # 테마 토글 버튼
│   │   │   └── ThemeContent.tsx       # 테마별 콘텐츠
│   │   └── todo/
│   │       ├── Todo.tsx               # 메인 Todo 컴포넌트
│   │       ├── TodoForm.tsx           # 할 일 입력 폼
│   │       ├── TodoList.tsx           # 할 일 목록
│   │       └── TodoItem.tsx           # 개별 할 일 아이템
│   ├── context/
│   │   ├── TodoContext.tsx            # Todo 상태 관리
│   │   ├── ThemeProvider.tsx          # 테마 상태 관리
│   │   └── themeConstants.ts          # 테마 상수 정의
│   ├── types/
│   │   └── todo.ts                    # TypeScript 타입 정의
│   └── App.tsx                        # 루트 컴포넌트
```

## 📋 구현 기능

### ✅ Todo 앱 핵심 기능
- **할 일 추가**: 입력 폼을 통한 새로운 할 일 등록
- **할 일 토글**: 완료/미완료 상태 전환
- **할 일 삭제**: 개별 항목 제거 기능
- **할 일 수정**: 인라인 편집 기능

### 🎨 테마 시스템
- **다크/라이트 모드**: 사용자 선호도 기반 테마 전환
- **실시간 테마 변경**: 즉시 반영되는 UI 업데이트
- **테마 지속성**: 브라우저 새로고침 후에도 설정 유지

### 🔧 주요 React 패턴

#### Context API 상태 관리
```typescript
// TodoContext.tsx
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
```

#### 커스텀 Hook 활용
```typescript
// useTodo 커스텀 Hook
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
```

#### 컴포넌트 합성 패턴
```typescript
// App.tsx - Provider 중첩
function App(): React.ReactElement {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Navbar />
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}
```

#### 조건부 렌더링
```typescript
// TodoItem.tsx
return (
  <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    {isEditing ? (
      <input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onBlur={handleSave}
        onKeyPress={handleKeyPress}
      />
    ) : (
      <span onClick={() => setIsEditing(true)}>{todo.text}</span>
    )}
  </li>
);
```

## 🎨 스타일링

- **CSS Modules**: 컴포넌트별 스타일 격리
- **CSS Variables**: 테마 시스템 구현
- **Flexbox/Grid**: 반응형 레이아웃
- **Transition**: 부드러운 애니메이션 효과

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

### ⚛️ React 핵심 개념
1. **선언적 프로그래밍**: 어떻게가 아닌 무엇을 렌더링할지 기술
2. **컴포넌트 기반 아키텍처**: 재사용 가능한 UI 블록
3. **단방향 데이터 흐름**: Props down, Events up 패턴
4. **Virtual DOM**: 효율적인 DOM 업데이트 메커니즘

### 🪝 Hook 시스템 이해
1. **useState**: 컴포넌트 로컬 상태 관리
2. **useEffect**: 사이드 이펙트 처리 (라이프사이클)
3. **useContext**: Context API와 연동
4. **커스텀 Hook**: 로직 재사용과 추상화

### 🌐 상태 관리 패턴
1. **Local State**: 컴포넌트 내부 상태
2. **Lifted State**: 상위 컴포넌트로 상태 끌어올리기
3. **Context API**: 전역 상태 관리
4. **Provider Pattern**: 의존성 주입 패턴

### 🎨 컴포넌트 설계 원칙
1. **단일 책임 원칙**: 하나의 컴포넌트는 하나의 기능
2. **조합 가능성**: 작은 컴포넌트들의 조합
3. **예측 가능성**: Props가 같으면 항상 같은 결과
4. **테스트 용이성**: 격리된 단위 테스트 가능

## 🔧 문제 해결 가이드

### 자주 발생하는 오류

#### 1. Hook 규칙 위반
```bash
Hooks can only be called inside the body of a function component
```
**해결**: Hook은 항상 컴포넌트 최상위에서 호출
```typescript
// ❌ 잘못된 사용
function Component() {
  if (condition) {
    const [state, setState] = useState(0); // 조건부 Hook
  }
}

// ✅ 올바른 사용
function Component() {
  const [state, setState] = useState(0);

  if (condition) {
    // 조건부 로직은 여기서
  }
}
```

#### 2. Context 값이 undefined
```bash
Cannot read property 'todos' of undefined
```
**해결**: Provider 외부에서 Context 사용 시도
```typescript
// 커스텀 Hook에서 에러 처리
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
```

#### 3. 무한 리렌더링
```bash
Too many re-renders. React limits the number of renders
```
**해결**: useEffect 의존성 배열 확인
```typescript
// ❌ 의존성 배열 누락
useEffect(() => {
  setCount(count + 1); // 무한 렌더링
});

// ✅ 올바른 의존성 배열
useEffect(() => {
  setCount(count + 1);
}, [someSpecificDependency]);
```

#### 4. 상태 업데이트가 즉시 반영되지 않음
```typescript
// ❌ 상태 업데이트 직후 값 사용
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 이전 값 출력
};

// ✅ useEffect로 상태 변경 감지
useEffect(() => {
  console.log(count); // 업데이트된 값 출력
}, [count]);
```

## 🔍 성능 최적화 팁

### 1. 불필요한 리렌더링 방지
```typescript
// React.memo로 컴포넌트 메모이제이션
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  // 컴포넌트 로직
});

// useCallback으로 함수 메모이제이션
const handleToggle = useCallback((id: number) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
}, []);
```

### 2. Context 분리
```typescript
// 자주 변경되는 상태와 안정적인 상태 분리
const TodoStateContext = createContext();
const TodoActionsContext = createContext();

// Actions는 안정적이므로 리렌더링 방지
const todoActions = useMemo(() => ({
  addTodo,
  toggleTodo,
  deleteTodo
}), []);
```

## 🎯 다음 단계 준비

### Chapter 3로 넘어가기 전 체크리스트
- [ ] React 컴포넌트 생명주기 이해
- [ ] Hook 시스템 숙련
- [ ] Context API 패턴 이해
- [ ] 상태 관리 전략 구분
- [ ] 컴포넌트 설계 원칙 습득

### 🚀 심화 학습 방향
- **고급 Hook**: useReducer, useMemo, useCallback, useRef
- **성능 최적화**: React.memo, 코드 스플리팅, 가상화
- **상태 관리 라이브러리**: Redux Toolkit, Zustand, Jotai
- **테스팅**: React Testing Library, Jest, Storybook

## 📚 참고 자료

- [React 공식 문서](https://react.dev/)
- [React Hook 가이드](https://react.dev/reference/react)
- [Context API 패턴](https://react.dev/learn/passing-data-deeply-with-context)
- [React 성능 최적화](https://react.dev/learn/render-and-commit)

**🎊 React의 기초를 완벽히 마스터했습니다! 이제 라우팅과 API 연동을 배워볼까요?**