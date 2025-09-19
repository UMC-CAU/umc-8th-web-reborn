# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a UMC (University MakeUs Challenge) 8th web development learning repository containing:

- **Lp-project/**: Main production LP (Landing Page) site with authentication and e-commerce features
- **missions/**: Chapter-by-chapter learning exercises (ch1-ch10, socket-umc, umc-test-todo)

Each mission directory is an independent React + TypeScript + Vite project for learning different concepts.

## Technology Stack

**Core Technologies:**
- React 18+ with TypeScript
- Vite (build tool and dev server)
- Tailwind CSS 4+ for styling
- React Router for navigation

**State Management & Data Fetching:**
- Zustand for client state management
- TanStack Query (React Query) for server state
- Axios for API communication

**Authentication & Forms:**
- JWT tokens with refresh mechanism
- Google OAuth integration
- React Hook Form with Zod validation
- js-cookie for token storage

**Backend API:** https://umc-8th-be.log8.kr/docs

## Common Development Commands

### Main Lp-project
```bash
cd Lp-project
pnpm dev             # Start development server
pnpm build           # Build for production (TypeScript compile + Vite build)
pnpm lint            # Run ESLint
pnpm preview         # Preview production build
```

### Mission Projects
```bash
cd missions/ch[1-10]  # Navigate to specific chapter
pnpm dev             # Start development server
pnpm build           # Build project
pnpm lint            # Run ESLint
```

## Architecture Patterns

### Route Architecture
The main Lp-project uses a dual-layout routing system:
- **Public routes**: Home layout for unauthenticated users (login, signup, product browsing)
- **Protected routes**: Protected layout requiring authentication (mypage, user-specific features)

### State Management
- **Zustand store**: `src/store/authStore.ts` manages authentication state, tokens, and user data
- **React Query**: Used for all server state management in `src/hooks/queries/` and `src/hooks/mutations/`
- **Persistent storage**: Auth tokens persist in localStorage (access) and httpOnly cookies (refresh)

### Component Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── layouts/            # Layout components (HomeLayout, ProtectedLayout)
├── apis/               # API service functions organized by domain
├── hooks/              # Custom hooks split into queries and mutations
├── types/              # TypeScript type definitions
├── store/              # Zustand stores
├── constants/          # App constants and configurations
└── enums/              # TypeScript enums
```

### API Integration
- API functions are organized by domain in `src/apis/` (auth.ts, lp.ts, comment.ts)
- All requests go through configured axios instance with interceptors
- Environment variable `VITE_SERVER_API_URL` must be set for backend communication

## Development Guidelines

### Authentication Flow
1. Login sets tokens via `authStore.setTokens()`
2. Protected routes check `isAuthenticated` state
3. API requests automatically include access token via axios interceptors
4. Token refresh handled automatically on 401 responses

### Component Development
- Follow atomic design principles (Atoms → Molecules → Organisms)
- Use TypeScript interfaces for all props, state, and API responses
- Apply Tailwind CSS utility classes for styling
- Implement proper loading and error states for async operations

### State Management Patterns
- Use React Query for server state (fetching, caching, background updates)
- Use Zustand for client state that needs to persist across components
- Implement optimistic updates with `useMutation` for better UX
- Apply debouncing/throttling for frequent events (search, scroll)

### Code Quality
- Comprehensive JSDoc comments in Korean for functions and components
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- ESLint and Prettier configured for code formatting
- Remove unused code and maintain clean codebase

### Environment Setup
Required environment variables:
```
VITE_SERVER_API_URL=https://umc-8th-be.log8.kr  # Backend API base URL
```

### Testing Strategy
- Components should be testable with React Testing Library
- API integration points should be mocked appropriately
- Critical user flows (authentication, purchasing) should have integration tests