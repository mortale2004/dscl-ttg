import React, { ReactNode } from "react";
import publicRoutes from "@routes/publicRoutes";
import { RouterConfigData, UserRoleType } from "@dscl-ttg/types/app";
import { Navigate } from "react-router-dom";
import Error403 from "@dscl-ttg/ui/Error403";
import errorPageRoutes from "@routes/errorPageRoutes";
import adminRoutes from "@routes/adminRoutes";

export type RouteStructureType = {
  fallbakPath?: string;
  unAuthorizedComponent?: ReactNode;
  routes: RouterConfigData[];
  userRole?: UserRoleType;
};

export const authorizedStrucure: (
  loginUrl: string,
  userRole: UserRoleType,
) => RouteStructureType = (loginUrl: string, userRole: UserRoleType) => ({
  fallbackPath: loginUrl,
  unAuthorizedComponent: <Error403 />,
  routes: adminRoutes,
  userRole: userRole,
});

export const publicStructure: (initialUrl: string) => RouteStructureType = (
  initialUrl: string,
) => ({
  fallbackPath: initialUrl,
  routes: publicRoutes,
});

export const anonymousStructure: (initialUrl: string) => RouteStructureType = (
  initialUrl: string,
) => {
  const anonymousStructureRoutes: RouterConfigData[] = [
    {
      path: ["/"],
      element: <Navigate to={initialUrl} />,
    },
    {
      path: ["*"],
      element: <Navigate to="/error-pages/error-404" />,
    },
  ];
  return {
    routes: anonymousStructureRoutes.concat(errorPageRoutes),
  };
};
