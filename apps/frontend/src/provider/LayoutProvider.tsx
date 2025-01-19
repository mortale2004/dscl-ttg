import React, { memo, useMemo } from "react";
import AllLayouts from "@dscl-ttg/ui/Layout";
import { useRecoilValue } from "recoil";
import { authAtom, settingsSelector } from "@dscl-ttg/store";
import { useParams, useRoutes } from "react-router-dom";
import {
  anonymousStructure,
  authorizedStrucure,
  publicStructure,
} from "@routes/index";
import generateDynamicRoutesWithRoleAndPermissions from "@routes/routesUtil";

let Router = <></>;

const LayoutProvider = () => {
  const auth = useRecoilValue(authAtom);
  const settings = useRecoilValue<any>(settingsSelector);

  const Layout = useMemo(
    () => AllLayouts[auth.layout_type_name],
    [auth.layout_type_name],
  );

  const params = useParams();

  const initURL = useMemo(
    () => (params?.redirect ? params?.redirect : settings?.initialURL),
    [params?.redirect, settings?.initialURL],
  );

  const loginUrl = useMemo(
    () => `${settings?.loginURL}?redirect=${window.location.pathname}`,
    [params?.redirect, settings?.initialURL],
  );

  const memoizedData = useMemo(() => {
    const data = generateDynamicRoutesWithRoleAndPermissions({
      isAuthenticated: auth.isAuthenticated,
      userRole: auth.user_role_name,
      permissions: auth.permissions,
      anonymousStructure: anonymousStructure(initURL),
      authorizedStructure: authorizedStrucure(loginUrl, auth.user_role_name),
      publicStructure: publicStructure(initURL),
    });
    Router = <MemoizedRoutes routes={data.routes} />;
    return data;
  }, [
    auth.isAuthenticated,
    auth.user_role_name,
    auth.permissions,
    initURL,
    loginUrl,
  ]);

  return (
    <Layout
      routes={memoizedData.routes}
      routesConfig={memoizedData.routeConfig}
      Router={Router}
    />
  );
};

export default LayoutProvider;

const MemoizedRoutes = memo(({ routes }: { routes: any }) => {
  const Router = useRoutes(routes);
  return Router;
});
