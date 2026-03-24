# Phase 5 컴포넌트 명세서 (CPO)

> **작성자**: CPO  
> **작성일**: 2026-03-23  
> **대상**: CTO 구현 참고  
> **상태**: ✅ 확정 (회장님 승인)

---

## Phase 5-A (3/24~3/28)

### 1. AppBar

**목적**: 모든 화면 상단 헤더 — 타이틀, 뒤로가기, 액션 버튼

**Variants**
- `default`: 타이틀 + 뒤로가기 버튼
- `search`: 검색창 내장
- `actions`: 우측 아이콘 버튼 1~3개

**Props 명세**
```typescript
interface AppBarProps {
  title: string;                          // 필수 — 화면 제목
  subtitle?: string;                      // 선택 — 부제목
  showBack?: boolean;                     // 기본값: false
  onBack?: () => void;                    // showBack=true 시 필수
  variant?: 'default' | 'search' | 'actions';  // 기본값: 'default'
  onSearchChange?: (text: string) => void; // variant='search' 시 필요
  searchPlaceholder?: string;
  actions?: AppBarAction[];
  backgroundColor?: string;              // 기본값: color.primary.main
}

interface AppBarAction {
  icon: string;                           // Material Design 아이콘명
  onPress: () => void;
  label: string;                          // 접근성용 (스크린리더)
  badge?: number;                         // 알림 뱃지 숫자
}
```

**시니어 UX 요구사항**
- 뒤로가기 버튼 터치 영역: 최소 48×48px
- 타이틀 폰트: `titleLarge` (22px, Bold)
- 배경색 대비: WCAG AA (4.5:1 이상)
- 아이콘 크기: 최소 24px

**접근성**
- `accessibilityRole="header"` 설정
- 각 액션 버튼: `accessibilityLabel` 필수
- 검색창: `accessibilityHint="검색어를 입력하세요"`

---

### 2. BottomNavigation

**목적**: 앱 메인 탭 이동 — 최하단 고정 탭바

**Variants**
- 탭 개수: 3~5개 (3개 권장 — 시니어 UX)
- 레이블: 항상 표시 (아이콘만 사용 금지)

**Props 명세**
```typescript
interface BottomNavigationProps {
  routes: BottomNavRoute[];
  activeIndex: number;                    // 현재 활성 탭 인덱스
  onIndexChange: (index: number) => void;
  backgroundColor?: string;              // 기본값: color.neutral.white
  activeColor?: string;                  // 기본값: color.primary.main
  inactiveColor?: string;                // 기본값: color.neutral.medium
}

interface BottomNavRoute {
  key: string;                            // 고유 키
  title: string;                          // 탭 레이블 (최대 6자)
  icon: string;                           // 비활성 아이콘 (Material)
  activeIcon?: string;                    // 활성 아이콘 (없으면 색상으로 구분)
  badge?: number | 'dot';                 // 알림 표시
  accessibilityLabel?: string;            // 스크린리더 레이블
}
```

**시니어 UX 요구사항**
- 탭 높이: 최소 72px (터치 영역 확보)
- 레이블 폰트: `labelMedium` (14px) — 항상 표시
- 활성 탭: 색상 + 폰트 굵기 변화 (색상만 바꾸지 말 것)
- 아이콘 크기: 28px (기본 24px보다 크게)
- 탭 개수: 최대 4개 권장 (시니어 인지 부하 감소)

**접근성**
- `accessibilityRole="tab"`, `accessibilityState={{ selected }}`
- 포커스 이동: 탭 변경 시 화면 상단으로 포커스 이동
- safe area: `useSafeAreaInsets()` — iOS 홈 인디케이터 영역 처리

---

### 3. DatePicker / DateRangePicker / TimePicker

**목적**: 날짜·시간 선택 — 출퇴근앱 출퇴근 기록, BOKHAUS 일정 등록

> **구조 결정 (2026-03-23 CPO·CTO 합의)**: `DatePicker` + `DateRangePicker` 분리  
> - BOKHAUS: `DatePicker` (datetime variant — 일정 등록)  
> - 출퇴근앱: `DateRangePicker` (출퇴근 기간 선택)

**Variants**
- `date`: 날짜만 선택
- `time`: 시간만 선택
- `datetime`: 날짜 + 시간 선택

**Props 명세**
```typescript
// DatePicker (단일 날짜·시간)
interface DatePickerProps {
  variant?: 'date' | 'time' | 'datetime';  // 기본값: 'date'
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;                          // 필수 — 접근성
  placeholder?: string;                   // 기본값: "날짜를 선택하세요"
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  locale?: 'ko' | 'en';                  // 기본값: 'ko'
  showHolidays?: boolean;                // 공휴일 표시 (기본값: false)
}

// DateRangePicker (날짜 범위 — 출퇴근앱용)
interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { start: Date | null; end: Date | null }) => void;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  locale?: 'ko' | 'en';
}
```

**한국어 형식 (locale='ko')**
- 날짜: `2026년 03월 24일 (화)`
- 시간: `오후 2시 30분`
- 범위: `2026년 3월 24일 ~ 3월 31일`
- 요일: 한국어 약자 (일·월·화·수·목·금·토)

**시니어 UX 요구사항**
- 선택 UI: 드럼 롤(스크롤) 대신 **그리드 탭 선택** 우선
- 숫자 폰트: `titleLarge` (22px) — 날짜 숫자 크게
- 오늘 날짜: 명확한 시각적 강조 (색상 + 원형 배경)
- 선택된 날짜: 체크 아이콘 + 색상 변화
- 확인 버튼: `Large` 사이즈 (56px)

**접근성**
- 각 날짜 버튼: `accessibilityLabel="3월 24일 화요일"` (완전한 텍스트)
- 오늘: `accessibilityLabel="오늘, 3월 24일"`
- 선택됨: `accessibilityState={{ selected: true }}`

---

## Phase 5-B (3/29~3/31)

### 4. Chip / Tag

**목적**: 필터 선택, AI 기능 태그, 카테고리 표시

**Variants**
- `filter`: 선택/해제 토글 (다중 선택 가능)
- `input`: 입력값 표시 + 삭제 버튼 (이메일 수신자 등)
- `suggestion`: 추천 태그 (선택 시 사라짐)

**Props 명세**
```typescript
interface ChipProps {
  label: string;                          // 필수
  variant?: 'filter' | 'input' | 'suggestion';  // 기본값: 'filter'
  selected?: boolean;                     // filter variant 선택 상태
  onPress?: () => void;
  onDelete?: () => void;                 // input variant 삭제 버튼
  icon?: string;                          // 좌측 아이콘
  avatar?: string;                        // 좌측 아바타 이미지 URL
  disabled?: boolean;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}
```

**시니어 UX 요구사항**
- 칩 높이: 최소 40px (터치 영역 확보)
- 선택 상태: 배경색 + 체크 아이콘 병행 (색상만 의존 금지)
- 레이블 폰트: `labelLarge` (16px)

**접근성**
- `accessibilityRole="checkbox"` (filter variant)
- `accessibilityState={{ checked: selected }}`
- 삭제 버튼: `accessibilityLabel="${label} 삭제"`

---

### 5. ProgressBar / Spinner

**목적**: 로딩 상태, 단계 진행률, 콘텐츠 로딩 스켈레톤

**Variants**
- `linear`: 가로 진행 바 (0~100%)
- `circular`: 원형 스피너 (무한 로딩)
- `skeleton`: 콘텐츠 영역 자리 표시자

**Props 명세**
```typescript
// Linear Progress
interface LinearProgressProps {
  value?: number;                         // 0~100 (없으면 indeterminate)
  label?: string;                         // 진행률 텍스트 표시
  showValue?: boolean;                    // 퍼센트 숫자 표시
  color?: string;                         // 기본값: color.primary.main
  height?: number;                        // 기본값: 8px
}

// Circular Spinner
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';   // 24 / 40 / 56px
  color?: string;
  label?: string;                         // 로딩 텍스트 (시니어 UX)
}

// Skeleton — variant별 조건부 타입 (CTO 제안 반영)
type SkeletonProps =
  | { variant: 'text'; lines?: number; lineHeight?: number; spacing?: number; width?: number | string; animated?: boolean; }
  | { variant: 'circular'; width?: number; height?: number; animated?: boolean; }
  | { variant: 'rectangular'; width?: number | string; height?: number; animated?: boolean; };
```

**시니어 UX 요구사항**
- Spinner: 텍스트 레이블 병행 표시 ("불러오는 중...", "저장 중...")
- ProgressBar: 높이 최소 8px (얇은 바 구분 어려움)
- Skeleton: shimmer 속도 — 빠르지 않게 (1.5초 주기)

**접근성**
- Linear: `accessibilityRole="progressbar"`, `accessibilityValue={{ min: 0, max: 100, now: value }}`
- Spinner: `accessibilityLabel` 필수 (텍스트 없는 경우)
- Skeleton: `accessibilityLabel="콘텐츠 불러오는 중"`, `importantForAccessibility="yes"`

---

## 공통 접근성 기준 (Phase 5 전체)

| 항목 | 기준 | 근거 |
|------|------|------|
| 터치 영역 | 최소 48×48px, 권장 56×56px | WCAG 2.1 AA + 시니어 |
| 색상 대비 | 4.5:1 이상 (텍스트), 3:1 이상 (UI) | WCAG AA |
| 폰트 크기 | 본문 최소 16px, UI 레이블 14px+ | 시니어 가독성 |
| 상태 표현 | 색상 + 형태/텍스트 병행 | 색맹 접근성 |
| 스크린리더 | 모든 인터랙티브 요소 accessibilityLabel 필수 | WCAG 4.1.2 |

---

*CPO 작성 | CTO 구현 참고용*  
*질문 및 의견: Slack #design-system 스레드*
