"use client";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Button from "@ui/Button";
import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import SlideTransition from "@ui/SlideTransition";
import { FONTS } from "@dscl-ttg/constants";
import { useRecoilState } from "recoil";
import { confirmDialogAtom } from "@dscl-ttg/store";
import { MdClose } from "react-icons/md";

export type ConfirmDialogRef = {
  onOpen: () => void;
  onClose: () => void;
};

export type ConfirmDialogProps = {
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onDeny?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  confirmButtonText?: string;
  denyButtonText?: string;
  ContentComponent: ReactNode;
  TitleComponent: ReactNode;
  isOpen?: boolean;
} & Omit<DialogProps, "open">;

const ConfirmDialog: React.FC<ConfirmDialogProps> = memo(
  forwardRef(({ isOpen = false, ...rest }, ref) => {
    return ref ? (
      <ConfirmDialogWithRef {...rest} isOpen={isOpen} ref={ref as any} />
    ) : (
      <ConfirmDialogWithRecoil {...rest} />
    );
  }),
);

export default ConfirmDialog;

export type ConfirmDialogUIProps = ConfirmDialogProps &
  DialogProps &
  DialogContentProps;

export const ConfirmDialogUI: React.FC<ConfirmDialogUIProps> = memo(
  ({
    onClose,
    open,
    TitleComponent,
    onConfirm,
    onDeny,
    isDisabled = false,
    confirmButtonText = "Yes",
    denyButtonText = "No",
    ContentComponent,
    ...rest
  }) => {
    return (
      <Dialog TransitionComponent={SlideTransition} open={open} {...rest}>
        <DialogTitle
          sx={{
            fontWeight: FONTS.BOLD,
            p: 2,
            px: 5,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "capitalize",
            "& svg": {
              mr: 1,
            },
            position: "relative",
          }}
        >
          <Box>{TitleComponent}</Box>
          <IconButton
            sx={{
              marginRight: -3,
              color: "grey.700",
            }}
            onClick={onClose as any}
          >
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ color: "text.secondary", fontSize: 14 }}
          id="alert-dialog-description"
        >
          {ContentComponent}
        </DialogContent>
        <DialogActions
          sx={{
            pb: 5,
            px: 6,
          }}
        >
          <Button
            sx={{
              fontWeight: FONTS.MEDIUM,
            }}
            onClick={onConfirm}
            autoFocus
            disabled={isDisabled}
          >
            {confirmButtonText}
          </Button>
          <Button
            sx={{
              fontWeight: FONTS.MEDIUM,
            }}
            onClick={onDeny}
            color="error"
          >
            {denyButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

type ConfirmDialogWithRefProps = {
  isOpen: boolean;
  onDeny?: any;
  ref?: any;
} & Omit<ConfirmDialogUIProps, "open" | "onClose">;

const ConfirmDialogWithRef: React.FC<ConfirmDialogWithRefProps> = forwardRef(
  ({ isOpen, onDeny, ...confirmDailogUIProps }, ref) => {
    const [open, setOpen] = useState<boolean>(isOpen);

    const onClose = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const onOpen = useCallback(() => {
      setOpen(true);
    }, [setOpen]);

    useImperativeHandle(
      ref,
      () => ({
        onOpen: onOpen,
        onClose: onClose,
      }),
      [],
    );

    return (
      <ConfirmDialogUI
        {...confirmDailogUIProps}
        open={open}
        onClose={onClose}
        onDeny={onDeny || onClose}
      />
    );
  },
);

type ConfirmDialogWithRecoilProps = {
  onDeny?: any;
} & Omit<ConfirmDialogUIProps, "open" | "onClose">;

const ConfirmDialogWithRecoil: React.FC<ConfirmDialogWithRecoilProps> = ({
  onDeny,
  ...confirmDailogUIProps
}) => {
  const [open, setOpen] = useRecoilState<boolean>(confirmDialogAtom);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <ConfirmDialogUI
      {...confirmDailogUIProps}
      open={open}
      onClose={onClose}
      onDeny={onDeny || onClose}
    />
  );
};
