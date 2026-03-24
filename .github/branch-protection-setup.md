# GitHub Branch Protection 설정 가이드

## main 브랜치 보호 설정 (GitHub 웹에서 수동 설정)
Repository Settings → Branches → Add branch ruleset

### 설정 항목
- ✅ Require a pull request before merging
  - Required approvals: 1
- ✅ Require status checks to pass
  - Status checks: CI (GitHub Actions)
- ✅ Restrict direct pushes (main 직접 push 금지)
- ✅ Require branches to be up to date

## 협업 규칙 (directives.md에 추가 예정)
1. feature 브랜치 수명 최대 48시간
2. PR 생성 시 @cto 또는 @cpo 태그 필수
3. 상대방 approve 없이 merge 불가
4. 작업 시작 전 `git pull origin main`
5. 매일 오전 10시 #design-system 작업 보고
