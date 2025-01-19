export type UserRoleType = "SUPER_ADMIN" | "PUBLIC" | "ADMIN";

export type RouterConfigData = {
  element?: any;
  title?: string;
  icon?: any;
  type?: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: UserRoleType[];
  color?: string;
  count?: number;
  path?: string[];
  hasPermission?: boolean;
};
