import { instance } from "./api";

//사용자의 프로젝트 리스트를 보여주는 api
export const fetchProjectList = async () => {
  return instance.get(`/api/project`);
};

//하나의 프로젝트에 대한 상세 정보 api->
//프로젝트 클릭 시 아이템 리스트 렌더링
export const fetchProjectDetail = async (projectIdx: number) => {
  return instance.get(`/api/item/${projectIdx}`);
};

//프로젝트 삭제 api
export const projectDelete = async (projectIdx: number) => {
  return instance.delete(`/api/project/${projectIdx}`);
};

//최근 빌드 시간 구하기
// export const changeTime = (value: string) => {
//   if (value === "" || value === null) return `이력 없음`;
//   // 문자열에서 Date 객체 생성
//   const ts = new Date(value);
//   const today = new Date();

//   // 한국 표준시로 변환
//   const korOffset = 9 * 60; // 한국 표준시는 UTC+9
//   const korTs = new Date(
//     ts.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
//   );

//   //오늘 날짜로 구하기
//   const korToday = new Date(
//     today.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
//   );

//   const tsDate = korTs.getDate();
//   const todayDate = korToday.getDate();

//   const tsHour = korTs.getHours();
//   const todayHour = korToday.getHours();

//   const tsMin = korTs.getMinutes();
//   const todayMin = korToday.getMinutes();

//   const tsSec = korTs.getSeconds();
//   const todaySec = korToday.getSeconds();

//   const leftDays = todayDate - tsDate;
//   const leftHours = todayHour - tsHour;
//   const leftMins = todayMin - tsMin;
//   const leftSecs = todaySec - tsSec;

//   if (leftDays > 0) {
//     return `${leftDays}days ${leftHours}hr ${leftMins}min ${leftSecs}sec`;
//   } else if (leftHours > 0) {
//     return `${leftHours}hr ${leftMins}min ${leftSecs}sec`;
//   } else if (leftMins > 0) {
//     return `${leftMins}min ${leftSecs}sec`;
//   } else if (leftSecs > 0) {
//     return `${leftSecs}sec`;
//   }
// };

export function changeTime(dateString: string) {
  if (dateString === "" || dateString === null) return `이력 없음`;

  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference =
    Math.abs(currentDate.getTime() - givenDate.getTime()) / 1000; // 차이를 초 단위로 계산

  // const seconds = Math.floor(timeDifference % 60); // 초 계산
  const minutes = Math.floor((timeDifference / 60) % 60); // 분 계산
  const hours = Math.floor((timeDifference / 3600) % 24); // 시간 계산
  const days = Math.floor(timeDifference / (3600 * 24)); // 일 계산
  const months = Math.floor(days / 30.436875); // 월 계산 (평균적인 한달의 일 수를 기준으로 계산)

  let result = "";
  if (months > 0) {
    result += `${months} mon `;
  }
  if (days > 0) {
    result += `${days} days `;
  }
  if (hours > 0) {
    result += `${hours} hr `;
  }
  if (minutes >= 0) {
    result += `${minutes} min `;
  }
  // if (seconds >= 0) {
  //   result += `${seconds} sec`;
  // }

  return result.trim();
}
