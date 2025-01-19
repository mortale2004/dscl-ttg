import React, { memo, ReactNode } from "react";
import { FaSave } from "react-icons/fa";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

type SubmitProps = {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  size?: string;
  onClick?: (...props: any) => void;
} & LoadingButtonProps;

const Submit: React.FC<SubmitProps> = ({
  children,
  endIcon,
  startIcon = <FaSave />,
  loading = false,
  fullWidth = false,
  size = "medium",
  onClick,
  disabled
}) => (
  <LoadingButton
    size={size as any}
    fullWidth={fullWidth}
    loading={loading}
    startIcon={startIcon}
    endIcon={endIcon}
    type="submit"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </LoadingButton>
);

export default memo(Submit);
