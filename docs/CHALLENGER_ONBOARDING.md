# 🚀 UMC Web 챌린저 온보딩 가이드

> "Welcome to UMC Web! 함께 성장하는 개발자가 되어보세요 💪"

## 🎯 시작하기 전에

### 👋 환영합니다!
UMC Web 파트에 합류하신 것을 진심으로 환영합니다! 이 레포지토리는 여러분이 **실무 수준의 웹 개발자**로 성장할 수 있도록 설계된 학습 자료입니다.

### 🎓 학습 철학
- **실무 중심**: 실제 회사에서 사용하는 기술과 방법론 학습
- **점진적 성장**: 기초부터 고급까지 단계별 학습
- **협업 경험**: Git/GitHub를 통한 실제 협업 워크플로우 체험
- **자기주도 학습**: 스스로 문제를 해결하는 능력 배양

## 📚 학습 로드맵

### 🗺️ 전체 여정 (6개월)

```
Week 0    │ 🛠️ 개발 환경 설정
Week 1-2  │ 📝 TypeScript 마스터
Week 3-4  │ ⚛️ React 기초 완성
Week 5-6  │ 🎨 스타일링 & 컴포넌트 설계
Week 7-8  │ 🔄 데이터 페칭 & 상태 관리
Week 9-10 │ 🔐 인증 & 보안
Week 11+  │ 🚀 고급 주제 & 프로젝트
```

### 📖 챕터별 상세 내용

#### 🎯 Week 0: 사전 준비
**목표**: 개발 환경 완벽 세팅
```bash
✅ Node.js & pnpm 설치
✅ VS Code & 필수 확장 프로그램
✅ Git 설정 & GitHub 연동
✅ 프로젝트 클론 & 실행 테스트
```

#### 📝 Week 1-2: TypeScript 기초 (`missions/ch1/`)
**목표**: 타입 안전한 코드 작성 능력
- TypeScript 기본 문법과 타입 시스템
- Interface vs Type Alias
- Generic과 유틸리티 타입
- **실습**: Todo 앱으로 TypeScript 적용

#### ⚛️ Week 3-4: React 핵심 (`missions/ch2/`)
**목표**: Modern React 개발 패턴 이해
- 함수형 컴포넌트와 Hooks
- 상태 관리 (useState, useEffect)
- Context API 활용
- **실습**: 컴포넌트 설계와 상태 관리

#### 🎨 Week 5-6: 스타일링 & 설계 (`missions/ch3/`)
**목표**: 재사용 가능한 컴포넌트 설계
- Tailwind CSS 마스터
- Atomic Design 패턴
- 반응형 디자인
- **실습**: 디자인 시스템 구축

#### 🔄 Week 7-8: 데이터 & 상태 (`missions/ch4/`)
**목표**: 실무 수준의 데이터 관리
- REST API 연동 (Axios)
- React Query로 서버 상태 관리
- 에러 처리와 로딩 상태
- **실습**: 실제 API 연동 프로젝트

#### 🔐 Week 9-10: 인증 & 보안 (`missions/ch5/`)
**목표**: 보안을 고려한 사용자 인증
- JWT 토큰 기반 인증
- Protected Route 구현
- Google OAuth 연동
- **실습**: 완전한 인증 시스템

## 🛠️ 개발 환경 설정

### 필수 도구 설치

#### 1. Node.js & pnpm
```bash
# Node.js 18+ 설치 (https://nodejs.org)
node --version  # v18.0.0 이상 확인

# pnpm 설치
npm install -g pnpm
pnpm --version  # 확인
```

#### 2. VS Code 확장 프로그램
```
필수 확장 프로그램:
✅ ES7+ React/Redux/React-Native snippets
✅ TypeScript Importer
✅ Prettier - Code formatter
✅ ESLint
✅ Tailwind CSS IntelliSense
✅ Auto Rename Tag
✅ Bracket Pair Colorizer
✅ GitLens
✅ Thunder Client (API 테스트)
```

#### 3. Git 설정
```bash
# Git 사용자 정보 설정
git config --global user.name "당신의 이름"
git config --global user.email "당신의 이메일"

# 기본 브랜치 설정
git config --global init.defaultBranch main

# 줄바꿈 설정 (Windows)
git config --global core.autocrlf true
```

### 프로젝트 시작하기

#### 1. 레포지토리 클론
```bash
# 프로젝트 클론
git clone https://github.com/UMC-CAU/umc-8th-web-reborn.git
cd umc-8th-web-reborn

# 의존성 설치 (메인 프로젝트)
cd Lp-project
pnpm install

# 개발 서버 실행
pnpm dev
```

#### 2. 첫 번째 미션 시작
```bash
# ch1 미션 시작
cd ../missions/ch1
pnpm install
pnpm dev
```

## 📋 학습 방법

### 🎯 효과적인 학습 전략

#### 1. 이론 → 실습 → 응용
```markdown
📚 이론 학습 (30분)
└── 개념 이해하기
└── 공식 문서 읽기
└── 예제 코드 분석

💻 실습 (1-2시간)
└── 따라하며 코딩
└── 코드 수정해보기
└── 다른 방법 시도

🚀 응용 (1시간)
└── 미션 요구사항 구현
└── 추가 기능 도전
└── 코드 리팩토링
```

#### 2. 매일의 학습 루틴
```markdown
## 📅 Daily Routine

### 🌅 시작 (10분)
- [ ] 어제 배운 내용 간단 복습
- [ ] 오늘 학습 목표 설정
- [ ] 개발 환경 체크

### 🏃‍♂️ 학습 (2-3시간)
- [ ] 새로운 개념 학습
- [ ] 실습 프로젝트 진행
- [ ] 막힌 부분 정리

### 🌙 마무리 (15분)
- [ ] 오늘 배운 내용 정리
- [ ] 내일 계획 수립
- [ ] 질문 사항 정리
```

### 📝 학습 기록하기

#### 개인 학습 로그
```markdown
## 📊 Week X Learning Log

### 💡 새로 배운 것들
- TypeScript Generic 사용법
- React Hook 최적화 패턴
- Tailwind CSS 고급 기능

### 🎯 완성한 기능들
- [x] 사용자 로그인 기능
- [x] 프로필 편집 모달
- [x] 무한 스크롤 구현

### 🤔 어려웠던 점들
- 복잡한 상태 관리
- TypeScript 타입 에러
- CSS 레이아웃 문제

### 💪 해결한 방법들
- Context API → Zustand 변경
- 타입 정의 파일 분리
- Flexbox → Grid 적용

### 📚 다음 주 계획
- React Query 도입
- 컴포넌트 테스트 작성
- 성능 최적화 적용
```

## 🤝 협업과 소통

### 💬 질문하는 방법

#### 좋은 질문의 예시
```markdown
## 🤔 TypeScript Generic 질문

### 상황
React Hook Form과 Zod를 함께 사용하는데 타입 에러가 발생합니다.

### 현재 코드
\`\`\`typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormData = z.infer<typeof schema>;
const { register } = useForm<FormData>();
\`\`\`

### 에러 메시지
Type 'string' is not assignable to type 'never'

### 시도해본 것들
1. 타입 명시적 선언
2. Generic 매개변수 추가
3. 공식 문서 확인

### 질문
어떻게 하면 타입 에러를 해결할 수 있을까요?
```

#### ❌ 피해야 할 질문
```
"코드가 안 돼요"
"에러가 나는데 도와주세요"
"이거 어떻게 하는 거예요?"
```

### 🔄 코드 리뷰 문화

#### Pull Request 작성법
```markdown
## 📋 PR 제목
[Week2] React Hook과 상태관리 구현

## 📝 변경 사항
- useState로 로그인 상태 관리
- useEffect로 토큰 유효성 검사
- Context API로 전역 상태 공유

## 🎯 주요 학습 내용
- Hook의 의존성 배열 이해
- Context Provider 패턴
- 커스텀 Hook 설계

## 🤔 피드백 요청
- 상태 관리 구조가 적절한지
- Hook 사용 패턴이 올바른지
- 더 좋은 방법이 있는지

## 📸 스크린샷
[실행 결과 이미지]
```

## 🚨 트러블슈팅 가이드

### 💊 자주 발생하는 문제들

#### 1. 개발 환경 문제
```bash
# pnpm 설치 오류
npm cache clean --force
npm install -g pnpm

# 포트 충돌 문제
pnpm dev --port 3001

# 의존성 충돌
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. TypeScript 에러
```typescript
// 흔한 타입 에러와 해결법

// ❌ 에러: Property 'xxx' does not exist
const data = response.data.xxx; // any 타입

// ✅ 해결: 타입 정의
interface ApiResponse {
  data: {
    xxx: string;
  }
}
const data: ApiResponse = response.data;

// ❌ 에러: Object is possibly 'null'
const element = document.getElementById('app').style;

// ✅ 해결: null 체크
const element = document.getElementById('app')?.style;
```

#### 3. React Hook 오류
```typescript
// ❌ 무한 렌더링
useEffect(() => {
  setCount(count + 1);
}, [count]); // count가 변경될 때마다 실행

// ✅ 해결: 함수형 업데이트
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // 한 번만 실행

// ❌ Hook 순서 문제
if (condition) {
  const [state] = useState(0); // 조건부 Hook
}

// ✅ 해결: 항상 같은 순서
const [state] = useState(0);
if (condition) {
  // 로직 처리
}
```

## 🎯 성공을 위한 팁

### 💡 개발자 마인드셋

#### 1. 성장형 사고방식
- **실패는 학습의 기회**: 에러를 두려워하지 말고 배움의 과정으로 받아들이기
- **지속적 개선**: 완벽하지 않아도 일단 만들고 점진적으로 개선하기
- **호기심 유지**: "왜 이렇게 동작할까?" 항상 궁금해하기

#### 2. 효율적인 학습법
```markdown
### 🧠 학습 최적화 전략

#### 뽀모도로 기법 적용
25분 집중 학습 → 5분 휴식 → 반복

#### 페인만 기법 활용
배운 내용을 남에게 설명할 수 있을 정도로 이해하기

#### 액티브 러닝
수동적 읽기보다는 직접 코딩하며 실험하기
```

#### 3. 습관 만들기
```markdown
### 📅 좋은 개발 습관

#### 매일
- [ ] 커밋 메시지 신경써서 작성하기
- [ ] 코드 포매팅 적용하기
- [ ] 의미있는 변수명 사용하기

#### 매주
- [ ] 배운 내용 정리하기
- [ ] 다른 사람 코드 리뷰하기
- [ ] 새로운 기술 하나씩 시도하기

#### 매월
- [ ] 포트폴리오 프로젝트 업데이트
- [ ] 기술 블로그 작성하기
- [ ] 오픈소스 기여해보기
```

## 🎊 축하와 동기부여

### 🏆 마일스톤 달성

#### Week 별 성취 배지
- 🥇 **First Commit**: 첫 커밋 완료
- 📝 **TypeScript Master**: TypeScript 챕터 완료
- ⚛️ **React Rookie**: React 기초 마스터
- 🎨 **Design System Builder**: 컴포넌트 설계 완료
- 🔄 **Data Wizard**: 상태 관리 챕터 완료
- 🔐 **Security Guardian**: 인증 시스템 구현

#### 월간 MVP 선발
- **Most Improved**: 가장 많은 성장을 보인 챌린저
- **Code Quality**: 가장 깔끔한 코드를 작성한 챌린저
- **Helper**: 다른 챌린저를 가장 많이 도운 챌린저
- **Innovator**: 가장 창의적인 해결책을 제시한 챌린저

### 🌱 지속적인 성장

#### 개인 성장 체크리스트
```markdown
## 📈 My Growth Tracker

### 기술 역량 (1-5 stars)
- JavaScript/TypeScript: ⭐⭐⭐
- React/Next.js: ⭐⭐
- 상태관리: ⭐⭐
- 스타일링: ⭐⭐⭐
- API 연동: ⭐⭐
- 테스팅: ⭐

### 소프트 스킬 (1-5 stars)
- 문제 해결: ⭐⭐⭐
- 커뮤니케이션: ⭐⭐⭐
- 협업: ⭐⭐
- 자기주도 학습: ⭐⭐⭐⭐
- 시간 관리: ⭐⭐⭐

### 다음 달 목표
- [ ] 테스트 코드 작성 익히기
- [ ] Next.js 프레임워크 학습
- [ ] 오픈소스 기여 1회
- [ ] 기술 블로그 포스팅 2개
```

## 🚀 다음 단계 준비

### 💼 취업/인턴 준비

#### 포트폴리오 프로젝트
```markdown
## 📁 Portfolio Project Ideas

### 초급자용
- [ ] 개인 블로그 사이트
- [ ] 날씨 앱
- [ ] Todo 앱 (고급 기능 추가)

### 중급자용
- [ ] 쇼핑몰 클론
- [ ] SNS 클론
- [ ] 실시간 채팅 앱

### 고급자용
- [ ] 대시보드 시스템
- [ ] 협업 도구
- [ ] 오픈소스 기여
```

#### 기술 면접 준비
```markdown
## 🤔 자주 나오는 면접 질문

### JavaScript/TypeScript
- 클로저와 스코프
- 프로토타입과 상속
- 비동기 처리 방식
- TypeScript 타입 시스템

### React
- Virtual DOM 동작 원리
- Hook의 동작 방식
- 상태 관리 전략
- 성능 최적화 방법

### 프로젝트
- 가장 어려웠던 기술적 도전
- 성능 개선 경험
- 팀 협업 경험
- 트러블슈팅 사례
```

## 🎯 마무리

### 🌟 성공의 핵심

1. **꾸준함이 재능을 이긴다**: 매일 조금씩이라도 코딩하기
2. **완벽보다는 완성**: 100% 완벽한 코드보다 80% 동작하는 코드
3. **협업의 가치**: 혼자가 아닌 함께 성장하기
4. **실무 연결**: 배운 것을 실제 프로젝트에 적용하기

### 💪 챌린저 다짐

```
"나는 UMC Web 챌린저로서,
매일 성장하고 동료와 함께 배우며,
코드로 세상을 바꾸는 개발자가 되겠습니다!"
```

**Welcome to your journey! 함께 성장해나가요! 🚀**

---

💌 **문의사항이나 도움이 필요하다면 언제든 파트장에게 연락하세요!**