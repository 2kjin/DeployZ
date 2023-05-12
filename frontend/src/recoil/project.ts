import { atom } from "recoil";

export const projectIdxState = atom<number>({
  key: "projectIdxState",
  default: 0,
});

export const itemCountState = atom<number>({
  key: "itemCountState",
  default: 0,
});
