# Phase 2 Setup Plan - Figma Tokens 워크플로우 구축

> 작성: CTO | 날짜: 2026-03-22 | 상태: 진행 중

---

## 목표
브랜드 가이드라인 → Design Tokens → React Native 코드 자동 변환 파이프라인 구축

---

## 1. 기술 스택

### 1.1 핵심 도구
- **Style Dictionary** (Amazon): 토큰 → 플랫폼별 코드 변환
- **Figma Tokens Plugin**: Figma ↔ JSON 동기화
- **React Native Paper**: UI 라이브러리 (Material Design 3)

### 1.2 의존성
```json
{
  "style-dictionary": "^3.9.0",
  "react-native-paper": "^5.12.0"
}
```

---

## 2. 디렉토리 구조

```
design-system/
├── tokens/
│   ├── brand.json           # 브랜드 원천 토큰
│   ├── semantic.json        # 시맨틱 토큰 (alias)
│   └── platform/
│       └── react-native.json  # RN 특화 토큰
├── build/
│   ├── react-native/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── figma/
│       └── tokens.json      # Figma Tokens 플러그인용
└── config/
    └── style-dictionary.config.js
```

---

## 3. 작업 단계

### Step 1: 토큰 파일 생성 ✅ (진행 중)
- `tokens/brand.json` - 브랜드 가이드라인 Section 8 기반
- 색상/타이포그래피/간격 토큰 정의

### Step 2: Style Dictionary 설정
- `config/style-dictionary.config.js` 작성
- 변환 규칙 정의 (JSON → TypeScript)

### Step 3: 빌드 스크립트
- `npm run build:tokens` 명령 설정
- CI/CD 자동화 준비

### Step 4: React Native 통합
- Paper 테마 확장
- 토큰 기반 `theme.ts` 생성

### Step 5: 검증
- Button 컴포넌트 프로토타입 작성
- 토큰 적용 테스트

---

## 4. 예상 산출물

### 4.1 토큰 파일
- `tokens/brand.json` (4KB)
- `tokens/semantic.json` (2KB)

### 4.2 생성 코드
- `build/react-native/colors.ts`
- `build/react-native/typography.ts`
- `build/react-native/spacing.ts`
- `build/react-native/theme.ts`

### 4.3 문서
- `docs/token-usage.md` (개발자 가이드)

---

## 5. 타임라인

| 단계 | 소요 시간 | 상태 |
|------|-----------|------|
| Step 1 | 30분 | 🟡 진행 중 |
| Step 2 | 45분 | ⚪ 대기 |
| Step 3 | 30분 | ⚪ 대기 |
| Step 4 | 45분 | ⚪ 대기 |
| Step 5 | 30분 | ⚪ 대기 |

**Total**: ~3시간

---

## 6. CPO 확인 필요 항목

- [ ] 토큰 네이밍 규칙 (kebab-case vs camelCase)
- [ ] Figma Tokens 플러그인 sync 방식 (수동 vs 자동)
- [ ] 시맨틱 토큰 레이어 필요 여부

---

*다음 업데이트: Step 1 완료 시*
