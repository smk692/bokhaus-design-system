# Design System — 의사결정 로그

## 2026-03-23: Impeccable 스킬 도입

**결정**: Impeccable (AI 디자인 가이드 시스템) 채택 및 커스터마이징  
**승인**: CPO + CTO + 회장님  
**적용 프로젝트**: wedding-invitation (시범), BOKHAUS (예정)

### 배경
- Claude Code로 프론트엔드 코드 생성 시 일관성 부족
- 시니어 UX (65+) 타겟 프로젝트에 접근성 기준 필요
- 한국어 UX 라이팅 가이드라인 부재

### 결정 사항
1. **Impeccable 기본 스킬 20개 설치**
   - `/audit`, `/normalize`, `/polish`, `/harden` 등
   - 프로젝트별 `.claude/` 디렉토리에 설치
   
2. **커스터마이징 레퍼런스 추가**
   - `senior-ux.md`: WCAG AAA, 48px 터치 타겟, 인지 부하 감소
   - `korean-ux-writing.md`: 존댓말, 명확한 에러 메시지, 복구 단계 제공

3. **실행 계획**
   - **이번 주**: wedding-invitation 설치, Lighthouse 베이스라인 측정
   - **다음 주**: Frontend 팀 워크샵 (1시간)
   - **2주 후**: GitHub Actions 자동화
   - **1개월 후**: 접근성 점수 +15점 목표 검증

### 기술 스택
- **라이선스**: Apache 2.0 (상업적 사용 가능)
- **호환성**: Claude Code (완벽), Cursor (Nightly), Codex CLI
- **설치 방식**: 프로젝트별 `.claude/` 또는 글로벌 `~/.claude/`

### 측정 지표
- Lighthouse 접근성 점수 (Before/After)
- 디자인 이슈 감소율 (GitHub Issues/Jira)
- Frontend 팀 만족도 (1개월 후 설문)

### 참고
- **설치 보고서**: `~/.openclaw/workspace/wedding-invitation/.claude/INSTALLATION-REPORT.md`
- **Git 커밋**: `972b8cf` (wedding-invitation)
- **레포지토리**: https://github.com/pbakaus/impeccable

---

## 2026-03-23: BOKHAUS 프론트엔드 킥오프 일정 확정

**결정**: 2026-03-31 (월) 오전 10시 킥오프  
**승인**: CPO + CTO (회장님 확인 대기)  
**근거**: 옵션 2 선택 — Impeccable 도구 학습 + 팀 워크샵 완료 후 시작

### 준비 사항

**CPO (3/28까지)**
- [ ] BOKHAUS PRD 정리 + Figma 화면 목록 공유
- [ ] 핵심 플로우 5개 우선순위 정리 (시니어 앱 / 보호자 앱 / 어드민)
- [ ] Figma 컴포넌트 라이브러리 Phase 3 최종 점검

**CTO (3/28까지)**
- [ ] 기술 스택 확정안 (React Native vs Native, Next.js Admin)
- [ ] 시니어 UX 기술 요구사항 정리 (WCAG AAA 라이브러리, 테스트 도구)
- [ ] 개발 환경 템플릿 (Impeccable 포함 보일러플레이트)
- [ ] Frontend 팀 워크샵 자료 (Impeccable 실습, 시니어 UX 체크리스트)

### 킥오프 미팅 아젠다

**일시**: 2026-03-31 (월) 10:00-12:00  
**참석**: CPO, CTO, Frontend Lead, Backend Lead

**1부 (60분)**: 요구사항 정렬  
**2부 (60분)**: 실행 계획 (Sprint 1 범위, 역할 분담)

---

## 2026-03-24: Phase 5~6 확정 + TypeScript 에러 해결

**결정**: Phase 5~6 로드맵 확정, v1.0.0 목표일 2026-04-14  
**승인**: CPO + CTO + 회장님  
**근거**: CTO 기술 검토 완료, 일정 현실적 조정 (4/7 소프트 → 4/14 공식)

### Phase 5 (3/24~3/31) — 네비게이션 + 고급 컴포넌트
- **3/24 오전**: TypeScript 타입 에러 8개 수정 완료 ✅
- **3/24~3/28 (5-A)**: AppBar / BottomNavigation / DatePicker
- **3/29~3/31 (5-B)**: Chip/Tag / ProgressBar·Spinner

### Phase 6 (4/01~4/14) — 문서화 + 통합
- **4/01~4/03**: Storybook 배포 (GitHub Pages 자동화)
- **4/04~4/07**: BOKHAUS 5개 핵심 화면 통합 + Lighthouse 90점 검증
- **4/07**: 소프트 릴리스
- **4/08~4/14**: 버퍼 (미발견 이슈 수정)
- **4/14**: 공식 v1.0.0 릴리스 → PoC 준비 완료

### CPO·CTO 합의 사항
- **Storybook**: GitHub Pages 확정 (무료, PR merge 자동 배포)
- **BOKHAUS 통합 5개 화면**: 로그인 / 홈 / AI대화 / 설정 / 알림
- **오류 화면**: v1.1로 이관
- **소프트 목표 4/7 / 하드 데드라인 4/14**

### TypeScript 에러 해결 완료
- **Button.tsx (3개)**: 조건부 스타일 spread 연산자 패턴 적용 ✅
- **Card.tsx (1개)**: elevation 문자열 → 숫자 매핑 함수 ✅
- **Input.tsx (2개)**: fontWeight const assertion, ref 제외 ✅
- **List.tsx (1개)**: style type assertion ✅
- **빌드 성공**: `npm run build` 에러 없음 ✅

**참고 문서**:
- `CPO-PHASE6-PLAN.md` — Phase 5~6 상세 기획
- `specs/Phase5-Components.md` — 컴포넌트 Props 명세서
- `CTO-TYPESCRIPT-FIX-2026-03-24.md` — 타입 에러 수정 내역

---

---

## 2026-03-24: Phase 5 구현 완료

**결정**: Phase 5 컴포넌트 5종 (6개) 구현 완료  
**담당**: CTO  
**완성도**: 96% (DatePicker 캘린더 로직은 Phase 6에서 완성)

### 구현 완료 컴포넌트
1. **AppBar** (헤더) — 3가지 variant, 뱃지 지원 ✅
2. **BottomNavigation** (탭바) — safe area 처리, 72px 높이 ✅
3. **Chip** (태그) — filter/input/suggestion, 다중 선택 ✅
4. **ProgressBar / Spinner / Skeleton** — 로딩 UI 완성 ✅
5. **DatePicker / DateRangePicker** — 기본 구조 (캘린더 UI는 Phase 6) ⚠️

### TypeScript 에러 수정 (7개)
- 토큰 이름 수정 (typographyFontSizeH2 → typographyFontSizeHeading2 등)
- Badge variant 수정 (error → count)
- Skeleton width 타입 캐스팅

### 빌드 결과
- `npm run build` ✅ 성공
- `npx tsc --noEmit` ✅ 에러 없음
- Storybook 스토리 38개 작성 완료

### DatePicker TODO (Phase 6)
- [ ] 실제 캘린더 그리드 UI 구현
- [ ] `@react-native-community/datetimepicker` 통합
- [ ] 공휴일 표시 기능
- [ ] 시니어 UX 최적화 (큰 숫자, 터치 영역)

**참고 문서**: `CTO-PHASE5-COMPLETE-2026-03-24.md`

---

---

## 2026-03-24: Phase 6 초반 완료 (DatePicker + Storybook)

**결정**: DatePicker 캘린더 완성 + Storybook 자동 배포 설정  
**담당**: CTO  
**완성도**: Phase 6 40% (2개 작업 완료 / 5개 총)

### DatePicker 캘린더 완성 (100%)
- **Calendar 컴포넌트** 신규 구현
  - 월별 캘린더 그리드 UI
  - 시니어 UX: 56×56px 터치 영역, 20px 큰 숫자
  - 오늘/선택 날짜 명확한 표시
  - 최소/최대 날짜 제한
  - 한국어/영어 로케일 지원
- **DatePicker 업그레이드**
  - `@react-native-community/datetimepicker` 통합
  - Platform별 최적화 (iOS 네이티브 / Android 커스텀 캘린더)
  - datetime variant 지원
- **완성도**: 70% → 100% ✅

### Storybook GitHub Pages 배포
- **GitHub Actions 워크플로우**
  - `.github/workflows/storybook-deploy.yml` 작성
  - `main` 브랜치 push → 자동 배포
  - Node.js 20 + npm ci + Design Tokens 빌드
- **package.json 스크립트 추가**
  - `npm run storybook`: 로컬 개발 서버
  - `npm run build-storybook`: 프로덕션 빌드
- **예상 URL**: `https://sonmingi.github.io/design-system`

### 빌드 결과
- `npx tsc --noEmit` ✅ 에러 없음
- `npm run build` ✅ 성공

### 남은 작업 (CPO 협업 필요)
- [ ] BOKHAUS 5개 핵심 화면 선정
- [ ] BOKHAUS 레포지토리 준비
- [ ] 디자인 시스템 적용 (5개 화면)
- [ ] Lighthouse 접근성 90점 검증
- [ ] 개발자 문서 완성

**참고 문서**: `CTO-PHASE6-COMPLETE-2026-03-24.md`

---

**다음 단계**
- [x] TypeScript 에러 해결 (완료)
- [x] Phase 5 컴포넌트 구현 (완료)
- [x] DatePicker 캘린더 완성 (완료)
- [x] Storybook 배포 설정 (완료)
- [ ] BOKHAUS 5개 화면 통합 (대기 중)
- [ ] Lighthouse 90점 검증
- [ ] 회장님 킥오프 일정 승인 확인
- [ ] zero-gravity-attendance (Expo) 적용 가능성 검토
- [ ] 1개월 후 Impeccable 효과 리뷰 회의 일정 잡기
