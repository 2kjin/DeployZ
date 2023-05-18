# Jira Convention
Jira는 개발 이슈 트랙킹 용도로 사용합니다.

- 계층

  1. ![epic](/assets/epic.svg) (epic)
  2. ![story](/assets/story.svg) (story), 
  3. ![task](/assets/task.svg) (task)


- 이름 규칙

  - Epic은 대분류입니다. Front, Back 작업의 부모 항목입니다.
  - Front, Back 작업은 각각 프론트엔드 작업과 백엔드 작업 세부 이름입니다. (한글로 상세히 작성해 주세요)
  - 예시) ![story](/assets/story.svg) 유저 로그인 api 기능구현


- 이슈

  - 담당자, 우선순위, story point, Epic Link와 함께 이슈를 생성하세요.
  - Backlog 탭에서 이슈를 미리 만들어 놓고, 매주 월요일 아침 회의를 통해 이슈를 개인별로 할당합니다. 할당한 이슈를 스프린트에 옮겨놓으세요.
  - 해당 이슈를 완료하거나 작업을 시작했다면, Active sprints 탭에서 workflow (Todo, In-progress, Done)을 변경해주세요.


- Burndown Chart
  - 번다운 차트는 스프린트별 시간당 잔여 Story-point 를 추적합니다
  - 주차별 스프린트를 시작하기 전에 모든 이슈를 생성하고 할당해야 올바른 번다운 차트를 생성할 수 있습니다