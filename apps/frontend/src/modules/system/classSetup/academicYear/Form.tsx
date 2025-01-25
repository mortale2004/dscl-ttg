import { DateField, RadioButton, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({}) => {
  return (
    <Fragment>
      <GridItem>
        <TextField label="Academic Year" name="academic_year_name" />
      </GridItem>
      <GridItem>

        <DateField name="start_date" label="Start Date" />
        </GridItem>

        <GridItem>

        <DateField name="end_date" label="End Date" />
        </GridItem>
        <GridItem>
        <RadioButton name="is_current" label="Default" />
        </GridItem>
        
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
