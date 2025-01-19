import { atom } from "recoil";

export const confirmDialogAtom = atom<boolean>({
  key: "confirmDialogAtom",
  default: false,
});
