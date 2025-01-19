import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import PaperType from "./paperType";
import { Paper } from "@mui/material";
const PaperSetup = () => {
  return (
    <Container>
      <Tabs tabs={tabs} />
    </Container>
  );
};

export default PaperSetup;

const tabs: TabType[] = [
  {
    label: "Paper Type",
    path: "/paper/papertypes",
    component: <PaperType/>,
  },
  {
    label: "Paper",
    path: "/paper/papers",
    component: <Paper/>,
  }
  
];
