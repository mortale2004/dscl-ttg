import { USER_ROLE, UserRoleType } from "@dscl-ttg/constants";

export type AuthAtomType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user_role_name: UserRoleType;
  layout_type_name: string;
  user: any;
  permissions: any;
};

export const isSuperAdmin = (auth: AuthAtomType) => {
  return auth?.user_role_name === USER_ROLE.SUPER_ADMIN;
};

export const isRoutePermitted = (auth: AuthAtomType, route: any) => {
  if (isSuperAdmin(auth)) {
    return true;
  }
  return auth?.permissions[route]?.length > 0;
};

export const isRoutePermittedForMethod = (
  auth: AuthAtomType,
  route: any,
  method: string,
) => {
  if (isSuperAdmin(auth)) {
    return true;
  }
  return auth?.permissions[route]?.includes(method);
};
