import React, {
  FC,
  Fragment,
  SyntheticEvent,
  useCallback,
  useMemo,
} from "react";

// mui components
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

// mui icons
import { IconButton } from "@mui/material";
import { FiMoreVertical } from "react-icons/fi";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";
import DuplicateAction from "./DuplicateAction";
import clsx from "clsx";
import { isRoutePermittedForMethod } from "@dscl-ttg/frontend-utils";
import { useRecoilValue } from "recoil";
import { authAtom } from "@dscl-ttg/store";
import { useLocation } from "react-router-dom";
import { SYSTEM_CONSTANT } from "@dscl-ttg/constants";

type ActionsProps = {
  item: any;
};

const Actions: FC<ActionsProps> = ({ item }) => {
  const auth = useRecoilValue(authAtom);
  const { pathname } = useLocation();
  const permissions = useMemo(
    () => ({
      create: isRoutePermittedForMethod(
        auth,
        pathname,
        SYSTEM_CONSTANT.PERMISSION.CREATE
      ),
      update: isRoutePermittedForMethod(
        auth,
        pathname,
        SYSTEM_CONSTANT.PERMISSION.UPDATE
      ),
      delete: isRoutePermittedForMethod(
        auth,
        pathname,
        SYSTEM_CONSTANT.PERMISSION.DELETE
      ),
    }),
    [auth, pathname]
  );
  return (
    <Fragment>
      <TableCell sx={{ width: "110px", textAlign: "center" }}>
        <IconButton>
          <FiMoreVertical />
        </IconButton>
      </TableCell>
      <ActionsWrapper className="conActionHoverRoot">
        {permissions.create && <DuplicateAction item={item} />}
        {permissions.update && <EditAction item={item} />}
        {permissions.delete && <DeleteAction item={item} />}
      </ActionsWrapper>
    </Fragment>
  );
};

export default React.memo(Actions);

const ActionsWrapper = styled(TableCell)(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    transition: "all 0.4s ease",
    borderBottom: "none",
    opacity: 0,
    visibility: "hidden",
  };
});
