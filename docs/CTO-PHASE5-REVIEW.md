# CTO Phase 5 명세서 리뷰 (2026-03-23)

## ✅ 승인 사항

**전체 평가**: 명세서 훌륭합니다! 바로 작업 진행 가능합니다 👍

### 1. 역할 분담 명확
- CPO: 문서 5종 (통합 가이드, 접근성, UX 라이팅)
- CTO: Storybook 구축, 패키지 연동 테스트
- ✅ 역할 중복 없음

### 2. 실용적인 우선순위
BOKHAUS 시니어 앱 핵심 컴포넌트 우선순위:
1. Button (size="large")
2. Typography (variant="bodyLarge")
3. Input
4. Toast
5. Modal

→ ✅ 시니어 UX 최우선 고려

### 3. 접근성 체크리스트 완성도
- 컴포넌트별 WCAG AA 기준 명확
- 실무 적용 가능한 체크리스트 형식
- ✅ 바로 사용 가능

### 4. 한국어 UX 라이팅 원칙
- ❌/✅ 비교 표 직관적
- 시니어 언어 원칙 (존댓말, 긍정적 표현)
- ✅ 개발자가 바로 참고 가능

### 5. Quick Start 코드 예시
- 실제 시나리오 기반 (건강 정보 입력)
- 핵심 패턴 포함 (Provider, 기본 import, Toast)
- ✅ 처음 쓰는 개발자도 10분 내 적용 가능

---

## 🔧 CTO 작업 항목 (명세 기반)

### 1. Storybook 환경 구축 (우선순위 1)
**목표**: React Native Web 기반 Storybook 배포

**작업**:
- [ ] `@storybook/react-native` 또는 `@storybook/react` (RN Web) 설치
- [ ] `.storybook/main.js` 설정
- [ ] Phase 1~4 컴포넌트 10종 스토리 작성
- [ ] GitHub Pages 또는 Chromatic 배포
- [ ] 배포 URL → `README.md`에 추가

**예상 소요**: 4~6시간

**배포 전략**:
- Option 1: **GitHub Pages** (무료, 정적 배포)
  - `npm run build-storybook`
  - GitHub Actions 자동 배포
- Option 2: **Chromatic** (무료 티어, UI 리뷰 기능)
  - Visual regression testing
  - 팀 리뷰 편리

**권장**: GitHub Pages (비용 절감, 배포 단순)

---

### 2. BOKHAUS RN 프로젝트 패키지 연동 테스트 (우선순위 2)

**목표**: `@sonmily/design-system` 실제 프로젝트 통합 검증

**작업**:
- [ ] BOKHAUS RN 프로젝트에 패키지 설치
  ```bash
  npm install @sonmily/design-system
  ```
- [ ] Peer dependencies 설치 검증
  ```bash
  npm install react-native-paper@^5.12.0 react-native-safe-area-context
  ```
- [ ] Provider 설정 (App.tsx)
- [ ] 최소 3개 컴포넌트 교체 테스트:
  - 기존 버튼 → `<Button size="large" />`
  - 기존 텍스트 → `<Typography variant="bodyLarge" />`
  - 기존 Input → `<Input label="..." />`
- [ ] 빌드 성공 확인 (iOS + Android)
- [ ] 스크린샷 캡처 (Before/After)

**예상 소요**: 2~3시간

**예상 이슈**:
1. Peer dependency 버전 충돌 → `--legacy-peer-deps`
2. Metro bundler 캐시 → `npx react-native start --reset-cache`
3. iOS pod 설치 → `cd ios && pod install`

---

### 3. 출퇴근앱 통합 준비 (우선순위 3)

**작업**:
- [ ] 출퇴근앱 프로젝트 구조 확인
- [ ] 패키지 설치 + Provider 설정
- [ ] 우선 적용 화면 선정 (예: 출근 체크인 화면)

**예상 소요**: 1~2시간

---

## 📋 CPO 문서 작성 체크리스트

CPO가 작성할 문서 5종:

1. `docs/storybook-stories-guide.md`
   - CTO가 Storybook 스토리 작성 시 참조할 가이드
   - 각 컴포넌트 스토리 구조, variants, controls

2. `docs/bokhaus-integration-guide.md`
   - BOKHAUS 프로젝트 설치 ~ 사용 전체 흐름
   - Provider 설정, 우선 적용 컴포넌트, 예시 코드

3. `docs/accessibility-checklist.md`
   - 명세서에 이미 작성된 내용 확장
   - 컴포넌트별 WCAG AA 검증 항목

4. `docs/onboarding-quickstart.md`
   - 명세서에 이미 작성된 Quick Start 확장
   - 설치 → import → 기본 패턴 → 다음 단계

5. `docs/ux-writing-guide.md`
   - 명세서에 이미 작성된 UX 라이팅 원칙 확장
   - 레이블, 에러 메시지, 시니어 언어 예시 추가

---

## 🎯 Phase 5 완료 기준 (재확인)

- [ ] CPO: 문서 5종 작성 완료 (이미 80% 완료 — 명세서에 포함)
- [ ] CTO: Storybook 배포 URL 확인 가능
- [ ] CTO: BOKHAUS 프로젝트에 최소 3개 컴포넌트 통합 성공
- [ ] 회장님 검토 후 Phase 5 최종 승인

**예상 완료 시점**: 2026-03-24 (1~2일 소요)

---

## 💬 추가 제안

### 1. npm publish 준비
Phase 5 완료 후 실제 npm 레지스트리에 배포 고려:
- `@sonmily/design-system` public 패키지
- 버전: v0.5.0 (Phase 5 완료 후)

**필요 작업**:
- npm 계정 생성 (CTO 또는 회사 계정)
- `package.json`에 repository, homepage, bugs URL 추가
- `.npmignore` 설정 (src 제외, dist만 포함)

### 2. 자동 배포 파이프라인
GitHub Actions로 자동화:
- PR merge → Storybook 자동 배포
- Tag push (`v0.5.0`) → npm publish

---

**Status**: ✅ **명세서 승인 완료**  
**Next Step**: CTO Storybook 구축 시작  
**Reviewed by**: CTO  
**Date**: 2026-03-23 18:15 KST
