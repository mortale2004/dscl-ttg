import { LAYOUT_TYPE, USER_ROLE, UserRoleType } from "@dscl-ttg/constants";
import { atom } from "recoil";

export type AuthAtomType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user_role_name: UserRoleType;
  layout_type_name: string;
  user: any;
  permissions: any;
};

export const initialAuthAtom: AuthAtomType = {
  isLoading: true,
  isAuthenticated: false,
  user_role_name: USER_ROLE.PUBLIC,
  layout_type_name: LAYOUT_TYPE.PUBLIC,
  user: {},
  permissions: {},
};

export const authAtom = atom<AuthAtomType>({
  key: "authAtom",
  default: initialAuthAtom,
});
