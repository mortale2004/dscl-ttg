import { theme } from "./theme";

export const APP_CURRENCY = "INR";
export const LAYOUT_TYPE = {
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};
export const LayoutSetting = Object.freeze({
  [LAYOUT_TYPE.ADMIN]: {
    currency: APP_CURRENCY,
    menuStyle: "rounded-reverse",
    layoutTypeName: LAYOUT_TYPE.ADMIN,
    headerType: "FIXED",
    loginURL: "/login",
    initialURL: "/admin/dashboard",
    footer: false,
    sidebar: {
      borderColor: "#757575",
      menuStyle: "default",
      allowSidebarBgImage: false,
      sidebarBgImageId: 1,
      sidebarBgColor: "#0e0e0ede",
      sidebarTextColor: "#fff",
      sidebarHeaderColor: "#fff",
      sidebarMenuSelectedBgColor: "#6e3a4b",
      sidebarMenuSelectedTextColor: "#fff",
    },
    theme: theme,
  },
  [LAYOUT_TYPE.PUBLIC]: {
    currency: APP_CURRENCY,
    menuStyle: "default",
    layoutTypeName: LAYOUT_TYPE.PUBLIC,
    loginURL: "/login",
    initialURL: "/login",
    headerType: "FIXED",
    permissions: {},
    footer: true,
    sidebar: {
      borderColor: "#757575",
      menuStyle: "default",
      allowSidebarBgImage: false,
      sidebarBgColor: "#fff",
      sidebarTextColor: "rgba(0, 0, 0, 0.87)",
      sidebarHeaderColor: "#fff",
      sidebarMenuSelectedBgColor: "#313541",
      sidebarMenuSelectedTextColor: "#fff",
    },
    theme: theme,
},
});
