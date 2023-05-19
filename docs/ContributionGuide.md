# Contribution Guide

## Contribution 절차
모든 Contribution은 [저장소에 이슈](https://github.com/alkwen0996/deployz/issues)를 남긴 후 [Pull Request를 보내는 것](https://github.com/alkwen0996/deployz/pulls)으로 합니다. 이슈를 통해 해당 내용에 기여가 필요한지 여부를 확인하고 협의하셔야 합니다.
(물론 이슈를 남기셨다고 해서 반드시 해당 문제를 개선하셔야 하는 것은 아니니, 마음 편히 이슈를 남겨주세요.)

## Pull Request 만들기

### Pull Request 만들기 전 : 주의사항
- 하나의 commit, branch, Pull Request(PR)에는 하나의 변경 사항만 담아주세요.
    - 여러 수정사항에 대해서는 각각 다른 branch에서 작업하신 뒤, 새로운 PR을 만들어주세요.
    - 새로운 branch가 아닌, 이미 PR를 만드셨던 branch에 추가 commit 시에는 이전 commit들과 함께 Pull Request가 생성됩니다.
- Pull Request를 만들기 전 문법 오류나 깨진 글자는 없는지 확인해주세요.
    - 기본적인 문법은 Markdown 문법을 지키면서 작성해주세요. 이미 번역된 문서들을 참고하셔도 좋습니다.
    - 번역 후에는 (내 컴퓨터에서) 빌드를 한 후, 문법 오류를 확인해주세요.
- 오류가 많거나 다른 PR의 commit이 섞여 있는 경우 해당 PR은 관리자가 닫을 수 있으니 주의해주세요.
- Commit 메시지 작성 규칙을 지켜주세요.

### Pull Request 만들기 : 생성하기
- PR 내용에 관련 이슈 번호 적어주기
    - 논의된 내용이 있다면 참고할 수 있도록 어떠한 이슈로부터 생성한 PR인지 알려주세요
- PR 설명하기
    - 이 PR을 통해 어떠한 것들이 변경되는지 알려주세요.

### Pull Request 만들기 : PR 생성 후 리뷰
- 리뷰 내용에 대한 추가 의견이 있을 경우 해당 리뷰에 댓글로 의견을 주고받습니다
- 변경 사항을 고치기로 하였다면, Pull Request를 만든 branch에 추가 commit을 합니다
- PR 생성 후 답변이 없는 경우 메일 아래의 관리자 이메일로 메일을 보내주세요.

## 버전 정보
Deployz는 원할한 Contribution을 위해 개발 환경을 동일하게 통일하고 있습니다.
아래와 같은 개발 환경에서 개발을 부탁드립니다.

```bash
테스트환경 : Ubuntu 20.04 LTS
```




### 문의
- 담당자 이메일 : alkwen0996@naver.com