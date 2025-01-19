import React from "react";
import MuiAccordion, { AccordionProps, AccordionClasses } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useTheme } from "@mui/material/styles";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { MdExpandMore } from "react-icons/md";
// Accordion Component
export const Accordion: React.FC<AccordionProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiAccordion
      disableGutters
      elevation={0}
      slotProps={{ transition: { unmountOnExit: true } }}
      square
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        "&:not(:last-child)": {
          borderBottom: 0,
        },
        "&::before": {
          display: "none",
        },
      }}
      {...props}
    />
  );
};

// AccordionDetails Component
export const AccordionDetails: React.FC<any> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <MuiAccordionDetails
      sx={{
        padding: theme.spacing(2),
        borderTop: "1px solid rgba(0, 0, 0, .125)",
      }}
      {...props}
    >
      {children}
    </MuiAccordionDetails>
  );
};

export const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => {
  const theme = useTheme();
  return (
    <MuiAccordionSummary
      expandIcon={<MdExpandMore style={{ fontSize: "0.9rem" }} />}
      {...props}
      sx={{
        minHeight: "unset",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
        flexDirection: "row-reverse",
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(180deg)",
        },
        "& .MuiAccordionSummary-content": {
          marginLeft: theme.spacing(1),
        },
        ...props.sx,
      }}
    />
  );
};
