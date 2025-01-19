import React, { memo, useMemo } from "react";
import clsx from "clsx";
import VerticalCollapse from "../VerticalCollapse";
import VerticalItem from "../VerticalItem";
import VerticalNavGroupItem from "./VerticalNavGroupItem";
import { useRecoilValue } from "recoil";
import { settingsSelector } from "@dscl-ttg/store";
import { RouterConfigData } from "@dscl-ttg/types/app";

type VerticalNavGroupProps = {
  item: RouterConfigData & { hasPermission?: boolean };
  level: number;
};

const VerticalNavGroup: React.FC<VerticalNavGroupProps> = ({ item, level }) => {
  const settings = useRecoilValue<any>(settingsSelector);

  if (!item?.hasPermission) {
    return null;
  }

  return (
    <>
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={settings?.sidebar?.sidebarTextColor}
        component="div"
        className={clsx("nav-item nav-item-header")}
      >
        {item.title}
      </VerticalNavGroupItem>

      {item.children && (
        <>
          {item.children.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "group" && (
                <NavVerticalGroup item={item} level={level} />
              )}

              {item.type === "collapse" && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === "item" && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

const NavVerticalGroup = VerticalNavGroup;

export default memo(NavVerticalGroup);
