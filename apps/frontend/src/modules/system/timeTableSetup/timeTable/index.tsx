import { Form } from "@dscl-ttg/ui/Form";
import { Box } from "@mui/material";
import React, { Fragment } from "react";
import FormComponent from "./FormComponent";

const TimeTable = () => {
  return <Box sx={{
    px: 5,
  }}>
     <Form FormComponent={FormComponent} defaultValues={{
        time_slot_id:"",
        department_id:"",
        academic_year_id:"",
        course_id:"",
  }}/> 
  </Box>;
};

export default TimeTable;
