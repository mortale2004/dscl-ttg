import React, {
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Header, { HeaderProps } from "./Header";
import Delete from "./Delete";
import { apiHooks, useSearchParam } from "@dscl-ttg/hooks";
import VirtualTable from "@ui/VirtualTable";
import {
  authAtom,
  confirmDialogAtom,
  crudDataAtom,
  crudDataAtomType,
  crudDeleteItemAtom,
} from "@dscl-ttg/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import {
  alpha,
  Box,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import {
  isRoutePermittedForMethod,
  renderTableHeadingRow,
  renderTableRow,
} from "@dscl-ttg/frontend-utils";
import TableLoading from "@ui/TableLoading";
import TableEmptyResult from "@ui/TableEmptyResult";
import Actions from "./Actions";
import { FONTS, PAGE, PAGE_SIZE } from "@dscl-ttg/constants";
import CreateOrUpdate, { CreateOrUpdateProps } from "./CreateOrUpdate";
import { SYSTEM_CONSTANT } from "@dscl-ttg/constants";
type CrudProps = {
  componentName: string;
  headerProps: Omit<HeaderProps, "componentName">;
  getDeleteContent: (dataItem: any) => ReactNode;
  hookName: any;
  fixedHeaderContent?: () => ReactNode;
  itemContent?: (index: number, dataItem: any) => ReactNode;
  hasTable?: boolean;
  customBody?: (...props: any) => ReactNode;
  tableDataKeys?: (string | Function)[];
  tableHeaders?: string[];
  hasActions?: boolean;
  defaultFilters?: any;
  getListEnabled?: boolean;
  getListEnableMessage?: string;
  customOnGetListSuccess?: (
    data: any,
    page: number,
    setCrudData: React.Dispatch<React.SetStateAction<crudDataAtomType>>
  ) => void;
} & CreateOrUpdateProps;

const Crud: React.FC<CrudProps> = memo(
  ({
    componentName = "",
    headerProps,
    getDeleteContent,
    hookName,
    fixedHeaderContent,
    itemContent,
    hasTable = true,
    customBody,
    hasActions = true,
    tableDataKeys,
    tableHeaders,
    FormComponent,
    getDefaultValues,
    schema,
    defaultFilters,
    maxWidth,
    customOnGetListSuccess,
    customOnCreateSuccess,
    customOnUpdateSuccess,
    fullScreen,
    getListEnabled = true,
    getListEnableMessage = "Select Required Fields to Get List",
  }) => {
    const { pathname } = useLocation();
    const auth = useRecoilValue(authAtom);
    const setConfirmationDialog = useSetRecoilState(confirmDialogAtom);
    const setDeletedItem = useSetRecoilState(crudDeleteItemAtom);
    const [crudData, setCrudData] = useRecoilState(crudDataAtom);

    const onGetListSuccess = useCallback(
      (data: any, page: number) => {
        if (customOnGetListSuccess) {
          customOnGetListSuccess(data, page, setCrudData);
        } else {
          if (Number(page) === PAGE) {
            setCrudData({
              data: data.data,
              count: data.count,
            });
          } else {
            setCrudData((prev: crudDataAtomType) => ({
              data: [...prev.data, ...data.data],
              count: data.count,
            }));
          }
        }
      },
      [setCrudData, customOnGetListSuccess]
    );

    const onGetListError = useCallback(() => {
      setCrudData({
        data: [],
        count: 0,
      });
    }, [setCrudData]);

    const onDelete = useCallback(
      (deletedData: any) => {
        setConfirmationDialog(false);
        setDeletedItem(null);
        setCrudData((prev: crudDataAtomType) => ({
          data: prev.data.filter((item: any) => item._id !== deletedData.data),
          count: prev.count - 1,
        }));
      },
      [setConfirmationDialog, setDeletedItem, setCrudData]
    );

    const permissions = useMemo(
      () => ({
        create:
          isRoutePermittedForMethod(
            auth,
            pathname,
            SYSTEM_CONSTANT.PERMISSION.CREATE
          ) && headerProps.hasCreateButton,
        export:
          isRoutePermittedForMethod(
            auth,
            pathname,
            SYSTEM_CONSTANT.PERMISSION.EXPORT
          ) && headerProps.hasExportButton,
        print:
          isRoutePermittedForMethod(
            auth,
            pathname,
            SYSTEM_CONSTANT.PERMISSION.PRINT
          ) && headerProps.hasPrintButton,
        getList: isRoutePermittedForMethod(
          auth,
          pathname,
          SYSTEM_CONSTANT.PERMISSION.GET_LIST
        ),
      }),
      [
        auth,
        pathname,
        headerProps.hasCreateButton,
        headerProps.hasExportButton,
        headerProps.hasPrintButton,
        hasTable,
      ]
    );

    const { searchParams, setPage, page } = useSearchParam({
      page: `${PAGE}`,
      pageSize: `${PAGE_SIZE}`,
      ...defaultFilters,
    });

    const { isLoading } = apiHooks[hookName].useGetList(
      { ...searchParams, page },
      {
        enabled: getListEnabled,
      },
      onGetListSuccess,
      onGetListError
    );

    const { mutate: deleteItem } = apiHooks[hookName].useDelete({}, onDelete);

    const onConfirm = useCallback(
      (dataItem: any) => {
        if (dataItem) {
          deleteItem(dataItem._id);
        }
      },
      [deleteItem]
    );

    const memoizedItemContent = useCallback(
      (index: number, dataItem: any) => {
        return itemContent
          ? itemContent(index, dataItem)
          : renderTableRow(
              index,
              dataItem,
              tableDataKeys || [],
              hasActions && Actions
            );
      },
      [itemContent, tableDataKeys]
    );

    const memoizedFixedHeaderContent = useCallback(
      () =>
        fixedHeaderContent
          ? fixedHeaderContent()
          : renderTableHeadingRow(tableHeaders || [], hasActions && "Actions"),
      [fixedHeaderContent, hasActions]
    );

    return (
      <Fragment>
        <Header
          {...headerProps}
          hasCreateButton={permissions.create}
          hasExportButton={permissions.export}
          hasPrintButton={permissions.print}
          hasGetList={permissions.getList}
          componentName={componentName}
        />
        {getListEnabled ? (
          permissions.getList &&
          hasTable && (
            <StyledBox>
              {isLoading && page == PAGE ? (
                <TableLoading />
              ) : crudData.count === 0 ? (
                <TableEmptyResult />
              ) : (
                <VirtualTable
                  data={crudData?.data || []}
                  fixedHeaderContent={memoizedFixedHeaderContent}
                  itemContent={memoizedItemContent}
                  endReached={
                    crudData?.data?.length < crudData?.count && !isLoading
                      ? () => {
                          setPage((prev: any) => prev + 1);
                        }
                      : undefined
                  }
                  components={{
                    TableFoot: () =>
                      isLoading ? (
                        <div style={{ padding: "30px", textAlign: "center" }}>
                          Loading...
                        </div>
                      ) : null,
                  }}
                />
              )}
            </StyledBox>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: FONTS.SEMI_BOLD,
                marginTop: 10,
              }}
            >
              {getListEnableMessage}
            </Typography>
          </Box>
        )}

        {permissions.getList && customBody && customBody()}

        <Delete
          componentName={componentName}
          getDeleteContent={getDeleteContent}
          onConfirm={onConfirm}
        />

        <CreateOrUpdate
          hookName={hookName}
          componentName={componentName}
          FormComponent={FormComponent}
          getDefaultValues={getDefaultValues}
          schema={schema}
          maxWidth={maxWidth}
          customOnCreateSuccess={customOnCreateSuccess}
          customOnUpdateSuccess={customOnUpdateSuccess}
          fullScreen={fullScreen}
        />
      </Fragment>
    );
  }
);

export default Crud;

const StyledBox = styled(Box)(({ theme }) => {
  return {
    "& table": {
      width: "100%",
    },
    flexGrow: 1,
    "& tbody": {
      overflow: "scroll",
    },

    "& td": {
      padding: "0px 5px",
    },
    "& th": {
      padding: "5px",
      background: theme.palette.background.default,
    },
    "& tr > th, & tr > td": {
      whiteSpace: "nowrap",
      fontSize: 14,
      "&:first-of-type": {
        paddingLeft: "20px !important",
      },
      animation: "transition.slideUpIn",
    },

    "& tbody tr": {
      position: "relative",
      "&.rootCheck": {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
      },
      "& .conActionHoverHideRoot": {
        transition: "all 0.4s ease",
      },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "& .conActionHoverRoot": {
          opacity: 1,
          visibility: "visible",
          right: 5,
        },
        "& .conActionHoverHideRoot": {
          opacity: 0,
          visibility: "hidden",
        },
      },
    },
  };
});
