import React, { forwardRef, LegacyRef, memo } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
type NavLinkProps = {
  to: string;
  activeClassName: string;
  className: string;
};

const NavLink: React.FC<NavLinkProps> = forwardRef(
  (
    { activeClassName, className, to, ...rest },
    ref: LegacyRef<HTMLAnchorElement> | undefined,
  ) => {
    return (
      <RouterNavLink
        to={to}
        ref={ref}
        {...rest}
        className={({ isActive }) =>
          isActive ? `${activeClassName} ${className}` : className
        }
      />
    );
  },
);

export default memo(NavLink);
