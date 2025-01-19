import { RouterConfigData } from "@dscl-ttg/types/app";
import React from "react";

const Error401 = React.lazy(() => import("@dscl-ttg/ui/Error401"));
const Error403 = React.lazy(() => import("@dscl-ttg/ui/Error403"));
const Error404 = React.lazy(() => import("@dscl-ttg/ui/Error404"));
const Error500 = React.lazy(() => import("@dscl-ttg/ui/Error500"));
const Error503 = React.lazy(() => import("@dscl-ttg/ui/Error503"));
const ComingSoon = React.lazy(() => import("@dscl-ttg/ui/ComingSoon"));
const Maintenance = React.lazy(() => import("@dscl-ttg/ui/Maintenance"));

const errorPageRoutes: RouterConfigData[] = [
  {
    path: ["/error-pages/error-401"],
    element: <Error401 />,
  },
  {
    path: ["/error-pages/error-403"],
    element: <Error403 />,
  },
  {
    path: ["/error-pages/error-404"],
    element: <Error404 />,
  },
  {
    path: ["/error-pages/error-500"],
    element: <Error500 />,
  },
  {
    path: ["/error-pages/error-503"],
    element: <Error503 />,
  },
  {
    path: ["/error-pages/coming-soon"],
    element: <ComingSoon />,
  },
  {
    path: ["/error-pages/maintenance"],
    element: <Maintenance />,
  },
];
export default errorPageRoutes;
