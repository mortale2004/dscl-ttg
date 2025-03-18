import { RadioButton } from "@dscl-ttg/ui/Form";
import React, { Fragment, memo } from "react";

type BasicFilterFormProps = {};

const BasicFilterForm: React.FC<BasicFilterFormProps> = memo(({}) => {
  return (
    <Fragment>
      <RadioButton
        required={false}
        fullWidth={false}
        name="is_break_slot"
        label="Break Slot"
      />
    </Fragment>
  );
});

export default BasicFilterForm;
