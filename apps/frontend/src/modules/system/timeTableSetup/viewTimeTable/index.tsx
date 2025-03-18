import { apiHooks, useSearchParam } from "@dscl-ttg/hooks";
import { Form } from "@dscl-ttg/ui/Form";
import { Box, Button, Container } from "@mui/material";
import React, { useRef } from "react";
import FormComponent from "./FormComponent";
import TimeTableDisplay from "./TimeTableDisplay";

import {useReactToPrint} from 'react-to-print'

const ViewTimeTable = () => {
  const { searchParams, setSearchParams } = useSearchParam();

  const { data } = apiHooks?.timeTable?.useGetList(
    {
      dcya_id: searchParams?.dcya_id,
      group_by: "dcya_id",
    },
    {
      enabled: !!searchParams?.dcya_id,
    }
  );



  const printTableRef = useRef();

const onPrint  = useReactToPrint({
  contentRef: printTableRef,
  documentTitle: "Time Table",
})

  return (
    <Container>
      <Form
        onSubmit={setSearchParams}
        defaultValues={{
          academic_year_id: searchParams?.academic_year_id
            ? searchParams.academic_year_id
            : "",
          department_id: searchParams?.department_id
            ? searchParams.department_id
            : "",
          course_id: searchParams?.course_id ? searchParams.course_id : "",
          course_sem_id: searchParams?.course_sem_id
            ? searchParams.course_sem_id
            : "",
          day_number: searchParams?.day_number ? searchParams.day_number : "",
        }}
        FormComponent={(props:any)=> <FormComponent {...props} onPrint={onPrint}/>}
        submitButtonProps={{} as any}
      />
      <Box>

        {data?.data?.[0] ? 
        <TimeTableDisplay printTableRef={printTableRef} data={data?.data?.[0]||{}}/>
        : <></>}
      </Box>
    </Container>
  );
};

export default ViewTimeTable;
