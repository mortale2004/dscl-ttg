"use client";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogContentProps,
  DialogTitle,
  Box,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
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
import { MdClose } from "react-icons/md";
import { dialogAtom } from "@dscl-ttg/store";
import { useRecoilState } from "recoil";

export type DialogRef = {
  onOpen: () => void;
  onClose: () => void;
};

export type DialogProps = {
  isOpen?: boolean;
  TitleComponent: ReactNode;
  children: ReactNode;
  ref?: React.Ref<DialogRef>;
  DialogActionComponent?: ReactNode;
  dividers?: boolean;
} & any;

const Dialog: React.FC<DialogProps> = memo(
  forwardRef(({ isOpen = false, ...rest }, ref) => {
    return ref ? (
      <DialogWithRef {...rest} isOpen={isOpen} ref={ref as any} />
    ) : (
      <DialogWithRecoil {...rest} />
    );
  })
);

export default Dialog;

export type DialogUIProps = Omit<DialogProps, "ref" | "isOpen"> & {
  onClose: () => void;
  open: boolean;
  dividers?: boolean;
};

export const DialogUI: React.FC<DialogUIProps> = ({
  onClose,
  open,
  children,
  TitleComponent,
  DialogActionComponent,
  dividers = true,
  ...rest
}) => {
  return (
    <MuiDialog
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
        },
      }}
      TransitionComponent={SlideTransition}
      open={open}
      maxWidth="sm"
      {...rest}
    >
      <DialogTitle
        sx={{
          fontWeight: FONTS.BOLD,
          p: 2,
          px: 5,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",
          justifyContent: "space-between",
          "& svg": {
            mr: 1,
          },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box>{TitleComponent}</Box>
        <IconButton
          aria-label="close"
          sx={{
            marginRight: -3,
            color: "grey.700",
          }}
          onClick={onClose}
        >
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={dividers}
        sx={{ color: "text.secondary", fontSize: 14 }}
        id="alert-dialog-description"
      >
        {children}
      </DialogContent>

      <DialogActions
        sx={{
          py: 3,
        }}
      >
        {DialogActionComponent}
      </DialogActions>
    </MuiDialog>
  );
};

type DialogWithRefProps = {
  isOpen: boolean;
  onDeny?: any;
  ref?: any;
} & Omit<DialogUIProps, "open" | "onClose">;

const DialogWithRef: React.FC<DialogWithRefProps> = forwardRef(
  ({ isOpen, onDeny, ...DailogUIProps }, ref) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const onClose = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const onOpen = useCallback(() => {
      setOpen(true);
    }, [setOpen]);

    useImperativeHandle<any, DialogRef>(
      ref,
      () => ({
        onOpen: onOpen,
        onClose: onClose,
      }),
      []
    );

    return <DialogUI {...DailogUIProps} open={open} onClose={onClose} />;
  }
);

type DialogWithRecoilProps = {
  onDeny?: any;
} & Omit<DialogUIProps, "open" | "onClose">;

const DialogWithRecoil: React.FC<DialogWithRecoilProps> = ({
  onDeny,
  ...DailogUIProps
}) => {
  const [open, setOpen] = useRecoilState<boolean>(dialogAtom);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return <DialogUI {...DailogUIProps} open={open} onClose={onClose} />;
};
