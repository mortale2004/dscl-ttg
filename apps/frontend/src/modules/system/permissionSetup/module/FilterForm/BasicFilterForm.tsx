import { RadioButton } from "@dscl-ttg/ui/Form";
import React, { Fragment, memo } from "react";

type BasicFilterFormProps = {};

const BasicFilterForm: React.FC<BasicFilterFormProps> = memo(({}) => {
  return (
    <Fragment>
      <RadioButton
        required={false}
        fullWidth={false}
        name="is_active"
        label="Active"
      />
    </Fragment>
  );
});

export default BasicFilterForm;
