import { FONTS, SYSTEM_CONSTANT } from "@dscl-ttg/constants";
import { apiHooks } from "@dscl-ttg/hooks";
import { Header, SelectField } from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import {
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Fragment, useCallback, useMemo } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import DeleteIconButton from "@dscl-ttg/ui/DeleteIconButton";

type FormComponentProps = {} & UseFormReturn;

const day = Object.entries(SYSTEM_CONSTANT.DAY).map(([key, value]) => ({
  label: value,
  _id: key,
}));

const renderTeacherOption = (options: any) =>
  options?.map((option: any) => (
    <MenuItem key={option._id} value={option._id}>
      {option.last_name} {option.first_name}
    </MenuItem>
  ));

const FormComponent: React.FC<FormComponentProps> = ({ watch, control }) => {
  const { data: department } = apiHooks?.department?.useGetList({
    is_active: true,
  });
  const { data: course } = apiHooks?.course?.useGetList({
    is_active: true,
  });

  const { data: academicYear } = apiHooks?.academicYear?.useGetList({
    is_active: true,
  });

  const department_id = watch("department_id");
  const course_id = watch("course_id");
  const academic_year_id = watch("academic_year_id");
  const time_slot_ids = watch("time_slot_ids");

  const { data: dcyaMapping } = apiHooks?.dcyaMapping?.useGetList(
    {
      is_active: true,
      department_id,
      course_id,
      academic_year_id,
    },
    {
      enabled: !!department_id && !!course_id && !!academic_year_id,
    }
  );

  const { fields, append, remove } = useFieldArray({
    name: "divisions",
    control,
  });

  const filteredDivisions = useMemo(() => {
    return dcyaMapping?.data?.filter((division: any) => {
      return !fields.find((field: any) => field.division?._id === division._id);
    });
  }, [dcyaMapping?.data, fields]);

  const {
    remove: removeSlot,
    append: addTimeSlot,
    fields: timeSlotFields,
  } = useFieldArray({
    name: "time_slot_ids",
    control,
  });

  const { data: timeSlot } = apiHooks?.timeSlot?.useGetList({});

  const { selectedTimeSlots, filteredSlots } = useMemo(() => {
    const selected = [];
    const filtered = [];
    for (const slot of timeSlot?.data || []) {
      if (time_slot_ids?.includes(slot._id)) {
        selected.push(slot);
      } else {
        filtered.push(slot);
      }
    }
    return {
      selectedTimeSlots: selected,
      filteredSlots: filtered,
    };
  }, [timeSlot?.data, time_slot_ids]);

  const renderTimeSlotOption = useCallback(
    (options: any) =>
      options?.map((option: any) => (
        <MenuItem
          key={option._id}
          value={option._id}
          onClick={(event: any) => {
            event.stopPropagation();
            event.preventDefault();
            addTimeSlot(option._id);
          }}
        >
          {option.time_slot_name}
        </MenuItem>
      )),
    [addTimeSlot]
  );

  const renderDcyaMapping = useCallback(
    (options: any) =>
      options?.map((option: any) => (
        <MenuItem
          key={option._id}
          value={option._id}
          onClickCapture={(event: any) => {
            event.preventDefault();
            event.stopPropagation();
            append({
              division: option,
            });
          }}
        >
          {option.course_short_name} - {option.course_sem_name} -{" "}
          {option.division_name} Division
        </MenuItem>
      )),
    [append]
  );

  console.log(time_slot_ids);
  return (
    <Fragment>
      <GridItem md={3}>
        <SelectField
          name="day_number"
          label="Day"
          options={day}
          optionLabelKey="label"
        />
      </GridItem>
      <GridItem md={3}>
        <SelectField
          name="academic_year_id"
          label="Academic Year"
          options={academicYear?.data}
          optionLabelKey="academic_year_name"
        />
      </GridItem>

      <GridItem md={3}>
        <SelectField
          name="department_id"
          label="Department"
          options={department?.data}
          optionLabelKey="department_name"
        />
      </GridItem>

      <GridItem md={3}>
        <SelectField
          name="course_id"
          label="Course"
          options={course?.data}
          optionLabelKey="course_name"
        />
      </GridItem>

      <GridItem>
        <Header>Time Table Details</Header>
      </GridItem>

      <GridItem>
        <Box
          sx={{
            maxWidth: "100vw",
            overflow: "auto",
            width: "unset",
            py: 5,
          }}
        >
          <Table
            sx={{
              width: "unset",
              "& td, & th": {
                border: "1px solid #e0e0e0",
                textWrap: "nowrap",
                py: 0,
              },
              "& th": {
                width: "fit-content",
              },
            }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Class</TableCell>
                {selectedTimeSlots.map((slot: any, index: number) => (
                  <TimeSlot
                    key={timeSlotFields[index].id}
                    watch={watch}
                    slot={slot}
                    index={index}
                    remove={removeSlot}
                  />
                ))}
                <TableCell>
                  <SelectField
                    name="time_slot_id"
                    label="Time Slot"
                    options={filteredSlots}
                    fullWidth={false}
                    size="small"
                    sx={{
                      width: 150,
                    }}
                    renderOptions={renderTimeSlotOption}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field:any, index) => (
                <TableRow key={field.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{field?.division?.course_short_name} {field?.division?.course_sem_name} {field?.division?.division_name}</TableCell>
                  {selectedTimeSlots.map((slot: any, timeSlotIndex: number) => (
                    <DivisionSlot
                      key={timeSlotIndex}
                      watch={watch}
                      index={index}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={time_slot_ids?.length+3}>
                  <Box className="space-between">
                    <SelectField
                      name="dcya_mapping_id"
                      label="Add Class"
                      options={filteredDivisions}
                      size="small"
                      fullWidth={false}
                      sx={{
                        width: 150,
                      }}
                      renderOptions={renderDcyaMapping}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </GridItem>
    </Fragment>
  );
};

export default FormComponent;

type TimeSlotProps = {
  watch: any;
  slot: any;
  remove: Function;
  index: number;
};

const TimeSlot: React.FC<TimeSlotProps> = ({ watch, slot, remove, index }) => {
  return (
    <TableCell
      sx={{
        width: 250,
      }}
    >
      <Box className="space-between">
        <Typography sx={{ fontWeight: FONTS.BOLD, mr: 2 }}>
          {slot?.time_slot_name}
        </Typography>
        <DeleteIconButton
          onClick={() => {
            remove(index);
          }}
        />
      </Box>
    </TableCell>
  );
};

type DivisionSlotProps = {
  watch: any;
  timeSlot: any;
  dcyaMapping: any;
  index: number;
};
const DivisionSlot: React.FC<DivisionSlotProps> = ({
  watch,
  timeSlot,
  index,
}) => {
  const day_number = watch("day_number");
  const dcya_mapping_id = watch(`divisions.${index}.dcya_mapping_id`);
  const division = watch(`divisions.${index}.division`);
  const { data: teacher } = apiHooks?.userRegistration?.useGetList(
    {
      is_active: true,
      dcya_mapping_id: dcya_mapping_id,
      is_free_teacher: true,
      time_slot_id: timeSlot?._id,
      day_number: day_number,
    },
    {
      enabled:
        !timeSlot?.is_break_slot &&
        !!timeSlot?._id &&
        !!dcya_mapping_id &&
        String(day_number).length > 0,
    }
  );
  return (
    <TableCell>
      <SelectField
        name={`divisions.${index}.paper_id`}
        label="Paper"
        options={division?.papers || []}
        size="small"
        fullWidth={false}
        renderOptions={renderPaperOption}
        sx={{
          width: 150,
        }}
      />
      <SelectField
        name={`divisions.${index}.teacher_id`}
        label="Teacher"
        options={teacher?.data}
        renderOptions={renderTeacherOption}
        size="small"
        fullWidth={false}
        sx={{
          width: 150,
        }}
      />
    </TableCell>
  );
};

const renderPaperOption = (options: any[]) =>
  options?.map((option: any) => (
    <MenuItem key={option._id} value={option._id}>
      {option?.paper_code} {option.paper_name}
    </MenuItem>
  ));
