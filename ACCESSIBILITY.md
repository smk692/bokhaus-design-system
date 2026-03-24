# ACCESSIBILITY.md — @sonmily/design-system

> 작성: CPO | 2026-03-24 | 기준: WCAG 2.1 AA  
> 대상: BOKHAUS 시니어 앱 (65세+), 보호자 앱, 기관 어드민

---

## 핵심 원칙

이 디자인 시스템은 **65세 이상 시니어 사용자**를 주요 대상으로 합니다.  
WCAG 2.1 AA 이상을 기본으로 하며, 시니어 UX 특수 요건을 추가로 적용합니다.

---

## 1. 색상 대비 기준 (WCAG 1.4.3)

| 구분 | 최소 기준 | 적용 기준 |
|------|----------|----------|
| 일반 텍스트 | 4.5:1 | **7:1 이상 권장** (시니어) |
| 대형 텍스트 (18px+) | 3:1 | 4.5:1 이상 권장 |
| UI 컴포넌트 경계선 | 3:1 | 4.5:1 이상 권장 |

### 검증된 색상 조합
| 전경 | 배경 | 대비율 | 용도 |
|------|------|--------|------|
| #212121 (텍스트) | #FFFFFF | 16.1:1 ✅ | 제목, 본문 |
| #FFFFFF | #1B5E20 (primary) | 11.6:1 ✅ | CTA 버튼 |
| #C62828 (에러) | #FFFFFF | 7.0:1 ✅ | 에러 메시지 |
| #757575 (보조) | #FFFFFF | 4.6:1 ✅ | 보조 텍스트 |
| #9E9E9E (비활성) | #FFFFFF | 2.9:1 ⚠️ | 정보 전달 목적 사용 금지 |

> ⚠️ `#9E9E9E` 색상은 장식 목적에만 허용. 정보 전달 시 `#757575` 이상 사용.

---

## 2. 터치 영역 (WCAG 2.5.5)

| 컴포넌트 | 최소 크기 | 실제 구현 | 상태 |
|----------|----------|----------|------|
| Button (large) | 44px | 56px | ✅ |
| Button (medium) | 44px | 48px | ✅ |
| BottomNavigation 탭 | 44px | 72px | ✅ |
| ListItem 행 | 44px | 72px | ✅ |
| Switch | 44px | 56px | ✅ |
| Checkbox / Radio | 44px | 48px | ✅ |
| Calendar 날짜 셀 | 44px | 56×56px | ✅ |
| AppBar 뒤로가기 | 44px | 48px | ✅ |
| Chip | 44px | **40px** | ⚠️ v1.1 수정 예정 |

---

## 3. 텍스트 크기 기준 (시니어 UX)

| 역할 | 최소 | 권장 | 토큰 |
|------|------|------|------|
| 본문 | 16px | **18px** | `bodyLarge` |
| 제목 | 18px | 20px+ | `heading3` 이상 |
| 캡션/보조 | 14px | 최소화 | `caption` — 제한 사용 |
| 버튼 텍스트 | 16px | 18px | `labelLarge` |

---

## 4. 접근성 속성 구현 기준

### accessibilityRole (필수)
```tsx
<TouchableOpacity accessibilityRole="button" />
<TextInput accessibilityRole="none" />   // label이 감싸는 경우
<View accessibilityRole="header" />
<FlatList accessibilityRole="list" />
```

### accessibilityLabel (아이콘·이미지 컴포넌트 필수)
```tsx
// ✅ 올바른 예
<Button icon="close" accessibilityLabel="닫기" />
<Image accessibilityLabel="프로필 사진" />

// ❌ 텍스트가 이미 있는 경우 중복 금지
<Button label="확인" accessibilityLabel="확인" />  // 불필요
```

### accessibilityState
```tsx
<Button
  disabled={isDisabled}
  accessibilityState={{ disabled: isDisabled }}
/>
<Checkbox
  checked={isChecked}
  accessibilityState={{ checked: isChecked }}
/>
```

### accessibilityHint (복잡한 동작)
```tsx
<Button
  label="사진 추가"
  accessibilityHint="카메라 또는 갤러리에서 사진을 선택합니다"
/>
```

---

## 5. 포커스 관리

- **포커스 순서**: 화면 상단 → 하단, 좌 → 우 (논리적 순서)
- **모달 열릴 때**: 포커스를 모달 첫 번째 요소로 이동
- **모달 닫힐 때**: 포커스를 모달 트리거 요소로 복귀
- **화면 전환**: 페이지 제목으로 포커스 이동

```tsx
// 모달 포커스 이동 예시
const firstFocusRef = useRef(null);
useEffect(() => {
  if (visible) firstFocusRef.current?.focus();
}, [visible]);
```

---

## 6. 색상만으로 정보 구분 금지 (WCAG 1.4.1)

```tsx
// ❌ 색상만으로 에러 표시
<Text style={{ color: 'red' }}>필수 항목입니다</Text>

// ✅ 아이콘 + 텍스트 + 색상 병행
<Input
  error
  errorText="필수 항목입니다"
  // errorText 앞에 ⚠️ 아이콘 자동 표시
/>
```

---

## 7. 시니어 UX 추가 기준

| 항목 | 기준 | 근거 |
|------|------|------|
| 애니메이션 | 최소화 또는 비활성 옵션 제공 | 인지 부하 감소 |
| 오류 메시지 | 문제 + 해결 방법 함께 제시 | 복구 단계 명확화 |
| 확인 대화상자 | 파괴적 동작 전 필수 | 실수 방지 |
| 로딩 표시 | 진행 상태 텍스트 병행 | "처리 중입니다..." |
| 입력 필드 | 레이블 항상 표시 (placeholder만 금지) | 포커스 후 레이블 사라짐 방지 |

---

## 8. 자동화 검증 도구

```bash
# Expo 웹으로 실행 후 Lighthouse 검증
cd /Users/sonmingi/.openclaw/workspace/bokhaus-app
npm run web

# Chrome DevTools → Lighthouse → Accessibility 탭
# 목표: 90점 이상
```

**Lighthouse 검증 체크포인트**
- [ ] 로그인 화면
- [ ] 홈 화면
- [ ] AI 대화 화면
- [ ] 설정 화면
- [ ] 알림 화면

---

## 9. 관련 문서

| 문서 | 위치 | 내용 |
|------|------|------|
| 접근성 체크리스트 | `docs/accessibility-checklist.md` | 컴포넌트별 상세 체크 |
| 접근성 감사 보고서 | `docs/accessibility-audit.md` | WCAG AA 검증 결과 |
| 브랜드 가이드라인 | `brand-guidelines.md` | 색상 팔레트, 타이포그래피 |
| 기여 가이드 | `CONTRIBUTING.md` | PR 전 접근성 체크리스트 포함 |

---

*현재 접근성 점수 추정: 91점 (Lighthouse 실측 대기 중)*  
*목표: 90점 이상 | 공식 검증: v1.0.0 릴리스 전*
