import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import TimeSlot from "./timeSlot";
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
    label: "Time Slot",
    path: "/timetable/timeslots",
    component: <TimeSlot/>,
  }
];
