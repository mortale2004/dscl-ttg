import React from "react";
import Crud from "@dscl-ttg/ui/Crud";
import Form from "./Form";
import { CrudDialogMode } from "@dscl-ttg/store";
import { userRegistrationSchema } from "@dscl-ttg/types/user";
import BasicFilterForm from "./FilterForm/BasicFilterForm";
import Container from "@dscl-ttg/ui/Container";

const UserRegistration = () => {
  return (
    <Container>
    <Crud
      componentName={componentName}
      hookName={hookName}
      getDeleteContent={getDeleteContent}
      headerProps={headerProps}
      tableHeaders={tableHeaders}
      tableDataKeys={tableDataKeys}
      getDefaultValues={getDefaultValues}
      FormComponent={Form}
      schema={schema}
      getFormData={getFormData}
      maxWidth="lg"
    />
    </Container>

  );
};

export default UserRegistration;

const headerProps = {
  hasExportButton: false,
  hasPrintButton: false,
  hasComponentName: false,
  hasFiltersForm: true,
  filterFormProps: {
    BasicFilterForm: BasicFilterForm,
    getFilters: (selected: any) => ({
      is_active: selected && "is_active" in selected ? selected.is_active : "",
    }),
  },
};

const getDefaultValues = (selected: any, mode: CrudDialogMode) => ({
  _id: mode === "update" ? selected?._id : "",
  username: selected?.username ? selected.username : "",
  password: selected?.password ? selected.password : "",
  first_name: selected?.first_name ? selected.first_name : "",
  last_name: selected?.last_name ? selected.last_name : "",
  father_name: selected?.father_name ? selected.father_name : "",
  primary_contact: selected?.primary_contact ? selected.primary_contact : "",
  secondary_contact: selected?.secondary_contact
    ? selected.secondary_contact
    : "",
  photo_url: selected?.photo_url ? selected.photo_url : "",
  email_address: selected?.email_address ? selected.email_address : "",
  gender_name: selected?.gender_name ? selected.gender_name : "",
  date_of_birth: selected?.date_of_birth ? selected.date_of_birth : "",
  user_role_id: selected?.user_role_id ? selected.user_role_id : "",
  is_deleted: selected && "is_deleted" in selected ? selected.is_deleted : false,
  is_active: selected && "is_active" in selected ? selected.is_active : true,

  paper_type_id: "",
  paper_id:"",
  papers: selected?.papers ? selected.papers : [],
  paper_ids: selected?.paper_ids ? selected.paper_ids : [],
});


const getFormData = (data: any) => {
  return {
    _id: data._id,
    username: data.username,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
    father_name: data.father_name,
    primary_contact: data.primary_contact,
    secondary_contact: data.secondary_contact,
    photo_url: data.photo_url,
    email_address: data.email_address,
    gender_name: data.gender_name,
    date_of_birth: data.date_of_birth,
    user_role_id: data.user_role_id,
    is_deleted: data.is_deleted,
    is_active: data.is_active,
    paper_ids: data?.papers?.map((paper: any) => paper._id),
  };
};

const schema = userRegistrationSchema.omit(["_id", "added_by", "added_on"]);

const componentName = "User";
const hookName = "userRegistration";

const tableDataKeys = [
  ({ first_name, last_name, father_name }: any) =>
    ` ${last_name} ${first_name} ${father_name}`,
  "username",
  "email_address",
  "primary_contact",
  "user_role_name",
  "is_active",
];

const tableHeaders = [
  "Name",
  "Useraname",
  "Email",
  "Primary Contact",
  "Role",
  "Status",
];

const getDeleteContent = (item: any) => {
  return `${item?.last_name} ${item?.first_name} ${item?.father_name} ${componentName}`;
};
