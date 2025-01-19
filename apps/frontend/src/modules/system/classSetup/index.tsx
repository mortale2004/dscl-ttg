import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import Department from "./department";
import Classroom from "./classroom";
import Course from "./course";
import CourseSem from "./courseSem";
import Division from "./division";
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
];
