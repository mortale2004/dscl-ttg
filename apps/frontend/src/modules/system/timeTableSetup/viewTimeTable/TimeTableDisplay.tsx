import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { SYSTEM_CONSTANT } from "@dscl-ttg/constants";

// Get day names from system constants
const dayNames = Object.entries(SYSTEM_CONSTANT.DAY).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {}
);

const TimeTableDisplay = ({ data, printTableRef }) => {
  const {
    academic_year_name,
    division_name,
    course_name,
    course_short_name,
    course_sem_name,
    classroom_name,
    time_tables,
  } = data;

  // Group time slots by days
  const timeSlotsByDay = useMemo(() => {
    const slotsByDay = {};

    // Initialize all days with empty arrays
    Object.keys(dayNames).forEach((dayNumber) => {
      slotsByDay[dayNumber] = [];
    });

    // Populate with actual data
    time_tables.forEach((dayData) => {
      slotsByDay[dayData.day_number] = [...dayData.time_slots].sort((a, b) => {
        // Sort by start time
        return new Date(a.start_time) - new Date(b.start_time);
      });
    });

    return slotsByDay;
  }, [time_tables]);

  // Get all unique time slots across all days for table headers
  const allTimeSlots = useMemo(() => {
    const slots = new Map();

    Object.values(timeSlotsByDay).forEach((daySlots) => {
      daySlots.forEach((slot) => {
        slots.set(slot.time_slot_id, {
          id: slot.time_slot_id,
          name: slot.time_slot_name,
          startTime: new Date(slot.start_time),
        });
      });
    });

    // Sort time slots by start time
    return Array.from(slots.values()).sort((a, b) => a.startTime - b.startTime);
  }, [timeSlotsByDay]);

  // Function to find slot for a specific day and time
  const findSlot = (dayNumber, timeSlotId) => {
    return timeSlotsByDay[dayNumber]?.find(
      (slot) => slot.time_slot_id === timeSlotId
    );
  };

  // Render slot content
  const renderSlotContent = (slot) => {
    if (!slot) return "-";

    if (slot.is_break_slot) {
      return (
        <Box sx={{ textAlign: "center", p: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {slot.break_name}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {slot.paper_code} - {slot.paper_name}
        </Typography>
        <Typography variant="caption">
          {slot.teacher_last_name} {slot.teacher_first_name}{" "}
          {slot.teacher_father_name}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        "@media print": {
          p: 2, // Padding
          "@page": {
            marginLeft: "10px", // Set margins for printing
            marginRight: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            border: "2px solid black", // Border for the printed page
            padding: "10px",
          },
          // Optional: you can add additional styles for elements during print
          // Example: hide elements with a specific class when printing
          ".no-print": {
            display: "none",
          },
        },
      }}
      ref={printTableRef}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          {course_short_name} {course_sem_name} - Division {division_name}
        </Typography>
        <Typography variant="subtitle1">
          {course_name} | Academic Year: {academic_year_name} | Classroom:{" "}
          {classroom_name}
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Day
              </TableCell>
              {allTimeSlots.map((timeSlot) => (
                <TableCell
                  key={timeSlot.id}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {timeSlot.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(dayNames).map(([dayNumber, dayName]) => (
              <TableRow
                key={dayNumber}
                sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {dayName}
                </TableCell>
                {allTimeSlots.map((timeSlot) => (
                  <TableCell key={`${dayNumber}-${timeSlot.id}`}>
                    {renderSlotContent(findSlot(dayNumber, timeSlot.id))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeTableDisplay;
