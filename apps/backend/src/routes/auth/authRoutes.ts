import { getEndPoint } from "@dscl-ttg/utils";
import { apiEndPoints, routeMethods } from "@dscl-ttg/constants";
import express, { Router } from "express";
import { authController } from "src/controller/auth/authController";

const router: Router = express.Router();
const userLoginEndPoint = getEndPoint(
  apiEndPoints.user.userLogin.route,
  routeMethods.Create,
);
const refreshTokenEndPoint = getEndPoint(
  apiEndPoints.user.refreshToken.route,
  routeMethods.Create,
);

const userLogoutEndPoint = getEndPoint(
  apiEndPoints.user.userLogout.route,
  routeMethods.Create,
);

const userDataEndPoint = getEndPoint(
  apiEndPoints.user.userData.route,
  routeMethods.Create,
);

const userRegisterEndPoint = getEndPoint(
  apiEndPoints.user.userRegister.route,
  routeMethods.Create,
);

router.post(userLoginEndPoint, authController.login);
router.post(refreshTokenEndPoint, authController.refreshToken);
router.post(userLogoutEndPoint, authController.logout);
router.post(userDataEndPoint, authController.userData);
router.post(userRegisterEndPoint, authController.register);

export default router;
