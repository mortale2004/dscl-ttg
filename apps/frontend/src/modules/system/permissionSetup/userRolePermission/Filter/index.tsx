import { Box } from "@mui/material";
import { apiHooks, useSearchParam } from "@dscl-ttg/hooks";
import { Form, SelectField } from "@dscl-ttg/ui/Form";
import React, { memo, useCallback, useMemo } from "react";

type FilterProps = {};

const Filter: React.FC<FilterProps> = memo(() => {
  const { data: userRole } = apiHooks?.userRole?.useGetList({
    is_active: true,
  });
  const { setParam, searchParams } = useSearchParam();
  const FormComponent = useCallback(() => {
    return (
      <Box className="flex-center">
        Assign Permissions By Role: &nbsp;
        <Box>
          <SelectField
            size="small"
            sx={{ width: "130px" }}
            name="user_role_id"
            label="User Role"
            options={userRole?.data}
            optionLabelKey="user_role_name"
            onChange={(e) => setParam("user_role_id", e.target.value)}
          />
        </Box>
      </Box>
    );
  }, [userRole?.data]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1,
        minWidth: 170,
        padding: 0,
      }}
    >
      <Form
        FormComponent={FormComponent}
        submitButtonProps={
          {
            isVisible: false,
          } as any
        }
        defaultValues={{
          user_role_id: (searchParams as any)?.user_role_id || "",
        }}
      />
    </Box>
  );
});

export default Filter;
