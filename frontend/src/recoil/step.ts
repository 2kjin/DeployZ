import { atom } from "recoil";

export const stepState = atom<IStepItem[]>({
  key: "steps",

  default: [
    {
      number: 1,
      desc: "Project 설정 정보 입력",
      status: "now",
    },
    {
      number: 2,
      desc: "Item 정보 입력",
      status: "before",
    },
    {
      number: 3,
      desc: "Git 정보 입력",
      status: "before",
    },
    {
      number: 4,
      desc: "Nginx 설정 정보 입력",
      status: "before",
    },
  ],
});
