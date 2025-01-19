import { RadioButton, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({}) => {
  return (
    <Fragment>
      <GridItem>
        <TextField label="Layout Type" name="layout_type_name" />
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
