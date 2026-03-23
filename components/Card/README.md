# Card Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## 사용법

### 기본 사용
```tsx
import { Card } from '@sonmily/design-system/components/Card';

<Card>
  <Text>카드 내용</Text>
</Card>
```

### Header 슬롯
```tsx
<Card header={<Typography variant="heading3">제목</Typography>}>
  <Text>내용</Text>
</Card>
```

### Footer 슬롯
```tsx
<Card footer={<Button>확인</Button>}>
  <Text>내용</Text>
</Card>
```

### 전체 슬롯
```tsx
<Card 
  header={<Typography variant="heading3">제목</Typography>}
  footer={<Button>확인</Button>}
>
  <Text>내용</Text>
</Card>
```

### 터치 가능한 카드
```tsx
<Card touchable onPress={() => console.log('Pressed')}>
  <Text>탭해보세요</Text>
</Card>
// → 전체 영역이 터치 타겟 (CPO 요구사항)
```

### Elevation (그림자)
```tsx
<Card elevation="low">낮은 그림자 (2)</Card>
<Card elevation="medium">중간 그림자 (4)</Card>
<Card elevation="high">높은 그림자 (8)</Card>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `ReactNode` | - | Header 영역 (선택) |
| `children` | `ReactNode` | - | **필수** - Content 영역 |
| `footer` | `ReactNode` | - | Footer 영역 (선택) |
| `touchable` | `boolean` | `false` | 터치 가능 여부 |
| `onPress` | `() => void` | - | 터치 핸들러 (touchable 시) |
| `elevation` | `'low' \| 'medium' \| 'high'` | `'low'` | 그림자 높이 (2/4/8) |

**추가 Props**: React Native Paper [`CardProps`](https://callstack.github.io/react-native-paper/docs/components/Card/) 지원

---

## 디자인 사양

### 레이아웃
- **패딩**: 16px (header / content / footer) - CPO 요구사항
- **Border Radius**: 12px - CPO 요구사항
- **배경**: `#FFFFFF` (surface)

### Elevation (그림자)
- **Low**: 2 (기본, 일반 카드)
- **Medium**: 4 (강조 카드)
- **High**: 8 (모달, 플로팅 카드)

**시니어 UX**: 명확한 경계를 위해 elevation 사용 (CPO 요구사항)

### 슬롯 구조
```
┌─────────────────────┐
│ Header (optional)   │ ← 16px padding, 하단 구분선
├─────────────────────┤
│ Content (required)  │ ← 16px padding
├─────────────────────┤
│ Footer (optional)   │ ← 16px padding, 상단 구분선
└─────────────────────┘
```

---

## 접근성

### WCAG 2.1 AA 준수
- **터치 영역**: touchable 카드는 전체 영역 터치 가능 (CPO 요구사항)
- **시각적 경계**: elevation으로 명확한 구분
- **스크린 리더**: touchable 카드는 `accessibilityRole="button"` 자동 설정

### 시니어 UX 권장사항
- Elevation 사용: 카드 경계 명확히
- 터치 가능 카드: 전체 영역 터치 (부분 터치 금지)
- Header: 명확한 제목 제공

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.screen` | 16px | 내부 패딩 (header/content/footer) |
| `color.surface` | #FFFFFF | 카드 배경 |
| `borderRadius` | 12px | 모서리 둥글기 |
| `elevation.low` | 2 | 기본 그림자 |
| `elevation.medium` | 4 | 강조 그림자 |
| `elevation.high` | 8 | 플로팅 그림자 |

---

## 예제

### BOKHAUS 건강 카드
```tsx
import { Card, Typography, Button } from '@sonmily/design-system';

export default function HealthCard() {
  return (
    <Card 
      header={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="heading3">오늘의 건강</Typography>
          <Typography variant="caption" color="secondary">2026-03-22</Typography>
        </View>
      }
      footer={<Button size="large" fullWidth>상세 보기</Button>}
    >
      <View style={{ gap: 16 }}>
        <View>
          <Typography color="secondary">혈압</Typography>
          <Typography variant="bodyLarge" weight="semibold">120/80 mmHg</Typography>
          <Typography variant="caption" color="success">정상 범위</Typography>
        </View>
        
        <View>
          <Typography color="secondary">혈당</Typography>
          <Typography variant="bodyLarge" weight="semibold">95 mg/dL</Typography>
          <Typography variant="caption" color="success">정상 범위</Typography>
        </View>
      </View>
    </Card>
  );
}
```

### BOKHAUS 알림 카드 (터치 가능)
```tsx
export default function NotificationCard() {
  return (
    <Card 
      touchable
      onPress={() => navigation.navigate('NotificationDetail')}
      elevation="medium"
    >
      <View style={{ gap: 8 }}>
        <Typography weight="semibold">복약 알림</Typography>
        <Typography color="secondary">오전 8시 약 복용 시간입니다.</Typography>
        <Typography variant="caption" color="secondary">10분 전</Typography>
      </View>
    </Card>
  );
}
```

### BOKHAUS 복용 중인 약 카드
```tsx
export default function MedicineCard() {
  return (
    <Card header={<Typography variant="heading3">복용 중인 약</Typography>}>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Typography weight="semibold">아스피린 100mg</Typography>
            <Typography variant="caption" color="secondary">하루 1회, 아침 식후</Typography>
          </View>
          <Typography variant="caption" color="success">복용 중</Typography>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Typography weight="semibold">혈압약 (암로디핀)</Typography>
            <Typography variant="caption" color="secondary">하루 1회, 아침</Typography>
          </View>
          <Typography variant="caption" color="success">복용 중</Typography>
        </View>
      </View>
    </Card>
  );
}
```

---

## 베스트 프랙티스

### DO ✅
- Header에 명확한 제목 제공
- 터치 가능 카드: `touchable` + `onPress` 명시
- Elevation 활용: 카드 경계 명확히
- 내용 간결하게: 카드당 하나의 주제

### DON'T ❌
- 터치 가능 카드에서 부분 영역만 터치 (전체 영역 터치 필수)
- 과도한 elevation (high는 신중히 사용)
- 카드 안에 카드 중첩 (최대 1 depth)
- 긴 텍스트 줄바꿈 없이 사용

---

## 터치 가능 vs 일반 카드

### 터치 가능 카드 (touchable=true)
- 전체 영역 터치 타겟
- 눌림 효과 (activeOpacity: 0.7)
- `accessibilityRole="button"`
- 사용 예: 알림 카드, 리스트 항목

### 일반 카드 (touchable=false)
- 정보 표시 전용
- 눌림 효과 없음
- 내부 요소 개별 터치
- 사용 예: 대시보드 위젯, 정보 카드

---

## 테스트

```bash
npm test -- Card.test.tsx
```

---

## 체인지로그

### v0.1.0 (2026-03-22)
- 초기 구현
- Header / Content / Footer 슬롯 지원
- 터치 가능 카드 (전체 영역 터치)
- 3가지 Elevation (low/medium/high)
- 16px 패딩, 12px border radius (CPO 요구사항)
- WCAG AA 접근성 준수

---

*작성: CTO | 검토: CPO*
