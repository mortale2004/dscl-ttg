import { USER_ROLE } from "@dscl-ttg/constants";
import { RouterConfigData } from "@dscl-ttg/types/app";
import React from "react";
import { FaHome, FaPhoneSquareAlt } from "react-icons/fa";
import { MdOutlineHandshake } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

const Login = React.lazy(() => import("@modules/public/login"));

const publicRoutes: RouterConfigData[] = [
  {
    element: <Login />,
    title: "Login",
    type: "item",
    icon: <IoLogIn />,
    path: ["/login"],
    permittedRole: [USER_ROLE.PUBLIC],
  },
];
export default publicRoutes;
