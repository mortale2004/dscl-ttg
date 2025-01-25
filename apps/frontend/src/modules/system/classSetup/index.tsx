import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import Department from "./department";
import Classroom from "./classroom";
import Course from "./course";
import CourseSem from "./courseSem";
import Division from "./division";
import DcyaMapping from "./dcyaMapping";
import AcademicYear from "./academicYear";
const ClassSetup = () => {
  return (
    <Container>
      <Tabs tabs={tabs} />
    </Container>
  );
};

export default ClassSetup;

const tabs: TabType[] = [
  {
    label:"Academic Year",
    path:"/class/academicyears",
    component:<AcademicYear/>
  },
  {
    label: "Department",
    path: "/class/departments",
    component: <Department />,
  },
  {
    label: "Classroom",
    path: "/class/classrooms",
    component: <Classroom />,
  },
  {
    label: "Course",
    path: "/class/courses",
    component: <Course />,
  },
  {
    label: "Course Sem",
    path: "/class/coursesems",
    component: <CourseSem />,
  },
  {
    label: "Division",
    path: "/class/divisions",
    component: <Division/>,
  },
  {
    label: "DCYA Mapping",
    path: "/class/dcyamappings",
    component: <DcyaMapping/>,
  }
];
