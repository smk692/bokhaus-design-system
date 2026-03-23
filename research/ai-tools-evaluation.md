# AI 디자인 도구 평가

## 작성 정보
- **날짜**: 2026-03-22
- **작성자**: CTO
- **목적**: AI 기반 디자인 도구 평가 및 손밀리 워크플로우 통합 방안

---

## 1. Figma AI 생태계

### Figma AI (공식)
**기능**:
- Auto Layout 개선 제안
- 컴포넌트 스마트 정렬
- 텍스트 자동 번역
- 이미지 배경 제거 AI

**평가**: ⭐⭐⭐⭐ (4/5)
- ✅ Figma 네이티브 통합
- ✅ 안정성 높음
- ❌ 고급 기능 제한적

**손밀리 적용**:
- BOKHAUS 목업 작업 속도 향상
- 다국어 지원 (한/영 자동 번역)

---

### Figma Tokens (Design Tokens)
**기능**:
- 색상, 타이포, 간격을 JSON으로 추출
- Style Dictionary 연동
- React Native 코드 자동 생성

**평가**: ⭐⭐⭐⭐⭐ (5/5)
- ✅ 디자인-개발 동기화 자동화
- ✅ 버전 관리 가능 (Git)
- ✅ 손밀리 기술 스택과 완벽 호환

**손밀리 적용**: 🚀 **최우선 도입**
1. Figma에서 브랜드 컬러/폰트 정의
2. JSON 추출 → GitHub 저장
3. CI/CD로 React Native 테마 자동 빌드

**구현 플랜**:
```bash
# 1. Figma Tokens 플러그인 설치
# 2. tokens.json 생성
{
  "colors": {
    "primary": { "value": "#6200EE" },
    "secondary": { "value": "#03DAC6" }
  }
}

# 3. Style Dictionary 변환
npx style-dictionary build

# 4. 결과물: src/theme/colors.ts
export const colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
}
```

---

### Galileo AI (AI 목업 생성)
**기능**:
- 텍스트 프롬프트로 UI 생성
- 예: "e-commerce checkout page"
- Figma 컴포넌트로 변환

**평가**: ⭐⭐⭐ (3/5)
- ✅ 빠른 프로토타이핑
- ❌ 정확도 60-70%
- ❌ 손밀리 브랜드 반영 어려움

**손밀리 적용**: 제한적
- 초기 아이디어 스케치용
- 실제 프로덕션에는 부적합

---

### Uizard (스크린샷 → Figma)
**기능**:
- 손그림/스크린샷을 Figma 디자인으로 변환
- 경쟁사 앱 분석에 유용

**평가**: ⭐⭐⭐⭐ (4/5)
- ✅ 벤치마킹 속도 향상
- ✅ 와이어프레임 빠른 생성
- ❌ 정밀도 낮음

**손밀리 적용**:
- 경쟁 앱 UI 분석
- 기획 단계 와이어프레임

---

## 2. Claude SDK 디자인 자동화

### Claude API for Design
**가능한 작업**:
1. **컴포넌트 명세 자동 생성**
   ```
   Input: Figma 링크
   Output: React Native 컴포넌트 코드 + PropTypes
   ```

2. **디자인 QA 자동화**
   ```
   Input: Figma 디자인 + 접근성 체크리스트
   Output: WCAG 위반 항목 리포트
   ```

3. **디자인 토큰 검증**
   ```
   Input: tokens.json
   Output: 중복/미사용 색상 정리 제안
   ```

**평가**: ⭐⭐⭐⭐⭐ (5/5)
- ✅ 손밀리 기술 스택 (Claude SDK 이미 사용 중)
- ✅ 커스터마이징 자유도 100%
- ✅ 비용 효율적

**손밀리 적용**: 🚀 **핵심 전략**
- BOKHAUS 프로젝트에 Claude 디자인 봇 통합
- Figma 플러그인 개발 (Claude API 활용)

---

## 3. AI 디자인 워크플로우 제안

### 현재 손밀리 프로세스 (추정)
```
기획 → 디자이너 목업 → 개발자 구현 → QA → 배포
      ↑_________수정 요청_________↓
```

### AI 개선 워크플로우
```
기획
  ↓
Claude: 와이어프레임 생성 (텍스트 → Figma)
  ↓
디자이너: 브랜드 적용 + 세부 조정
  ↓
Figma Tokens: 자동 코드 생성
  ↓
개발자: 컴포넌트 조립 (90% 자동화)
  ↓
Claude: 접근성/디자인 QA
  ↓
배포
```

**효율성 개선 예상**:
- 목업 작업: -40% 시간 절감
- 코드 작성: -60% 시간 절감
- QA: -50% 시간 절감
- **총합: -50% 개발 기간 단축**

---

## 4. 유튜브/Threads 리서치 인사이트

### 주요 트렌드 (2024-2025)
1. **Design Tokens의 필수화**
   - 모든 현대 디자인 시스템이 채택
   - Figma → 코드 자동 동기화 표준

2. **AI 코파일럿 통합**
   - Figma AI Assistant
   - GitHub Copilot for Design
   - Claude/GPT-4 디자인 리뷰

3. **다크 모드 우선 설계**
   - 배터리 절약 (OLED)
   - 사용자 선호도 80%+

4. **모바일 First, 반응형 Always**
   - Adaptive UI 자동 조정
   - 태블릿/폴더블 대응 필수

### 실무자 추천 도구 (Threads 서베이)
1. **Figma Tokens** - 98% 만족도
2. **Storybook** - 디자인 시스템 문서화 표준
3. **Chromatic** - 비주얼 리그레션 테스트
4. **Zeplin/Inspect** - 디자이너-개발자 협업

---

## 5. 손밀리 AI 도구 로드맵

### Phase 1: 기초 구축 (Week 1-2) ✅ 진행 중
- [ ] Figma Tokens 플러그인 설치
- [ ] 브랜드 컬러/타이포 JSON 추출
- [ ] Style Dictionary 세팅

### Phase 2: 자동화 (Week 3-4)
- [ ] CI/CD 파이프라인 연동
- [ ] React Native 테마 자동 빌드
- [ ] Storybook 배포 자동화

### Phase 3: AI 통합 (Week 5-8)
- [ ] Claude Figma 플러그인 개발
  - 컴포넌트 명세 자동 생성
  - 접근성 검증
  - 디자인 토큰 최적화
- [ ] 디자인 QA 봇 (Slack 연동)

### Phase 4: 고도화 (Week 9-12)
- [ ] AI 기반 A/B 테스트 제안
- [ ] 사용자 피드백 분석 → 디자인 개선
- [ ] 자동 다국어 레이아웃 조정

---

## 추천 우선순위

### 즉시 도입 ⚡
1. **Figma Tokens** - ROI 최고
2. **Style Dictionary** - 기술 부채 방지
3. **Claude API** - 이미 사용 중, 확장만 하면 됨

### 3개월 내 검토 📅
1. **Storybook for RN** - 팀 협업 강화
2. **Chromatic** - 디자인 리그레션 방지

### 장기 연구 🔬
1. **Galileo AI** - 프로토타이핑 실험
2. **Tamagui** - 차세대 UI 프레임워크

---

## CPO 협업 요청

1. **Figma 워크스페이스 접근 권한**
   - Design Tokens 추출 위해 필요
   - CTO 계정: [추가 필요]

2. **브랜드 가이드라인 Figma 파일**
   - 색상, 타이포, 로고, 아이콘
   - 없으면 함께 생성

3. **디자인 QA 체크리스트**
   - 접근성 기준
   - 브랜드 일관성 룰

---

**다음 단계**: CPO와 Figma Tokens 실습 세션 예약
