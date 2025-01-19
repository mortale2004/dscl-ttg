import { useSetRecoilState } from "recoil";
import { useCreateData } from "./useApi";
import { authAtom, AuthAtomType, initialAuthAtom } from "@dscl-ttg/store";
import { apiEndPoints } from "@dscl-ttg/constants";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const handleAuthSuccess = (
  response: any,
  setAuth: any,
  navigator?: Function,
) => {
  setAuth({
    isLoading: false,
    isAuthenticated: true,
    user: response?.data,
    layout_type_name: response?.data?.layout_type_name,
    user_role_name: response?.data?.user_role_name,
    permissions: response?.data?.permissions,
  });
  navigator?.("/");
};

const handleAuthError = (setAuth: any, navigator: Function) => {
  setAuth((prev: AuthAtomType) => {
    if (prev.isAuthenticated) {
      navigator("/");
    }
    return {
      ...initialAuthAtom,
      isLoading: false,
    };
  });
};

export const useAuth = () => {
  const navigator = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

  const { mutate: login } = useCreateData(
    typeof apiEndPoints.user.userLogin.route === "string"
      ? apiEndPoints.user.userLogin.route
      : apiEndPoints.user.userLogin.route?.Create || "",
    undefined,
    (response: any) => handleAuthSuccess(response, setAuth, navigator),
    (_: any) => handleAuthError(setAuth, navigator),
  );

  const { mutate: logout } = useCreateData(
    typeof apiEndPoints.user.userLogout.route === "string"
      ? apiEndPoints.user.userLogout.route
      : apiEndPoints.user.userLogout.route?.Create || "",
    undefined,
    () => {
      setAuth({ ...initialAuthAtom, isLoading: true });
      navigator("/");
      setTimeout(() => {
        setAuth({ ...initialAuthAtom, isLoading: false });
      }, 300);
    },
  );

  const { mutate: userData } = useCreateData(
    typeof apiEndPoints.user.refreshToken.route === "string"
      ? apiEndPoints.user.refreshToken.route
      : apiEndPoints.user.refreshToken.route?.Create || "",
    undefined,
    (response: any) => handleAuthSuccess(response, setAuth, undefined),
    (_: any) => handleAuthError(setAuth, navigator),
  );

  return useMemo(
    () => ({
      login: login,
      logout: logout,
      userData: userData,
    }),
    [],
  );
};
