import { Box, useTheme } from "@mui/material";
import { toast } from "@dscl-ttg/frontend-utils";
import React, { memo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { MdFolderOpen } from "react-icons/md";

type UploadFieldProps = { name: string } & Omit<UploadFieldUIProps, "onUpload">;

const UploadField: React.FC<UploadFieldProps> = memo(({ name, label }) => {
  const hookForm = useFormContext();
  const dropzone = useDropzone({});
  return (
    <UploadFieldUI
      onUpload={(file) => {
        hookForm.setValue(name, file);
      }}
      dropzone={dropzone}
      label={label}
    />
  );
});

export default UploadField;

type UploadFieldUIProps = {
  onUpload: (file: any) => void;
  sx?: any;
  customContent?: React.ReactNode;
  label?: string;
  dropzone?: any;
};

export const UploadFieldUI: React.FC<UploadFieldUIProps> = memo(
  ({ onUpload, sx, customContent, label, dropzone }) => {
    const theme = useTheme();
    useEffect(() => {
      if (dropzone?.acceptedFiles?.length) {
        onUpload(dropzone.acceptedFiles[0]);
      }
    }, [dropzone.acceptedFiles]);
    return (
      <Box
        {...dropzone.getRootProps({ className: "dropzone" })}
        className="flex-center"
        sx={{
          cursor: "pointer",
          border: (theme) => `dashed 2px ${theme.palette.divider}`,
          borderRadius: 2.5,
          pl: 3,
          textAlign: "center",
          color: "text.secondary",
          backgroundColor: "background.default",
          ...sx,
        }}
      >
        <input {...dropzone.getInputProps()} />
        {customContent ? (
          customContent
        ) : (
          <>
            <MdFolderOpen
              style={{
                fontSize: 40,
                marginBottom: 4,
                color: theme.palette.primary.main,
              }}
            />
            {label}
          </>
        )}
      </Box>
    );
  },
);
