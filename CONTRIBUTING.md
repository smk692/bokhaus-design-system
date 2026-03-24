# CONTRIBUTING.md — @sonmily/design-system

> 작성: CPO | 2026-03-24 | v0.5.0 기준

---

## 개요

이 문서는 디자인 시스템에 새 컴포넌트를 추가하거나 기존 컴포넌트를 수정할 때 따라야 할 가이드라인입니다.

---

## 1. 브랜치 전략

```
main          ← 릴리스 브랜치 (태그 관리)
develop       ← 통합 브랜치
feature/컴포넌트명  ← 개발 브랜치
fix/이슈번호       ← 버그 수정
```

**예시**
```bash
git checkout -b feature/tooltip
git checkout -b fix/button-focus-ring
```

---

## 2. 새 컴포넌트 추가 방법

### Step 1: CPO 명세 확인
- `components/priority-list.md`에서 우선순위 확인
- CPO 승인 없이 임의 추가 금지

### Step 2: 파일 구조 생성
```
components/
  ComponentName/
    ComponentName.tsx    ← 컴포넌트 구현
    ComponentName.stories.tsx  ← Storybook 스토리
    index.ts             ← export
```

### Step 3: 시니어 UX 필수 요건 체크
```tsx
// ✅ 터치 영역 최소 48px
style={{ minHeight: 48, minWidth: 48 }}

// ✅ accessibilityRole 지정
accessibilityRole="button"

// ✅ accessibilityLabel (아이콘 전용 컴포넌트)
accessibilityLabel="뒤로 가기"

// ✅ accessibilityState (상태 전달)
accessibilityState={{ disabled: isDisabled, checked: isChecked }}
```

### Step 4: 디자인 토큰 사용
```tsx
// ✅ 하드코딩 금지 — 토큰 사용
import { colors, spacing, typography } from '../../tokens';

// ❌ 금지
color: '#1565C0'

// ✅ 권장
color: colors.primary[700]
```

### Step 5: Storybook 스토리 작성
```tsx
// 필수 스토리 3개
export const Default = ...    // 기본 상태
export const Disabled = ...   // 비활성 상태
export const SeniorSize = ...  // 시니어 앱용 큰 사이즈 (large/xl)
```

### Step 6: index.ts에 export 추가
```ts
// components/index.ts
export { ComponentName } from './ComponentName';
```

### Step 7: CHANGELOG.md 업데이트
```markdown
## [Unreleased]
### Added
- ComponentName: 설명 (#이슈번호)
```

---

## 3. 커밋 메시지 규칙

```
feat(component): 새 컴포넌트 또는 기능 추가
fix(component): 버그 수정
docs: 문서 업데이트
style: 코드 스타일 (기능 변경 없음)
refactor: 리팩토링
test: 테스트 추가
chore: 빌드, 설정 변경
```

**예시**
```
feat(Tooltip): 툴팁 컴포넌트 추가 (#42)
fix(Button): 포커스 링 색상 대비 수정 (#51)
docs(CONTRIBUTING): 기여 가이드 초안 작성
```

---

## 4. TypeScript 규칙

```tsx
// ✅ Props 타입 명시적 정의
interface ButtonProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  disabled?: boolean;
}

// ✅ 조건부 스타일 — spread 패턴 사용
const styles = {
  ...baseStyle,
  ...(disabled ? disabledStyle : {}),
  ...(size === 'large' ? largeStyle : {}),
};

// ❌ 금지 — any 타입
const handlePress = (e: any) => { ... }
```

---

## 5. 접근성 체크리스트 (PR 전 필수)

- [ ] 터치 영역 최소 48×48px 확인
- [ ] `accessibilityRole` 지정
- [ ] `accessibilityLabel` (아이콘/이미지 컴포넌트)
- [ ] `accessibilityState` (disabled, checked, selected 등)
- [ ] 색상 대비 4.5:1 이상 (텍스트)
- [ ] 색상만으로 정보 구분 금지 (아이콘/텍스트 병행)
- [ ] 포커스 순서 논리적 확인

전체 체크리스트: `docs/accessibility-checklist.md`

---

## 6. PR 가이드라인

### PR 제목 형식
```
[feat] ComponentName 컴포넌트 추가
[fix] Button: disabled 상태 포커스 링 수정
[docs] CONTRIBUTING.md 업데이트
```

### PR 설명 필수 항목
```markdown
## 변경 사항
- 무엇을 추가/수정했는지

## 접근성 체크
- [ ] 터치 영역 48px+
- [ ] accessibilityRole 지정
- [ ] 색상 대비 4.5:1+

## 스크린샷 (선택)
```

### 리뷰 기준
- CTO: 기술 구현, TypeScript, 빌드
- CPO: 시니어 UX, 접근성, 디자인 토큰 일관성

---

## 7. 릴리스 프로세스

```bash
# 1. 버전 업데이트
npm version patch|minor|major

# 2. CHANGELOG.md Unreleased → 버전 섹션으로 이동

# 3. Git 태그
git tag v1.0.0
git push origin v1.0.0

# 4. Storybook 빌드 확인
npm run build-storybook
```

---

*문의: CPO (프로덕트/UX), CTO (기술/빌드)*

---

## 컴포넌트 카운팅 기준 (2026-03-24 확정)

- **컴포넌트 1개 = `components/` 하위 1depth 디렉토리 1개**
- 하위 variant 파일은 별도 카운팅 금지
  - 예: `Progress/ProgressBar.tsx`, `Progress/Spinner.tsx`, `Progress/Skeleton.tsx` → **"Progress 1개"**
  - 예: `DatePicker/Calendar.tsx`, `DatePicker/DateRangePicker.tsx` → **"DatePicker 1개"**
- Phase 완료 보고 시 `find components/ -maxdepth 1 -type d | tail -n +2 | wc -l` 실행 결과 첨부 필수

## Phase 완료 체크리스트

- [ ] 실제 디렉토리 수 = 보고 숫자 (위 커맨드로 확인)
- [ ] 테스트 있는 컴포넌트 목록 명시 (`find components/ -name "*.test.tsx"`)
- [ ] GitHub push 및 CI 통과 확인
- [ ] 비서(OpenClaw) 교차 검증 완료

## shared-memory 사용 정책

✅ 허용: decisions.md, PROGRESS.md, daily/ 로그, 회의록  
❌ 금지: 전체 코드베이스, node_modules/, 빌드 결과물
