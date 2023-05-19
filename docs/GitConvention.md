# Git Convention

## Branch Convention

디렉터리 구조는 **frontend** 와 **backend** 로 구분됩니다. 각 개발자들은 해당 디렉터리로 이동 후 작업하면 됩니다.

```
├── frontend
└── backend
```

### Branch Types

- master: 제품으로 출시될 수 있는 브랜치<br>
- fe-develop: Frontend 개발 브랜치<br>
- be-develop: Backend 개발 브랜치<br>
- be-feature/기능명: Backend 기능 개발 브랜치<br>
- fe-feature/기능명: Frontend 기능 개발 브랜치<br>

<br>

![epic](/assets/git_flow.png)

- origin/be-develop 브랜치에서 작업 브랜치 생성<br>
- 작업 브랜치에서 작업<br>
- 작업 브랜치에서 소스를 커밋<br>
- 작업 브랜치를 origin에 push<br>
- Gitlab에서 작업 브랜치를 master에 합치도록 Merge Request 생성<br>

<br>


## Commit Convention
- 모든 커밋은 다음의 포맷을 지켜야 한다. 이때, 본문과 footer는 생략할 수 있다.

```bash
Type: Subject

[Body]

[Footer]
```

- Type은 다음의 종류를 확인하여 작성한다.
```bash
(gitmoji) <타입> : <제목>

<본문(optional)>

# 타입과 제목은 필수 입력, 최대 50글자
# 본문은 세 번째 줄부터 선택 입력, 최대 72글자

# --- COMMIT END ---
# <타입> 리스트
#   💫 chore             : 프로젝트 초기 구성등 기타사항.
#   ✨ feat              : 새로운 기능
#   ⛏ fix               : 버그 수정
#   💡 refactor          : 코드 리펙토링
#   🎨 style             : 스타일 (코드 포맷팅, 세미콜론 등 비즈니스 로직에 영향 없는 변경 사항)
#   💄 design            : CSS/UI 변경 내용
#   📝 docs              : 문서 (문서 추가, 수정, 삭제)
#   ✅ test              : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   ⚡ update            : 전반적인 수정사항
#   🔥 remove             : 삭제
#   🚧 in progress       : 아직 완성하지는 못했지만 진행중인 부분을 커밋해야할 경우
#   🚑 HOTFIX            : 급하게 치명적인 버그를 고쳐야 하는 경우
#   ➕ add dependency    : dependency 추가
#   ✏ typo fix          : 오탈자 수정
# ------------------
#     제목은 명령문으로(동사형태로 시작) - English only
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "무엇을", "왜"를 설명한다.
#     본문은 한 줄을 작성하고 . 마침표를 찍어서 분리한다.
# ------------------
# 위에 해당사항이 없는 부분은 Gitmoji를 참고하여 적절한 커밋메시지 사용할 것
```
- Subject는 무슨 작업을 수행했는지 기입합니다. 영어로 하지 않아도 괜찮습니다.
    - 영어로 작성 할 경우에는 명령문 형태로 작성하며, 첫 글자는 대문자로 작성합니다.


- Body는 왜 그 작업을 수행했는지 등의 부연 설명을 기입합니다. 영어로 하지 않아도 괜찮습니다.

- Footer는 issue tracker ID를 명시하는 용도로 사용합니다. 저희 프로젝트에서는 사용하지 않습니다.

## PR Convention
- PR 제목은 다음과 같이 작성합니다.

```bash
:emoji: Type: Subject

✨ Feat: 회원 가입 시 유효성 검사
```