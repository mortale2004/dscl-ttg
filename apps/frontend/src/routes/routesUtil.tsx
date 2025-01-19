import { USER_ROLE, UserRoleType } from "@dscl-ttg/constants";
import { Navigate } from "react-router-dom";
import { RouteStructureType } from ".";
import React, { ReactNode } from "react";
import { RouterConfigData } from "@dscl-ttg/types/app";
import Error403 from "@dscl-ttg/ui/Error403";

const generateDynamicRoutesWithRoleAndPermissions = ({
  isAuthenticated = false,
  anonymousStructure = {},
  authorizedStructure = {},
  publicStructure = {},
  userRole = USER_ROLE.PUBLIC,
  permissions = {},
}) => {
  // Get data for each structure
  const anonymousRoutes = routesGenerator(
    isAuthenticated,
    anonymousStructure as RouteStructureType,
    "anonymous"
  );

  const authorizedRoutes = routesGenerator(
    isAuthenticated,
    authorizedStructure as RouteStructureType,
    "authorized",
    userRole,
    permissions
  );

  const publicRoutes = routesGenerator(
    isAuthenticated,
    publicStructure as RouteStructureType,
    "authorized",
    userRole
  );

  // // Concatenate all the routes and routeConfigs at once
  return {
    routes: Array().concat(
      anonymousRoutes.generatedRoutes,
      authorizedRoutes.generatedRoutes,
      publicRoutes.generatedRoutes
    ),
    routeConfig: Array().concat(
      anonymousRoutes.routeConfig,
      authorizedRoutes.routeConfig,
      publicRoutes.routeConfig
    ),
  };
};

const routesGenerator = (
  isAuthenticated: boolean,
  routeSet: RouteStructureType,
  type: string,
  userRole?: UserRoleType,
  permissions = {}
) => {
  const generatedRoutes: any[] = [];
  const fallbackPath = routeSet.fallbakPath || "";
  const isAnonymous = type === "anonymous";
  const isAuthorized = type === "authorized";

  if (routeSet?.routes) {
    const { routes } = routeSet;
    iterateRoutes(
      routes,
      generatedRoutes,
      fallbackPath,
      isAnonymous,
      isAuthorized,
      isAuthenticated,
      userRole,
      routeSet.unAuthorizedComponent,
      permissions
    );
  } else {
    console.log(`[routes] prop can't be found in ${type}Structure Object`);
  }

  return { generatedRoutes, routeConfig: routeSet.routes || [] };
};

const iterateRoutes = (
  routes: any[],
  generatedRoutes: any[],
  fallbackPath: string,
  isAnonymous: boolean,
  isAuthorized: boolean,
  isAuthenticated: boolean,
  userRole?: UserRoleType,
  unAuthorizedComponent?: ReactNode,
  permissions?: object
) => {
  routes.forEach((route) => {
    if (
      route?.children &&
      Array.isArray(route?.children) &&
      route?.children.length > 0
    ) {
      generatedRoutes.push(
        ...processRoute(
          userRole,
          permissions,
          route,
          isAuthenticated,
          unAuthorizedComponent,
          fallbackPath
        )
      );

      iterateRoutes(
        route?.children || [],
        generatedRoutes,
        fallbackPath,
        isAnonymous,
        isAuthorized,
        isAuthenticated,
        userRole,
        unAuthorizedComponent,
        permissions
      );
    } else {
      if (!route.path) {
        console.log(
          `A [route] is skipped because one of the following, No valid [path] prop provided for the route`
        );
      } else {
        if (isAnonymous) {
          for (const path of route?.path || []) {
            return generatedRoutes.push({
              element: route.element,
              path: path,
            });
          }
        }

        if (isAuthorized) {
          generatedRoutes.push(
            ...processRoute(
              userRole,
              permissions,
              route,
              isAuthenticated,
              unAuthorizedComponent,
              fallbackPath
            )
          );
          return generatedRoutes;
        }

        generatedRoutes.push(
          ...processRoute(
            userRole,
            permissions,
            route,
            isAuthenticated,
            null,
            fallbackPath
          )
        );

        return generatedRoutes;
      }
    }
  });
};

export default generateDynamicRoutesWithRoleAndPermissions;

const processRoute = (
  userRole: UserRoleType = USER_ROLE.PUBLIC,
  permissions: any,
  route: RouterConfigData,
  isAuthenticated: boolean,
  unAuthorizedComponent: ReactNode = <Error403 />,
  fallbackPath: string
) => {
  let generatedRoutes = [];
  if (isAuthenticated) {
    if (userRole == USER_ROLE.SUPER_ADMIN) {
      route.hasPermission = route.permittedRole?.includes(
        USER_ROLE.SUPER_ADMIN
      );
      for (const path of route?.path || []) {
        generatedRoutes.push({
          element: route.hasPermission ? route.element : unAuthorizedComponent,
          path: path,
        });
      }
    } else {
      let permittedCount = 0;
      for (const path of route?.path || []) {
        if (permissions?.[path]?.length > 0) {
          permittedCount++;
          generatedRoutes.push({
            element: route.element,
            path: path,
          });
        } else {
          generatedRoutes.push({
            element: unAuthorizedComponent,
            path: path,
          });
        }
      }
      route.hasPermission = permittedCount > 0;
    }
  } else {
    route.hasPermission = route.permittedRole?.includes(USER_ROLE.PUBLIC);
    if (route.hasPermission) {
      for (const path of route?.path || []) {
        generatedRoutes.push({
          element: route.element,
          path: path,
        });
      }
    } else {
      for (const path of route?.path || []) {
        generatedRoutes.push({
          element: <Navigate to={fallbackPath} replace />,
          path: path,
        });
      }
    }
  }

  return generatedRoutes;
};
