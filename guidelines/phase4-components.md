# 디자인 시스템 Phase 4 — 컴포넌트 명세
> 작성: CPO | 날짜: 2026-03-22 | 상태: ✅ CTO 기술 검토 완료 (2026-03-22)
> 대상: BOKHAUS 시니어 UX (65세+)

## CTO 기술 검토 반영 사항 (2026-03-22)

| 컴포넌트 | CTO 제안 | 반영 내용 |
|---------|---------|---------|
| Modal/alert | Android 하드웨어 백버튼 차단 | `BackHandler` 추가 명세 |
| List | `getItemLayout` 최적화 필수 | 구현 노트에 추가 |
| Avatar | `react-native-fast-image` 캐싱 | 의존성으로 명시 |
| Badge | 부모 `overflow: visible` 필요 | 구현 주의사항 추가 |
| Switch | iOS/Android 스타일 차이 → 커스텀 필수 | `lg` 사이즈 커스텀 구현으로 변경 |
| Form 전반 | `react-native-gesture-handler` 터치 영역 확장 | 의존성으로 명시 |

### 구현 우선순위 (CTO 제안 채택)
- **Phase 4.1**: Modal, List (Button 기반)
- **Phase 4.2**: Avatar, Badge (독립 컴포넌트)
- **Phase 4.3**: Form — Checkbox, Radio, Switch (접근성 테스트 집중)

---

---

## 1. Modal / Dialog

### UX 원칙
- 시니어 사용자 기준: 화면 전체 덮지 않도록 80% 너비, 최대 420px
- 닫기 버튼은 **우상단 + 하단 '닫기' 버튼 병행** (손가락으로 찾기 쉽게)
- 배경 오버레이 탭으로 닫힘 가능 (단, 중요 경고 Modal은 제외)
- 스크롤 가능한 컨텐츠 영역 (긴 내용 대비)

### 스펙
```
크기:
  - width: 80vw (max: 420px)
  - padding: 24px
  - border-radius: 16px
  - max-height: 80vh (내부 스크롤)

오버레이:
  - color: rgba(0,0,0,0.6)
  - backdrop blur 없음 (성능 고려)

헤더:
  - title: H2 (24px Bold)
  - close icon: 48x48px 터치 타겟
  - divider: 하단 1px #E0E0E0

버튼:
  - height: 56px (시니어 기준)
  - 최대 2개 (Primary + Secondary)
  - 버튼 사이 gap: 12px
  - 전체 너비 버튼 권장
```

### 타입
| 타입 | 설명 | 닫기 방식 |
|------|------|-----------|
| `info` | 정보 안내 | 확인 버튼, 오버레이 탭 |
| `confirm` | 확인/취소 | 두 버튼만 |
| `alert` | 중요 경고 | 확인 버튼만 (오버레이 탭 불가) |
| `form` | 입력 포함 | 저장/취소 버튼 |

### Props (React Native)
```typescript
interface ModalProps {
  visible: boolean;
  type: 'info' | 'confirm' | 'alert' | 'form';
  title: string;
  message?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  onClose?: () => void; // alert 타입은 null
  children?: ReactNode; // form 타입용
}
```

### 구현 노트 (CTO 검토 반영)
- `alert` 타입: Android 하드웨어 백버튼도 차단 필요 → `BackHandler.addEventListener('hardwareBackPress', () => true)` 추가

### 접근성
- `accessibilityViewIsModal={true}`
- 포커스 트랩: Modal 열릴 때 내부 포커스 고정
- 음성 안내: "팝업창이 열렸습니다. [title]"

---

## 2. List / ListItem

### UX 원칙
- 최소 터치 타겟: **64px 높이** (시니어 기준, Phase 3 Button과 동일 기준보다 큰 사이즈)
- 구분선 선명하게: 1px #BDBDBD (연한 선 금지)
- 왼쪽 아이콘/아바타 + 오른쪽 화살표 패턴 명확히
- 선택 상태 배경: #E3F2FD (Primary Blue 10%)

### 스펙
```
ListItem:
  - height: min 64px (내용 많으면 자동 확장)
  - padding: 16px horizontal, 12px vertical
  - divider: 1px #BDBDBD (끝 아이템 제외)

Leading (왼쪽):
  - icon: 28px (Teal #00695C)
  - avatar: 40px circle
  - 없을 수도 있음

Content (중앙):
  - title: Body1 (18px Medium) — 최대 2줄
  - subtitle: Body2 (16px Regular, #616161) — 최대 1줄

Trailing (오른쪽):
  - chevron: 24px #9E9E9E (탐색 가능 항목)
  - value: Caption (14px) — 값 표시
  - switch: 우측 고정
  - 없을 수도 있음

선택 상태:
  - background: #E3F2FD
  - left accent bar: 4px Primary Blue
```

### 타입
| 타입 | Leading | Trailing | 용도 |
|------|---------|---------|------|
| `nav` | icon/avatar | chevron | 메뉴, 설정 이동 |
| `action` | icon | - | 단순 액션 |
| `value` | icon | 값 텍스트 | 정보 표시 |
| `toggle` | icon | Switch | 설정 토글 |
| `selectable` | - | 체크마크 | 목록 선택 |

### Props (React Native)
```typescript
interface ListItemProps {
  type: 'nav' | 'action' | 'value' | 'toggle' | 'selectable';
  title: string;
  subtitle?: string;
  leadingIcon?: string;
  leadingAvatar?: string;
  trailingValue?: string;
  isToggled?: boolean;
  isSelected?: boolean;
  onPress: () => void;
  onToggle?: (value: boolean) => void;
  showDivider?: boolean;
}
```

### 구현 노트 (CTO 검토 반영)
- `FlatList` 사용 시 `getItemLayout` 최적화 필수 (64px 고정 높이 활용)
  ```js
  getItemLayout={(data, index) => ({ length: 64, offset: 64 * index, index })}
  ```

### 접근성
- `accessibilityRole="button"` (탐색 가능 항목)
- 상태 음성 안내: "[title], 선택됨/선택 안 됨"
- Toggle: `accessibilityRole="switch"`, `accessibilityState={{ checked }}`

---

## 3. Avatar

### UX 원칙
- 시니어 앱에서 주로 보호자/요양사 프로필 표시용
- 이미지 없을 때: 이름 이니셜 자동 표시
- 온라인 상태 표시 도트는 선명하게

### 사이즈 체계
| 사이즈 | 지름 | 용도 |
|--------|------|------|
| `xs` | 24px | 댓글, 인라인 |
| `sm` | 32px | ListItem 서브 |
| `md` | 40px | ListItem 기본 |
| `lg` | 56px | 프로필 카드 |
| `xl` | 80px | 프로필 화면 |

### 스펙
```
shape: circle (border-radius: 50%)

이미지:
  - object-fit: cover
  - fallback: 이니셜 텍스트 + 색상 배경

이니셜:
  - 최대 2글자 (이름 첫 글자들)
  - 배경: Primary Blue #1565C0 (기본)
  - 텍스트: White #FFFFFF
  - 폰트: Bold, 사이즈의 40%

상태 도트 (선택):
  - 크기: Avatar 지름의 25%
  - 위치: 우하단
  - 온라인: #2E7D32 (Success Green)
  - 오프라인: #9E9E9E
  - 방해금지: #E65100 (Warning)
  - 테두리: 2px White

그룹 아바타 (최대 3개):
  - 겹침: -8px margin
  - 3개 초과 시: "+N" 표시
```

### Props (React Native)
```typescript
interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  imageUri?: string;
  name?: string; // 이니셜 생성용
  status?: 'online' | 'offline' | 'busy';
  showStatus?: boolean;
}
```

### 구현 노트 (CTO 검토 반영)
- 이미지 캐싱: `react-native-fast-image` 사용 권장
  ```js
  import FastImage from 'react-native-fast-image';
  // priority: FastImage.priority.normal
  // resizeMode: FastImage.resizeMode.cover
  ```

### 접근성
- `accessibilityLabel="[name] 프로필 사진"`
- 상태 포함: "[name] 프로필 사진, 온라인 상태"

---

## 4. Badge

### UX 원칙
- 시니어 앱: 알림 숫자 **크고 선명하게** (최소 20px 지름)
- 숫자 배지는 99+ 제한 (3자리 이상 금지 — 혼란 방지)
- 아이콘 위에 겹치는 배지는 터치 타겟 방해 금지

### 타입
| 타입 | 설명 | 예시 |
|------|------|------|
| `count` | 숫자 배지 | 3, 99+ |
| `dot` | 점 표시 (개수 불필요) | 알림 있음 |
| `status` | 상태 텍스트 | 새로운, 완료 |
| `icon` | 아이콘 배지 | ✓, ! |

### 스펙
```
count 배지:
  - min-width: 20px, height: 20px (xs)
  - min-width: 24px, height: 24px (md, 기본)
  - border-radius: 12px (pill shape)
  - padding: 0 6px
  - background: Error Red #C62828
  - text: White, 12px Bold (xs) / 14px Bold (md)
  - 99 초과 시 "99+" 표시

dot 배지:
  - 8px circle
  - background: Error Red (기본) or Warning Amber

status 배지:
  - height: 22px
  - padding: 4px 10px
  - border-radius: 11px
  - 색상: 의미에 따라 (성공/경고/오류/중립)
  - text: 12px Medium

위치:
  - 우상단 고정 (기본)
  - offset: -6px top, -6px right
```

### Props (React Native)
```typescript
interface BadgeProps {
  type: 'count' | 'dot' | 'status' | 'icon';
  count?: number; // count 타입
  label?: string; // status 타입
  color?: 'error' | 'warning' | 'success' | 'neutral';
  size?: 'xs' | 'md';
}
```

### 구현 노트 (CTO 검토 반영)
- 부모 컨테이너에 `overflow: 'visible'` 설정 필수 (배지가 잘리지 않도록)

### 접근성
- 숫자 배지: `accessibilityLabel="알림 [count]개"`
- 부모 요소에 포함하여 읽힘: "홈 탭, 알림 3개"

---

## 5. Form 컴포넌트 (Checkbox / Radio / Switch)

### UX 원칙 (공통)
- **터치 타겟: 최소 48x48px** (WCAG 기준, 시니어 추가 고려)
- 레이블은 항상 오른쪽 (LTR 기준), 텍스트 탭으로도 선택 가능
- 선택/해제 상태 색상 대비 명확 (Active: Primary Blue)
- 그룹으로 사용 시 간격: 8px

### 구현 노트 — Form 공통 (CTO 검토 반영)
- `react-native-gesture-handler` 사용하여 레이블 포함 터치 영역 확장
- Switch `lg` 사이즈는 iOS/Android 네이티브 차이로 **커스텀 구현 필수** (네이티브 Switch 사용 불가)

---

### 5.1 Checkbox

#### 스펙
```
박스:
  - size: 24px (기본)
  - border: 2px #757575 (미선택)
  - border-radius: 4px
  - 선택 시: background #1565C0, border #1565C0
  - 체크 아이콘: White, 16px

상태:
  - default: 테두리만
  - checked: 파란 배경 + 체크
  - indeterminate: 파란 배경 + 마이너스
  - disabled: 회색 (#BDBDBD)
  - error: 빨간 테두리 (#C62828)

레이블:
  - Body1 18px
  - 레이블 탭 시에도 체크 토글
  - helperText: Caption 14px #616161
  - errorText: Caption 14px #C62828 + 아이콘
```

#### Props
```typescript
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
}
```

#### 접근성
- `accessibilityRole="checkbox"`
- `accessibilityState={{ checked }}`
- 음성: "[label] 체크박스, [선택됨/선택 안 됨]"

---

### 5.2 Radio

#### 스펙
```
원:
  - 외부 크기: 24px
  - border: 2px #757575 (미선택)
  - 선택 시: border #1565C0 + 내부 원 12px #1565C0
  - disabled: 회색

RadioGroup:
  - direction: vertical (기본) / horizontal
  - gap: 8px vertical

레이블:
  - Checkbox와 동일 기준
```

#### Props
```typescript
interface RadioProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
}

interface RadioGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
  title?: string; // 그룹 제목
  disabled?: boolean;
}
```

#### 접근성
- `accessibilityRole="radio"`
- RadioGroup: `accessibilityRole="radiogroup"`
- 음성: "[label] 라디오 버튼, [선택됨/선택 안 됨], [N]개 중 [M]번째"

---

### 5.3 Switch

#### 스펙
```
트랙:
  - width: 52px, height: 32px
  - border-radius: 16px
  - OFF: background #9E9E9E
  - ON: background #1565C0

썸:
  - 28px circle
  - background: White
  - shadow: 0 2px 4px rgba(0,0,0,0.2)
  - OFF 위치: left 2px
  - ON 위치: right 2px
  - 트랜지션: 200ms ease

레이블 (선택):
  - 왼쪽 또는 오른쪽 배치
  - Body1 18px

크기 변형:
  - sm: 트랙 40x24px, 썸 20px
  - md: 트랙 52x32px, 썸 28px (기본)
  - lg: 트랙 64x40px, 썸 36px (시니어 권장)

상태:
  - 비활성화: opacity 0.38
  - 포커스: 썸 주위 8px Primary Blue 링
```

#### Props
```typescript
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### 접근성
- `accessibilityRole="switch"`
- `accessibilityState={{ checked: value }}`
- 음성: "[label] 스위치, [켜짐/꺼짐]"

---

## 검토 체크리스트

| 항목 | Modal | List | Avatar | Badge | Checkbox | Radio | Switch |
|------|-------|------|--------|-------|----------|-------|--------|
| WCAG AA 대비 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 최소 터치 타겟 48px+ | ✅ | ✅(64px) | - | - | ✅ | ✅ | ✅ |
| 시니어 폰트 16px+ | ✅ | ✅(18px) | - | ✅(14px+) | ✅(18px) | ✅(18px) | ✅(18px) |
| 접근성 레이블 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 음성 안내 지원 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 비활성화 상태 | ✅ | ✅ | - | - | ✅ | ✅ | ✅ |
| 오류 상태 | ✅ | - | - | - | ✅ | - | - |

---

## 의존성 패키지 (확정)

| 패키지 | 용도 | 대상 컴포넌트 |
|--------|------|-------------|
| `react-native-fast-image` | 이미지 캐싱 최적화 | Avatar |
| `react-native-gesture-handler` | 터치 영역 확장 | Form (Checkbox/Radio/Switch) |
| `react-native-paper` | 기본 컴포넌트 기반 | 전체 (Phase 1~4) |

---

## Phase 4 승인 현황

| 단계 | 상태 | 날짜 |
|------|------|------|
| CPO 명세 작성 | ✅ 완료 | 2026-03-22 |
| CTO 기술 검토 | ✅ 완료 | 2026-03-22 |
| CTO 제안사항 반영 | ✅ 완료 | 2026-03-22 |
| 구현 (Phase 4.1~4.3) | ⏳ 대기 | - |
| CPO 최종 승인 | ✅ 완료 | 2026-03-22 |

---
