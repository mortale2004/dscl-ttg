import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import LayoutType from "./layoutType";
import UserRole from "./userRole";
import Module from "./module";
import Route from "./route";
import UserRolePermission from "./userRolePermission";
const PermissionSetup = () => {
  return (
    <Container>
      <Tabs tabs={tabs} />
    </Container>
  );
};

export default PermissionSetup;

const tabs: TabType[] = [
  {
    label: "Permissions",
    path: "/permission/userrolepermissions",
    component: <UserRolePermission />,
  },
  {
    label: "Layout Type",
    path: "/permission/layouttypes",
    component: <LayoutType />,
  },
  {
    label: "User Role",
    path: "/permission/userroles",
    component: <UserRole />,
  },
  {
    label: "Module",
    path: "/permission/modules",
    component: <Module />,
  },
  {
    label: "Route",
    path: "/permission/routes",
    component: <Route />,
  },
];
