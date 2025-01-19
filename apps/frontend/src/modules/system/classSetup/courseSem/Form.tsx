import { RadioButton, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({}) => {
  return (
    <Fragment>
      <GridItem>
        <TextField label="Course Sem" name="course_sem_name" />
      </GridItem>
      <GridItem>
        <TextField label="Sem Number" name="course_sem_number" type="number" />
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
