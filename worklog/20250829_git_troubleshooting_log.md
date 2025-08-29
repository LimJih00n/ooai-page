# 2025년 8월 29일 Git 작업 로그: 브랜딩 일관성 확보 및 Push 권한 문제 해결

## 목표

-   웹사이트 전체의 브랜딩 일관성을 위해 모든 "labA" 문자열을 "LabA"로 변경한다.
-   로컬에서 수정한 내용을 GitHub 원격 저장소에 성공적으로 Push한다.

## 작업 절차 및 결과

1.  **브랜딩 수정**:
    -   `grep` 명령으로 "labA" 문자열이 포함된 파일을 검색했다.
    -   대상 파일:
        -   `components/diagrams/ResearchProcessComparison.tsx`
        -   `components/diagrams/DetailedServiceOfferings.tsx`
        -   `components/diagrams/ROICalculator.tsx`
        -   `app/page.tsx`
    -   `replace` 도구를 사용하여 각 파일의 "labA"를 "LabA"로 성공적으로 변경했다.

2.  **Git Push 시도 및 인증 문제 발생**:
    -   초기 `git push` 시도 시, 비밀번호 인증 방식이 더 이상 지원되지 않아 실패했다. (`Password authentication is not supported`)
    -   **해결 시도 1 (개인용 액세스 토큰 - PAT)**:
        -   사용자가 GitHub에서 PAT를 생성했다.
        -   CLI 환경의 제약으로 토큰을 직접 입력하는 과정이 원활하지 않아 실패했다.
    -   **해결 시도 2 (SSH 인증으로 전환)**:
        -   `git remote set-url` 명령으로 원격 저장소 주소를 HTTPS에서 SSH로 변경했다.
        -   `Host key verification failed` 오류 발생: `ssh-keyscan`으로 `github.com`을 `known_hosts`에 추가하여 해결.
        -   `Permission denied (publickey)` 오류 발생: `ssh-agent`에 올바른 SSH 키(`id_ed25519`)를 추가하여 해결.
        -   `~/.ssh/config` 파일을 생성하여 특정 호스트에 사용할 키를 명시적으로 지정하는 과정에서 경로 오타 등 여러 시행착오를 겪었다.

3.  **근본 원인 파악 및 해결**:
    -   반복적인 `Permission denied` 오류를 통해, GitHub 계정에 **SSH 공개키가 아예 등록되지 않았음**을 확인했다.
    -   `cat ~/.ssh/id_ed25519.pub` 명령으로 공개키 내용을 사용자에게 제공했다.
    -   사용자가 해당 공개키를 GitHub 계정(`satzmo`)에 성공적으로 등록했다.

4.  **협력자(Collaborator) 권한 문제**:
    -   SSH 키 등록 후 `push`를 시도했으나, `Permission to LimJih00n/ooai-page.git denied to satzmo` 오류가 발생했다.
    -   `satzmo` 사용자가 `LimJih00n/ooai-page` 저장소의 협력자로 등록되어 있지 않은 것이 원인이었다.
    -   저장소 소유자(`LimJih00n`)가 `satzmo`를 협력자로 초대하고, `satzmo`가 이를 수락하여 해결했다.

5.  **병합 충돌(Merge Conflict) 발생 및 해결**:
    -   `git push` 전, 원격 저장소의 변경사항을 가져오기 위해 `git pull`을 실행했다.
    -   `app/page.tsx` 파일에서 병합 충돌이 발생했다.
    -   충돌 내용을 분석하여, 원격 저장소의 변경사항("대한민국 연구실")과 로컬 변경사항("research@LabA.ai")을 모두 반영하는 방향으로 코드를 수동으로 수정하여 충돌을 해결했다.
    -   `git add` 및 `git commit -m "..."` 명령으로 병합 커밋을 생성했다.

6.  **최종 Push 성공**:
    -   모든 인증, 권한, 병합 문제가 해결된 후 `git push`를 다시 실행하여 원격 저장소에 모든 변경사항을 성공적으로 반영했다.

## 결론 및 교훈

-   GitHub Push 실패 시, 오류 메시지를 단계별로 정확히 분석하는 것이 중요하다. (비밀번호 인증 -> SSH 키 부재 -> 협력자 권한 -> 병합 충돌)
-   CLI 환경에서는 Git 인증 시 비밀번호/토큰 입력보다 SSH 키 방식이 훨씬 안정적이고 효율적이다.
-   `Permission denied (publickey)` 오류 발생 시, 로컬 키 설정뿐만 아니라 GitHub 계정에 공개키가 올바르게 등록되었는지 최우선으로 확인해야 한다.
-   협업 시에는 `push` 전에 항상 `pull`을 통해 원격 저장소의 최신 변경사항을 반영하는 습관이 중요하며, 충돌 발생 시 침착하게 해결해야 한다.
