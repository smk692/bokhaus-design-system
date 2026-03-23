# 컴포넌트 우선순위 리스트

## 작성 정보
- **날짜**: 2026-03-22
- **작성자**: CTO
- **목적**: 디자인 시스템 컴포넌트 개발 우선순위 정의

---

## Phase 1: 기초 컴포넌트 (Week 1-2)

### 1. Button ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 낮음

**Variants**:
- Contained (Primary)
- Outlined (Secondary)
- Text (Tertiary)
- Icon Button

**Props**:
```typescript
interface ButtonProps {
  mode: 'contained' | 'outlined' | 'text';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  onPress: () => void;
}
```

**적용 프로젝트**: BOKHAUS, 출퇴근앱

---

### 2. Input (TextInput) ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 중간

**Variants**:
- Flat (기본)
- Outlined (강조)

**Props**:
```typescript
interface InputProps {
  label: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
}
```

**특수 케이스**:
- 비밀번호 입력 (보기/숨기기 토글)
- 전화번호 입력 (포맷팅)
- 이메일 입력 (유효성 검사)

**적용 프로젝트**: BOKHAUS (로그인), 출퇴근앱 (출퇴근 메모)

---

### 3. Card ⭐⭐⭐
**사용 빈도**: 높음
**복잡도**: 낮음

**Variants**:
- Elevated (그림자)
- Outlined (테두리)
- Contained (배경색)

**Props**:
```typescript
interface CardProps {
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType;
  actions?: React.ReactNode;
  onPress?: () => void;
}
```

**적용 프로젝트**: BOKHAUS (AI 대화 카드), 출퇴근앱 (출퇴근 기록)

---

### 4. Typography (Text) ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 낮음

**Variants**:
- Heading (H1-H6)
- Body (Large, Medium, Small)
- Caption
- Label

**Props**:
```typescript
interface TextProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}
```

---

### 5. Icon ⭐⭐
**사용 빈도**: 높음
**복잡도**: 낮음

**Props**:
```typescript
interface IconProps {
  name: string;
  size?: number;
  color?: string;
}
```

**특수 케이스**:
- 손밀리 브랜드 아이콘 (커스텀 SVG)

---

## Phase 2: 네비게이션 컴포넌트 (Week 3-4)

### 6. AppBar (Header) ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 중간

**Variants**:
- Default (타이틀 + 뒤로가기)
- Search (검색창)
- Actions (아이콘 버튼들)

**Props**:
```typescript
interface AppBarProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  actions?: ActionItem[];
}
```

---

### 7. BottomNavigation ⭐⭐⭐
**사용 빈도**: 높음 (BOKHAUS, 출퇴근앱)
**복잡도**: 중간

**Props**:
```typescript
interface BottomNavigationProps {
  routes: Route[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

interface Route {
  key: string;
  title: string;
  icon: string;
  badge?: number;
}
```

---

### 8. Drawer ⭐⭐
**사용 빈도**: 중간
**복잡도**: 높음

**Props**:
```typescript
interface DrawerProps {
  items: DrawerItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
```

---

## Phase 3: 피드백 컴포넌트 (Week 5-6)

### 9. Modal / Dialog ⭐⭐⭐
**사용 빈도**: 높음
**복잡도**: 중간

**Variants**:
- Alert (확인/취소)
- Confirm (예/아니오)
- Custom (자유 내용)

**Props**:
```typescript
interface ModalProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  actions: ModalAction[];
  onDismiss: () => void;
}
```

---

### 10. Snackbar / Toast ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 중간

**Variants**:
- Success (녹색)
- Error (빨강)
- Info (파랑)
- Warning (노랑)

**Props**:
```typescript
interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  action?: { label: string; onPress: () => void };
}
```

---

### 11. ProgressBar / Spinner ⭐⭐
**사용 빈도**: 높음
**복잡도**: 낮음

**Variants**:
- Linear (진행률)
- Circular (로딩)
- Indeterminate (무한)

---

### 12. Chip / Tag ⭐⭐
**사용 빈도**: 중간
**복잡도**: 낮음

**적용**: BOKHAUS (AI 기능 태그)

---

## Phase 4: 폼 컴포넌트 (Week 7-8)

### 13. Checkbox ⭐⭐
**사용 빈도**: 중간
**복잡도**: 낮음

---

### 14. Radio Button ⭐⭐
**사용 빈도**: 중간
**복잡도**: 낮음

---

### 15. Switch / Toggle ⭐⭐⭐
**사용 빈도**: 높음 (설정 화면)
**복잡도**: 낮음

**적용**: 출퇴근앱 (알림 설정), BOKHAUS (다크 모드)

---

### 16. Select / Dropdown ⭐⭐
**사용 빈도**: 중간
**복잡도**: 높음

---

### 17. DatePicker / TimePicker ⭐⭐⭐
**사용 빈도**: 높음 (출퇴근앱)
**복잡도**: 높음

**특수 요구사항**:
- 한국 달력 형식
- 공휴일 표시
- 범위 선택 (출퇴근 기간)

---

## Phase 5: 고급 컴포넌트 (Week 9-12)

### 18. List / FlatList 강화 ⭐⭐⭐
**사용 빈도**: 매우 높음
**복잡도**: 중간

**기능**:
- 무한 스크롤
- Pull-to-refresh
- 빈 상태 (Empty State)
- 로딩 스켈레톤

---

### 19. Avatar ⭐⭐
**사용 빈도**: 중간
**복잡도**: 낮음

**Variants**:
- 이미지
- 이니셜
- 아이콘

---

### 20. Badge ⭐⭐
**사용 빈도**: 중간
**복잡도**: 낮음

**적용**: 알림 뱃지, 새 메시지 표시

---

### 21. Tabs ⭐⭐
**사용 빈도**: 중간
**복잡도**: 중간

---

### 22. Accordion / Collapsible ⭐
**사용 빈도**: 낮음
**복잡도**: 중간

---

### 23. Stepper (Progress Steps) ⭐
**사용 빈도**: 낮음 (회원가입, 온보딩)
**복잡도**: 중간

---

### 24. Calendar (Full) ⭐
**사용 빈도**: 낮음 (출퇴근앱 특정 기능)
**복잡도**: 매우 높음

---

### 25. Image Gallery / Carousel ⭐
**사용 빈도**: 낮음
**복잡도**: 높음

---

## 우선순위 요약

### 🚨 Critical (즉시 구현)
1. Button
2. Input
3. Typography
4. Card
5. Snackbar/Toast

### ⚡ High (2주 내)
6. AppBar
7. BottomNavigation
8. Modal/Dialog
9. Switch
10. List 강화

### 📅 Medium (1개월 내)
11. DatePicker
12. Chip
13. Checkbox/Radio
14. Avatar
15. Badge

### 🔮 Low (필요 시)
16. Drawer
17. Tabs
18. Accordion
19. Stepper
20. Calendar

---

## 컴포넌트별 프로젝트 매핑

### BOKHAUS 우선
- Button, Input, Card, Snackbar, List
- AppBar, BottomNavigation
- Avatar (사용자 프로필)

### 출퇴근앱 우선
- Switch (알림 설정)
- DatePicker (출퇴근 기록)
- Calendar (월간 보기)

### 청첩장 우선
- Typography, Card, Button
- Image Gallery (사진)

---

## 개발 일정 제안

| Week | 컴포넌트 | 담당 | 상태 |
|------|---------|------|------|
| 1 | Button, Typography, Icon | CTO | 대기 |
| 2 | Input, Card | CTO | 대기 |
| 3 | AppBar, BottomNav | CTO | 대기 |
| 4 | Modal, Snackbar | CTO | 대기 |
| 5-6 | Switch, Checkbox, Radio | Backend → Frontend 전환 | 대기 |
| 7-8 | DatePicker, List 강화 | Backend → Frontend 전환 | 대기 |
| 9-12 | 나머지 고급 컴포넌트 | 팀 협업 | 대기 |

---

## CPO 검토 요청

1. **컴포넌트 우선순위 동의 여부**
2. **누락된 필수 컴포넌트 있는지**
3. **BOKHAUS vs 출퇴근앱 우선순위 조정 필요**

---

**다음 단계**: CPO 승인 후 Button 컴포넌트 POC 개발
