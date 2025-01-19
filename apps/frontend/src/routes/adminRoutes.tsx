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
// Class Routes
const ClassSetup = React.lazy(() => import("@modules/system/classSetup"));

// Paper Routes
const PaperSetup = React.lazy(() => import("@modules/system/paperSetup"));

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
      {
        element: <ClassSetup />,
        title: "Class Setup",
        type: "item",
        path: ["/class/departments", "/class/classrooms", "/class/courses", "/class/coursesems", "/class/divisions"],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      },
      {
        element: <PaperSetup />,
        title: "Paper Setup",
        type: "item",
        path: ["/paper/papertypes", "/paper/papers"],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      }
    ],
  }
];
export default adminRoutes;
