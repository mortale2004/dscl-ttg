import { apiHooks } from "@dscl-ttg/hooks";
import { RadioButton, SelectField, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({}) => {
  const { data: layoutType } = apiHooks?.layoutType?.useGetList({
    is_active: true,
  });

  return (
    <Fragment>
      <GridItem>
        <TextField label="Role Name" name="user_role_name" />
      </GridItem>

      <GridItem>
        <TextField label="Role Weight" name="user_role_weight" type="number" />
      </GridItem>

      <GridItem>
        <SelectField
          label="Layout"
          name="layout_type_id"
          options={layoutType?.data}
          optionLabelKey="layout_type_name"
        />
      </GridItem>

      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
