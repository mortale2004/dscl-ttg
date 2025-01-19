import { RadioButton, SelectField, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo } from "react";
import { UseFormReturn } from "react-hook-form";

type FormProps = {
  course:any;
  courseSem:any;
} & UseFormReturn;


const Form: React.FC<FormProps> = memo(({course, courseSem}) => {
  return (
    <Fragment>
      <GridItem>
        <TextField label="Paper" name="paper_name" />
      </GridItem>
      <GridItem>
        <TextField label="Paper" name="paper_code" />
      </GridItem>
      <GridItem>
        <SelectField
         label="Course" name="course_id" options={course?.data} optionLabelKey="course_name"/>
      </GridItem>
      <GridItem>
        <SelectField
         label="Course Sem" name="course_sem_id" options={courseSem?.data} optionLabelKey="course_sem_name"/>
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>
    </Fragment>
  );
});

export default Form;
