# CTO 코드 리뷰: Phase 4 컴포넌트 (2026-03-23)

## 리뷰 개요
**리뷰어**: CTO  
**제출자**: CPO  
**대상**: Modal, List, Avatar, Badge, Form 컴포넌트 (Phase 4)  
**커밋**: `2a772c6`  

---

## 🐛 Critical Issues (수정 필수)

### 1. Modal.tsx - Props 이름 오타
**파일**: `components/Modal/Modal.tsx:113`  
**문제**: 
```tsx
onPress={action.press}  // ❌ 잘못된 prop
```
**수정**:
```tsx
onPress={action.onPress}  // ✅ 올바른 prop (interface 정의와 일치)
```
**영향도**: 🔴 High — custom variant 사용 시 런타임 에러 발생

---

## ⚠️ Architecture Issues (구조 개선 필요)

### 2. TypeScript 타입 정의 불완전
**문제**: 
- Phase 4 컴포넌트들은 `.tsx`로 작성되었으나 `tsconfig.json` 없음
- 빌드 파이프라인 누락 (TypeScript → JavaScript 컴파일)

**제안**:
```json
// tsconfig.json (루트에 추가)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "jsx": "react-native",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./components",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["components/**/*", "index.ts"],
  "exclude": ["node_modules", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

**package.json에 빌드 스크립트 추가**:
```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch"
}
```

---

### 3. 컴포넌트 Export 구조 개선 필요
**현재 문제**:
- `index.ts`가 직접 컴포넌트 폴더를 참조 → 빌드 후 경로 불일치 가능
- Phase 1~3 컴포넌트는 barrel export (`components/Button/index.ts`)
- Phase 4 컴포넌트는 직접 export → 일관성 부족

**제안 구조**:
```
components/
├── Modal/
│   ├── Modal.tsx
│   ├── Modal.test.tsx
│   ├── Modal.stories.tsx
│   ├── README.md
│   └── index.ts  ← 이거 만들기
```

각 컴포넌트 폴더에 `index.ts`:
```ts
// components/Modal/index.ts
export { Modal, type ModalProps, type ModalVariant, type ModalAction } from './Modal';
```

루트 `index.ts`:
```ts
export * from './components/Modal';
export * from './components/List';
// ...
```

---

### 4. Style Dictionary 통합 누락
**문제**:
- Phase 4 컴포넌트가 하드코딩된 값 사용:
  ```tsx
  minHeight: 72,  // 시니어 UX: 72px 이상 행 높이
  ```
- `build/react-native/theme`를 import 하지만, 일부 값은 하드코딩

**개선**:
```ts
// tokens/react-native.json에 추가
{
  "size": {
    "touchTarget": {
      "senior": { "value": 72 },  // 시니어 친화 터치 영역
      "wcag": { "value": 48 }     // WCAG 2.1 AA 최소값
    }
  }
}
```

```tsx
// components/List/List.tsx
import { customSizes } from '../../build/react-native/theme';

const styles = StyleSheet.create({
  item: {
    minHeight: customSizes.touchTargetSenior,  // 72px
  }
});
```

---

## ✅ Good Practices (칭찬할 점)

### 5. 접근성 (Accessibility) 우수
- `accessibilityRole`, `accessibilityState` 모든 컴포넌트 적용 ✅
- 터치 영역 48px 이상 (WCAG 2.1 AA) ✅
- 명확한 레이블 필수 (특히 Form 컴포넌트) ✅

### 6. 시니어 UX 고려
- Modal 기본 `dismissable: false` (실수 방지) ✅
- List 행 높이 72px (큰 터치 영역) ✅
- 명확한 피드백 (disabled, error 상태) ✅

### 7. 테스트 코드 작성
- 각 컴포넌트별 `.test.tsx` 존재 ✅
- 주요 시나리오 커버 (렌더링, 이벤트, 상태) ✅

### 8. Storybook 통합 준비
- `.stories.tsx` 파일 생성 완료 ✅

---

## 📋 TODO: CTO 작업 항목

### Phase 4 완료를 위한 필수 작업

1. **버그 수정** (우선순위: 최상)
   - [ ] Modal.tsx `action.press` → `action.onPress` 수정

2. **빌드 환경 구축**
   - [ ] `tsconfig.json` 추가
   - [ ] `package.json` 빌드 스크립트 추가
   - [ ] 빌드 테스트 실행 (`npm run build`)
   - [ ] 빌드 산출물 검증 (`dist/` 폴더)

3. **컴포넌트 Export 통일**
   - [ ] Phase 4 각 컴포넌트 폴더에 `index.ts` 추가
   - [ ] 루트 `index.ts` export 구조 정리

4. **Style Dictionary 확장**
   - [ ] `tokens/react-native.json`에 시니어 터치 영역 토큰 추가
   - [ ] 하드코딩된 값들 토큰으로 교체

5. **테스트 실행 검증**
   - [ ] Jest 환경 설정 확인
   - [ ] Phase 4 테스트 실행 (`npm test`)
   - [ ] Coverage 확인

6. **문서 업데이트**
   - [ ] `PROGRESS.md`: Phase 4 "✅ CTO 리뷰 완료" 추가
   - [ ] `CHANGELOG.md`: v0.4.0 준비
   - [ ] 각 컴포넌트 `README.md` 기술적 세부사항 보완

---

## 🎯 Phase 5 진입 전제 조건

Phase 5 (문서화 + Storybook 배포)를 시작하려면:

1. ✅ Phase 4 버그 수정 완료
2. ✅ 빌드 파이프라인 구축
3. ✅ 테스트 통과 (Phase 1~4 전체)
4. ✅ `package.json` v0.4.0 릴리스

**예상 소요**: 2~3시간 (CTO 단독)

---

## 💬 CPO에게

Phase 4 컴포넌트 설계와 UX 명세는 훌륭합니다! 👏  
특히 접근성과 시니어 UX 고려가 돋보입니다.

다만 CPO는 **기획/UX 담당**이므로:
- ✅ Props 명세, 사용 예시, 접근성 기준 정의
- ❌ 실제 코드 구현, 빌드, 테스트 환경 구축

앞으로는:
1. CPO → 컴포넌트 **명세서**(Spec) 작성 (Props, 상태, 접근성 요구사항)
2. CTO → 명세 기반 **구현** + 테스트 + 빌드 파이프라인

이렇게 역할 분담하면 더 효율적일 것 같습니다!

---

## 🚦 최종 판정

**Status**: ⚠️ **수정 필요 (Needs Work)**

**사유**:
- 1개 Critical 버그 (Modal props 오타)
- 빌드 환경 미구축 (TypeScript 컴파일 불가)
- 토큰 시스템 부분 누락

**다음 단계**:
1. CTO가 위 TODO 항목 수행
2. 수정 완료 후 Phase 4 정식 완료 선언
3. `v0.4.0` 릴리스
4. Phase 5 (문서화) 진입

---

**Reviewed by**: CTO  
**Date**: 2026-03-23  
**Next Review**: Phase 5 진입 전
