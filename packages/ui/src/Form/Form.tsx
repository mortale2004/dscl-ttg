import React, { ComponentType, memo, ReactNode } from "react";
import {
  useForm,
  FormProps as HookFormProps,
  UseFormReturn,
  FormProvider,
  UseFormReset,
} from "react-hook-form";
import Submit from "./Submit";
import { yupResolver } from "@hookform/resolvers/yup";
import GridItem from "@ui/GridItem";
import GridContainer from "@ui/GridContainer";
import Button from "@ui/Button";
import { GrPowerReset } from "react-icons/gr";
import Dialog from "@ui/Dialog";
export type submitButtonProps = {
  submitText: string;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  size?: string;
  isVisible?: boolean;
  onClick: (data: UseFormReturn<any>) => void;
};

export type resetButtonProps = {
  resetText: string;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  size?: string;
  isVisible?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type FormProps = {
  FormComponent: ComponentType<any>;
  onSubmit?: (data: any) => void;
  submitButtonProps?: submitButtonProps;
  resetButtonProps?: resetButtonProps;
  gridContainerSx?: any;
  defaultValues: any;
  schema?: any;
  layoutTypeName?: FormLayoutType;
};

const Form: React.FC<FormProps> = ({
  FormComponent,
  defaultValues,
  schema,
  onSubmit,
  gridContainerSx,
  layoutTypeName = "horizontal",
  submitButtonProps = {
    submitText: "Submit",
    isVisible: true,
  },
  resetButtonProps = {
    resetText: "Reset",
    isVisible: false,
  },
}) => {
  const hookForm = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: defaultValues,
  });

  console.log(hookForm.formState.errors);

  return (
    <FormProvider {...hookForm}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={onSubmit ? hookForm.handleSubmit(onSubmit) : undefined}
      >
        {LayoutType[layoutTypeName](
          hookForm,
          FormComponent,
          submitButtonProps,
          resetButtonProps,
          gridContainerSx
        )}
      </form>
    </FormProvider>
  );
};

export default memo(Form);

export type FormLayoutType = "horizontal" | "filter";

export type LayoutTypeType = {
  [key in FormLayoutType]: (
    hookForm: UseFormReturn<any, any, undefined>,
    FormComponent: ComponentType<any>,
    submitButtonProps: any,
    resetButtonProps: any,
    gridContainerSx?: any
  ) => ReactNode;
};

const LayoutType: LayoutTypeType = {
  horizontal: (
    hookForm,
    FormComponent,
    submitButtonProps,
    resetButtonProps,
    gridContainerSx
  ) => (
    <GridContainer spacing={3} sx={gridContainerSx}>
      <FormComponent {...hookForm} />
      <FormAction
        resetButtonProps={resetButtonProps}
        submitButtonProps={submitButtonProps}
        hookForm={hookForm}
      />
    </GridContainer>
  ),
  filter: (
    hookForm,
    FormComponent,
    submitButtonProps,
    resetButtonProps,
    gridContainerSx
  ) => (
    <FormComponent
      submitButtonProps={submitButtonProps}
      resetButtonProps={resetButtonProps}
      gridContainerSx={gridContainerSx}
      hookForm={hookForm}
    />
  ),
};

export type FormActionType = {
  resetButtonProps: resetButtonProps;
  submitButtonProps: submitButtonProps;
  hookForm: UseFormReturn<any, any, undefined>;
};

export const FormAction: React.FC<FormActionType> = ({
  resetButtonProps,
  submitButtonProps,
  hookForm,
}) => {
  return (
    <GridItem
      sx={{
        alignItems: "flex-end",
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      {resetButtonProps?.isVisible && (
        <Button
          onClick={
            resetButtonProps.onClick
              ? () => resetButtonProps?.onClick?.(hookForm?.reset as any)
              : () => hookForm?.reset() as any
          }
          startIcon={resetButtonProps?.startIcon || <GrPowerReset />}
          size={resetButtonProps?.size || ("small" as any)}
          fullWidth={resetButtonProps?.fullWidth || false}
        >
          {resetButtonProps?.resetText || "Reset"}
        </Button>
      )}
      {submitButtonProps?.isVisible && (
        <Submit
          startIcon={submitButtonProps.startIcon}
          loading={hookForm?.formState?.isSubmitting}
          fullWidth={submitButtonProps.fullWidth}
          size={submitButtonProps.size as any}
          onClick={
            submitButtonProps.onClick
              ? () => submitButtonProps.onClick(hookForm)
              : undefined
          }
        >
          {submitButtonProps.submitText}
        </Submit>
      )}
    </GridItem>
  );
};
