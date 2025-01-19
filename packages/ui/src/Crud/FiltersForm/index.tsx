import { Box } from "@mui/material";
import { useSearchParam } from "@dscl-ttg/hooks";
import Button from "@ui/Button";
import Dialog, { DialogRef } from "@ui/Dialog";
import { Form } from "@ui/Form";
import { FormAction, FormProps } from "@ui/Form/Form";
import GridContainer from "@ui/GridContainer";
import IconButton, { iconButtonStyles } from "@ui/IconButton";
import React, {
  Component,
  JSX,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Search from "../Search";
import { PAGE } from "@dscl-ttg/constants";
import { useSetRecoilState } from "recoil";
import { crudDataAtom } from "@dscl-ttg/store";
type FiltersFormType = {
  getFilters: (filters: any) => any;
  BasicFilterForm?: any;
  FormComponent?: any;
  hasSearch: boolean;
  hasFiltersForm: boolean;
} & FormProps;

const FiltersForm: React.FC<FiltersFormType> = memo(
  ({
    getFilters,
    BasicFilterForm,
    FormComponent,
    hasSearch,
    hasFiltersForm,
    ...formProps
  }) => {
    const filterDialogRef = useRef<DialogRef>(null);
    const { setSearchParams, searchParams, resetParams, setPage } = useSearchParam();
    const setCrudData = useSetRecoilState(crudDataAtom);

    const onClick = useCallback(() => {
      filterDialogRef.current?.onOpen();
    }, []);

    const onSubmit = useCallback((formData: any) => {
      setSearchParams(formData);
      filterDialogRef.current?.onClose();
    }, []);

    const defaultValues = useMemo(() => {
      return getFilters(searchParams);
    }, [getFilters, searchParams]);

    const resetForm = useCallback(
      (reset: any) => {
        resetParams();
        setPage(PAGE);
        filterDialogRef.current?.onClose();
        reset(getFilters({}));
        setCrudData((prev: any) => ({
            data: [],
            count: 0
        }))
      },
      [getFilters],
    );

    const FinalFilterComponent = useCallback(
      ({ submitButtonProps, resetButtonProps, hookForm }: any) => {
        return (
          <Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {hasFiltersForm && FormComponent && (
                <IconButton
                  title="Filter"
                  onClick={onClick}
                  sx={iconButtonStyles}
                >
                  <FaFilter />
                </IconButton>
              )}

              {hasFiltersForm && BasicFilterForm && (
                <IconButton
                  sx={iconButtonStyles}
                  onClick={
                    resetButtonProps?.onClick
                      ? () => resetButtonProps?.onClick(hookForm.reset)
                      : () => hookForm.reset()
                  }
                >
                  <GrPowerReset />
                </IconButton>
              )}

              {hasSearch && <Search />}

              {hasFiltersForm && BasicFilterForm && (
                <Fragment>
                  <BasicFilterForm {...hookForm} />

                  <Button
                    sx={{
                      width: 130,
                      height:"36px",
                    }}
                    type="submit"
                    size="small"
                    startIcon={<FaSearch />}
                  >
                    Search
                  </Button>
                </Fragment>
              )}
            </Box>

            {hasFiltersForm && (
              <Dialog
                ref={filterDialogRef}
                TitleComponent={FilterTitleComponent}
                DialogActionComponent={
                  <FormAction
                    resetButtonProps={resetButtonProps}
                    submitButtonProps={submitButtonProps}
                    hookForm={hookForm}
                  />
                }
              >
                <GridContainer>
                  {FormComponent && <FormComponent />}
                </GridContainer>
              </Dialog>
            )}
          </Fragment>
        );
      },
      [BasicFilterForm, FormComponent, hasFiltersForm, hasSearch, onClick],
    );

    return (
      <Fragment>
        <Form
          {...formProps}
          FormComponent={FinalFilterComponent}
          layoutTypeName="filter"
          defaultValues={defaultValues}
          onSubmit={formProps.onSubmit || onSubmit}
          submitButtonProps={{
            size: "small",
            submitText: "Search",
            startIcon: <FaSearch />,
            isVisible: true,
            onClick: (hookForm: any) => {
              onSubmit(hookForm.getValues());
            },
          }}
          resetButtonProps={{
            onClick: resetForm,
            isVisible: true,
            resetText: "Reset",
            size: "small",
          }}
        />
      </Fragment>
    );
  },
);

export default FiltersForm;

const FilterTitleComponent = (() => (
  <Fragment>
    <FaFilter /> Filter
  </Fragment>
))();
