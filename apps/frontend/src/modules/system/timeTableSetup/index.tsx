import React from "react";
import Tabs, { TabType } from "@dscl-ttg/ui/Tabs";
import Container from "@dscl-ttg/ui/Container";
import TimeSlot from "./timeSlot";
import TimeTable from "./timeTable1";
import ViewTimeTable from "./viewTimeTable";
const PaperSetup = () => {
  return (
      <Tabs tabs={tabs} />
  );
};

export default PaperSetup;

const tabs: TabType[] = [
  {
    label: "Time Slot",
    path: "/timetable/timeslots",
    component: <TimeSlot/>,
  },
  {
    label: "Time Table",
    path: "/timetable/timetable",
    component: <TimeTable/>,
  },
  {
    label:"View Time Table",
    path: "/timetable/viewtimetable",
    component:<ViewTimeTable/>,
  }
];
