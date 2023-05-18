import axios from "axios";
import { instance } from "./api";

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
  const month =
    korTs.getMonth() + 1 < 10
      ? `0${korTs.getMonth() + 1}`
      : korTs.getMonth() + 1;
  const date = korTs.getDate() < 10 ? `0${korTs.getDate()}` : korTs.getDate();
  const hour =
    korTs.getHours() < 10 ? `0${korTs.getHours()}` : korTs.getHours();
  const minute =
    korTs.getMinutes() < 10 ? `0${korTs.getMinutes()}` : korTs.getMinutes();
  const second =
    korTs.getSeconds() < 10 ? `0${korTs.getSeconds()}` : korTs.getSeconds();
  return `${year}.${month}.${date} ${hour}:${minute}:${second}`;
};

//아이템 상세 정보 보여주는 api -> itemDetail
export const fetchItemDetail = async (containerIdx: number) => {
  return instance.get(`/item/detail/${containerIdx}`);
};

export const requestDeploy = async (itemIdx: number) => {
  return instance.post(`/deploy/${itemIdx}`);
};
