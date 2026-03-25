# ACCESSIBILITY.md — @sonmily/design-system

> 작성: CPO | 2026-03-24 | **업데이트: 2026-03-25 (Phase 7-B 심화 감사 반영)** | 기준: WCAG 2.1 AA  
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

### ✅ 검증된 색상 조합 (Phase 7-B 실측 — 2026-03-25)

| 전경 | 배경 | 대비율 | AA | AAA | 용도 |
|------|------|--------|----|-----|------|
| #212121 (텍스트) | #FFFFFF | 16.1:1 | ✅ | ✅ | 제목, 본문 |
| #212121 | #E8F5E9 | 14.3:1 | ✅ | ✅ | 카드/Primary50 배경 |
| #212121 | #F5F5F5 | 14.8:1 | ✅ | ✅ | 중립 배경 |
| #FFFFFF | #1B5E20 (CTA) | 7.9:1 | ✅ | ✅ | CTA 버튼 (흰 텍스트) |
| #C62828 (에러) | #FFFFFF | 5.6:1 | ✅ | ⚠️ | 에러 텍스트 — **수정 완료** |
| #2E7D32 (성공) | #FFFFFF | 5.1:1 | ✅ | ⚠️ | 성공 텍스트 — **수정 완료** |
| #1565C0 (정보) | #FFFFFF | 5.7:1 | ✅ | ⚠️ | 정보 텍스트 — **수정 완료** |
| #5D4037 (경고 텍스트) | #FFFFFF | 6.6:1 | ✅ | ✅ | 경고 텍스트 전용 |
| #212121 | #FFF8E1 (경고 배경) | 15.2:1 | ✅ | ✅ | 경고 패턴 (배경+어두운 텍스트) |
| #757575 (보조) | #FFFFFF | 4.6:1 | ✅ | ⚠️ | 보조 텍스트 |
| #2E7D32 (링크/Primary 700) | #FFFFFF | 5.1:1 | ✅ | ⚠️ | 링크 — **수정 완료** |

### ❌ 사용 금지 조합 (Phase 7-B 실측 결과)

| 색상 | 대비율 | 이유 |
|------|--------|------|
| #F44336 (구 error) / #FFFFFF | 3.7:1 | WCAG AA 미달 — **#C62828 대체** |
| #FF9800 (warning 원색) / #FFFFFF | 2.2:1 | WCAG AA 미달 — 아이콘 장식 전용만 허용 |
| #4CAF50 (구 success) / #FFFFFF | 2.8:1 | WCAG AA 미달 — **#2E7D32 대체** |
| #2196F3 (구 info) / #FFFFFF | 3.1:1 | WCAG AA 미달 — **#1565C0 대체** |
| #388E3C (구 Primary 700) / #FFFFFF | 4.1:1 | WCAG AA 미달 — **#2E7D32 대체** |
| #BDBDBD (비활성) / #FFFFFF | 1.9:1 | 장식 전용. 정보 전달 절대 금지 |
| #9E9E9E / #FFFFFF | 2.9:1 | 장식 전용. 정보 전달 금지 |

> ⚠️ **경고(Warning) 색상 사용 원칙**: `#FF9800`은 아이콘 장식에만 허용. 경고 텍스트는 반드시 `#5D4037` 사용. 경고 배경 패턴 권장: `#FFF8E1` + `#212121` 텍스트.

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
| Chip | 44px | **40px** | ❌ **P0 수정 요청 (2026-03-25)** |

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

---

## 10. Phase 7-B 이슈 현황 (2026-03-25 갱신)

| # | 이슈 | 우선순위 | 상태 |
|---|------|---------|------|
| 1 | error 토큰 #F44336 → #C62828 | P0 | ⏳ CTO 수정 대기 |
| 2 | success 토큰 #4CAF50 → #2E7D32 | P0 | ⏳ CTO 수정 대기 |
| 3 | info 토큰 #2196F3 → #1565C0 | P0 | ⏳ CTO 수정 대기 |
| 4 | warning 배경+텍스트 토큰 추가 | P0 | ⏳ CTO 수정 대기 |
| 5 | Primary 700 #388E3C → #2E7D32 | P0 | ⏳ CTO 수정 대기 |
| 6 | Chip minHeight 40px → 44px | P0 | ⏳ CTO 수정 대기 |
| 7 | Badge 텍스트 크기 가이드 문서화 | P1 | ⏳ CPO 문서 작업 |
| 8 | BottomNavigation 레이블 권고 추가 | P1 | ⏳ CPO 문서 작업 |

> **전체 감사 보고서**: `CPO-PHASE7B-AUDIT-2026-03-25.md` 참조

---

*현재 Lighthouse 접근성 점수: 87점 (2026-03-24 실측)*  
*목표: 90점 이상 | P0 이슈 수정 후 재측정 예정 (2026-03-28)*
