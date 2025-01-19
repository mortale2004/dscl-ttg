import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import orange from "@mui/material/colors/orange";
import React, { Fragment, memo, MouseEventHandler, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAvatar } from "@dscl-ttg/utils";
import { FONTS } from "@dscl-ttg/constants";
import { MdExpandMore } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { authAtom } from "@dscl-ttg/store";
import { useAuth } from "@dscl-ttg/hooks";

const UserInfo = () => {
  const { logout } = useAuth();
  const { user } = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = useCallback(
    (event: MouseEventHandler<HTMLDivElement>): void => {
      setAnchorEl((event as any).currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Fragment>
      <Box
        onClick={handleClick as any}
        sx={{
          py: 1,
          px: 3.2,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          height: "70px",
        }}
        className="user-info-view"
      >
        <Box sx={{ py: 0.5 }}>
          {user?.photo_url ? (
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 24,
                backgroundColor: orange[500],
              }}
              src={user?.photo_url}
            />
          ) : (
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 24,
                backgroundColor: orange[500],
              }}
            >
              {getUserAvatar(user?.first_name, user?.last_name)}
            </Avatar>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "calc(100% - 62px)", xl: "calc(100% - 62px)" },
            ml: 2,
            color: "inherit",
          }}
          className="user-info"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                mb: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 16,
                fontWeight: FONTS.BOLD,
                color: "inherit",
              }}
              component="span"
            >
              {user?.first_name ? user?.first_name : "User"}&nbsp;
              {user?.last_name ? user?.last_name : ""}
            </Box>
            <Box
              sx={{
                ml: 3,
                color: "inherit",
                display: "flex",
              }}
            >
              <MdExpandMore />
            </Box>
          </Box>
          <Box
            sx={{
              mt: -0.5,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "inherit",
            }}
          >
            {user?.designation_name}
          </Box>
        </Box>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/my-profile");
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={() => logout({})}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default memo(UserInfo);
