# Design System — 의사결정 로그

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

### 준비 사항

**CPO (3/28까지)**
- [ ] BOKHAUS PRD 정리 + Figma 화면 목록 공유
- [ ] 핵심 플로우 5개 우선순위 정리 (시니어 앱 / 보호자 앱 / 어드민)
- [ ] Figma 컴포넌트 라이브러리 Phase 3 최종 점검

**CTO (3/28까지)**
- [ ] 기술 스택 확정안 (React Native vs Native, Next.js Admin)
- [ ] 시니어 UX 기술 요구사항 정리 (WCAG AAA 라이브러리, 테스트 도구)
- [ ] 개발 환경 템플릿 (Impeccable 포함 보일러플레이트)
- [ ] Frontend 팀 워크샵 자료 (Impeccable 실습, 시니어 UX 체크리스트)

### 킥오프 미팅 아젠다

**일시**: 2026-03-31 (월) 10:00-12:00  
**참석**: CPO, CTO, Frontend Lead, Backend Lead

**1부 (60분)**: 요구사항 정렬  
**2부 (60분)**: 실행 계획 (Sprint 1 범위, 역할 분담)

---

**다음 단계**
- [ ] 회장님 킥오프 일정 승인 확인
- [ ] zero-gravity-attendance (Expo) 적용 가능성 검토
- [ ] 1개월 후 Impeccable 효과 리뷰 회의 일정 잡기
