import AdminLayout from "./AdminLayout";
import PublicLayout from "./PublicLayout";
import { LAYOUT_TYPE } from "@dscl-ttg/constants";

const Layout = {
  [LAYOUT_TYPE.ADMIN]: AdminLayout,
  [LAYOUT_TYPE.PUBLIC]: PublicLayout,
};

export default Layout;
