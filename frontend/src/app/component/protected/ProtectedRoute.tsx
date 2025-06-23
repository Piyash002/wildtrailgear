import { Navigate } from "react-router";
import { logoutUser, useCurrentUser } from "../../redux/features/auth/AuthSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import type { ReactNode } from "react";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  let userRole: "USER" | "ADMIN" | undefined;
  if (user) {
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
    userRole = parsedUser.role;
  }
  if (role !== undefined && role !== userRole) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace={true} />;
  }
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;