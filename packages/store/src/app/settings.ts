import { selector } from "recoil";
import { authAtom } from "../auth";
import { LayoutSetting } from "@dscl-ttg/constants";

export const settingsSelector = selector({
  key: "settingsSelector",
  get: ({ get }) => {
    const auth = get(authAtom);
    return LayoutSetting[auth.layout_type_name];
  },
});
