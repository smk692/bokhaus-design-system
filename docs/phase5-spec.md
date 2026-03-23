# Phase 5 명세서 — 문서화 & 통합

> 작성: CPO | 날짜: 2026-03-23 | 상태: 명세 확정

---

## 목표

Phase 1~4에서 완성된 10개 컴포넌트를 실제 프로젝트(BOKHAUS, 출퇴근앱)에서
바로 사용할 수 있도록 문서화하고 통합 가이드를 제공한다.

---

## 산출물 목록

### CPO 담당
1. `docs/storybook-stories-guide.md` — Storybook 스토리 작성 가이드 (CTO 구축 시 참조)
2. `docs/bokhaus-integration-guide.md` — BOKHAUS 시니어 앱 통합 가이드
3. `docs/accessibility-checklist.md` — WCAG 2.1 AA 컴포넌트별 체크리스트
4. `docs/onboarding-quickstart.md` — 개발자 Quick Start (처음 쓰는 사람 기준)
5. `docs/ux-writing-guide.md` — 한국어 UX 라이팅 가이드 (레이블, 에러 메시지)

### CTO 담당 (Phase 5에서 CPO 명세 기반)
1. Storybook 환경 구축 + 배포 (github-pages 또는 Chromatic)
2. 출퇴근앱 통합 (패키지 연동 + 실제 컴포넌트 교체)
3. BOKHAUS RN 프로젝트 연동 준비

---

## 1. BOKHAUS 통합 가이드 핵심 요구사항

### 설치
```bash
npm install @sonmily/design-system
```

### 필수 Peer Dependencies
- react-native-paper ^5.12.0
- react-native-safe-area-context
- @expo/vector-icons (또는 react-native-vector-icons)

### Provider 설정 (앱 진입점)
```tsx
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

### 시니어 앱 핵심 컴포넌트 사용 우선순위
1. **Button(size="large")** — 모든 CTA 버튼
2. **Typography(variant="bodyLarge")** — 기본 본문
3. **Input** — 모든 입력 폼
4. **Toast(duration=3000)** — 피드백 메시지
5. **Modal(dismissable=false)** — 중요 알림

---

## 2. 접근성 체크리스트 (컴포넌트별)

### Button
- [ ] size="large" (56px) 사용 — 시니어 기본
- [ ] disabled 시 opacity 40% 확인
- [ ] accessibilityLabel 제공

### Typography
- [ ] 최소 bodyLarge(18px) — 본문 텍스트
- [ ] color 대비 WCAG AA (4.5:1 이상)

### Input
- [ ] label 항상 표시 (placeholder만 쓰지 않기)
- [ ] errorText 명확한 복구 방법 포함

### Modal
- [ ] dismissable=false 유지 (시니어 실수 방지)
- [ ] title 항상 포함
- [ ] 버튼 레이블 명확 ("확인", "취소" — "OK", "X" 금지)

### ListItem
- [ ] 최소 72px 행 높이 유지
- [ ] subtitle로 보조 정보 제공

### Toast
- [ ] duration 최소 3000ms
- [ ] 아이콘 + 텍스트 병행

### Checkbox/Radio/Switch
- [ ] label 항상 표시
- [ ] 터치 영역 48px 이상

---

## 3. 한국어 UX 라이팅 원칙

### 레이블
| ❌ 금지 | ✅ 권장 |
|--------|--------|
| OK | 확인 |
| Cancel | 취소 |
| Delete | 삭제 |
| Submit | 제출 / 저장 / 완료 |
| Error | 오류가 발생했습니다 |
| Loading | 불러오는 중... |

### 에러 메시지 원칙
1. **무슨 문제인지** 명확히
2. **어떻게 해결하는지** 제시
3. **짧고 명확하게** (1~2문장)

예시:
- ❌ "오류" 
- ✅ "비밀번호가 맞지 않습니다. 다시 입력해 주세요."

### 시니어 UX 언어 원칙
- 존댓말 필수 ("~하세요", "~합니다")
- 전문 용어 지양 ("로그아웃" → "나가기")
- 긍정적 표현 우선 ("삭제 불가" → "저장 후 삭제 가능합니다")

---

## 4. 개발자 Quick Start

```tsx
// 1. 설치
// npm install @sonmily/design-system

// 2. 기본 import
import { Button, Typography, Input, Toast, Modal } from '@sonmily/design-system';

// 3. 시니어 앱 기본 패턴
function HealthFormScreen() {
  const [name, setName] = useState('');
  const [toast, setToast] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Typography variant="heading1">건강 정보 입력</Typography>
      
      <Input
        label="이름"
        value={name}
        onChangeText={setName}
      />
      
      <Button
        variant="filled"
        size="large"
        fullWidth
        onPress={() => setToast(true)}
      >
        저장
      </Button>

      <Toast
        type="success"
        visible={toast}
        message="건강 정보가 저장되었습니다"
        onDismiss={() => setToast(false)}
        duration={3000}
      />
    </View>
  );
}
```

---

## 5. Phase 5 완료 기준

- [ ] CPO: 문서 5종 작성 완료
- [ ] CTO: Storybook 배포 URL 확인
- [ ] CTO: BOKHAUS 프로젝트에 패키지 연동 테스트
- [ ] 회장님 검토 후 Phase 5 최종 승인

---

*작성: CPO | 검토 대기: CTO*
