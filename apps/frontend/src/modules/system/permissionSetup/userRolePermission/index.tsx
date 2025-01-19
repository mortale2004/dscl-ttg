import { apiHooks, useSearchParam } from "@dscl-ttg/hooks";
import React, { Fragment, memo } from "react";
import Filter from "./Filter";
import Body from "./Body";
import { Box } from "@mui/material";

type UserRolePermissionProps = {};

const UserRolePermission: React.FC<UserRolePermissionProps> = memo(({}) => {
  const { searchParams } = useSearchParam();

  const { data: userRolePermission } = apiHooks?.userRolePermission?.useGetList(
    {
      user_role_id: searchParams?.user_role_id,
      build_hierarchy: true,
    },
    {
      enabled: !!searchParams?.user_role_id,
    }
  );

  return (
    <Fragment>
      <Filter />
      <Box sx={{
        height:"100%",
        overflow:'auto',
      }}>
      <Body data={userRolePermission?.data} userRoleId={searchParams?.user_role_id} />
      </Box>
    </Fragment>
  );
});

export default UserRolePermission;
