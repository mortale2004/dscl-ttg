import { apiHooks } from "@dscl-ttg/hooks";
import { RadioButton, SelectField, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({}) => {
  const { data: module } = apiHooks?.module?.useGetList({
    is_active: true,
  });

  return (
    <Fragment>
      <GridItem>
        <TextField label="Module" name="module_name" />
      </GridItem>
      <GridItem>
        <SelectField
          options={module?.data}
          optionLabelKey="module_name"
          label="Parent Module"
          name="parent_id"
        />
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
