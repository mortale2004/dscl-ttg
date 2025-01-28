import { SYSTEM_CONSTANT } from "@dscl-ttg/constants";
import { generateOptions } from "@dscl-ttg/frontend-utils";
import { apiHooks } from "@dscl-ttg/hooks";
import { DateField, Header, RadioButton, SelectField, TextField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import Table from "@dscl-ttg/ui/Table";
import { IconButton, MenuItem } from "@mui/material";
import React, { Fragment, memo, useCallback, useMemo } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

type FormProps = {} & UseFormReturn;
const genders = generateOptions(SYSTEM_CONSTANT.GENDER);

const Form: React.FC<FormProps> = memo(({control}) => {
  const {data: userRole} = apiHooks?.userRole?.useGetList({
    is_active: true
  })
  return (
    <Fragment>
        <GridItem md={4}>
          <TextField name="last_name" label="Last Name" />
        </GridItem>
        <GridItem md={4}>
          <TextField name="first_name" label="First Name" />
        </GridItem>
        <GridItem md={4}>
          <TextField name="father_name" label="Father Name" />
        </GridItem>

     
        <GridItem md={4}>
          <TextField name="primary_contact" label="Primary Contact" />
        </GridItem>

        <GridItem md={4}>
          <TextField name="secondary_contact" label="Secondary Contact" />
        </GridItem>


        <GridItem md={4}> 
          <TextField name="email_address" label="Email Address" />  
        </GridItem>


        <GridItem md={4}>
          <DateField name="date_of_birth" label="Date of Birth" />
        </GridItem>

        <GridItem md={4}>
          <TextField name="username" label="Username" />
        </GridItem>

        <GridItem md={4}>
          <TextField name="password" label="Password" />
        </GridItem>

          <GridItem md={4}>
              <SelectField name="user_role_id" label="User Role"  options={userRole?.data} optionLabelKey="user_role_name"/>
          </GridItem>

        <GridItem md={4}>
          <SelectField name="gender_name" label="Gender" options={genders} optionLabelKey="_id" />
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
      paper_type_id: paper_type_id,
    },
    {
      enabled: !!paper_type_id,
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
