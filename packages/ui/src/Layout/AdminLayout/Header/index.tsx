import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Z_INDEX } from "@dscl-ttg/constants";
import Logo from "@ui/Layout/AdminLayout/Logo";
import { MdMenu } from "react-icons/md";
import FiltersForm from "./Form";

type HeaderProps = {
  toggleOpenClose: () => void;
  dynamicRoutes: any;
};

const Header: React.FC<HeaderProps> = ({ toggleOpenClose }) => {
  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={{
        boxShadow: "none",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        transition: "width 0.5s ease",
        width: "100%",
        zIndex: Z_INDEX.HEADER,
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 45, sm: 45 },
          paddingLeft: { xs: 2 },
          paddingRight: { xs: 2, md: 2 },
        }}
      >
        <Box
          sx={{
            display: { lg: "block", xs: "none" },
          }}
        >
          <IconButton
            sx={{ color: "text.secondary" }}
            edge="start"
            className="menu-btn"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleOpenClose}
            size="large"
          >
            <MdMenu />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: { lg: "none", xs: "block" },
          }}
        >
          <IconButton
            sx={{ color: "text.secondary" }}
            edge="start"
            className="menu-btn"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleOpenClose}
            size="large"
          >
            <MdMenu />
          </IconButton>
        </Box>
        <Box
          sx={{
            "& .logo-text": {
              display: { xs: "none", sm: "block" },
            },
          }}
        >
          <Logo sx={{ height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
