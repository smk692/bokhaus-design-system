# 디자인 시스템 작업 가이드

## 프로젝트 위치

이 프로젝트는 shared-memory에 있지만, **각자 workspace에서 클론하여 작업하는 것을 권장합니다.**

## CTO/CPO 작업 방법

### 초기 설정 (1회)

```bash
# CTO workspace
cd ~/.openclaw/workspace-cto
git clone https://github.com/smk692/bokhaus-design-system.git design-system-work
cd design-system-work
npm install

# CPO workspace  
cd ~/.openclaw/workspace-cpo
git clone https://github.com/smk692/bokhaus-design-system.git design-system-work
cd design-system-work
npm install
```

### 작업 흐름

1. **작업 시작**: 각자 workspace에서 branch 생성
2. **개발**: 로컬에서 테스트, Storybook 실행
3. **커밋**: Git으로 커밋 후 GitHub push
4. **공유**: shared-memory의 decisions.md에 결정사항만 기록

## shared-memory 역할

- **문서만 보관**: decisions.md, PROGRESS.md
- **코드는 GitHub**: Single Source of Truth
- **로컬 작업본**: 각자 workspace

## 왜 이렇게?

- node_modules (270MB)를 shared-memory에 두는 건 비효율적
- Git이 코드 동기화와 충돌 해결을 담당
- shared-memory는 가벼운 문서/결정사항만
