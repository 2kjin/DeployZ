import { instance } from "./api";

//사용자의 프로젝트 리스트를 보여주는 api
export const fetchProjectList = async () => {
  return instance.get(`/project`);
};

//하나의 프로젝트에 대한 상세 정보 api->
//아이템 리스트 화면으로 렌딩
export const fetchProjectDetail = async (projectIdx: number) => {
  return instance.get(`/item/${projectIdx}`);
};

//최근 빌드 시간 구하기
export const changeTime = (value: string) => {
  if (value === "") return "";
  // 문자열에서 Date 객체 생성
  const ts = new Date(value);
  const today = new Date();

  // 한국 표준시로 변환
  const korOffset = 9 * 60; // 한국 표준시는 UTC+9
  const korTs = new Date(
    ts.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
  );

  //오늘 날짜로 구하기
  const korToday = new Date(
    today.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
  );

  const tsDate = korTs.getDate();
  const todayDate = korToday.getDate();

  const tsHour = korTs.getHours();
  const todayHour = korToday.getHours();

  return `${todayDate - tsDate}days ${todayHour - tsHour}hr`;
};
