// Mui Components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TableCell, TableRow, Typography } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { FONTS } from "@dscl-ttg/constants";
import { Box } from "@mui/material";
import { formatDate, formatDateTime, formatTime } from "@dscl-ttg/date-time";
import {
  blue,
  brown,
  green,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

export const renderParagraphs = (list: any[], sx = null) =>
  list?.map((item: string, index: number) => (
    <Typography
      key={index}
      component="p"
      sx={sx ? sx : { my: 3, textAlign: "justify" }}
    >
      {item}
    </Typography>
  ));

export const renderHeading = (
  heading: ReactNode | string,
  size = 20,
  sx = null,
) => (
  <Typography
    component="h1"
    sx={sx ? sx : { fontWeight: FONTS.BOLD, fontSize: size }}
  >
    {heading}
  </Typography>
);

export const renderList = (
  list: any[],
  type = "ul",
  icon = "disc",
  sx = null,
) => (
  <List
    sx={
      sx
        ? sx
        : {
            pl: 10,
            "& .MuiListItem-root": {
              display: "list-item",
              listStyle: `${icon}`,
              p: 0,
            },
          }
    }
  >
    {list?.map((item, index) => (
      <ListItem key={index}>
        <ListItemText
          sx={{ textAlign: "justify" }}
          primary={item}
        ></ListItemText>
      </ListItem>
    ))}
  </List>
);

export const renderTableHeadingRow = (dataKeys: string[], Actions?: any) => (
  <TableRow>
    {dataKeys?.map((key: any) => (
      <TableCell component={"th"} key={key}>
        {key}
      </TableCell>
    ))}
    {Actions && <TableCell component={"th"}>{Actions}</TableCell>}
  </TableRow>
);

export const renderTableRow = (
  rowIndex: number,
  dataItem: any,
  dataKeys: (string | Function)[],
  Actions?: any,
) => (
  <Fragment>
    {dataKeys?.map((key: any, index: number) => (
      <TableCell key={index}>
        {typeof key === "string"
          ? formatField(dataItem, key)
          : key(dataItem, rowIndex)}
      </TableCell>
    ))}
    {Actions && <Actions item={dataItem} />}
  </Fragment>
);

export const formatField = (item: any, key: string) => {
  if (
    item[key] === "true" ||
    item[key] === true ||
    item[key] === "false" ||
    item[key] === false ||
    key?.includes("status")
  ) {
    return statusBadge(item[key], getValueFromKeyAndData(key, item));
  } else if (key.includes("date_time")) {
    return item[key] && formatDateTime(new Date(item[key]));
  } else if (key.includes("date")) {
    return item[key] && formatDate(new Date(item[key]));
  } else if (key.includes("time")) {
    return item[key] && formatTime(new Date(item[key]));
  }
  return item[key];
};

const getValueFromKeyAndData = (key: string, item: any) => {
  switch (key) {
    case "is_active":
      return item[key] === "true" || item[key] === true
        ? "Active"
        : item[key] === "false" || item[key] === false
          ? "Inactive"
          : "";

    case "is_default":
    case "is_admission_open":
    case "is_published":
    case key?.startsWith("is_") ? key : null:
    case key?.includes("lock") ? key : null:
      return item[key] === "true" || item[key] === true
        ? "Yes"
        : item[key] === "false" || item[key] === false
          ? "No"
          : "";
  }
};

export const getColor = (status: any) => {
  switch (status) {
    // Leave Status
    case "Yes":
    case "true":
    case true:
    case "Easy":
    // case COMMON.STATUS.VERIFIED:
    // case QUESTION_BANK_CONSTANT.VERIFICATION_STATUS.VERIFIED:
    // case STUDENT_CONSTANT.ADMISSION_STATUS.ADMITTED:
    // case COMMON.STATUS.GREEN:
    // case USER_CONSTANT.LEAVE_STATUS.APPROVED:
    // case ACADEMIC_CONSTANT.TEACHING_STATUS.COMPLETED:
    // case STUDENT_CONSTANT.RESULT_STATUS.ELIGIBLE_FOR_ADMISSION:
    // case STUDENT_CONSTANT.PAYMENT_STATUS.PAID:
    // case USER_CONSTANT.ATTENDANCE_STATUS.QUARTER_DAY_LEAVE_PRESENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY_LEAVE_PRESENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY_WEEK_OFF_PRESENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.QUARTER_DAY_WEEK_OFF_PRESENT:
    // case STUDENT_CONSTANT.ATTENDANCE.PRESENT:
    // case EXAM_CONSTANT.RESULT_STATUS.PASS:
    //   return `${green[600]}`;

    // case STUDENT_CONSTANT.PAYMENT_STATUS.PARTIAL_PAID:
    //   return `${yellow[700]}`;

    // Attendance Status
    case "Hard":
    case false:
    case "false":
    case "No":
    // case USER_CONSTANT.LEAVE_STATUS.REJECTED:
    // case USER_CONSTANT.ATTENDANCE_STATUS.QUARTER_DAY_LEAVE_ABSENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY_LEAVE_ABSENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY_WEEK_OFF_ABSENT:
    // case USER_CONSTANT.ATTENDANCE_STATUS.QUARTER_DAY_WEEK_OFF_ABSENT:
    // case STUDENT_CONSTANT.ATTENDANCE.ABSENT:
    // case EXAM_CONSTANT.RESULT_STATUS.FAIL:
    // case QUESTION_BANK_CONSTANT.VERIFICATION_STATUS.UNDER_CORRECTION:
    //   return `${red[600]}`;

    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY:
    //   return `${purple[600]}`;

    // case USER_CONSTANT.ATTENDANCE_STATUS.FULL_DAY_LEAVE:
    //   return `${brown[600]}`;

    // case USER_CONSTANT.ATTENDANCE_STATUS.HALF_DAY_LEAVE:
    // case ACADEMIC_CONSTANT.TEACHING_STATUS["IN PROGRESS"]:
    //   return `${orange[600]}`;

    // case USER_CONSTANT.ATTENDANCE_STATUS.QUARTER_DAY_LEAVE:
    //   return `${teal[600]}`;

    // case STUDENT_CONSTANT.ATTENDANCE.EARLY:
    //   return `${purple[600]}`;

    // case STUDENT_CONSTANT.ATTENDANCE.LATE:
    //   return `${orange[600]}`;

    // // Eligible status
    // case STUDENT_CONSTANT.RESULT_STATUS.NOT_ELIGIBLE:
    //   return `${red[600]}`;

    // case STUDENT_CONSTANT.RESULT_STATUS.ELIGIBLE_FOR_ORAL:
    // case "Medium":
    //   return `${yellow[900]}`;

    // case COMMON.STATUS.REJECTED:
    //   return `${red[600]}`;

    // case COMMON.STATUS.RED:
    //   return `${red[600]}`;

    // case COMMON.STATUS.BLUE:
    //   return `${blue[500]}`;

    // case COMMON.STATUS.YELLOW:
    //   return `${yellow[900]}`;

    // case COMMON.STATUS.DARK_GREEN:
    //   return `${green["900"]}`;

    // case COMMON.STATUS.DARK_RED:
    //   return `${red["A700"]}`;

    // case COMMON.STATUS.DARK_BLUE:
    //   return `${blue[900]}`;

    // case COMMON.STATUS.DARK_YELLOW:
    //   return `${yellow[400]}`;

    case "Male":
      return `${purple[900]}`;

    case "Female":
      return `${pink[600]}`;

    // case STUDENT_CONSTANT.ADMISSION_MODE.ENTRANCE:
    //   return `${red[700]}`;

    // case STUDENT_CONSTANT.ADMISSION_MODE.RENEWAL:
    //   return `${brown[700]}`;

    // case STUDENT_CONSTANT.ADMISSION_MODE.MIGRATED:
    //   return `${purple[700]}`;

    default:
      return `${blue[500]}`;
  }
};

const statusBadge = (
  status: string,
  value?: any,
  sx: any = {},
  customColor?: any,
) => {
  const statusColor = customColor || getColor(status);
  return (
    <Box
      component="span"
      sx={{
        padding: "5px 14px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: FONTS.SEMI_BOLD,
        minWidth: 85,
        textAlign: "center",
        color: statusColor,
        backgroundColor: statusColor + "33",
        ...sx,
      }}
    >
      {value ? value : status}
    </Box>
  );
};

export default statusBadge;
