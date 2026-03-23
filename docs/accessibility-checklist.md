# 접근성 체크리스트 — WCAG 2.1 AA

> @sonmily/design-system v0.4.0 | 작성: CPO | 2026-03-23
> 대상: BOKHAUS 시니어 앱 (65세+), 보호자 앱, 기관 어드민

---

## 공통 원칙

| 원칙 | 기준 | 비고 |
|------|------|------|
| 색상 대비 | 4.5:1 이상 (텍스트) | WCAG AA |
| 터치 영역 | 최소 48×48px | WCAG 2.5.5 |
| 텍스트 크기 | 최소 16px (본문) | 시니어 권장 18px |
| 포커스 표시 | 키보드 포커스 명확히 | WCAG 2.4.7 |
| 오류 식별 | 텍스트 + 아이콘 병행 | 색상만으로 구분 금지 |

---

## 컴포넌트별 체크리스트

### ✅ Button

```
[ ] size="large" (56px) 사용 — 시니어 앱 필수
[ ] variant="filled" CTA에 사용 (고대비)
[ ] disabled 시 opacity 40% 확인
[ ] accessibilityLabel 제공 (아이콘 버튼 시 필수)
[ ] 버튼 내 텍스트 최소 16px
[ ] 색상 대비: 흰색 텍스트 + primary(#1565C0) = 7.1:1 ✅
```

**검증 방법**
```tsx
// 아이콘 버튼 레이블 예시
<Button icon="plus" accessibilityLabel="건강 기록 추가" />
```

---

### ✅ Typography

```
[ ] 본문: bodyLarge(18px) 이상 사용
[ ] 제목: heading3(20px) 이상
[ ] caption(14px): 보조 정보에만 제한 사용
[ ] color="disabled" 사용 최소화 (대비 부족)
[ ] 줄간격 최소 1.4 이상 (bodyLarge 기본 1.6 ✅)
[ ] 최대 줄 길이 60자 이하 (가독성)
```

**금지 패턴**
```tsx
// ❌ 중요 정보에 caption 사용
<Typography variant="caption" color="disabled">오류: 혈압 값 없음</Typography>

// ✅ 올바른 방법
<Typography variant="body" color="error">오류: 혈압 값을 입력해 주세요.</Typography>
```

---

### ✅ Input

```
[ ] label 항상 표시 (placeholder 단독 금지)
[ ] errorText 복구 방법 포함
[ ] 최소 높이 56px 유지
[ ] 필수 항목 '*' 표시 + 화면 상단 안내 ("* 필수 항목")
[ ] 에러: 색상 + 아이콘 + 텍스트 3가지 병행
[ ] keyboardType 정확히 지정 (숫자는 "numeric")
[ ] returnKeyType 흐름에 맞게 설정
```

**에러 메시지 패턴**
```tsx
// ❌ 모호한 에러
errorText="오류"

// ✅ 복구 방법 포함
errorText="올바른 혈압 값을 입력해 주세요. (예: 120)"
```

---

### ✅ Card

```
[ ] 터치 가능 Card: onPress + accessibilityRole="button"
[ ] 터치 가능 Card: accessibilityLabel 제공
[ ] elevation으로 계층 구분 명확히
[ ] 내부 텍스트 최소 body(16px)
```

```tsx
// ✅ 터치 가능 카드 접근성
<Card
  onPress={() => navigate('detail')}
  accessibilityRole="button"
  accessibilityLabel="혈압 기록 상세 보기"
>
  ...
</Card>
```

---

### ✅ Toast

```
[ ] duration 최소 3000ms (시니어 읽기 속도)
[ ] 아이콘 + 텍스트 병행 (아이콘만 금지)
[ ] 1~2문장 이내 (긴 메시지 → Modal)
[ ] type에 맞는 색상 사용
[ ] 동시에 2개 이상 표시 금지
```

**시간 가이드**
| 메시지 길이 | 권장 duration |
|------------|--------------|
| 짧음 (10자 이내) | 3000ms |
| 보통 (10~20자) | 4000ms |
| 긺 (20자 이상) | 5000ms 또는 Modal 전환 |

---

### ✅ Modal

```
[ ] dismissable={false} 유지 (시니어 실수 방지)
[ ] title 항상 포함 (내용 맥락 제공)
[ ] 버튼 레이블: 구체적 행동 ("삭제", "저장" > "확인")
[ ] confirm variant: 위험 액션은 cancelLabel 먼저 배치
[ ] content 최대 3줄 (초과 시 스크롤 자동)
[ ] 배경 어두운 overlay 유지 (집중 유도)
```

**위험 액션 버튼 순서**
```tsx
// ✅ 취소(안전)를 왼쪽, 위험 액션을 오른쪽
<Modal
  variant="confirm"
  cancelLabel="취소"    // 왼쪽 (안전)
  confirmLabel="삭제"   // 오른쪽 (위험)
/>
```

---

### ✅ List / ListItem

```
[ ] 최소 행 높이 72px 유지
[ ] title: bodyLarge(18px) — 크기 변경 금지
[ ] subtitle 제공 (보조 정보로 맥락 강화)
[ ] leftIcon으로 내용 유형 시각적 구분
[ ] showChevron: 탐색 가능 항목에만 표시
[ ] disabled 항목: 비활성 이유 tooltip 또는 subtitle 설명
[ ] 빈 목록: emptyText 항상 제공
```

---

### ✅ Avatar

```
[ ] uri 없을 때 name(이니셜) fallback 확인
[ ] name 없을 때 icon fallback 확인
[ ] 시니어 앱 프로필: size="xlarge" (80px)
[ ] showStatus 사용 시 isOnline 상태 정확히 반영
[ ] 이미지 alt 텍스트: accessibilityLabel 제공
```

---

### ✅ Badge

```
[ ] count만으로 중요 정보 전달 금지 (accessibilityLabel 보완)
[ ] maxCount(99) 초과 시 "99+" 표시 확인
[ ] 색상만으로 구분 금지 (dot variant: 텍스트 보완)
[ ] 알림 배지: 0일 때 숨김 처리 확인
```

```tsx
// ✅ 배지 접근성 보완
<Badge count={3} accessibilityLabel="알림 3개">
  <Icon source="bell-outline" size={28} />
</Badge>
```

---

### ✅ Form (Checkbox / RadioGroup / Switch)

```
[ ] label 항상 표시 — 절대 생략 금지
[ ] error + errorText 동시 제공
[ ] disabled 항목: 비활성 이유 설명 (description 또는 tooltip)
[ ] Checkbox 그룹: 헤더 레이블 제공
[ ] RadioGroup: 현재 선택값 명확히
[ ] Switch: 켜짐/꺼짐 상태 label로 보완
```

**Switch 레이블 패턴**
```tsx
// ❌ 상태 불명확
<Switch label="알림" value={on} onValueChange={setOn} />

// ✅ 설명으로 현재 상태 보완
<Switch
  label="복약 알림"
  description={on ? "켜짐 · 매일 오전 8시" : "꺼짐"}
  value={on}
  onValueChange={setOn}
/>
```

---

## 자동 검증 도구 (CTO 구축 예정)

| 도구 | 역할 |
|------|------|
| `@axe-core/react` | 런타임 접근성 오류 감지 |
| Storybook a11y addon | 컴포넌트별 WCAG 검사 |
| Lighthouse | 페이지 전체 접근성 점수 |

**목표 점수**: Lighthouse 접근성 90점 이상

---

## 검수 프로세스

1. *개발 중*: `@axe-core/react` 자동 경고
2. *PR 전*: 컴포넌트 접근성 체크리스트 자가 점검
3. *스프린트 종료*: Storybook a11y 전체 실행
4. *릴리스 전*: Lighthouse 검사 + CPO 최종 확인

---

*작성: CPO | Phase 5 문서화*
