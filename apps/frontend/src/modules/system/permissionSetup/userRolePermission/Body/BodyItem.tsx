import { Box, Checkbox, Typography } from "@mui/material";
import { permissions } from "@dscl-ttg/constants";
import { apiHooks } from "@dscl-ttg/hooks";
import { routeType, userRolePermissionType } from "@dscl-ttg/types/system";
import { Submit } from "@dscl-ttg/ui/Form";
import Tooltip from "@dscl-ttg/ui/Tooltip";
import React, { memo, useCallback, useEffect } from "react";

type BodyItemProps = {
  route: routeType & userRolePermissionType;
  userRoleId?: string;
};

const BodyItem: React.FC<BodyItemProps> = memo(({ route, userRoleId }) => {
  const [bodyData, setBodyData] = React.useState<any>(route);
  const onSuccess = () => {
    setBodyData((prev: any) => ({
      ...prev,
      isUpdated: false,
    }));
  };
  const { mutate, loading } = apiHooks?.userRolePermission?.useUpdate(
    {},
    onSuccess
  );

  useEffect(() => {
    if (route) {
      setBodyData({ ...route, user_role_id: userRoleId });
    }
  }, [route, userRoleId]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      if (checked) {
        setBodyData((prev: any) => ({
          ...prev,
          isUpdated: true,
          permissions: [...prev?.permissions, name],
        }));
      } else {
        setBodyData((prev: any) => ({
          ...prev,
          isUpdated: true,
          permissions: prev?.permissions.filter(
            (permission: any) => permission !== name
          ),
        }));
      }
    },
    [setBodyData]
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 2,
      }}
    >
      <Box
        sx={{
          width: "200px",
          fontSize: "12px",
        }}
      >
        <Tooltip title={route?.description}>
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {route?.route_name}
          </Typography>
        </Tooltip>
        {route?.ui_route && (
          <Typography
            sx={{
              fontSize: 12,
            }}
          >
            {route?.ui_route}
          </Typography>
        )}
        {route?.api_route && (
          <Typography
            sx={{
              fontSize: 12,
            }}
          >
            {route?.api_route}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
          gap: 2,
          fontSize: "12px",
        }}
      >
        {permissions.map((permission) => {
          const isChecked = bodyData?.permissions?.includes(permission._id);
          return (
            <Box
              sx={{
                width: "60px",
              }}
              key={permission._id}
            >
              <Checkbox
                checked={isChecked}
                name={permission._id}
                size="small"
                onChange={handleChange}
              />
            </Box>
          );
        })}
        <Box
          sx={{
            width: "60px",
          }}
        >
          <Submit
            size="small"
            disabled={!bodyData.isUpdated}
            loading={loading}
            onClick={() => {
              mutate(bodyData);
            }}
          >
            Save
          </Submit>
        </Box>
      </Box>
    </Box>
  );
});

export default BodyItem;
