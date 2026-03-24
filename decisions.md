# Design System — 의사결정 로그

## 2026-03-24: Phase 7-B 품질 강화 시작 (Lighthouse 실측)

**결정**: Lighthouse 자동 측정 + Viewport Meta Tag 수정  
**승인**: CTO (작업 진행 중)  
**날짜**: 2026-03-24 19:00

### 배경
- Phase 7 로드맵 확정 후 7-B 품질 강화 작업 즉시 시작
- Lighthouse 실측으로 베이스라인 확보 필요
- 목표: Accessibility 90점 달성

### 실행 내용

**1. Lighthouse 측정 (18개 컴포넌트)**
- 측정 대상: https://smk692.github.io/bokhaus-design-system
- 자동화 스크립트: `lighthouse-audit.sh` 작성
- 측정 결과: `lighthouse-reports/` (JSON 18개)

**측정 결과**:
- Accessibility: **87점** (목표 90점 대비 -3점)
- Best Practices: 96점 (우수)
- SEO: 91점 (양호)
- Performance: null (재측정 필요)

**2. 접근성 이슈 분석**
- 문제: Viewport meta tag `user-scalable=no` 설정
- 영향: 시니어 사용자 화면 확대 불가 (WCAG AAA 위반)
- 점수 영향: 약 13% (87점 → 90점 달성 방해)

**3. 즉시 수정 완료**
- 파일: `.storybook/preview-head.html`
- 변경: `user-scalable=yes`, `maximum-scale=5` 추가
- 커밋: `9194874` (fix(a11y): viewport meta tag 수정)
- GitHub Push: ✅ 완료
- 재배포: GitHub Actions 자동 진행 중

### 다음 단계 (7-B 계속)

**3/25 (내일)**:
- [ ] GitHub Pages 재배포 완료 확인
- [ ] Lighthouse 재측정 (90점 달성 확인)
- [ ] Impeccable `/audit` 21개 컴포넌트 심화 감사 시작

**3/26-27**:
- [ ] 12색 팔레트 WCAG AAA 대비 검증
- [ ] 터치 타겟 48px 전수 검증
- [ ] 키보드 네비게이션 테스트

**3/28 (최종)**:
- [ ] 최종 Lighthouse 측정
- [ ] 7-B 완료 보고

### 참고
- **Lighthouse 보고서**: `LIGHTHOUSE-REPORT-2026-03-24.md`
- **측정 스크립트**: `lighthouse-audit.sh`, `check-a11y.sh`
- **GitHub Actions**: https://github.com/smk692/bokhaus-design-system/actions

---

## 2026-03-24: Phase 7 로드맵 최종 확정

**결정**: 3+2 분할 (CPO + CTO 합의)  
**승인**: CPO + CTO + 회장님  
**날짜**: 2026-03-24 18:04

### 확정 로드맵

**7-A: 고급 컴포넌트 (2주 분할)**
- Week 1 (4/1~4/7): Drawer + Tabs + Stepper
- Week 2 (4/8~4/14): ErrorState/EmptyState + BottomSheet

**7-B: 품질 강화 (3/24~3/28, 즉시 시작)**
- Lighthouse 실측 검증
- 21개 컴포넌트 시니어 UX 심화 감사 (WCAG AAA)
- 12색 팔레트 색상 대비 전수 검증

**7-C: npm 패키지 + PoC 연동 (4/8~4/14)**
- `@sonmily/design-system` Public npm 배포 (무료)
- BOKHAUS PoC 연동 준비 (4/13~4/14)
- 출퇴근앱 통합 (BOKHAUS 이후)

**목표**: v1.1.0 (4/14) — 26개 컴포넌트, Lighthouse 90점, npm 배포

### 주요 결정사항

1. **컴포넌트 일정**: 5개 → 3+2 분할 (CTO 권고 채택)
   - Drawer 복잡도(★★★★★) 고려
   - ErrorState/EmptyState는 Phase 7 유지 (CPO 결정)

2. **npm 배포**: Public 배포 (B안) 우선 → 실패 시 A안(로컬 참조)
   - 무료 (Public 패키지)
   - `@sonmily` 네임스페이스 선점
   - 회장님 승인

3. **ErrorState 일러스트**: 불필요 (CPO 결정)
   - 아이콘 기반 (`react-native-vector-icons`)
   - 시니어 UX 원칙: 명확한 아이콘 + 텍스트 > 복잡한 일러스트

### 기술 준비 (CTO 담당)
- [ ] package.json 메타데이터 정리 (4/7까지)
- [ ] semantic-release 설정
- [ ] GitHub Release 자동화
- [ ] npm 조직 계정 생성 (회장님 승인 후)

---

## 2026-03-23: Impeccable 스킬 도입

**결정**: Impeccable (AI 디자인 가이드 시스템) 채택 및 커스터마이징  
**승인**: CPO + CTO + 회장님  
**적용 프로젝트**: wedding-invitation (시범), BOKHAUS (예정)

### 배경
- Claude Code로 프론트엔드 코드 생성 시 일관성 부족
- 시니어 UX (65+) 타겟 프로젝트에 접근성 기준 필요
- 한국어 UX 라이팅 가이드라인 부재

### 결정 사항
1. **Impeccable 기본 스킬 20개 설치**
   - `/audit`, `/normalize`, `/polish`, `/harden` 등
   - 프로젝트별 `.claude/` 디렉토리에 설치
   
2. **커스터마이징 레퍼런스 추가**
   - `senior-ux.md`: WCAG AAA, 48px 터치 타겟, 인지 부하 감소
   - `korean-ux-writing.md`: 존댓말, 명확한 에러 메시지, 복구 단계 제공

3. **실행 계획**
   - **이번 주**: wedding-invitation 설치, Lighthouse 베이스라인 측정
   - **다음 주**: Frontend 팀 워크샵 (1시간)
   - **2주 후**: GitHub Actions 자동화
   - **1개월 후**: 접근성 점수 +15점 목표 검증

### 기술 스택
- **라이선스**: Apache 2.0 (상업적 사용 가능)
- **호환성**: Claude Code (완벽), Cursor (Nightly), Codex CLI
- **설치 방식**: 프로젝트별 `.claude/` 또는 글로벌 `~/.claude/`

### 측정 지표
- Lighthouse 접근성 점수 (Before/After)
- 디자인 이슈 감소율 (GitHub Issues/Jira)
- Frontend 팀 만족도 (1개월 후 설문)

### 참고
- **설치 보고서**: `~/.openclaw/workspace/wedding-invitation/.claude/INSTALLATION-REPORT.md`
- **Git 커밋**: `972b8cf` (wedding-invitation)
- **레포지토리**: https://github.com/pbakaus/impeccable

---

## 2026-03-23: BOKHAUS 프론트엔드 킥오프 일정 확정

**결정**: 2026-03-31 (월) 오전 10시 킥오프  
**승인**: CPO + CTO (회장님 확인 대기)  
**근거**: 옵션 2 선택 — Impeccable 도구 학습 + 팀 워크샵 완료 후 시작

### 배경
- BOKHAUS 디자인 시스템 v0.6.0 (Phase 4 완료)
- Claude Code 이슈 대응: Impeccable 스킬 도입 우선
- 디자인-개발 협업 워크플로우 정립 필요

### 킥오프 의제
1. Impeccable 사용법 (30분)
   - `/audit`, `/normalize`, `/polish` 데모
   - 시니어 UX 레퍼런스 활용법
2. 협업 워크플로우 (20분)
   - Figma → Claude Code → GitHub PR
   - 디자인 QA 체크리스트
3. Q&A (10분)

### 준비물 (CTO 담당)
- [ ] Impeccable 설치 (프로젝트별)
- [ ] 시니어 UX 레퍼런스 문서 (`senior-ux.md`)
- [ ] 한국어 UX 라이팅 가이드 (`korean-ux-writing.md`)
- [ ] 데모 프로젝트 (샘플 화면 3개)

### 이후 일정
- **4월 1주**: BOKHAUS 5개 핵심 화면 선정 (CPO)
- **4월 2주**: 디자인 시스템 적용 + Lighthouse 90점 검증
- **4월 3-4주**: 나머지 화면 적용 + QA

---

## 2026-03-22: BOKHAUS 디자인 시스템 Phase 4 완료

**결정**: Typography, List 컴포넌트 구현 완료  
**승인**: CTO  
**상태**: v0.6.0 릴리스

### 완료 내역
- Typography 컴포넌트 (7가지 스타일)
  - Display, Heading, Subheading, Body, Caption, Overline, Code
  - 시니어 UX: 큰 기본 크기 (Body 18px), 충분한 행간 (1.6)
- List 컴포넌트 (4가지 변형)
  - 기본, 아이콘, 다중 라인, 액션

### 검증 완료
- `npx tsc --noEmit` ✅ 에러 없음
- `npm run build` ✅ 성공

### 남은 작업 (CPO 협업 필요)
- [ ] BOKHAUS 5개 핵심 화면 선정
- [ ] BOKHAUS 레포지토리 준비
- [ ] 디자인 시스템 적용 (5개 화면)
- [ ] Lighthouse 접근성 90점 검증
