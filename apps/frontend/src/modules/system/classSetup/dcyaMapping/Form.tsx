import { apiHooks } from "@dscl-ttg/hooks";
import { Header, RadioButton, SelectField, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import { Box, Icon, IconButton, MenuItem } from "@mui/material";
import React, { Fragment, memo, useCallback, useMemo } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { GiTurret } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Table from "@dscl-ttg/ui/Table"
type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({ control }) => {
  const { data: department } = apiHooks?.department?.useGetList({
    is_active: true,
  });

  const { data: course } = apiHooks?.course?.useGetList({
    is_active: true,
  });

  const { data: courseSem } = apiHooks?.courseSem?.useGetList({
    is_active: true,
  });

  const { data: division } = apiHooks?.division?.useGetList({
    is_active: true,
  });

  const { data: classroom } = apiHooks?.classroom?.useGetList({
    is_active: true,
  });

  const { data: academicYear } = apiHooks?.academicYear?.useGetList({
    is_active: true,
  });

  return (
    <Fragment>
      <GridItem md={6}>
        <SelectField
          name="academic_year_id"
          label="Academic Year"
          options={academicYear?.data}
          optionLabelKey="academic_year_name"
        />
      </GridItem>
      <GridItem md={6}>
        <SelectField
          name="department_id"
          label="Department"
          options={department?.data}
          optionLabelKey="department_name"
        />
      </GridItem>
      <GridItem md={6}>
        <SelectField
          name="course_id"
          label="Course"
          options={course?.data}
          optionLabelKey="course_name"
        />
      </GridItem>
      <GridItem md={6}>
        <SelectField
          name="course_sem_id"
          label="Course Sem"
          options={courseSem?.data}
          optionLabelKey="course_sem_name"
        />
      </GridItem>
      <GridItem md={6}>
        <SelectField
          name="classroom_id"
          label="Classroom"
          options={classroom?.data}
          optionLabelKey="classroom_name"
        />
      </GridItem>
      <GridItem md={6}>
        <SelectField
          name="division_id"
          label="Division"
          options={division?.data}
          optionLabelKey="division_name"
        />
      </GridItem>
      <GridItem>
        <RadioButton name="is_active" label="Active" />
      </GridItem>

      <GridItem>
        <Header>Paper Details</Header>
      </GridItem>

      <Papers control={control} /> 
    </Fragment>
  );
});

export default Form;

type PapersProps = {
  control: any;
};
const Papers: React.FC<PapersProps> = memo(({ control }) => {
  const {  remove, append } = useFieldArray({
    name: "papers",
    control: control,
  });

  const paper_type_id = useWatch({
    control: control,
    name: "paper_type_id",
  });
  const course_id = useWatch({
    control: control,
    name: "course_id",
  });

  const course_sem_id = useWatch({
    control: control,
    name: "course_sem_id",
  });

  const papers = useWatch({
    control: control,
    name: "papers",
  });

  const { data: paperType } = apiHooks?.paperType?.useGetList({
    is_active: true,
  });

  const { data: paper } = apiHooks?.paper?.useGetList(
    {
      is_active: true,
      course_id: course_id,
      course_sem_id: course_sem_id,
      paper_type_id: paper_type_id,
    },
    {
      enabled: !!paper_type_id && !!course_id && !!course_sem_id,
    }
  );


  const renderPaperOption = useCallback(
    (options: any[]) => {
      return options.map((option: any) => (
        <MenuItem
          key={option._id}
          value={option._id}
          onClick={(event: any) => {
            event.stopPropagation();
            event.preventDefault();
            append(option);
          }}
        >
          {" "}
          <IconButton sx={{p:0, pr:2,}}><IoAddCircleOutline/> </IconButton> {option.paper_code} {option.paper_name}
        </MenuItem>
      ));
    },
    [append]
  );



  const filteredPapers = useMemo(() => {
    return paper?.data?.filter((paper: any) => {
      return !papers.find((field: any) => field._id === paper._id);
    });
  }, [papers, paper?.data]);

  const tableBodyKeys = useMemo(()=>([
    (_:any, index:number)=> index+1,
    "paper_type_name",
    "paper_code",
    "paper_name",
    (_:any, index:number)=> <IconButton color="error" onClick={() => remove(index)}><MdDelete/></IconButton>
  ]),[remove])
  return (
    <Fragment>
      <GridItem md={3}>
        <SelectField
          name="paper_type_id"
          label="Paper Type"
          options={paperType?.data}
          optionLabelKey="paper_type_name"
        />
      </GridItem>
      <GridItem md={9} className="space-between">
        <SelectField
          name="paper_id"
          label="Paper"
          options={filteredPapers}
          renderOptions={renderPaperOption}
        />
      </GridItem>

      <GridItem>
        <Table data={papers} tableBodyKeys={tableBodyKeys}  tableHeaders={tableHeaders}/>
      </GridItem>
    </Fragment>
  );
});

const tableHeaders = [
  "#",
  "Paper Type",
  "Paper Code",
  "Paper Name",
  "Action",
];
