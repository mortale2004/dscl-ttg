import path from "path";
import {
  routeMethodExpressRouteMapping,
  routeMethodsArray,
  RoutesType,
  apiEndPoints,
  routeMethods,
} from "@dscl-ttg/constants";
import express, { Router } from "express";
import logger from "@dscl-ttg/logger";
const router: Router = express.Router();

// Dynamic controller import based on the controller name
const importController = async (moduleName: string, controllerName: string) => {
  try {
    const controllerPath = path.join(
      `../../../apps/backend/dist/controller/${moduleName}/${controllerName}.js`
    );
    const controller = await import(controllerPath);
    return controller[controllerName]; // Assuming constant export in the controller file
  } catch (error:any) {
    // logger.error(`Error importing controller: ${controllerName} :  ${error.stack}`);
  }
};

const handleMethodRoute = (method: string, route: string) => {
  switch (method) {
    case routeMethods.Get:
      return `${route}/:_id`;
    case routeMethods.Delete:
      return `${route}/:_id`;
    default:
      return route;
  }
};

// Generate routes dynamically
(async (apiEndPoints: RoutesType) => {
  const controllerNotSpecifiedForRoutes = [];
  const controllerNotFoundForRoutes = [];

  let controllerInstance: any;
  for (const module of Object.keys(apiEndPoints)) {
    for (const [routeName, { route, controller }] of Object.entries(
      apiEndPoints[module]
    )) {
      if (!controller) {
        controllerNotSpecifiedForRoutes.push(routeName);
      } else if (
        (controllerInstance = await importController(module, controller))
      ) {
        if (typeof route === "string") {
          // If the route is a string, generate all route methods
          routeMethodsArray.forEach((method) => {
            if (controllerInstance?.[method]) {
              // @ts-ignore
              router?.[routeMethodExpressRouteMapping[method]]?.(
                handleMethodRoute(method, route),
                controllerInstance[method]
              );
            }
          });
        } else {
          // If the route is an object, generate the specific method routes
          routeMethodsArray.forEach((method) => {
            if (controllerInstance?.[route[method] as any]) {
              // @ts-ignore
              router?.[routeMethodExpressRouteMapping[method]]?.(
                handleMethodRoute(method, route[method] as string),
                controllerInstance[route[method] as any]
              );
            }
          });
        }
      } else {
        controllerNotFoundForRoutes.push(routeName);
      }
    }
  }
  logger.error(
    `Controller not specified for route: ${controllerNotSpecifiedForRoutes.join(", ")}`
  );
  logger.error(
    `Controller not Found for route: ${controllerNotFoundForRoutes.join(", ")}`
  );
})(apiEndPoints);

export default router;
