import { apiHooks } from "@dscl-ttg/hooks";
import { RadioButton, SelectField } from "@dscl-ttg/ui/Form";
import React, { Fragment, memo } from "react";

type BasicFilterFormProps = {};

const BasicFilterForm: React.FC<BasicFilterFormProps> = memo(({}) => {
  const { data: courseSem } = apiHooks?.courseSem?.useGetList({
    is_active: true,
  });
  return (
    <Fragment>
      <RadioButton
        required={false}
        fullWidth={false}
        name="is_active"
        label="Active"
      />
      <SelectField
        label="Course Sem"
        size="small"
        name="course_sem_id"
        options={courseSem?.data}
        optionLabelKey="course_sem_name"
        fullWidth={false}
        sx={{
          width:150,
        }}
      />
    </Fragment>
  );
});

export default BasicFilterForm;
