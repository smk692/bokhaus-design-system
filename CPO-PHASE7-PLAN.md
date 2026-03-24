# 디자인 시스템 Phase 7 기획안

> **작성자**: CPO  
> **작성일**: 2026-03-24  
> **검토 요청**: CTO  
> **상태**: 📋 회장님 승인 대기

---

## 현재 달성 현황 (Phase 1~6 완료 ✅)

| Phase | 완료 내용 | 상태 |
|-------|----------|------|
| Phase 1 (리서치) | 벤치마킹, 기술스택, 브랜드 가이드라인 | ✅ |
| Phase 2 (토큰) | Design Tokens, Style Dictionary 빌드 파이프라인 | ✅ |
| Phase 3 (Critical) | Button / Typography / Input / Card / Toast | ✅ |
| Phase 4 (High) | Modal / List / Avatar / Badge / Form | ✅ |
| Phase 5 (Navigation) | AppBar / BottomNavigation / DatePicker / Chip / Progress | ✅ |
| Phase 6 (통합) | Storybook 배포 / BOKHAUS 5개 화면 통합 / v1.0.0 릴리스 | ✅ |

**전체 진행률: 100% v1.0.0 Production Ready**

---

## Phase 7 목표

> **핵심 목표**: 디자인 시스템을 실제 PoC 런치 레디 상태로 강화 + 고급 컴포넌트 확장

Phase 7은 3개 트랙으로 병렬 진행합니다.

---

## 7-A: 고급 컴포넌트 (Advanced Components)

> v1.1.0 목표 — BOKHAUS 추가 화면 및 출퇴근앱 커버리지 확장

### Drawer (사이드 내비게이션)
- **용도**: 보호자 앱 메뉴, 어드민 대시보드 사이드바
- **Variants**: Left / Right / Persistent / Temporary
- **접근성**: 포커스 트랩(focus trap), 배경 클릭 닫기, `aria-modal`
- **시니어 UX**: 80px 너비 아이템, 명확한 섹션 구분선
- **Props 명세**:
  ```
  open: boolean
  onClose: () => void
  anchor?: 'left' | 'right'
  items: DrawerItem[]
  ```

### Tabs (탭 뷰)
- **용도**: BOKHAUS 홈 (기분/활동/기록), 어드민 대시보드 탭
- **Variants**: Top / Bottom / Scrollable
- **접근성**: `role="tablist"`, 키보드 좌우 이동, 선택 상태 명확
- **시니어 UX**: 최소 3개 탭 제한 권고 (인지 부하 감소)

### Stepper (단계 진행)
- **용도**: BOKHAUS 온보딩 (5단계), 출퇴근 기록 흐름
- **Variants**: Horizontal / Vertical / Dots
- **접근성**: 현재 단계, 완료/대기 상태를 텍스트로도 표현
- **시니어 UX**: 큰 번호 + 단계 텍스트 병행 표시

### ErrorState / EmptyState
- **용도**: 네트워크 오류, 데이터 없음 화면 (v1.1 이관 항목)
- **Variants**: Network Error / No Data / Permission Denied / Loading Failed
- **시니어 UX**: 원인 설명 + 구체적 복구 단계 제공 (예: "Wi-Fi를 확인하세요")
- **접근성**: `role="alert"`, 오류 아이콘 + 텍스트 병행

### BottomSheet
- **용도**: 모바일 액션 메뉴, 상세 정보 표시
- **Variants**: Basic / Sticky Header / Scrollable
- **접근성**: 포커스 관리, 스와이프 + 버튼 닫기 병행
- **시니어 UX**: 큰 드래그 핸들, 최소 60px 항목 높이

---

## 7-B: 품질 강화 (Quality Hardening)

> 실측 기반 접근성 검증 + 시니어 사용자 테스트

### Lighthouse 실측 검증
- **현재**: WCAG 2.1 AA 코드 레벨 준수 확인 (추정 91점)
- **목표**: 각 화면 Lighthouse 접근성 90점 이상 실측 확인
- **담당**: CTO (Expo 웹 실행) + CPO (결과 검토 및 개선 방향 제시)
- **방법**:
  ```
  1. Expo 웹 포트 충돌 해결 (PORT=19007 또는 Storybook 활용)
  2. 5개 화면 각각 Lighthouse 측정
  3. 90점 미만 항목 → CPO 우선순위 분류 → CTO 수정
  ```

### 시니어 UX 심화 감사 (CPO 주도)
- **대상**: Phase 1~6 구현 21개 컴포넌트 전체
- **기준**: WCAG 2.1 AAA 항목 중 시니어 핵심 항목
- **항목**:
  - [ ] 터치 영역 56×56px 전수 확인 (기준: WCAG 2.5.5)
  - [ ] 포커스 표시 4px 이상 + 고대비 (기준: WCAG 2.4.11)
  - [ ] 에러 메시지 → 복구 단계 포함 여부 (기준: WCAG 3.3.4)
  - [ ] 인지 부하 감소: 화면당 액션 최대 5개 이하 검토
  - [ ] 텍스트 크기 재조정 200% 에서 레이아웃 깨짐 없음

### 색상 대비 전수 검증 (CPO)
- **도구**: Figma Contrast 플러그인 + axe DevTools
- **기준**: 일반 텍스트 7:1 (AAA), 대형 텍스트 4.5:1 (AA)
- **12색 팔레트** 전체 조합 매트릭스 작성
- **산출물**: `ACCESSIBILITY.md` 색상 대비표 업데이트

---

## 7-C: npm 패키지 배포 + BOKHAUS PoC 연동

> 실제 개발팀이 `npm install` 한 줄로 사용 가능한 상태로 완성

### npm 패키지 배포 (`@sonmily/design-system`)
- **방침**: Public npm 배포 우선 → 실패 시 로컬 참조(`file:../`) 전환 (회장님 확정 2026-03-24)
- **담당**: CTO (기술) + CPO (패키지 문서 검수)
- **작업**:
  - [ ] `package.json` → `@sonmily/design-system` 이름 확정
  - [ ] `main`, `types`, `exports` 필드 설정 (트리 셰이킹 최적화)
  - [ ] `peerDependencies` 명시 (react-native 버전 범위)
  - [ ] `@sonmily` npm 조직 계정 생성 (무료 Public 플랜)
  - [ ] semantic-release 설정 + GitHub Release 자동화
  - [ ] npmjs.com 퍼블리시 (`npm publish --access public`)
  - [ ] BOKHAUS 프로젝트에서 로컬 링크 → npm 패키지 전환 테스트
- **버전 전략**: 시맨틱 버전(semver) — `1.0.0` (stable) → `1.1.0` (Phase 7)
- **Fallback**: 계정 이슈/충돌 시 로컬 참조로 전환

### BOKHAUS PoC 연동 준비 (CPO 주도)
- **킥오프**: 2026-03-31 (월) 오전 10시 (기존 확정)
- **CPO 준비물** (3/28까지):
  - [ ] BOKHAUS PRD 정리 (시니어 앱 핵심 플로우 5개)
  - [ ] Figma 화면 목록 (디자인 시스템 컴포넌트 매핑)
  - [ ] Phase 7 컴포넌트 우선순위 (PoC 필요 컴포넌트 vs 나중)
  - [ ] 시니어 사용자 테스트 시나리오 초안 (5개 태스크)

### 출퇴근앱 통합 (CTO 주도, CPO 검수)
- **핵심**: DatePicker/TimePicker → 출퇴근 기록 흐름
- **화면**: 출퇴근 기록 / 히스토리 / 어드민 대시보드
- **우선순위**: BOKHAUS 이후 진행

---

## 전체 Phase 7 로드맵

```
[완료] Phase 1~6: v1.0.0 릴리스 (21개 컴포넌트)
   ↓
[3/24~3/28] Phase 7-B: 품질 강화 (Lighthouse 실측 + 접근성 감사)
   ↓
[3/28] CPO → CTO → 회장님 보고 (품질 결과 + npm 패키지 계획)
   ↓
[3/31] BOKHAUS 킥오프 (CPO + CTO, 오전 10시)
   ↓
[4/01~4/07] Phase 7-A: 고급 컴포넌트 (Drawer + Tabs + Stepper + ErrorState + BottomSheet)
   ↓
[4/07~4/14] Phase 7-C: npm 패키지 배포 + BOKHAUS 통합 시작
   ↓
[4/14] v1.1.0 릴리스 — PoC 연동 준비 완료 🎉
```

---

## 컴포넌트 우선순위 (Phase 7)

| 우선순위 | 컴포넌트 | 이유 |
|---------|---------|------|
| P0 (필수) | Drawer, Tabs | BOKHAUS 킥오프 전 필요 |
| P0 (필수) | ErrorState, EmptyState | v1.1 이관 항목 — PoC 전 필수 |
| P1 (높음) | Stepper | 온보딩 플로우 핵심 |
| P1 (높음) | BottomSheet | 모바일 UX 필수 패턴 |
| P2 (보통) | npm 패키지 | 개발팀 사용성 향상 |

---

## 예상 산출물

### v1.1.0 릴리스 (4/14 목표)
- **신규 컴포넌트**: 5개 (Drawer / Tabs / Stepper / ErrorState / BottomSheet)
- **총 컴포넌트**: 26개
- **Storybook 스토리**: 추가 15~20개
- **npm 패키지**: `@sonmily/design-system@1.1.0`
- **품질**: Lighthouse 접근성 90점 이상 (실측)

### 문서 업데이트
- `CHANGELOG.md`: v1.1.0 섹션
- `ACCESSIBILITY.md`: 색상 대비표 + 시니어 감사 결과
- `README.md`: npm 패키지 설치 방법 추가

---

## CPO 결정 사항

- **시니어 PoC 우선**: Phase 7 컴포넌트는 BOKHAUS PoC 필요 항목 선행
- **품질 실측 필수**: 추정 점수 아닌 실측 Lighthouse 점수로 PoC 보고서 작성
- **접근성 기준 유지**: WCAG 2.1 AA 필수 + AAA 시니어 핵심 항목 추가 준수
- **측정 지표**: npm 다운로드 수, BOKHAUS 화면 커버리지(%), Lighthouse 접근성 점수

---

*CPO 작성 | CTO 검토 완료 ✅ | 회장님 승인 대기*

---

## CTO 검토 반영 사항 (2026-03-24 합의)

| 항목 | CPO 원안 | CTO 검토 | 확정 |
|------|---------|---------|------|
| 7-A 일정 | 5개 7일 | 3+2 분할 권고 | **3+2 분할 채택** |
| ErrorState | Phase 8 이관 권고 | Phase 7 유지(CPO 주장) | **Phase 7 유지** (PoC 전 필수) |
| npm 계정 | CPO 결정 요청 | 기술 준비 4/7 완료 약속 | **회장님 승인 후 진행** |
| ErrorState 에셋 | 일러스트 필요 여부 불명확 | 아이콘 기반 동의 | **react-native-vector-icons 기반** |

### 확정 Phase 7 로드맵
- **3/24~3/28**: 7-B 품질 강화 (Lighthouse 실측 + 21개 감사 + 12색 팔레트)
- **4/1~4/7**: Drawer + Tabs + Stepper (Week 1)
- **4/8~4/14**: ErrorState/EmptyState + BottomSheet + npm 배포 (Week 2)
- **4/14**: v1.1.0 릴리스 (26개 컴포넌트)
