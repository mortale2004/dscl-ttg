import { userRolePermissionType } from "@dscl-ttg/types/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@dscl-ttg/ui/Accordion";
import React, { memo } from "react";
import { Box, Checkbox } from "@mui/material";
import { permissions } from "@dscl-ttg/constants";
import BodyItem from "./BodyItem";
import { Submit } from "@dscl-ttg/ui/Form";

type DataItemType = {
  module_name: string;
  children: DataItemType[];
  routes: userRolePermissionType[];
} & userRolePermissionType;

type BodyProps = {
  data: DataItemType[];
  userRoleId?: string;
};

const Body: React.FC<BodyProps> = memo(({ data, userRoleId }) => {
  return data?.map((item, index) => {
    return (
      <Accordion key={index}>
        <AccordionSummary>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: "200px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              {item.module_name}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
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
              {permissions.map((permission) => (
                <Box
                  sx={{
                    width: "60px",
                  }}
                  key={permission._id}
                >
                  {permission._id}
                </Box>
              ))}
              <Box
                sx={{
                  width: "60px",
                }}
              >
                Actions
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: "200px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Route Details
            </Box>
            <Box
              sx={{
                flexGrow: 1,
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
              {permissions.map((permission) => (
                <Box
                  sx={{
                    width: "60px",
                    fontSize: "12px",
                  }}
                  key={permission._id}
                >
                  <Checkbox size="small" />
                </Box>
              ))}
              <Box
                sx={{
                  width: "60px",
                }}
              >
                <Submit size="small">Save</Submit>
              </Box>
            </Box>
          </Box> */}

          {item?.routes?.map((route, index) => (
            <BodyItem
              key={index}
              route={route as any}
              userRoleId={userRoleId}
            />
          ))}

          <Box
            sx={{
              mt: 3,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              pb: 3,
            }}
          ></Box>
          {item?.children?.length > 0 && (
            <Body data={item.children} userRoleId={userRoleId} />
          )}
        </AccordionDetails>
      </Accordion>
    );
  });
});

export default Body;
