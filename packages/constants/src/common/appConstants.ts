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
},
  DAY: {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }
};

export type UserRoleType =
  | "SUPER_ADMIN"
  | "PUBLIC"
  | "ADMIN"
  | "TEACHER"

type UserRoleObjType = {
  [key in UserRoleType]: UserRoleType;
};
export const USER_ROLE: UserRoleObjType = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
  TEACHER: "TEACHER",
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
