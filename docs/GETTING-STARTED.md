# 손밀리 디자인 시스템 — 시작 가이드

> **버전**: v1.0.0  
> **대상**: BOKHAUS, 출퇴근앱, 청첩장 개발자  
> **플랫폼**: React Native (Expo)

---

## 5분 시작하기

### 1. 설치

```bash
# 로컬 경로 연결 (모노레포 환경)
npm install --save @sonmily/design-system@file:../../shared-memory/projects/design-system

# 또는 npm 패키지 (배포 후)
npm install @sonmily/design-system
```

### 2. 앱 래핑

```tsx
// App.tsx
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <YourApp />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

### 3. 첫 컴포넌트 사용

```tsx
import { Button, Typography, Input } from '@sonmily/design-system';

export function LoginScreen() {
  return (
    <View>
      <Typography variant="heading1">로그인</Typography>
      <Input label="전화번호" placeholder="010-0000-0000" />
      <Button variant="filled" size="large" onPress={() => {}}>
        로그인
      </Button>
    </View>
  );
}
```

---

## 전체 컴포넌트 목록

### Phase 3 — Critical (기본 필수)
| 컴포넌트 | 용도 | 시니어 UX |
|---------|------|----------|
| `Button` | 모든 액션 버튼 | 56px 높이 (large) |
| `Typography` | 텍스트 표시 | 최소 16px |
| `Input` | 텍스트 입력 | 56px 높이, 레이블 필수 |
| `Card` | 콘텐츠 카드 | 16px 패딩 |
| `Toast` | 피드백 알림 | 최소 3초 표시 |

### Phase 4 — High (주요 UI)
| 컴포넌트 | 용도 | 시니어 UX |
|---------|------|----------|
| `Modal` | 확인/경고 다이얼로그 | 배경 클릭 비활성 기본 |
| `List` / `ListItem` | 목록 | 72px 행 높이 |
| `Avatar` | 프로필 이미지 | 이니셜/아이콘 fallback |
| `Badge` | 알림 뱃지 | count/dot/label |
| `Form` | Checkbox/Radio/Switch | 48px+ 터치 영역 |

### Phase 5 — Navigation & Advanced
| 컴포넌트 | 용도 | 시니어 UX |
|---------|------|----------|
| `AppBar` | 상단 헤더 | 48px 터치 영역 |
| `BottomNavigation` | 탭바 | 72px 높이, 레이블 필수 |
| `DatePicker` | 날짜 선택 | 캘린더 그리드, 56px 셀 |
| `DateRangePicker` | 날짜 범위 | 출퇴근앱용 |
| `Chip` | 태그/필터 | 40px+ 높이 |
| `LinearProgress` | 진행 바 | 8px 높이 |
| `Spinner` | 로딩 | 텍스트 레이블 필수 |
| `Skeleton` | 콘텐츠 로딩 | shimmer 1.5초 |

---

## 디자인 토큰 사용

```tsx
import { customColors, customSpacing } from '@sonmily/design-system';

// 색상 토큰
customColors.primary.main    // #1B5E20 (primary 녹색)
customColors.primary.light   // #4CAF50
customColors.error.main      // #C62828
customColors.neutral.white   // #FFFFFF

// 간격 토큰
customSpacing.touch          // 48 (최소 터치 영역)
customSpacing.section        // 24 (섹션 간격)
customSpacing.input          // 56 (입력 높이)
```

---

## 접근성 가이드라인

### 필수 규칙

1. **터치 영역**: 모든 인터랙티브 요소 최소 48×48px
2. **텍스트**: 본문 최소 16px, UI 레이블 최소 14px
3. **색상 대비**: 텍스트 4.5:1 이상, UI 컴포넌트 3:1 이상
4. **accessibilityLabel**: 모든 아이콘-전용 버튼에 필수
5. **상태 표현**: 색상 + 아이콘/텍스트 병행 (색맹 접근성)

### 예시

```tsx
// ✅ 올바른 사용
<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="뒤로 가기"
>
  <Icon name="arrow-left" />
</TouchableOpacity>

// ❌ 잘못된 사용 — accessibilityLabel 누락
<TouchableOpacity>
  <Icon name="arrow-left" />
</TouchableOpacity>
```

---

## BOKHAUS 프로젝트 통합 예시

```tsx
// BOKHAUS HomeScreen 핵심 패턴
import {
  AppBar,
  Card,
  BottomNavigation,
  Badge,
  Typography,
} from '@sonmily/design-system';

const TABS = [
  { key: 'home', title: '홈', icon: 'home' },
  { key: 'activity', title: '활동', icon: 'run' },
  { key: 'health', title: '건강', icon: 'heart' },
  { key: 'contact', title: '연락', icon: 'phone' },
  { key: 'settings', title: '설정', icon: 'cog' },
];

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView>
      <AppBar
        title="안녕하세요 👋"
        actions={[{
          icon: 'bell',
          label: '알림',
          onPress: () => {},
          badge: 3,
        }]}
      />
      <ScrollView>
        <Card>
          <Typography variant="heading2">오늘 기분이 어때요?</Typography>
        </Card>
      </ScrollView>
      <BottomNavigation
        routes={TABS}
        activeIndex={activeTab}
        onIndexChange={setActiveTab}
      />
    </SafeAreaView>
  );
}
```

---

## 문의 및 기여

- **Slack**: #design-system
- **CPO**: UI/UX 관련 질문
- **CTO**: 기술 구현 관련 질문

---

*손밀리 디자인 시스템 v1.0.0 | 2026-04-14 릴리스 예정*
