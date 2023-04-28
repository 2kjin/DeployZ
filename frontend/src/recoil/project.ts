import { atom } from "recoil";

export const projectNameState = atom<String>({
  key: "projectName",
  default: "",
});
