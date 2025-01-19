import bcrypt from "bcrypt";
import {
  UnauthorizedError,
  verifyAccessToken,
  verifyRefreshToken,
} from "@dscl-ttg/backend-utils";
import userLoginDas from "src/das/user/userLoginDas";
import { UnauthenticatedError } from "@dscl-ttg/backend-utils";
import { handleLogout } from "src/controller/auth/authController";
import { Request, Response } from "express";
/**
 * Service for handling user authentication.
 */
class AuthenticationService {
  /**
   * Hash the given password.
   * @param {string} password Password to hash.
   * @returns {string} Hashed password.
   */
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compares user's password hash with the given password.
   * @param {string} passwordHash Password hash to compare.
   * @param {string} password Password to compare.
   * @returns {boolean} True if passwords match, false otherwise.
   */
  async comparePassword(password?: string, passwordHash?: string) {
    if (!passwordHash || !password) {
      return false;
    }
    try {
      return bcrypt.compare(password, passwordHash);
    } catch (error) {
      return false;
    }
  }

  async authenticateWithRefreshToken(
    req: Request,
    res: Response,
    refreshToken?: string
  ) {
    if (!refreshToken) {
      throw new UnauthenticatedError("EMPTY!");
    }

    // TODO: Redis Implementation
    const user = verifyRefreshToken(refreshToken);

    if (
      !(await userLoginDas.getRecord({
        user_id: user._id,
        refresh_token: refreshToken,
      }))
    ) {
      throw new UnauthenticatedError("Too Many Devices Connected!");
    }

    return user;
  }

  async authenticateWithAccessToken(
    req: Request,
    res: Response,
    accessToken?: string
  ) {
    if (!accessToken) {
      throw new UnauthorizedError("EMPTY!");
    }

    // TODO: Redis Implementation
    const user = verifyAccessToken(accessToken);
    if (
      !(await userLoginDas.getRecord({
        user_id: user._id,
        access_token: accessToken,
      }))
    ) {
      throw new UnauthorizedError("Too Many Devices Connected!");
    }
    return user;
  }
}

export default new AuthenticationService();
