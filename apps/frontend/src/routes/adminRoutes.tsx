import { USER_ROLE } from "@dscl-ttg/constants";
import { RouterConfigData } from "@dscl-ttg/types/app";
import React from "react";
import { FaUserSecret } from "react-icons/fa";
import {
  MdDashboard,
  MdSettings,
} from "react-icons/md";

const Dashboard = React.lazy(() => import("@modules/admin/dashboard"));

// System Routes
const PermissionSetup = React.lazy(
  () => import("@modules/system/permissionSetup")
);
// Class Routes
const ClassSetup = React.lazy(() => import("@modules/system/classSetup"));

// Timetable Routes 
const TimeTableSetup = React.lazy(() => import("@modules/system/timeTableSetup"));

// Paper Routes
const PaperSetup = React.lazy(() => import("@modules/system/paperSetup"));

// User Routes
const UserRegistration = React.lazy(() => import("@modules/user"));

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
        path: [ "/class/dcyamappings", "/class/academicyears", "/class/departments", "/class/classrooms", "/class/courses", "/class/coursesems", "/class/divisions"],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      },
      {
        element: <PaperSetup />,
        title: "Paper Setup",
        type: "item",
        path: ["/paper/papertypes", "/paper/papers"],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      },
      {
        element: <TimeTableSetup />,
        title: "Time Table Setup",
        type: "item",
        path: ["/timetable/timeslots", "/timetable/timetable", "/timetable/viewtimetable"],
        permittedRole: [USER_ROLE.SUPER_ADMIN],
      },
    ],
   
  },
  {
    element: <UserRegistration/>,
    title: "Users",
    type: "item",
    path: ["/userregistrations"],
    permittedRole: [USER_ROLE.SUPER_ADMIN],
    icon: <FaUserSecret/>
  }
];
export default adminRoutes;
