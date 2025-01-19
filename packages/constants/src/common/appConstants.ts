export const SYSTEM_CONSTANT = {
  PERMISSION: {
    GET: "Get Item",
    CREATE: "Create",
    UPDATE: "Update",
    DELETE: "Delete",
    GET_LIST: "Get List",
    EXPORT: "Export",
    PRINT: "Print",
  },
  GENDER:{
    MALE:"Male",
    FEMALE:"Female",
    OTHER:"Other"
}
};

export type UserRoleType =
  | "SUPER_ADMIN"
  | "PUBLIC"
  | "ADMIN"

type UserRoleObjType = {
  [key in UserRoleType]: UserRoleType;
};
export const USER_ROLE: UserRoleObjType = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};

export const USER_CONSTANTS = {
  USER_TYPE: {
    SYSTEM_USER: "System User",
    STUDENT: "Student",
  },
  USER_ROLE: USER_ROLE,
};

export const PAGE = 0;
export const PAGE_SIZE = 35;
export const permissions = Object.values(SYSTEM_CONSTANT.PERMISSION).map(
  (value) => ({
    _id: value,
  })
);
