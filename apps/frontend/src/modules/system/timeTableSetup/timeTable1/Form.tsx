import {
  RadioButton,
  SelectField,
  TextField,
  TextFieldUI,
  TimeField,
} from "@dscl-ttg/ui/Form";
import GridItem from "@dscl-ttg/ui/GridItem";
import React, { Fragment, memo, useEffect, useMemo } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { formatTime } from "@dscl-ttg/date-time";
import { apiHooks } from "@dscl-ttg/hooks";
import { formatField, generateOptions, toast } from "@dscl-ttg/frontend-utils";
import { SYSTEM_CONSTANT, USER_ROLE } from "@dscl-ttg/constants";
import { FormHelperText, IconButton, MenuItem, TableBody, TableCell, TableHead, TableRow, Table } from "@mui/material";
import { timeSlotType } from "@dscl-ttg/types/system";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const day = Object.entries(SYSTEM_CONSTANT.DAY).map(([key, value]) => ({
  label: value,
  _id: key,
}));

type FormProps = {} & UseFormReturn;

const Form: React.FC<FormProps> = memo(({ watch, control, setValue, formState: {errors} }) => {
  const academic_year_id = watch("academic_year_id");
  const department_id = watch("department_id");
  const course_id = watch("course_id");
  const course_sem_id = watch("course_sem_id");
  const time_slot_id = watch("time_slot_id");
  const teacher_id = watch("teacher_id");
  const paper_id = watch("paper_id");

  const { data: academicYear } = apiHooks?.academicYear?.useGetList({
    is_active: true,
  });
  const { data: department } = apiHooks?.department?.useGetList({
    is_active: true,
  });
  const { data: course } = apiHooks?.course?.useGetList({
    is_active: true,
  });

  const { data: courseSem } = apiHooks?.courseSem?.useGetList({
    is_active: true,
  });

  const { data: dcyaMapping } = apiHooks?.dcyaMapping?.useGetList(
    {
      is_active: true,
      academic_year_id: academic_year_id,
      department_id: department_id,
      course_id: course_id,
      course_sem_id: course_sem_id,
    },
    {
      enabled:
        !!academic_year_id && !!department_id && !!course_id && !!course_sem_id,
    }
  );

  const { data: paper } = apiHooks?.paper?.useGetList(
    {
      is_active: true,
      course_id: course_id,
      course_sem_id: course_sem_id,
    },
    {
      enabled: !!course_id && !!course_sem_id,
    }
  );

  const { data: timeSlot } = apiHooks?.timeSlot?.useGetList({});

  const { data: teacher } = apiHooks?.userRegistration?.useGetList({
    user_role_name: USER_ROLE.TEACHER,
    paper_id: paper_id
  }, {
    enabled: !!paper_id
  });

  
  
  const {
    fields: time_slots,
    append,
    remove,
  } = useFieldArray({
    control: control,
    name: "time_slots",
  });

  const tableBodyKeys = useMemo(
    () => [
      (_: any, index: number) => index + 1,
      ({time_slot_name}:any)=> time_slot_name,
      ({paper_name, paper_code, is_break_slot}:any)=> !is_break_slot && `${paper_code} - ${paper_name}`,
      ({teacher_first_name, teacher_father_name, teacher_last_name, is_break_slot, break_name}:any)=> is_break_slot ? break_name : `${teacher_last_name} ${teacher_first_name} ${teacher_father_name}`,
      (_:any, index:any)=> (
        <IconButton onClick={() => remove(index)} color="error" size="small">
          <MdDelete/>
        </IconButton>
      )
    ],
    [remove]
  );
  
  // Fixed the dependency array - removed the JSON.stringify that causes re-renders
  const filteredTimeSlots = useMemo(() => {
    if (!timeSlot?.data) return [];
    return timeSlot.data.filter((slot:any) => 
      !time_slots.some((addedSlot:any) => addedSlot.time_slot_id === slot._id)
    );
  }, [timeSlot?.data, time_slots]);


  const selectedSlot = useMemo(
    () =>
      filteredTimeSlots?.find(
        (slot: timeSlotType) => slot._id === time_slot_id
      ),
    [time_slot_id, filteredTimeSlots]
  );

  const disabled = time_slots.length > 0;

  const onAddClick = () => {
    try {
      if (!selectedSlot){
        throw new Error("Please select time slot!");
      }

      const isBreakSlot = String(selectedSlot.is_break_slot) === "true";
      
      if (!isBreakSlot && !teacher_id){
        throw new Error("Please select teacher!");
      }
      if (!isBreakSlot && !paper_id){
        throw new Error("Please select paper!");
      }

      const selectedTeacher = teacher?.data?.find((t:any) => t._id === teacher_id);
      const selectedPaper = paper?.data?.find((p:any) => p._id === paper_id);



      const appendValue = {
        break_name: selectedSlot.break_name,
        time_slot_name: selectedSlot.time_slot_name,
        teacher_first_name: selectedTeacher?.first_name || "",
        teacher_father_name: selectedTeacher?.father_name || "",
        teacher_last_name: selectedTeacher?.last_name || "",
        paper_name: selectedPaper?.paper_name,
        paper_code: selectedPaper?.paper_code,
        teacher_id: teacher_id || "",
        paper_id: paper_id,
        time_slot_id: time_slot_id,
        is_break_slot: isBreakSlot
      };

      append(appendValue);

      // Clear selections after successful append
      setValue("time_slot_id", "");
      
      // Only reset teacher and paper if not disabled
      if (!disabled) {
        setValue("paper_id", "");
        setValue("teacher_id", "");
      }
    } catch (error: any) {
      toast(error?.message, "error");
    }
  };

  return (
    <Fragment>
      <GridItem md={4}>
        <SelectField
          label="Academic Year"
          name="academic_year_id"
          options={academicYear?.data}
          optionLabelKey="academic_year_name"
          disabled={disabled}
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Department"
          name="department_id"
          options={department?.data}
          optionLabelKey="department_name"
          disabled={disabled}
        />
      </GridItem>

      <GridItem md={4}>
        <SelectField
          label="Course"
          name="course_id"
          options={course?.data}
          optionLabelKey="course_name"
          disabled={disabled}
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Course Sem"
          name="course_sem_id"
          options={courseSem?.data}
          optionLabelKey="course_sem_name"
          disabled={disabled}
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Class"
          name="dcya_id"
          options={dcyaMapping?.data}
          optionLabelKey="division_name"
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          name="day_number"
          label="Day"
          options={day}
          optionLabelKey="label"
        />
      </GridItem>

      <GridItem md={4}>
        <SelectField
          name="time_slot_id"
          label="Time Slot"
          options={filteredTimeSlots}
          optionLabelKey="time_slot_name"
        />
      </GridItem>


      {!selectedSlot?.is_break_slot &&<GridItem md={4}>
        <SelectField
          name="paper_id"
          label="Paper"
          options={paper?.data}
          optionLabelKey="paper_name"
        />
      </GridItem>
}


      <GridItem md={4} className='space-between'>
        {selectedSlot?.is_break_slot ? (
          <TextFieldUI 
            name="" 
            value={selectedSlot?.break_name} 
            label="Break" 
            slotProps={{
              input:{
                readOnly: true
              }
            }} 
          />
        ) : (
          <SelectField
            name="teacher_id"
            label="Teacher"
            options={teacher?.data}
            renderOptions={renderTeacherOption}
          />
        )}
        <IconButton 
          sx={{
            color:'primary.main',
          }} 
          onClick={onAddClick}
        >
          <IoAddCircleOutline/>
        </IconButton>
      </GridItem>

      <GridItem md={12}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header:any, index) => (
                <TableCell key={index}>
                  {typeof header === "function" ? header(index) : header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {time_slots.map((item, rowIndex:number) => (
              <TableRow key={rowIndex}>
                {tableBodyKeys.map((key, index) => (
                  <TableCell key={index}>
                    {typeof key === "function" ? key(item, rowIndex) : formatField(item, key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GridItem>

      <GridItem>
        {typeof errors?.time_slots?.message === "string" && (
          <FormHelperText sx={{
            color:"error.main"
          }}>
            {errors?.time_slots?.message}
          </FormHelperText>
        )}
      </GridItem>
    </Fragment>
  );
});

export default Form;

const tableHeaders = ["#", "Time Slot", "Paper", "Teacher", "Action"];

const renderTeacherOption = (options: any[]) => {
  return options.map((option) => (
    <MenuItem key={option._id} value={option._id}>
      {option.last_name} {option.first_name}
    </MenuItem>
  ));
};