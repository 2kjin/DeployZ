import { atom } from "recoil";

export const projectIdxState = atom<number>({
  key: "projectIdxState",
  default: 0,
});
