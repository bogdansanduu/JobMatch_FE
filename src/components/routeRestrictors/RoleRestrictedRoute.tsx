import React from "react";
import { Roles } from "../../utils/constants/roles";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../../utils/constants/routes";

interface RoleRestrictedRouteProps {
  children: JSX.Element;
  roles: Roles[];
}

const RoleRestrictedRoute = ({ children, roles }: RoleRestrictedRouteProps) => {
  const loggedUser = useAppSelector(getLoggedUser);

  if (!loggedUser || !roles.includes(loggedUser.role)) {
    return <Navigate to={AppRoutes.AccessDenied} replace={true} />;
  }

  return children;
};

export default RoleRestrictedRoute;
