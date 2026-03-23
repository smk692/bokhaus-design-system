# 기술 스택 제안서

## 작성 정보
- **날짜**: 2026-03-22
- **작성자**: CTO
- **목적**: 손밀리 디자인 시스템 기술 스택 최종 제안

---

## 현재 손밀리 기술 스택

### BOKHAUS
- **Frontend**: React Native (Expo)
- **Backend**: Spring Boot 3.5
- **AI**: FastAPI + Claude SDK
- **State**: React Query, Zustand

### 출퇴근앱
- **Frontend**: Expo (React Native)
- **Backend**: Express + Prisma
- **DB**: PostgreSQL

### 청첩장
- **Frontend**: Next.js
- **Infra**: Docker + Cloudflare

### 인프라
- **Cloud**: AWS EC2
- **IaC**: Terraform
- **Container**: Docker (Colima)
- **Tunnel**: Cloudflare Tunnel

---

## 디자인 시스템 기술 스택 제안

### 1. UI 컴포넌트 라이브러리 ⭐

#### 채택: React Native Paper v5
**이유**:
- ✅ Material Design 3 준수 → 사용자 친숙도
- ✅ Expo 완벽 호환
- ✅ TypeScript 지원
- ✅ 다크 모드 기본 제공
- ✅ 활발한 커뮤니티 (주간 100K+ 다운로드)

**설치**:
```bash
npx expo install react-native-paper react-native-safe-area-context
```

**기본 사용**:
```typescript
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}
```

---

### 2. Design Tokens 시스템 ⭐⭐⭐

#### 채택: Figma Tokens + Style Dictionary
**워크플로우**:
```
Figma (디자인)
  ↓ Figma Tokens 플러그인
tokens.json (Git 저장)
  ↓ Style Dictionary
React Native 테마 파일
  ↓
앱 빌드
```

**tokens.json 구조**:
```json
{
  "colors": {
    "brand": {
      "primary": { "value": "#6200EE" },
      "secondary": { "value": "#03DAC6" },
      "error": { "value": "#B00020" }
    },
    "neutral": {
      "100": { "value": "#F5F5F5" },
      "900": { "value": "#212121" }
    }
  },
  "typography": {
    "heading": {
      "h1": {
        "fontSize": { "value": 32 },
        "fontWeight": { "value": "700" },
        "lineHeight": { "value": 40 }
      }
    }
  },
  "spacing": {
    "xs": { "value": 4 },
    "sm": { "value": 8 },
    "md": { "value": 16 },
    "lg": { "value": 24 },
    "xl": { "value": 32 }
  }
}
```

**Style Dictionary 설정**:
```javascript
// config.json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "reactNative": {
      "transformGroup": "react-native",
      "buildPath": "src/theme/",
      "files": [{
        "destination": "tokens.ts",
        "format": "javascript/es6"
      }]
    }
  }
}
```

**결과물 (자동 생성)**:
```typescript
// src/theme/tokens.ts
export const colors = {
  brandPrimary: '#6200EE',
  brandSecondary: '#03DAC6',
  brandError: '#B00020',
  neutral100: '#F5F5F5',
  neutral900: '#212121',
};

export const typography = {
  headingH1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

---

### 3. 테마 시스템

#### 채택: React Native Paper Theme + Custom Tokens
**구조**:
```typescript
// src/theme/index.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { colors, typography, spacing } from './tokens';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    error: colors.brandError,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    // Custom fonts from tokens
  },
  spacing,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    error: colors.brandError,
  },
  fonts: darkTheme.fonts,
  spacing,
};
```

---

### 4. 컴포넌트 문서화 ⭐

#### 채택: Storybook for React Native
**이유**:
- ✅ 컴포넌트 시각적 테스트
- ✅ 디자이너-개발자 협업 도구
- ✅ 실제 디바이스에서 확인 가능

**설치**:
```bash
npx sb init --type react_native
```

**사용 예시**:
```typescript
// Button.stories.tsx
import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => (
  <Button mode="contained">Primary Button</Button>
);

export const Outlined = () => (
  <Button mode="outlined">Outlined Button</Button>
);

export const Disabled = () => (
  <Button disabled>Disabled Button</Button>
);
```

**배포**: Chromatic (자동 비주얼 테스트)

---

### 5. 아이콘 시스템

#### 채택: Material Community Icons
**이유**:
- ✅ React Native Paper 기본 포함
- ✅ 6000+ 아이콘
- ✅ 커스텀 아이콘 추가 가능

**사용**:
```typescript
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="check-circle" size={24} color="green" />
```

**커스텀 아이콘 추가**:
```typescript
// 손밀리 브랜드 아이콘
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);
```

---

### 6. 폰트 시스템

#### 채택: Pretendard (한글) + Inter (영문)
**이유**:
- ✅ Pretendard = 한국 최고 가독성 폰트
- ✅ Inter = 글로벌 표준
- ✅ 가변 폰트 지원 (파일 크기 최적화)

**설치**:
```bash
npx expo install expo-font @expo-google-fonts/inter
```

**로드**:
```typescript
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;
  return <Main />;
}
```

---

### 7. 애니메이션 시스템

#### 채택: React Native Reanimated v3
**이유**:
- ✅ 네이티브 60fps 보장
- ✅ React Native Paper 호환
- ✅ 제스처 인터랙션 강력

**설치**:
```bash
npx expo install react-native-reanimated
```

**사용 예시**:
```typescript
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

<Animated.View entering={FadeIn} exiting={SlideInRight}>
  <Card>...</Card>
</Animated.View>
```

---

### 8. 레이아웃 시스템

#### 채택: Flexbox + Custom Spacing Helpers
**Box 컴포넌트**:
```typescript
// src/components/Box.tsx
import { View, ViewProps } from 'react-native';
import { spacing } from '../theme/tokens';

interface BoxProps extends ViewProps {
  p?: keyof typeof spacing; // padding
  m?: keyof typeof spacing; // margin
  gap?: keyof typeof spacing;
}

export const Box = ({ p, m, gap, style, ...props }: BoxProps) => (
  <View
    style={[
      {
        padding: p ? spacing[p] : undefined,
        margin: m ? spacing[m] : undefined,
        gap: gap ? spacing[gap] : undefined,
      },
      style,
    ]}
    {...props}
  />
);
```

**사용**:
```typescript
<Box p="md" gap="sm">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>
```

---

## 폴더 구조

```
src/
├── theme/
│   ├── tokens.ts          # Style Dictionary 생성
│   ├── index.ts           # 테마 통합
│   ├── colors.ts          # 색상 헬퍼
│   └── typography.ts      # 타이포 헬퍼
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   ├── Card/
│   ├── Input/
│   └── index.ts
├── layouts/
│   ├── Box.tsx
│   ├── Stack.tsx
│   └── Grid.tsx
└── hooks/
    ├── useTheme.ts
    └── useColorScheme.ts
```

---

## CI/CD 통합

### GitHub Actions 워크플로우
```yaml
# .github/workflows/design-tokens.yml
name: Design Tokens Sync

on:
  push:
    paths:
      - 'design-tokens/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Build tokens
        run: npm run tokens:build
      - name: Commit changes
        run: |
          git config user.name "Design Tokens Bot"
          git add src/theme/tokens.ts
          git commit -m "chore: update design tokens"
          git push
```

---

## 성능 최적화

### 번들 크기 관리
- **React Native Paper**: ~150KB (gzip)
- **Vector Icons**: ~500KB (tree-shaking 적용 시 ~50KB)
- **폰트**: Pretendard + Inter = ~200KB (가변 폰트)
- **총합**: ~400KB (허용 범위)

### 로딩 최적화
```typescript
// 폰트 로딩 전 스플래시 유지
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ ... });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
}
```

---

## 마이그레이션 전략

### Phase 1: 신규 컴포넌트 (Week 1-2)
- BOKHAUS 신규 화면에 React Native Paper 적용
- 기존 화면 건드리지 않음

### Phase 2: 점진적 교체 (Week 3-6)
- 주요 화면 하나씩 마이그레이션
- A/B 테스트로 사용자 반응 확인

### Phase 3: 레거시 제거 (Week 7-8)
- 모든 화면 통합 완료
- 구 스타일 파일 삭제

---

## 비용 분석

### 무료 도구
- React Native Paper: ✅ MIT 라이선스
- Figma Tokens: ✅ 무료
- Style Dictionary: ✅ 오픈소스
- Storybook: ✅ 무료

### 유료 고려 (선택)
- **Chromatic**: $149/월 (5000 스냅샷)
  - 추천: 팀 규모 커지면 도입
- **Figma 프로페셔널**: $12/월/인
  - 필요: Design Tokens 플러그인 사용

**총 예상 비용**: $0/월 (초기), $161/월 (장기)

---

## 최종 추천 스택 요약

| 카테고리 | 도구 | 우선순위 |
|---------|------|---------|
| UI 라이브러리 | React Native Paper v5 | ⭐⭐⭐ |
| Design Tokens | Figma Tokens + Style Dictionary | ⭐⭐⭐ |
| 문서화 | Storybook for RN | ⭐⭐ |
| 아이콘 | Material Community Icons | ⭐⭐⭐ |
| 폰트 | Pretendard + Inter | ⭐⭐⭐ |
| 애니메이션 | Reanimated v3 | ⭐⭐ |
| 비주얼 테스트 | Chromatic | ⭐ (선택) |

---

## CPO 승인 필요 사항

1. ✅ React Native Paper 채택 승인
2. ✅ Figma Tokens 워크플로우 동의
3. ✅ 브랜드 컬러/폰트 최종 확정
4. ✅ 마이그레이션 일정 조율

---

**다음 단계**: POC 프로젝트 생성 및 데모
