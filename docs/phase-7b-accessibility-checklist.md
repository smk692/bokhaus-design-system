# Phase 7-B 접근성 체크리스트

> **작성자**: CTO  
> **작성일**: 2026-03-25  
> **목적**: 21개 컴포넌트 (15개 디렉토리) WCAG 2.1 AA/AAA 시니어 핵심 항목 전수 검사

---

## 검사 기준

### WCAG 2.1 AA (필수)
- ✅ 색상 대비 4.5:1 (일반 텍스트), 3:1 (대형 텍스트)
- ✅ 터치 영역 최소 44×44px (모바일)
- ✅ 포커스 표시 명확 (키보드 탐색)
- ✅ 의미 있는 접근성 레이블 (`accessibilityLabel`)
- ✅ 적절한 접근성 역할 (`accessibilityRole`)

### WCAG 2.1 AAA (시니어 핵심)
- ⭐ 색상 대비 7:1 (일반 텍스트), 4.5:1 (대형 텍스트)
- ⭐ 터치 영역 56×56px 권장
- ⭐ 포커스 표시 4px 이상 + 고대비
- ⭐ 텍스트 크기 200% 확대 시 레이아웃 유지
- ⭐ 에러 메시지 → 구체적 복구 단계 제공

---

## 컴포넌트별 체크리스트

### 1. Button
**우선순위**: P0 (Critical)

#### AA 필수 항목
- [ ] 터치 영역 44×44px 이상 (`minHeight: 56`, `minWidth: 120` 적용 확인)
- [ ] 포커스 표시 2px outline (기본 Paper 동작 확인)
- [ ] `accessibilityRole="button"` 명시
- [ ] `accessibilityLabel` 아이콘 버튼에 필수
- [ ] disabled 상태 명확 (색상 대비 3:1 이상)

#### AAA 시니어 항목
- [ ] 터치 영역 56×56px (현재 기본값 확인)
- [ ] 포커스 표시 4px outline (theme 설정 확인)
- [ ] 버튼 텍스트 200% 확대 시 레이아웃 깨짐 없음
- [ ] loading 상태 스크린리더 안내 (`accessibilityHint`)

#### Lighthouse 검증 항목
- [ ] 색상 대비: primary(7:1), secondary(4.5:1), outlined(4.5:1)
- [ ] tap-targets: 겹치는 버튼 간 8px 이상 간격

---

### 2. Typography
**우선순위**: P0 (Critical)

#### AA 필수 항목
- [ ] 색상 대비 4.5:1 (일반 텍스트), 3:1 (대형 텍스트 24px+)
- [ ] `accessibilityRole="text"` 기본 설정
- [ ] heading variant → `accessibilityRole="header"`

#### AAA 시니어 항목
- [ ] 색상 대비 7:1 (일반 텍스트), 4.5:1 (대형 텍스트)
- [ ] 200% 확대 시 줄바꿈 정상 동작
- [ ] 최소 폰트 크기 16px (body 기준, tokens 확인)

#### Lighthouse 검증 항목
- [ ] 12색 팔레트 전체 조합 대비 매트릭스 (CPO 작성)
- [ ] `colorTextPrimary`, `colorTextSecondary` 대비 검증

---

### 3. Input
**우선순위**: P0 (Critical)

#### AA 필수 항목
- [ ] 레이블 명확 (`accessibilityLabel` 또는 Paper `label` prop)
- [ ] 에러 메시지 `accessibilityHint` 제공
- [ ] 포커스 표시 2px outline
- [ ] placeholder 색상 대비 4.5:1

#### AAA 시니어 항목
- [ ] 터치 영역 56px 높이 (현재 기본값 확인)
- [ ] 에러 메시지 → 구체적 복구 단계 (예: "비밀번호 8자 이상 입력하세요")
- [ ] 포커스 표시 4px outline
- [ ] 자동완성 지원 (`autoComplete` prop 검증)

#### Lighthouse 검증 항목
- [ ] form-field-multiple-labels (중복 레이블 없음)
- [ ] label-content-name-mismatch (레이블-입력값 일치)

---

### 4. Card
**우선순위**: P0 (Critical)

#### AA 필수 항목
- [ ] `accessibilityRole="summary"` (카드 전체)
- [ ] 터치 가능한 카드 → `accessibilityRole="button"` + `accessibilityLabel`
- [ ] 카드 내 콘텐츠 계층 구조 명확 (heading + body)

#### AAA 시니어 항목
- [ ] 터치 영역 56px 이상 (높이)
- [ ] 카드 간 간격 16px 이상 (인지 부하 감소)
- [ ] 카드 배경-텍스트 대비 7:1

#### Lighthouse 검증 항목
- [ ] heading-order (카드 내 heading 순서 검증)
- [ ] color-contrast (배경-텍스트 대비)

---

### 5. Toast
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="alert"` (자동 포커스)
- [ ] `accessibilityLiveRegion="polite"` (비긴급) / `"assertive"` (긴급)
- [ ] 닫기 버튼 44×44px + `accessibilityLabel="알림 닫기"`
- [ ] 자동 닫힘 시간 최소 5초 (시니어 읽기 시간 고려)

#### AAA 시니어 항목
- [ ] 닫기 버튼 56×56px
- [ ] 배경-텍스트 대비 7:1 (success/error/info 전체)
- [ ] 아이콘 + 텍스트 병행 표시

#### Lighthouse 검증 항목
- [ ] aria-live-region (Toast 표시 시 스크린리더 안내)

---

### 6. Modal
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="dialog"` + `aria-modal="true"`
- [ ] 포커스 트랩 (모달 내부 순환, 외부 포커스 차단)
- [ ] ESC 키 닫기 지원
- [ ] 배경 클릭 닫기 옵션
- [ ] 닫기 버튼 44×44px + 명확한 레이블

#### AAA 시니어 항목
- [ ] 닫기 버튼 56×56px
- [ ] 모달 제목 `accessibilityRole="header"` + `accessibilityLevel={1}`
- [ ] 모달 높이 화면의 80% 이하 (스크롤 최소화)

#### Lighthouse 검증 항목
- [ ] focus-trapping (포커스 트랩 검증)
- [ ] aria-hidden-focus (배경 콘텐츠 포커스 차단)

---

### 7. List
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="list"` (목록 전체)
- [ ] 각 항목 `accessibilityRole="listitem"`
- [ ] 터치 영역 44px 높이
- [ ] 구분선 색상 대비 3:1 (배경-구분선)

#### AAA 시니어 항목
- [ ] 터치 영역 56px 높이
- [ ] 항목 간 간격 4px 이상 (시각적 구분)
- [ ] 스크롤 시 그림자/구분선으로 경계 명확화

#### Lighthouse 검증 항목
- [ ] listitem (role="listitem" 검증)

---

### 8. Avatar
**우선순위**: P2 (Medium)

#### AA 필수 항목
- [ ] 이미지 Avatar → `accessibilityLabel="사용자 프로필 사진"`
- [ ] 이니셜 Avatar → `accessibilityRole="text"` + `accessibilityLabel="사용자 이니셜 AB"`
- [ ] 아이콘 Avatar → `accessibilityLabel="사용자 아이콘"`

#### AAA 시니어 항목
- [ ] Avatar 최소 크기 48×48px (시니어 인지성)
- [ ] 배경-이니셜 대비 7:1

#### Lighthouse 검증 항목
- [ ] image-alt (이미지 Avatar alt 텍스트)

---

### 9. Badge
**우선순위**: P2 (Medium)

#### AA 필수 항목
- [ ] 숫자 Badge → `accessibilityLabel="알림 3개"`
- [ ] 점(dot) Badge → `accessibilityLabel="새 알림"`
- [ ] Badge 최소 크기 20×20px

#### AAA 시니어 항목
- [ ] 숫자 Badge 최소 크기 24×24px
- [ ] 배경-숫자 대비 7:1

#### Lighthouse 검증 항목
- [ ] color-contrast (배경-숫자 대비)

---

### 10. Form
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] 각 입력 필드 레이블 명확 (`accessibilityLabel`)
- [ ] 필수 항목 표시 (`*` + `accessibilityHint="필수 항목"`)
- [ ] 에러 메시지 `accessibilityRole="alert"`
- [ ] 제출 버튼 44×44px + 명확한 레이블

#### AAA 시니어 항목
- [ ] 에러 메시지 → 구체적 복구 단계 제공
- [ ] 제출 버튼 56×56px
- [ ] 폼 필드 간 간격 16px 이상 (인지 부하 감소)

#### Lighthouse 검증 항목
- [ ] form-field-multiple-labels
- [ ] label-content-name-mismatch

---

### 11. AppBar
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="header"`
- [ ] 뒤로 가기 버튼 44×44px + `accessibilityLabel="뒤로 가기"`
- [ ] 검색 버튼 44×44px + `accessibilityLabel="검색"`
- [ ] 배경-텍스트 대비 4.5:1

#### AAA 시니어 항목
- [ ] 버튼 56×56px
- [ ] AppBar 높이 64px 이상 (시니어 터치 용이성)
- [ ] 배경-텍스트 대비 7:1

#### Lighthouse 검증 항목
- [ ] heading-order (AppBar 제목 h1 검증)
- [ ] tap-targets (버튼 간 간격 8px)

---

### 12. BottomNavigation
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="tablist"` (전체)
- [ ] 각 탭 `accessibilityRole="tab"` + 선택 상태 `accessibilityState={{selected: true}}`
- [ ] 터치 영역 44px 높이
- [ ] 아이콘 + 레이블 병행 표시

#### AAA 시니어 항목
- [ ] 터치 영역 56px 높이
- [ ] 탭 간 간격 8px 이상
- [ ] 선택된 탭 배경-아이콘 대비 7:1

#### Lighthouse 검증 항목
- [ ] aria-required-children (tablist 내 tab 검증)
- [ ] tap-targets

---

### 13. Chip
**우선순위**: P2 (Medium)

#### AA 필수 항목
- [ ] `accessibilityRole="button"` (터치 가능 Chip)
- [ ] 삭제 아이콘 44×44px + `accessibilityLabel="삭제"`
- [ ] Chip 최소 높이 32px

#### AAA 시니어 항목
- [ ] Chip 최소 높이 40px
- [ ] 삭제 아이콘 48×48px
- [ ] 배경-텍스트 대비 7:1

#### Lighthouse 검증 항목
- [ ] tap-targets (Chip 간 간격 8px)

---

### 14. Progress (ProgressBar / Spinner / Skeleton)
**우선순위**: P2 (Medium)

#### AA 필수 항목
- [ ] `accessibilityRole="progressbar"` + `accessibilityValue={{now, min, max}}`
- [ ] 로딩 중 `accessibilityLabel="로딩 중"` + `accessibilityHint="잠시만 기다려 주세요"`
- [ ] Spinner 최소 크기 32×32px

#### AAA 시니어 항목
- [ ] Spinner 최소 크기 48×48px
- [ ] ProgressBar 높이 8px 이상 (시인성)
- [ ] 배경-진행바 대비 4.5:1

#### Lighthouse 검증 항목
- [ ] aria-progressbar-name (progressbar 레이블)

---

### 15. DatePicker
**우선순위**: P1 (High)

#### AA 필수 항목
- [ ] `accessibilityRole="button"` (DatePicker 열기 버튼)
- [ ] 선택된 날짜 `accessibilityLabel="2026년 3월 25일 선택됨"`
- [ ] 캘린더 각 날짜 버튼 44×44px
- [ ] 이전/다음 달 버튼 44×44px + 명확한 레이블

#### AAA 시니어 항목
- [ ] 캘린더 날짜 버튼 56×56px
- [ ] 이전/다음 달 버튼 56×56px
- [ ] 선택된 날짜 배경-텍스트 대비 7:1

#### Lighthouse 검증 항목
- [ ] tap-targets (날짜 버튼 간 간격)
- [ ] button-name (이전/다음 달 버튼 레이블)

---

## 검증 방법

### 1. 자동 검증 (Lighthouse)
```bash
# Storybook 배포 URL 기반 측정
./lighthouse-audit.sh

# 결과: lighthouse-reports/ 디렉토리
# 목표: 접근성 90점 이상
```

### 2. 수동 검증 (스크린리더)
- **iOS VoiceOver**: 설정 > 손쉬운 사용 > VoiceOver
- **Android TalkBack**: 설정 > 접근성 > TalkBack
- **검증 항목**:
  - [ ] 모든 UI 요소 스크린리더 탐색 가능
  - [ ] `accessibilityLabel` 명확하고 간결
  - [ ] 포커스 순서 논리적 (상→하, 좌→우)

### 3. 키보드 탐색 (웹 전용)
- **Tab 키**: 포커스 이동
- **Enter/Space**: 버튼 활성화
- **Escape**: 모달/드로어 닫기
- **화살표 키**: 탭/리스트 항목 이동

### 4. 색상 대비 검증
- **도구**: Figma Contrast 플러그인 / axe DevTools
- **기준**: AA 4.5:1, AAA 7:1
- **대상**: 12색 팔레트 전체 조합 (CPO 매트릭스 작성)

---

## 검증 일정

| 작업 | 담당 | 마감 |
|------|------|------|
| Lighthouse 자동 검증 (18개 컴포넌트) | CTO | 2026-03-26 |
| 색상 대비 매트릭스 (12색) | CPO | 2026-03-26 |
| 수동 스크린리더 검증 (P0 컴포넌트 5개) | CTO | 2026-03-27 |
| 키보드 탐색 검증 (모달/폼) | CPO | 2026-03-27 |
| 최종 보고서 작성 | CPO + CTO | 2026-03-28 |

---

## 예상 산출물

1. **Lighthouse 보고서** (JSON + 요약)
   - 18개 컴포넌트 × 4개 카테고리 (Performance, Accessibility, Best Practices, SEO)
   - 평균 접근성 점수 90점 이상 목표

2. **색상 대비 매트릭스** (12×12 조합)
   - AA/AAA 준수 여부 표시
   - 부적합 조합 → 대안 제시

3. **수동 검증 보고서**
   - P0 컴포넌트 5개 스크린리더 테스트 결과
   - 발견된 이슈 + 수정 방안

4. **Phase 7-B 최종 보고서**
   - 검증 완료 항목 체크리스트
   - 미준수 항목 → Phase 8 이관 여부 결정

---

**작성자**: CTO  
**검토자**: CPO (대기)  
**승인자**: 회장님 (대기)
