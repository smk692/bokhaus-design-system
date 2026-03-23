# Changelog

손밀리 디자인 시스템 변경 이력

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

## [0.4.0] - 2026-03-23

### Added — Phase 4 완료 ✅ (CPO 단독 진행)

- **Modal/Dialog**
  - 3가지 variant: alert / confirm / custom
  - 한국어 기본 레이블 ("확인", "취소")
  - dismissable 기본 `false` (시니어 실수 방지)
  - 본문 스크롤 지원, 16px border-radius
  - Large 버튼 (56px) 강제

- **List / ListItem**
  - 최소 행 높이 72px (시니어 터치 영역)
  - bodyLarge(18px) 텍스트
  - 좌측 아이콘 / 커스텀 요소, 우측 chevron / 커스텀 요소
  - 섹션 헤더, 빈 목록 안내 텍스트
  - FlatList 기반 (대규모 목록 성능)

- **Avatar**
  - Fallback 순서: 이미지 → 이니셜 → 아이콘
  - 한국어 이니셜 지원 (첫 글자 추출)
  - 4가지 크기: small(32) / medium(48) / large(64) / xlarge(80)
  - 온라인 상태 뱃지 (showStatus)

- **Badge**
  - 3가지 variant: count / dot / label
  - 5가지 색상: error / primary / success / warning / neutral
  - maxCount 초과 시 "99+" 자동 처리
  - children 오버레이 지원 (아이콘 위 배치)

- **Form (Checkbox / RadioGroup / Switch)**
  - Checkbox: 레이블 필수, 에러 상태, disabled
  - RadioGroup: 세로/가로 배치, 그룹 레이블, disabled 옵션
  - Switch: 레이블 + 설명 텍스트, 56px 터치 영역
  - 공통: accessibilityRole/accessibilityState 적용

### Accessibility
- 모든 Phase 4 컴포넌트 WCAG 2.1 AA 준수 확인
- 터치 영역: Checkbox/Radio ≥48px, Switch/ListItem ≥56-72px

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

## Roadmap

### Phase 4 (다음)
- [ ] Modal/Dialog
- [ ] List/ListItem
- [ ] Avatar
- [ ] Badge
- [ ] Checkbox/Radio/Switch

### Phase 4
- [ ] Modal/Dialog
- [ ] List/ListItem
- [ ] Avatar
- [ ] Badge
- [ ] Checkbox/Radio/Switch

### Phase 5
- [ ] 문서화 완성
- [ ] Storybook 배포
- [ ] BOKHAUS 통합
- [ ] 출퇴근앱 통합

---

*Format: [Semantic Versioning](https://semver.org/)*
