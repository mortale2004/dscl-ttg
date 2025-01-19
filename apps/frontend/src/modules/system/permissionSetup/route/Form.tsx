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
        <SelectField
          options={module?.data}
          optionLabelKey="module_name"
          label="Module"
          name="module_id"
        />
      </GridItem>
      <GridItem>
        <TextField label="Route" name="route_name" />
      </GridItem>
      <GridItem>
        <TextField label="API Route" name="api_route" />
      </GridItem>
      <GridItem>
        <TextField label="UI Route" name="ui_route" />
      </GridItem>
      <GridItem>
        <TextField label="Description" name="description" required={false} multiline rows={3} />
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
