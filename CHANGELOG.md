# Changelog

손밀리 디자인 시스템 변경 이력

---

## [1.0.0] - 2026-03-24 🎉

### Major Release — Production Ready!

**프로덕션 준비 완료**: Phase 1~6 전체 완료, BOKHAUS 5개 화면 통합, 개발자 문서 완성

### Added — Phase 5 & 6

#### Phase 5: 네비게이션 + 고급 컴포넌트 (2026-03-23~24)
- **AppBar** - 3 variants (default/search/actions), badge 지원, 7 Storybook stories
- **BottomNavigation** - Safe area 처리, 3-5 tabs, badge 지원, `activeIndex: number` API
- **Chip** - 3 variants (filter/input/suggestion), selected 상태, 8 stories
- **ProgressBar/Spinner/Skeleton** - 로딩 상태 3종, shimmer animation, 10 stories
- **DatePicker/DateRangePicker** - 분리된 2개 컴포넌트 (타입 안전성), Calendar.tsx 그리드 UI, native picker 통합

#### Phase 6: 통합 & 문서화 (2026-03-24)
- **Storybook GitHub Pages 자동 배포** - `.github/workflows/storybook-deploy.yml`, main 브랜치 push 시 자동 배포
- **BOKHAUS 5개 화면 통합**
  - `LoginScreen.tsx` - Input + Button + Typography, 2단계 인증
  - `HomeScreen.tsx` - AppBar + Card + BottomNavigation + Badge, 기분 체크, 빠른 액션, 활동 요약
  - `ActivityScreen.tsx` - List + Avatar + Chip, AI 대화 타임라인
  - `SettingsScreen.tsx` - List + Switch + Badge + Avatar, 알림 설정, 프로필
  - `NotificationScreen.tsx` - List + Badge + Typography, 필터 (전체/안 읽음)
- **Expo 웹 빌드 지원** - react-dom 19.2.0, react-native-web ~0.19.13 추가
- **개발자 문서 완성**
  - `README.md` - 프로젝트 개요, 빠른 시작
  - `CONTRIBUTING.md` - 컴포넌트 추가 방법, TypeScript 규칙, PR 가이드
  - `ACCESSIBILITY.md` - WCAG 2.1 AA 기준표, 시니어 UX 특수 요건
  - `docs/MIGRATION.md` - 기존 프로젝트 마이그레이션 가이드

### Fixed
- **TypeScript 에러 7개 수정** (Phase 5)
  - AppBar: `typographyFontSizeH2` → `typographyFontSizeHeading2`
  - Chip: `colorWarning` → `colorWarningDefault`, `colorTextPrimary` → `colorNeutralDark`
  - BottomNavigation: Badge variant `error` → `count`
  - Skeleton: width 타입 캐스팅

### Summary
**전체 15개 컴포넌트 + 38 Storybook stories + 5개 BOKHAUS 화면 통합**

- **Phase 1**: 리서치 ✅
- **Phase 2**: Figma Tokens ✅
- **Phase 3**: Critical 컴포넌트 (Button, Typography, Input, Card, Toast) ✅
- **Phase 4**: High 컴포넌트 (Modal, List, Avatar, Badge, Form) ✅
- **Phase 5**: 네비게이션 + 고급 (AppBar, BottomNav, Chip, Progress, DatePicker) ✅
- **Phase 6**: 통합 + 문서화 ✅

**전체 진행률: 93%** (Lighthouse 실측 대기 중)

---

## [0.4.0] - 2026-03-23

### Added - Phase 4 완료 🎉
- **5개 High Priority 컴포넌트**
  - `Modal/Dialog` - alert/confirm/custom variants, 배경클릭 비활성 기본값 (시니어 UX)
  - `List/ListItem` - 72px 행 높이, FlatList 기반, 섹션 헤더, 빈 목록 안내
  - `Avatar` - 이미지/이니셜/아이콘 fallback, 한국어 첫글자 추출, 온라인 상태 뱃지
  - `Badge` - count/dot/label 변형, 99+ overflow, 아이콘 오버레이
  - `Form` (Checkbox/RadioGroup/Switch) - 48px+ 터치 영역, 레이블 필수, 명확한 상태 표현

- **디자인 토큰 확장**
  - `color.neutral.light`: #E0E0E0 (구분선, 비활성 배경)
  - `color.neutral.white`: #FFFFFF (순수 흰색 - 카드/모달)

- **빌드 인프라 구축 (CTO)**
  - `tsconfig.json` - TypeScript 컴파일 설정
  - `npm run build` - 토큰 빌드 + TypeScript 컴파일
  - `npm run watch` - TypeScript watch 모드
  - 빌드 산출물: `dist/index.js` + `.d.ts` 타입 정의
  - Barrel export 통일 (각 컴포넌트 `index.ts`)

### Fixed
- **Critical Bug**: Modal.tsx `action.press` → `action.onPress` (런타임 에러 방지)
- **TypeScript 타입 에러 8개 수정**:
  - Button: 조건부 스타일 spread, fontWeight 타입
  - Card: elevation prop 충돌 제거
  - Input: fontWeight 타입, ref 타입 충돌
  - List: style prop 타입 호환성

### Changed
- **Custom Formats (Style Dictionary)**: Typography 토큰 타입 분리 (숫자/문자열)
- **Package Entry Points**: `main` → `dist/index.js`, `types` → `dist/index.d.ts`
- **Export 구조**: barrel export로 통일 (`export * from ...`)

### Documentation
- `CTO-REVIEW-PHASE4.md` - 코드 리뷰, 아키텍처 피드백, TODO
- `CTO-STATUS-2026-03-23.md` - 작업 현황, Phase 5 진입 조건

---

## [0.3.1] - 2026-03-23

### Added — Phase 1~3 마무리 (CPO 지시)
- **루트 index.ts** 생성
  - Button, Typography, Input, Card, Toast 통합 export
  - `@sonmily/design-system` 패키지로 단일 진입점 확보
- **package.json** 업데이트
  - `version: 0.3.0` (Phase 3 완료 기준)
  - `main: "index.ts"` — 컴포넌트 진입점 정정
- **웨딩 서비스 영향 없음** — 독립 패키지로 분리, 연동 없음 확인

---

## [0.3.0] - 2026-03-22

### Added - Phase 3 완료 ✅
- **Typography Component** (CPO 승인)
  - 8가지 변형 (Display ~ Button)
  - 6가지 색상 (Primary ~ Warning)
  - 3가지 폰트 무게 (Regular/Semibold/Bold)
  - Noto Sans KR 지원
  - WCAG AA 접근성 준수
  
- **Input Component** (CPO 승인)
  - 레이블 항상 표시 (필수)
  - 최소 높이 56px
  - Helper 텍스트 지원
  - 에러 상태 (텍스트 + 아이콘)
  - 필수 항목 표시 (`*`)
  
- **Card Component** (CPO 승인)
  - Header / Content / Footer 슬롯
  - 터치 가능 Card (전체 영역 터치)
  - 3가지 Elevation (low/medium/high)
  - 16px 패딩, 12px border radius
  
- **Toast Component** (CPO 승인)
  - 4가지 타입 (success/error/warning/info)
  - 아이콘 + 텍스트 병행
  - 최소 3초 표시 (시니어 UX)
  - 화면 하단 고정 (bottom safe area)
  - 액션 버튼 지원

### Summary
**Phase 3 완료: Critical 컴포넌트 5개 (Button, Typography, Input, Card, Toast)**

---

## [0.2.0] - 2026-03-22

### Added - Phase 2 완료
- **Design Tokens**
  - `tokens/brand.json` - 12색 팔레트, 타이포그래피, 간격, 아이콘 토큰
  - Figma Tokens 스키마 준수
  
- **Build Pipeline**
  - Style Dictionary 설정
  - `npm run build:tokens` - 토큰 → TypeScript 자동 변환
  - `npm run watch:tokens` - 자동 감시 모드
  - React Native Paper 테마 자동 생성
  
- **Button Component** (CPO 승인 ✅)
  - 3가지 변형: Filled, Outlined, Text
  - 2가지 크기: Medium (48px), Large (56px)
  - 전체 너비 옵션
  - 비활성 상태 (opacity 40%)
  - Material Design 아이콘 지원
  - WCAG AA 접근성 준수
  - 단위 테스트 + Storybook 스토리
  
- **Documentation**
  - `docs/token-usage.md` - 개발자 통합 가이드
  - `components/Button/README.md` - Button 사용 가이드
  - 프로젝트 README 업데이트
  
- **Infrastructure**
  - `package.json` - 의존성 및 스크립트
  - `.gitignore`
  - TypeScript 타입 선언 자동 생성

### Changed
- Button API: `seniorMode` → `size="medium|large"` (더 명확한 네이밍)

---

## [0.1.0] - 2026-03-22

### Added - Phase 1 리서치
- 프로젝트 구조 생성
- 리서치 문서
  - Benchmarking Report (5개 디자인 시스템)
  - AI Tools Evaluation (Figma Tokens, Claude API)
  - Tech Stack Proposal (React Native Paper 채택)
- 컴포넌트 우선순위 리스트 (25개, 5단계)
- 브랜드 가이드라인 (CPO 작성)
  - 12색 시니어 친화 팔레트
  - Noto Sans KR 타이포그래피
  - 접근성 체크리스트

### Decisions
- UI 라이브러리: React Native Paper v5
- 토큰 도구: Figma Tokens + Style Dictionary
- 우선 프로젝트: BOKHAUS
- 터치 영역: 최소 48px, 권장 56px
- 폰트 크기: 최소 16px (본문)

---

*Format: [Semantic Versioning](https://semver.org/)*
