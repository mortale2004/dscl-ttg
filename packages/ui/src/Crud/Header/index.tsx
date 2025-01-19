import { Box } from "@mui/material";
import React, { Fragment, memo, ReactNode } from "react";
import { CreateButtonUI, WithCreateActions } from "../CreateButton";
import Search from "../Search";
import IconButton, { iconButtonStyles } from "@ui/IconButton";
import { FaAngleRight, FaFileExport } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import FiltersForm from "../FiltersForm";
import { FormProps } from "@ui/Form/Form";
import Count from "../Count";

export type HeaderProps = {
  componentName: string;
  hasCreateButton?: boolean;
  hasSearch?: boolean;
  hasExportButton?: boolean;
  hasPrintButton?: boolean;
  hasComponentName?: boolean;
  onCreateButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onExportButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onPrintButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  hasFiltersForm?: boolean;
  filterFormProps?: FormProps;
  hasGetList?:boolean
};

const Header: React.FC<HeaderProps> = ({
  componentName,
  hasCreateButton = true,
  hasComponentName = true,
  hasSearch = true,
  onCreateButtonClick,
  onExportButtonClick,
  hasExportButton = false,
  hasPrintButton = false,
  onPrintButtonClick,
  filterFormProps,
  hasFiltersForm = false,
  hasGetList
}) => {
  return (
    <Box
      sx={{
        gap: 2,
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        px: "10px",
        width: "100%",
        py: "13px",
      }}
    >
      {hasComponentName && (
        <Box
          sx={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {componentName}
        </Box>
      )}

      {hasCreateButton && (
        <Fragment>
          {onCreateButtonClick ? (
            <CreateButtonUI onClick={onCreateButtonClick}>
              {componentName}
            </CreateButtonUI>
          ) : (
            <WithCreateActions>{componentName}</WithCreateActions>
          )}
        </Fragment>
      )}

      {hasExportButton && (
        <IconButton
          title="Export"
          onClick={onExportButtonClick}
          sx={iconButtonStyles}
        >
          <FaFileExport />
        </IconButton>
      )}

      {hasPrintButton && (
        <IconButton
          title="Print"
          onClick={onPrintButtonClick}
          sx={iconButtonStyles}
        >
          <MdPrint />
        </IconButton>
      )}

      <FiltersForm
        {...(filterFormProps as any)}
        hasSearch={hasSearch}
        hasFiltersForm={hasFiltersForm}
      />

      {/* {hasSearch && <Search  />} */}

      {hasGetList && <Count />}
    </Box>
  );
};

export default memo(Header);
