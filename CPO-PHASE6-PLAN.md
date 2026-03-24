# 디자인 시스템 Phase 5~6 기획안

> **작성자**: CPO  
> **작성일**: 2026-03-23  
> **검토 요청**: CTO  
> **상태**: ✅ CTO 검토 완료 — 일정 확정

---

## 현재 달성 현황 (Phase 1~4 완료 ✅)

| Phase | 완료 컴포넌트 | 상태 |
|-------|-------------|------|
| Phase 1 (리서치) | 벤치마킹, 기술스택, 브랜드 가이드라인 | ✅ |
| Phase 2 (토큰) | Design Tokens, Style Dictionary 빌드 파이프라인 | ✅ |
| Phase 3 (Critical) | Button / Typography / Input / Card / Toast | ✅ |
| Phase 4 (High) | Modal / List / Avatar / Badge / Form(Checkbox·Radio·Switch) | ✅ |

**전체 진행률: 80% — 이제 마무리 단계 진입**

---

## Phase 5: 네비게이션 + 고급 컴포넌트 (1~2주)

> **목표**: 앱의 핵심 뼈대가 되는 네비게이션 컴포넌트 완성 + 누락 Medium 컴포넌트 보강

### 5-1. 네비게이션 컴포넌트 (필수 — BOKHAUS·출퇴근앱 공통)

#### AppBar (Header)
- **용도**: 모든 화면의 상단 헤더
- **Variants**: Default (타이틀+뒤로가기) / Search / Actions
- **접근성**: 뒤로가기 버튼 44px+ 터치 영역, 스크린리더 레이블
- **Props 명세**:
  ```
  title: string (필수)
  subtitle?: string
  showBack?: boolean
  onBack?: () => void
  actions?: { icon: string; onPress: () => void; label: string }[]
  ```

#### BottomNavigation (탭바)
- **용도**: 앱 메인 탭 이동
- **Variants**: 3~5탭, 뱃지 표시
- **접근성**: 탭 레이블 항상 표시 (아이콘만 사용 금지), 포커스 관리
- **Props 명세**:
  ```
  routes: { key, title, icon, badge? }[]
  activeIndex: number
  onIndexChange: (index) => void
  ```

### 5-2. 고급 컴포넌트 (BOKHAUS 필요 기능)

#### DatePicker / TimePicker
- **용도**: 출퇴근앱 출퇴근 기록, BOKHAUS 일정 등록
- **Variants**: Date / Time / DateTime / Range
- **접근성**: 한국 날짜 형식(YYYY년 MM월 DD일), 공휴일 표시
- **시니어 UX**: 큰 숫자 폰트, 슬라이드 대신 탭 선택 우선

#### Chip / Tag
- **용도**: BOKHAUS AI 기능 태그, 필터 선택
- **Variants**: Filter Chip / Input Chip / Suggestion Chip
- **접근성**: 선택 상태 명확히 표현 (색상 + 텍스트 변화)

#### ProgressBar / Spinner
- **용도**: 로딩 상태, 단계 진행률
- **Variants**: Linear (진행률) / Circular (로딩) / Skeleton (콘텐츠 로딩)
- **시니어 UX**: 로딩 텍스트 병행 표시 ("불러오는 중...")

### 5-3. Phase 5 납기
- **기간**: 1주 (2026-03-24 ~ 2026-03-31)
- **담당**: CTO 구현 + CPO 명세/검토
- **완료 기준**: 컴포넌트 빌드 성공 + 접근성 검증

---

## Phase 6: 문서화 + 프로젝트 통합 (1~2주)

> **목표**: 디자인 시스템을 실제 프로젝트에 연결 — 개발팀이 쓸 수 있는 상태로 완성

### 6-1. Storybook 배포 (CPO 주도)

**목적**: 모든 컴포넌트의 인터랙티브 카탈로그 → 개발자·디자이너 공용 레퍼런스

**작업 목록**:
- [ ] Phase 3~5 전 컴포넌트 스토리 작성 (컴포넌트당 3~5개 스토리)
- [ ] Controls 패널: Props 실시간 조작 가능
- [ ] a11y 플러그인: 접근성 자동 검증
- [ ] 한국어 문서 (jsDoc + MDX)
- [ ] Chromatic 연동 (시각적 회귀 테스트)
- [ ] GitHub Pages 자동 배포 (PR merge 시 업데이트)

**예상 URL**: `https://sonmingi.github.io/design-system`

### 6-2. BOKHAUS 통합 (CTO 주도, CPO 검수)

**목적**: 실제 앱에 디자인 시스템 적용 → 일관성 검증

**작업 목록**:
- [ ] `@sonmily/design-system` 패키지 연동
- [ ] 기존 컴포넌트 → 디자인 시스템 컴포넌트로 교체
- [ ] 시니어 앱 5개 핵심 화면 적용:
  - 로그인 화면 (Input + Button + Typography)
  - 홈 화면 (AppBar + Card + BottomNavigation)
  - AI 대화 (List + Avatar + Chip)
  - 설정 화면 (List + Switch + Badge)
  - 알림 화면 (Toast + Badge)
- [ ] Lighthouse 접근성 점수 측정 (목표: 90점 이상)
- [ ] 시니어 사용자 5명 테스트 (PoC 준비)

### 6-3. 출퇴근앱 통합 (CTO 주도, CPO 검수)

**작업 목록**:
- [ ] DatePicker/TimePicker 연동 (출퇴근 기록 핵심)
- [ ] 어드민 대시보드 컴포넌트 적용
- [ ] 알림 설정 화면 (Switch 컴포넌트 활용)

### 6-4. 개발자 문서 완성 (CPO 주도)

- [ ] **시작 가이드**: `npm install @sonmily/design-system` → 5분 안에 시작
- [ ] **컴포넌트 API**: 전체 Props 명세 + 코드 예시
- [ ] **접근성 가이드**: WCAG 2.1 AA 체크리스트 (프로젝트별)
- [ ] **기여 가이드**: 새 컴포넌트 추가 방법, 리뷰 기준
- [ ] **마이그레이션 가이드**: 기존 컴포넌트 → 디자인 시스템 전환

### 6-5. Phase 6 납기
- **기간**: 1주 (2026-04-01 ~ 2026-04-07)
- **완료 기준**: Storybook 배포 완료 + BOKHAUS 5개 화면 통합 완료 + Lighthouse 90+

---

## 전체 로드맵 (CTO 검토 반영 — 2026-03-23 확정)

```
[완료] Phase 1~4: 15개 컴포넌트 구현
   ↓
[3/24 오전] TypeScript 타입 에러 8개 수정 (CTO, Phase 5 선행 필수)
   ↓
[3/24~3/28] Phase 5-A: AppBar + BottomNavigation + DatePicker (핵심 3개)
   ↓
[3/29~3/31] Phase 5-B: Chip/Tag + ProgressBar/Spinner (나머지)
   ↓
[4/01~4/03] Phase 6-A: Storybook 배포 + GitHub Pages 자동화
   ↓
[4/04~4/07] Phase 6-B: BOKHAUS 5개 화면 통합 + Lighthouse 90점 검증
   ↓
[4/07] 소프트 릴리스 (내부 검토)
   ↓
[4/08~4/14] 버퍼 기간 (미발견 이슈 수정)
   ↓
[4/14] 공식 v1.0.0 릴리스 — PoC 준비 완료 🎉
   ↓
[이후] BOKHAUS PoC 테스트 (하남시 시설, 시니어 100명)
```

### CTO 의견 반영 내용
| 항목 | CPO 원안 | CTO 의견 | 확정 |
|------|---------|---------|------|
| Phase 5 일정 | 1주 | 빠듯하나 가능 (우선순위 조정) | 5-A/5-B 분리 진행 |
| TypeScript 에러 | 미언급 | Phase 5 시작 전 선행 필수 | 3/24 오전 완료 목표 |
| Storybook 배포 | GitHub Pages 또는 별도 | GitHub Pages 강력 추천 | GitHub Pages 확정 |
| v1.0.0 목표일 | 4/7 | 소프트 목표, 하드 데드라인 4/14 | 소프트 4/7 / 하드 4/14 |
| BOKHAUS 통합 화면 | 5개 | 5개 동의 + 오류 화면 제안 | v1.1에 오류 화면 추가 |

---

## CTO 검토 완료 ✅ (2026-03-23)

모든 검토 항목 의견 수렴 완료. 상세 내용: `CTO-REVIEW-PHASE4.md` 참고

---

## CPO 결정 사항

- **시니어 앱 우선**: Phase 6 통합은 BOKHAUS → 출퇴근앱 순서 진행
- **접근성 기준 유지**: WCAG 2.1 AA (모든 Phase 5~6 컴포넌트 동일 기준)
- **Storybook 언어**: 한국어 문서 우선 (한국어 사용자 대상 프로젝트)
- **측정 지표**: Lighthouse 접근성 점수 90점 이상 (PoC 전 달성 필수)

---

*CPO 작성 | CTO 검토 후 공동 확정*
