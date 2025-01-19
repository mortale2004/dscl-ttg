import { authAtom } from "@dscl-ttg/store";
import Loader from "@dscl-ttg/ui/Loader";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "@dscl-ttg/hooks";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useRecoilValue(authAtom);
  const authMethods = useAuth();
  useEffect(() => {
    authMethods.userData({});
  }, [authMethods]);
  return auth.isLoading ? <Loader /> : <>{children}</>;
};
