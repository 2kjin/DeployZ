import { instance } from "./api";

//아이템 상세 정보 보여주는 api -> itemDetail
export const fetchItemDetail = async (containerIdx: number) => {
  return instance.get(`/item/detail/${containerIdx}`);
};

//빌드 시간 변경하기
export const changeBuildTime = (value: string) => {
  if (value === "") return "";
  // 문자열에서 Date 객체 생성
  const ts = new Date(value);

  // 한국 표준시로 변환
  const korOffset = 9 * 60; // 한국 표준시는 UTC+9
  const korTs = new Date(
    ts.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
  );

  // 년, 월, 일, 시, 분 구하기
  const year = korTs.getFullYear();
  const month = korTs.getMonth() + 1;
  const date = korTs.getDate();
  const hour = korTs.getHours();
  const minute = korTs.getMinutes();
  const second = korTs.getSeconds();

  if (hour <= 9) {
    return `${year}.${month}.${date} 0${hour}:${minute}:${second}`;
  } else {
    return `${year}.${month}.${date} ${hour}:${minute}:${second}`;
  }
};
