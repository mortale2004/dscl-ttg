import { Box } from "@mui/material";
import React from "react";
import {
  userLoginPayloadSchema,
  userLoginPayloadType,
} from "@dscl-ttg/types/user";
import FormComponent from "./Form";
import { Form } from "@dscl-ttg/ui/Form";

import { useAuth } from "@dscl-ttg/hooks";

const defaultValues: userLoginPayloadType = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  return (
    <Box>
      <Form
        defaultValues={defaultValues}
        onSubmit={login}
        schema={userLoginPayloadSchema}
        submitButtonProps={{
          submitText: "Login",
          startIcon: null,
          fullWidth: true,
          isVisible: true,
        }}
        FormComponent={FormComponent}
      />
    </Box>
  );
};

export default LoginForm;
