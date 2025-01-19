import { atom } from "recoil";

export const dialogAtom = atom<boolean>({
  key: "dialogAtom",
  default: false,
});
