import { USER_ROLE } from "@dscl-ttg/constants";
import { RouterConfigData } from "@dscl-ttg/types/app";
import React from "react";
import { BsFillClipboardFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import {
  MdDashboard,
  MdOutlineSatelliteAlt,
  MdSchool,
  MdSettings,
} from "react-icons/md";
import { PiRankingFill, PiUsersThreeFill } from "react-icons/pi";

const Dashboard = React.lazy(() => import("@modules/admin/dashboard"));

// System Routes
const PermissionSetup = React.lazy(
  () => import("@modules/system/permissionSetup")
);

const adminRoutes: RouterConfigData[] = [
  {
    element: <Dashboard />,
    title: "Home",
    type: "item",
    icon: <MdDashboard />,
    path: ["/admin/dashboard"],
    permittedRole: [USER_ROLE.SUPER_ADMIN],
  },
  {
    title: "System",
    type: "collapse",
    icon: <MdSettings />,
    permittedRole: [USER_ROLE.SUPER_ADMIN],
    path: ["/systemMenu"],
    children: [
      {
        element: <PermissionSetup />,
        title: "Permission Setup",
        type: "item",
        path: [
          "/permission/userrolepermissions",
          "/permission/layouttypes",
          "/permission/userroles",
          "/permission/modules",
          "/permission/routes",
        ],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      },
    ],
  }
];
export default adminRoutes;
